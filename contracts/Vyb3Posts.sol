// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/*
  Vyb3Posts — simple contract to store references to posts hosted on IPFS.
  Each post stores a content URI (IPFS CID or URL), author, and timestamp.
  This contract is kept intentionally small as a starting point.
*/
contract Vyb3Posts {
    event PostCreated(uint256 indexed postId, address indexed author, string contentUri, uint256 timestamp);

    struct Post {
        uint256 id;
        address author;
        string contentUri;
        uint256 timestamp;
    }

    Post[] public posts;

    function createPost(string calldata contentUri) external returns (uint256) {
        uint256 id = posts.length;
        posts.push(Post({ id: id, author: msg.sender, contentUri: contentUri, timestamp: block.timestamp }));
        emit PostCreated(id, msg.sender, contentUri, block.timestamp);
        return id;
    }

    function totalPosts() external view returns (uint256) {
        return posts.length;
    }

    function getPost(uint256 id) external view returns (Post memory) {
        require(id < posts.length, "Post does not exist");
        return posts[id];
    }
}