import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Share.css";
import SmartShare from "./SmartShare.json";
import Web3 from "web3";
function Share() {
  const [receiverId, setId] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [account, setAccount] = useState(null);
  const location = useLocation();
  const contractAddress = "0x73475571b911310347601E9b7D99dB3Ecb20a0Fc";

  const uploadChangesToEthereum = async (fileId, receiverId) => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      const smartShare = new web3.eth.Contract(SmartShare.abi, contractAddress);
      await smartShare.methods
        .shareFile(receiverId, fileId)
        .send({ from: accounts[0] })
        .then((result) => {
          console.log(result);
          console.log("file successfully uploaded");
          {
            alert("file successfully shared");
          }
          window.location.reload();
        });
    }
  };

  useEffect(() => {
    setFileId(location.state.id);
  }, []);
  const sendFile = async (e) => {
    e.preventDefault();
    try {
      uploadChangesToEthereum(fileId, receiverId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="share">
      <div className="container">
        <form onSubmit={sendFile}>
          <h2>Share file</h2>
          <input
            type="text"
            placeholder="Enter receiver public identification number"
            className="fileName"
            onChange={(e) => setId(e.target.value)}
          />
          <button type="submit" className="uploadButton">
            SHARE
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
