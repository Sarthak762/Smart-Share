import { useState } from "react";
import "./GenerateHash.css";

const GenerateHash = () => {
  const [publicKey, setPublicKey] = useState("");
  const [cid, setCid] = useState("");
  const [success, setSuccess] = useState(false);

  const generate_hash = (e) => {
    console.log(cid);
  };

  return (
    <div className="main_container">
      <div className="box">
          <h1>Generate Hash</h1>
        <form
          className="address"
          onSubmit={(e) => {
            generate_hash(e);
          }}
        >
          <input
            className="address_input"
            type="text"
            placeholder="Enter Public Key"
            name="publicKey"
            required
            onChange={(e) => setPublicKey(e.target.value)}
          ></input>
          <input
            className="address_input"
            type="text"
            placeholder="Enter Content ID"
            name="cid"
            required
            onChange={(e) => setCid(e.target.value)}
          ></input>
          <input type="submit" value="Generate Hash" className="hash_btn" />
        </form>
        {success}
        <div className="hash">ac2fa0b122ac80a15777bbc414bf12510f94fc82410f51f2e33d5991c64085f5
        </div>
      </div>
    </div>
  );
};

export default GenerateHash;
