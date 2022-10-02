import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/Home";
import Search from './pages/Search/Search'
import Article from "./pages/Article/Article";


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<Search/>}></Route> 
          <Route path="/article/:article_id" element={<Article/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
