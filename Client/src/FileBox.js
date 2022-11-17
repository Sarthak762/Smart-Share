import { Send } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./FileBox.css";
function FileBox({ id, cid, name }) {
  return (
    <div className="fileBox">
      <img src={`http://localhost:8080/ipfs/${cid}`} alt="" />
      <div className="fileOptions">
        <p>{name}</p>
        <Link to="/share" state={{ id: id, cid: cid }}>
          <IconButton>
            <Send className="shareIcon" />
          </IconButton>
        </Link>
      </div>
    </div>
  );
}

export default FileBox;
