import "./App.css";
import FileDashboard from "./FileDashboard";
import NavBar from "./NavBar";
import Upload from "./Upload";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Share from "./Share";
import Received from "./Received";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<FileDashboard />} />
          <Route path="/FileDashboard" element={<FileDashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/share" element={<Share />} />
          <Route path="/ReceivedFiles" element={<Received />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
