import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { Video } from "./pages/video/video";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Video />} />
      </Routes>
    </Router>
  );
}

export default App;
