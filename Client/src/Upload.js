import React, { useEffect, useState } from "react";
import "./Upload.css";
import { create } from "ipfs-http-client";
import SmartShare from "./SmartShare.json";
import Web3 from "web3";
// import { useLocation } from "react-router";

function Upload() {
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedImagefile, setSelectedImagefile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [account, setAccount] = useState(null);
  const [imageClass, setImageClass] = useState("selectedImageBlank");
  const client = create("/ip4/127.0.0.1/tcp/5001");
  const contractAddress = "0xCD99ff700ccF9aCBF3B2c16a9f7318b22F5DCe31";
  // const { id, cid } = useLocation().state;
  // console.log(id);
  // console.log(cid);
  const retrieveFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      const data = e.target.files[0];
      setSelectedImageUrl(URL.createObjectURL(data));
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(data);
      reader.onloadend = () => {
        setSelectedImagefile(reader.result);
      };
    }
    e.preventDefault();
  };

  useEffect(() => {
    if (selectedImageUrl) {
      setImageClass("selectedImageShow");
    }
  }, [selectedImageUrl]);

  const uploadFileToEthereum = async (cid) => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      const smartShare = new web3.eth.Contract(SmartShare.abi, contractAddress);
      await smartShare.methods
        .uploadFiles(cid, fileName)
        .send({ from: accounts[0] })
        .then((result) => {
          console.log(result);
          console.log("file successfully uploaded");
        });
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await client.add(selectedImagefile);
      console.log(created.path);
      uploadFileToEthereum(created.path);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="upload">
      <div className="uploadBox">
        <img src={selectedImageUrl} alt="" className={imageClass} />
        <form onSubmit={handleFileSubmit}>
          <input type="file" className="file" onChange={retrieveFile} />
          <input
            type="text"
            placeholder="Enter file Name"
            className="fileName"
            onChange={(e) => setFileName(e.target.value)}
          />
          <button type="submit" className="uploadButton">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
