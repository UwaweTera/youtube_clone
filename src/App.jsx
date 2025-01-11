import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SearchPage from "./pages/Search/SearchPage";
import ShortVideoPage from "./pages/shorts/ShortVideoPage";
import { Video } from "./pages/video/Video";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Video />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/shorts/:id" element={<ShortVideoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
