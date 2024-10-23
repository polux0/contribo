// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ContirbutionNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;

    struct NFTMetadata {
        string bountyID;
        string proofURL;
        string skills;
    }

    mapping(uint256 => NFTMetadata) public tokenMetadata;

    constructor() ERC721("ContirbutionNFT", "CTRNFT") {}
    
    // Function to Mint the token
    function mintNFT(address recipient, string memory bountyID, string memory proofURL, string memory skills, string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenIds++;

        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        // Store additional metadata
        tokenMetadata[newItemId] = NFTMetadata(proofURL, skills);

        return newItemId;
    }

    // Function to retrieve bountyID, proofURL and skills for a tokenId
    function getNFTMetadata(uint256 tokenId) public view returns (string memory, string memory) {
        require(_exists(tokenId), "Token does not exist.");
        NFTMetadata memory metadata = tokenMetadata[tokenId];
        return (metadata.proofURL, metadata.skills);
    }
}
