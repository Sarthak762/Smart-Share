// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SmartShare{

    uint public imageCount = 0;

    struct File{
        uint id;
        string cidHash;
        string name;
        address owner;
    }

    struct keyPair{
        string publicKey;
        string privateKey;
    }

    File[] public files;
    
    mapping(address => uint[]) public userData;
    mapping(address => uint[]) public received;
    mapping(address => keyPair) public keyStore;

    function checkUser() public view returns(keyPair memory){
        address userAddress = msg.sender;
        keyPair memory userkeys = keyStore[userAddress];
        return userkeys;
    }

    function addUser(string memory publicKey,string memory privateKey) public{
        address userAddress = msg.sender;
        keyPair memory userKeys = keyPair(publicKey,privateKey);
        keyStore[userAddress] = userKeys; 
    }
 
    function uploadFiles(string memory _cidHash,string memory _name) public{
        imageCount++;
        File memory file = File(imageCount,_cidHash,_name,msg.sender);
        files.push(file);
        userData[msg.sender].push(imageCount);
    }

    function shareFile(address _receiver,uint encrypted_id) public{
        received[_receiver].push(encrypted_id);
    }

    function retrieveUserFiles() public view returns(File[] memory){
        address userAddress = msg.sender;
        uint len = userData[userAddress].length;
        File[] memory allFiles = new File[](len);
        for(uint i=0;i<len;i++){
            uint id = userData[userAddress][i];
            allFiles[i] = files[id-1];
        }
        return allFiles;
    }

    function retrieveReceivedFiles() public view returns(File[] memory){
        address userAddress = msg.sender;
        uint len = received[userAddress].length;
        File[] memory allFiles = new File[](len);
        for(uint i=0;i<len;i++){
            uint id = received[userAddress][i];
            allFiles[i] = files[id-1];
        }
        return allFiles;
    }

    function retrieveSingleFile(uint _id,string memory _cid) public view returns(File memory){
        File memory file = files[_id-1];
        require(bytes(_cid).length==bytes(file.cidHash).length,"Invalid CID passed");
        return file;
    }

}