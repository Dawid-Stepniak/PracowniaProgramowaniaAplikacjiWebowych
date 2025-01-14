import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Categories from "./pages/Categories";
import "./styles/main.scss";

const App = () => {
  return (
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;