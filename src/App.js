import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./Home/Home";
import Search from './Search/Search'
import Article from "./Article/Article";


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
