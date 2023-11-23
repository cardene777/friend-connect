// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import '@openzeppelin/contracts/utils/Strings.sol';
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract ShareKey721 is ERC721Enumerable {
    using Strings for uint256;

    struct Share {
        uint256 balance;
        mapping(address => uint256) holder;
        // mint Hold tokenId => SharesSubject
        mapping(uint256 => address) holderTokenId;
    }

    struct Holder {
        uint256 keys;
        // SharesSubject => Balance
        mapping(address => uint256) shareKey;
    }

    mapping(address => Share) public shareInfo;
    mapping(address => Holder) public holderInfo;
    // tokenId => SharesSubject
    mapping(uint256 => address) public tokenIdShare;
    // tokenId => share tokenId
    mapping(uint256 => uint256) public tokenIdList;



    uint256 private _tokenIdCounter = 1;
    string public baseURI = "https://example.com";
    string public baseExtension = '.json';
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string.concat(currentBaseURI, uint256(tokenId).toString(), baseExtension)
                : '';
    }

    function mint(address share, address to) public {
        uint256 nextTokenId = totalSupply() + 1;

        Share storage shareData = shareInfo[share];
        uint256 nextShareTokenId = shareInfo[share].balance;
        shareInfo[share].balance++;
        shareInfo[share].holder[to]++;
        shareInfo[share].holderTokenId[nextShareTokenId] = to;


        holderInfo[to].keys++;
        holderInfo[to].shareKey[share]++;

        tokenIdShare[nextTokenId] = share;

        tokenIdList[nextTokenId] = nextShareTokenId;


        _safeMint(to, nextTokenId);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(ERC721, IERC721) {
        address share = tokenIdShare[tokenId];
        uint256 shareTokenId = tokenIdList[tokenId];

        shareInfo[share].holder[from]--;
        shareInfo[share].holder[to]++;
        shareInfo[share].holderTokenId[shareTokenId] = to;

        holderInfo[from].shareKey[share]--;
        holderInfo[to].shareKey[share]++;

        super.transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public override(ERC721, IERC721) {
        address share = tokenIdShare[tokenId];
        uint256 shareTokenId = tokenIdList[tokenId];

        shareInfo[share].holder[from]--;
        shareInfo[share].holder[to]++;
        shareInfo[share].holderTokenId[shareTokenId] = to;

        holderInfo[from].shareKey[share]--;
        holderInfo[to].shareKey[share]++;

        super.safeTransferFrom(from, to, tokenId, _data);
    }
}
