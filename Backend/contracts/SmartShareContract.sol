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

    File[] public files;
    
    mapping(address => uint[]) public userData;

    function uploadFiles(string memory _cidHash,string memory _name) public{
        imageCount++;
        File memory file = File(imageCount,_cidHash,_name,msg.sender);
        files.push(file);
        userData[msg.sender].push(imageCount);
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

    function retrieveSingleFile(uint _id,string memory _cid) public view returns(File memory){
        File memory file = files[_id-1];
        require(bytes(_cid).length==bytes(file.cidHash).length,"Invalid CID passed");
        return file;
    }

}