import React from "react";
import "./App.css";
import Home from "./Home/Home";
import Login from "./Login";
import Edit from "./Edit/Edit";
import Searchpage from "./searchpage/searchpage";
import Article from "./Article/Article";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/edit" element={<Edit />}></Route>
          <Route path="/searchpage" element={<Searchpage/>}></Route> 
          <Route path="/article" element={<Article/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
