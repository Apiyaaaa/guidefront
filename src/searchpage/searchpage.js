import "./searchpage.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Searchpage() {
  //init data
  const [data, setData] = useState([
    {
      article_id: "0",
      title: "暂时还没有搜索内容",
      summary: "暂无内容",
      tags: [],
      update_time: Date.now(),
      country: "国家",
      views: "0",
    },
  ]);
  //nav to content page
  const navigate = useNavigate();
  const handelClick = (e) => {
    if (e) {
      navigate("/article", {
        article_id: e,
      });
    } else return;
    console.log(e);
  };
  //request for data
  const searcChanged = () => {
    const word = document.getElementById("search").value;
    console.log(word);
    setTimeout(()=>getArticle(word),1000)
  };
  const getArticle = (word) => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:80/api/search_article",
      params: {
        word: word,
      },
    }).then((res) => {
      console.log(res, "res");
      if (res.data) {
        if (res.data === "nodata") {
          setData([
            {
              article_id: "0",
              title: "暂时还没有搜索内容",
              summary: "暂无内容",
              tags: [],
              update_time: Date.now(),
              country: "国家",
              views: "0",
            },
          ]);
        } else {
          setData(res.data);
        }
      }
    });
  };
  // useEffect(() => {});
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#FFF8F5",
        overflow: "auto",
      }}
    >
      <div style={{ height: "2vh" }}></div>
      <div className="location">美国</div>
      <div className="search-input">
        <input
          className="search-window"
          id="search"
          placeholder="还算好用的留学导航网站"
          onChange={() => searcChanged()}
        ></input>
      </div>
      <div className="sort-by">
        <div className="sort">最新</div>
        <div className="sort">浏览最多</div>
      </div>
      <div className="result-container">
        {data.map((item) => (
          <div
            key={item.article_id}
            className="card"
            onClick={() => handelClick(parseInt(item.article_id))}
          >
            <img className="card-img"></img>
            <div className="content-container">
              <div className="title">{item.title}</div>
              <div className="tags">
                {item.tags.map((tag) => (
                  <div className="tag">{tag}</div>
                ))}
              </div>
              <div className="content">{item.summary}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Searchpage;
