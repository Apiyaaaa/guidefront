import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Search.module.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useLocation, useNavigate } from "react-router-dom";
function Search() {
  const [data, setData] = useState([]);
  const [oriData, setOriData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [area, setArea] = useState("美国");
  const [selectedTags, setSelectedTags] = useState();
  //TODO 主页传参
  const location = useLocation();
  const param = location.state.word;
  const searcChanged = () => {
    const word = document.getElementById("search").value;
    console.log(word);
    setTimeout(() => getArticle(word), 1000);
  };
  const navigate = useNavigate();
  const getArticle = (word) => {
    axios({
      method: "GET",
      url: "api/api/search_article",
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
              title: "暂时没有相关搜索内容",
              summary: "联系我们",
              tags: [],
              update_time: Date.now(),
              country: "国家",
              views: "0",
            },
          ]);
        } else {
          setData(res.data);
          setOriData(res.data);
        }
      }
    });
  };
  const tags = [
    "买车",
    "签证",
    "毕业",
    "选校",
    "吃饭",
    "租房",
    "申请",
    "考试",
    "生活",
    "机票",
    "报警",
    "做饭",
  ];
  const mostViews = () => {
    //todo
    const newData = data.sort((a, b) => (a.views < b.views ? 1 : -1));
    setData(newData);
    console.log("以浏览量排列");
  };
  const newest = () => {
    //todo
    const newData = data.sort((a, b) =>
      a.update_time < b.update_time ? 1 : -1
    );
    setData(newData);
    console.log("以发布时间排列", data);
  };
  const sortByTag = (tag) => {
    //todo 改成多选
    setSelectedTags(tag);
    if (tag === selectedTags) {
      setSelectedTags();
      setData(oriData);
      console.log(oriData, "??");
    } else {
      const newData = data.filter((item) => item.tags.includes(tag));
      console.log(newData);
      setData(newData);
    }

    console.log("只显示标签", tag, selectedTags);
  };
  const toArticle = (e) => {
    navigate("/article", { state: { article_id: e } });
    console.log("跳转到文章页", e);
  };

  useEffect(() => {
    setTotalResults(data.length);
  }, [data]);
  useEffect(() => {
    getArticle(param)
  }, []);
  return (
    <div className="mainContent">
      <div className={styles.page}>
        <div className={styles.topHolder}></div>
        <div className={styles.main}>
          <div className={styles.searchPanel}>
            <div className={styles.header}>
              <div className={styles.resulTitle}>搜索结果</div>
              <div className={styles.country}>{area}</div>
            </div>
            <div>
              <input
                className={styles.inputWindow}
                id="search"
                placeholder="有点好用的留学导航"
                onChange={() => searcChanged()}
              ></input>
            </div>
            <div>
              <div className={styles.sortTitle}>排列方式</div>
              <div className={styles.sortMethod}>
                <button onClick={() => mostViews()}>浏览最多</button>
                <button onClick={() => newest()}>最新</button>
              </div>
            </div>
            <div className={styles.sortByTags}>
              标签
              <div className={styles.tagCard}>
                {tags.map((item) => (
                  <button
                    className={selectedTags === item ? styles.active : ""}
                    onClick={() => sortByTag(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.ad}>超级广告</div>
          </div>
          <div className={styles.displayPanel}>
            <div className={styles.totalResults}>共{totalResults}条</div>
            <div className={styles.cardContainer}>
              {data.map((item) => (
                <div
                  className={styles.card}
                  onClick={() => toArticle(item.article_id)}
                >
                  <div className={styles.cardContent}>
                    <div className={styles.cardTop}>
                      <div className={styles.user}>{item.user}</div>
                      <div className={styles.postTime}>{item.update_time}</div>
                    </div>
                    <div className={styles.title}>{item.title}</div>
                    <div className={styles.tagContainer}>
                      {item.tags.map((tag) => (
                        <div className={styles.tag}>{"#" + tag}</div>
                      ))}
                      <div className={styles.views}>
                        <RemoveRedEyeIcon fontSize="10px" />
                        {" " + item.views}
                      </div>
                    </div>
                    <div className={styles.summary}>{item.summary}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
