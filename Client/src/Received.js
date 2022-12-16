import React from "react";
import "./Received.css";
import { useEffect, useState } from "react";
import FileBox from "./FileBox";
import SmartShare from "./SmartShare.json";
import Web3 from "web3";

function Received() {
  const [receivedFiles, setReceivedFiles] = useState([]);
  const contractAddress = "0x73475571b911310347601E9b7D99dB3Ecb20a0Fc";

  useEffect(() => {
    const retrieveFiles = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const smartShare = new web3.eth.Contract(
          SmartShare.abi,
          contractAddress
        );

        await smartShare.methods
          .retrieveReceivedFiles()
          .call({ from: accounts[0] })
          .then((result) => {
            console.log("received files", result);
            setReceivedFiles(result);
          });
      }
    };
    retrieveFiles();
  }, []);

  return (
    <div className="fileDashboard">
      <h1>Received Files</h1>
      <div className="fileContainer">
        {receivedFiles.map((file) => (
          <FileBox id={file[0]} cid={file[1]} name={file[2]} />
        ))}
      </div>
    </div>
  );
}

export default Received;
