// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";

interface ShareKey {
    function mintedKeyAmount(uint tokenId) external view returns (uint256);
}

contract Paint is ERC721Enumerable {
    using Strings for uint256;
    ShareKey public shareKeyContract;

    uint256 private _tokenIdCounter = 0;

    struct DotArtData {
        uint8 size; // Size of dots
        string name;
        string description;
        string[] colors;
    }

    mapping(uint256 => DotArtData) private dotArts;

    mapping(uint256 => address) public tokenIdCreator;

    constructor() ERC721("PaintArt", "PAN") {}

    function mint(address shareSubject, uint _tokenId, string[] memory colors, string memory name, string memory description) public {
        uint256 shareSubjectAmount = shareKeyContract.mintedKeyAmount(_tokenId);
        uint256 size = calculateSize(shareSubjectAmount);
        require(size * size == colors.length, "Size and color array mismatch");
        uint256 tokenId = _tokenIdCounter++;
        dotArts[tokenId] = DotArtData(uint8(size), name, description, colors);
        tokenIdCreator[tokenId] = shareSubject;
        _mint(shareSubject, tokenId);
    }

    function calculateSize(uint256 amount) private pure returns (uint8) {
        uint8 size = 1;
        while (size * size < amount) {
            size++;
        }
        return size;
    }

    function generateSVG(uint8 size, string[] memory colors) private pure returns (string memory) {
        require(size * size == colors.length, "Size and color array mismatch");
        uint256 pixelSize = 10; // これはSVG内の各ピクセルの大きさを表します。
        string memory svg = string(abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" width="', uint256(size * pixelSize).toString(),
            '" height="', (size * pixelSize).toString(), '" viewBox="0 0 ', uint256(size).toString(), ' ', uint256(size).toString(), '">'
        ));
        for (uint256 i = 0; i < colors.length; i++) {
            string memory color = colors[i];
            uint256 x = i % size;
            uint256 y = i / size;
            svg = string(abi.encodePacked(svg, '<rect x="', (x * pixelSize).toString(), '" y="', (y * pixelSize).toString(),
                '" width="', (pixelSize).toString(), '" height="', (pixelSize).toString(), '" fill="', color, '" />'));
        }
        svg = string(abi.encodePacked(svg, '</svg>'));
        return svg;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(tokenId <= _tokenIdCounter, "Token does not exist");

        DotArtData storage dotArt = dotArts[tokenId];
        string memory svg = generateSVG(dotArt.size, dotArt.colors);
        string memory encodedSvg = Base64.encode(bytes(svg));
        string memory json = Base64.encode(bytes(string(abi.encodePacked(
            '{"name": "', dotArt.name,
            '", "description": "', dotArt.description,
            '", "image": "data:image/svg+xml;base64,', encodedSvg, '"}'
        ))));
        return string(abi.encodePacked("data:application/json;base64,", json));
    }
}
