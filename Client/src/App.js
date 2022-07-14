import "./App.css";
import FileDashboard from "./FileDashboard";
import NavBar from "./NavBar";
import Upload from "./Upload";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<FileDashboard />} />
          <Route path="/FileDashboard" element={<FileDashboard />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
