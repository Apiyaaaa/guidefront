import "./Home.css";
function Home() {
  const hadelClick = (tags) => {
    console.log(tags);
  };
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#FFF8F5",
        overflow: "hidden",
      }}
    >
      <div style={{ height: "2vh" }}></div>
      <div className="location">美国</div>

      <div className="search-input">
        <input
          className="search-window"
          placeholder="还算好用的留学导航网站"
        ></input>
      </div>

      <div className="main-cate">
        <div className="cate one" onClick={() => hadelClick("prepare")}>
          <a href="javascript:;#">留学准备</a>
        </div>
        <div className="cate two" onClick={() => hadelClick("prepare")}>
          <a href="javascript:;">初入大学</a>
        </div>
        <div className="cate three" onClick={() => hadelClick("prepare")}>
          <a href="javascript:;">大学生活</a>
        </div>
        <div className="cate four" onClick={() => hadelClick("prepare")}>
          <a href="javascript:;">职业生涯</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
