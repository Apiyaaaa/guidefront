import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Search.module.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useSearchParams, useNavigate } from "react-router-dom";
import myJson from './mockData.json';//MOCKDATA
import SearchPanel from "../components/SearchPanel/SearchPanel";

function Search() {
  
  const navigate = useNavigate();
  const [data, setData] = useState([]);//布局使用的文章数据
  const [origData, setOrigData] = useState([]);//未排序的数据
  const [totalResults, setTotalResults] = useState(0);//匹配文章数
  const [area, setArea] = useState("美国");
  const [selectedTags, setSelectedTags] = useState([]);//被选择的标签们
  const [col1, setCol1] = useState([]);//布局第一列
  const [col2, setCol2] = useState([]);//布局第二列
  const [mostViewsClicked, setMostviewsClicked] = useState(true); //浏览最多排序状态
  const [newestClicked, setNewestClicked] = useState(false); //最新排序状态
  //主页传参
  const [search, setSearch] = useSearchParams();
  let param;
  if (search.get('word')) {
    param = search.get('word');
  } else {
    param = '';
  }

  //左侧搜索框查找（无按钮）
  const searchChanged = () => {
    const word = document.getElementById("search").value;
    console.log('左侧搜索框查找：', word);
    //更改search参数，实现同步查找
    setTimeout(() => setSearch(`word=${word}`), 1000);
  };

  // 初始根据search传参加载页面
  const getArticle = (word) => {

    console.log('search params: ', word);
    const sortedJson = sortByViews(myJson);
    setOrigData(sortedJson);
    setData(sortedJson);

    // axios({
    //   method: "GET",
    //   url: "api/api/article",
    //   params: {
    //     word: word,
    //   },
    // }).then((res) => {
    //   console.log("res", res);
    //   if (res.data) {
    //     if (res.data == "nodata") {
    //       setData([
    //         {
    //           article_id: "0",
    //           title: "暂时没有相关搜索内容",
    //           summary: "联系我们",
    //           tags: [],
    //           update_time: Date.now(),
    //           country: "国家",
    //           views: "0",
    //         }
    //       ]);
    //     } else {
    //       setData(res.data);
    //       setOriData(res.data);
    //     }
    //   } else{
    //     setData([

    //     ]);

    //     const arr = splitArray(data);
    //       setCol1(arr[0]);
    //       setCol2(arr[1]);
    //   }
    // });

  };

  const tags = [
    "毕业",
    "签证",
    "研究生",
    "选校",
    "吃饭",
    "租啊房",
    "申请",
    "考试",
    "生啊活",
    "机票",
    "报警",
    "做嗷嗷饭"
  ];

  //根据浏览量排序一个数组
  const sortByViews = (arr) => {
    const newArr = arr.slice().sort((a, b) => (a.views * 1 < b.views * 1 ? 1 : -1));
    return newArr;

  }
  //“浏览最多”点击事件
  const mostViews = () => {
    if (!mostViewsClicked) {
      const newData = sortByViews(data);
      setData(newData);
      console.log("以浏览量排列", newData);
      setMostviewsClicked(true);
      setNewestClicked(false);
    }

  };

  //根据时间排序一个数组
  const sortByNewest = (arr) => {
    const newArr = arr.slice().sort((a, b) => a.update_time < b.update_time ? 1 : -1);
    return newArr;
  }
  //“最新”点击事件
  const newest = () => {
    if (!newestClicked) {
      const newData = sortByNewest(data);
      setData(newData);
      console.log("以最新排列", newData);
      setNewestClicked(true);
      setMostviewsClicked(false);
    }
  };

  //标签筛选事件
  const sortByTag = (tag) => {

    //判断tag是否已被选择，并更新State数列（已选择标签）
    if (selectedTags.includes(tag)) {
      const newSelectedTags = [...selectedTags.filter((t) => t !== tag)];
      setSelectedTags(newSelectedTags);
      console.log(`减去标签：${tag},当前标签：${newSelectedTags}`);

    } else {
      const newSelectedTags = [tag, ...selectedTags];
      setSelectedTags(newSelectedTags);
      console.log(`增加标签：${tag},当前标签：${newSelectedTags}`);

    }
  };
  //辅助函数-判断t标签是否已被选择
  const inSelectedTags = (t) => { return selectedTags.includes(t) };

  //筛选事件执行函数-监听selectedTags
  const filterDataByTags = () => {

    //无筛选条件时，根据排序方式还原展示data为原始数据
    if (selectedTags.length === 0) {
      if (mostViewsClicked) {
        setData(origData);
      } else {
        setData(sortByNewest(origData));
      }

    }
    else {
      //根据标签筛选展示data中的文章
      let result = origData.filter((article) => {

        for (let i = 0; i < article.tags.length; i++) {
          if (inSelectedTags(article.tags[i])) {
            return true;
          }
        }
        return false;
      });

      //更新时，保证排列方式不变
      if (newestClicked) {
        result = sortByNewest(result);
      }

      const newData = [...result];
      setData(newData);

    }

  }

  //点击文章卡片事件
  const toArticle = (article_id) => {
    navigate(`/article/${article_id}`);
    console.log("跳转到文章页-id: ", article_id);
  };



  // 筛选标签更新时，更新展示的data
  useEffect(() => {
    filterDataByTags();
  }, [selectedTags]);

  //加载组件时搜索url参数
  useEffect(() => {
    getArticle(param);
    //sortByViews();
  }, []);

  //data更新时刷新总匹配数
  useEffect(() => {
    setTotalResults(data.length);
  }, [data]);


  //data更新时更新col1，col2排版
  useEffect(() => {
    const arr = splitArray(data);
    setCol1(arr[0]);
    setCol2(arr[1]);
  }, [data]);





  return (
    <div className="mainContent">

      <div className={styles.main}>

        {/* 左侧功能栏 */}
        <SearchPanel/>


        {/* 右侧文章卡片 */}
        <div className={styles.displayPanel}>
          <div className={styles.totalResults}>共{totalResults}篇精选文章</div>
          <div className={styles.cardContainer}>

            <div key={col1} className={styles.col1}>{col1.map((item) => (
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
                      <div className={styles.tagCard}>{"#" + tag}</div>
                    ))}
                    <div className={styles.views}>
                      <RemoveRedEyeIcon fontSize="14px" className={styles.RemoveRedEyeIcon} />
                      {" " + item.views}
                    </div>
                  </div>

                  <div className={styles.summary}>{item.summary}</div>
                </div>
              </div>
            ))}</div>


            <div className={styles.col2}>{col2.map((item) => (
              <div
                className={styles.card} key={item.article_id}
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
                      <div className={styles.tagCard}>{"#" + tag}</div>
                    ))}
                    <div className={styles.views}>
                      <RemoveRedEyeIcon fontSize="14px" className={styles.RemoveRedEyeIcon} />
                      <span>{" " + item.views}</span>
                    </div>
                  </div>
                  <div className={styles.summary}>{item.summary}</div>
                </div>
              </div>
            ))}</div>

          </div>
        </div>
      </div>
    </div>

  );
}

// 奇偶分离array，用作卡片排版
function splitArray(arr) {
  const oddOnes = [],
    evenOnes = [];
  for (let i = 0; i < arr.length; i++)
    (i % 2 === 0 ? evenOnes : oddOnes).push(arr[i]);
  return [evenOnes, oddOnes];
}


export default Search;
