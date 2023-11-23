// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
contract ShareKey is ERC1155 {
    uint256 private _tokenIdCounter = 0;

    // tokenId => (key id => Holder)
    mapping(uint256 => mapping(uint256 => address)) public keyId;

    // tokenId => minted num
    mapping(uint256 => uint256) public mintedKeyAmount;

    mapping(address => uint256) public sharesSubjectToTokenId;

    mapping(uint256 => address) public tokenIdTosharesSubject;
    constructor(string memory _name, string memory _symbol) ERC1155("https://res.cloudinary.com/dplp5wtzk/raw/upload/v1700724148/metadata{id}.json") {
    }

    function mint(address shareSubject, address account, uint256 amount, bytes memory data)
        public
    {
        _tokenIdCounter++;
        if (sharesSubjectToTokenId[shareSubject] == 0) {
            _tokenIdCounter++;
            sharesSubjectToTokenId[shareSubject] = _tokenIdCounter;
            tokenIdTosharesSubject[_tokenIdCounter] = shareSubject;
        }
        uint256 nextKeyAmount = mintedKeyAmount[_tokenIdCounter] + 1;
        for (uint256 i = 0; i < amount; i++) {
            keyId[_tokenIdCounter][nextKeyAmount + i] = msg.sender;
        }
        mintedKeyAmount[_tokenIdCounter] += amount;
        _mint(account, _tokenIdCounter, amount, data);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override {
        require(to != address(0), "Cannot transfer to the zero address");

        uint256[] memory keyIds = abi.decode(data, (uint256[]));
        require(keyIds.length == amount, "Incorrect data argument");
        for (uint256 i = 0; i < amount; i++) {
            uint256 key = keyIds[i];
            keyId[id][key] = to;
        }

        // 親コントラクトの関数を呼び出し
        super.safeTransferFrom(from, to, id, amount, data);
    }

    // ERC1155のsafeBatchTransferFromをオーバーライド
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public virtual override {
        require(to != address(0), "Cannot transfer to the zero address");

        uint256[][] memory keyIds = abi.decode(data, (uint256[][]));
        require(keyIds.length == amounts.length, "Incorrect data argument");
        for (uint256 i = 0; i < amounts.length; i++) {
            uint256 amount = amounts[i];
            require(keyIds[i].length == amount, "Incorrect data length");
            uint256 id = ids[i];
            for (uint256 index = 0; index < amount; index++) {
                uint256 key = keyIds[i][index];
                keyId[id][key] = to;
            }
        }

        // 親コントラクトの関数を呼び出し
        super.safeBatchTransferFrom(from, to, ids, amounts, data);
    }
}
