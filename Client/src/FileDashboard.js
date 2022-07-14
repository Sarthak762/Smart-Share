import React, { useEffect, useState } from "react";
import FileBox from "./FileBox";
import "./FileDashboard.css";
import SmartShare from "./SmartShare.json";
import Web3 from "web3";

function FileDashboard() {
  const [files, setFiles] = useState([]);
  const contractAddress = "0x597Ff670A6bd190C8EC91c57bB288dA6Fd86f3B2";

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
          .retrieveUserFiles()
          .call({ from: accounts[0] })
          .then((result) => {
            setFiles(result);
          });
      }
    };
    retrieveFiles();
  }, []);

  return (
    <div className="fileDashboard">
      <h1>File DashBoard</h1>
      <div className="fileContainer">
        {files.map((file) => (
          <FileBox id={file[0]} cid={file[1]} name={file[2]} />
        ))}
      </div>
    </div>
  );
}

export default FileDashboard;
