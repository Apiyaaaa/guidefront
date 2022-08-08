import React from "react";
import "./App.css";
import Home from "./Home/Home";
import Search from './Search/Search'
import Article from "./Article/Article";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Search" element={<Search/>}></Route> 
          <Route path="/article" element={<Article/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
