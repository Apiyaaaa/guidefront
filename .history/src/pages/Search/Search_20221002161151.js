import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import styles from "./Search.module.css";
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import ArticleCard from "../../components/ArticleCard/ArticleCard";



function Search() {

  const [data, setData] = useState([]);//布局使用的文章数据
  const [origData, setOrigData] = useState([]);//未排序的数据
  const [totalResults, setTotalResults] = useState(0);//匹配文章数
  const [col1, setCol1] = useState([]);//布局第一列
  const [col2, setCol2] = useState([]);//布局第二列

  //接收search传参
  const [search, setSearch] = useSearchParams();
  let param;
  if (search.get('word')) {
    param = search.get('word');
  } else {
    param = '';
  }

  // 初始时，通过search传参加载页面
  const getArticle = (word) => {

    console.log('search params: ', word);


    axios({
      method: "GET",
      url: "api/api/search",
      params: {
        word: word,
      },
    }).then((res) => {
      console.log("res", res);
      if (res.data) {
        const resData = res.data.data;
        console.log("data: ",resData);

        if (resData.length === 0) {
          setData([
            {
              article_id: "0",
              title: `暂时没有相关内容 :(`,
              summary: "欢迎联系我们，提供反馈",
              tags: '暂无',
              update_time: '',
              country: "国家",
              views: "0",
            }
          ]);
        } else {

          const sortedJson = sortByViews(resData);
          setOrigData(sortedJson);
          setData(sortedJson);
        }
      } else {
        setData([
          {
            article_id: "0",
            title: "暂时没有相关搜索内容",
            summary: "联系我们",
            tags: [],
            update_time: Date.now(),
            country: "国家",
            views: "0",
          }
        ]);
      }
    });

  };

  //根据浏览量排序一个数组
  const sortByViews = (arr) => {
    const newArr = arr.slice().sort((a, b) => (a.views * 1 < b.views * 1 ? 1 : -1));
    return newArr;

  }

  //加载组件时搜索url带来的关键字
  useEffect(() => {
    getArticle(param);
  },[]);

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

  // 奇偶分离array，用作卡片排版
  const splitArray = (arr) => {
    const oddOnes = [],
      evenOnes = [];
    for (let i = 0; i < arr.length; i++)
      (i % 2 === 0 ? evenOnes : oddOnes).push(arr[i]);
    return [evenOnes, oddOnes];
  }





  return (
    <div className="mainContent">

      <div className={styles.main}>

        {/* 左侧功能栏 */}
        <SearchPanel data={data} setData={setData} origData={origData} getArticle={getArticle} setOrigData={setOrigData} recommends={recommends}/>

        {/* 右侧文章卡片区域 */}
        <div className={styles.displayPanel}>
          <div className={styles.totalResults}>共{totalResults}篇精选文章</div>
          <div className={styles.cardContainer}>

            {/* 使用props传参给文章卡片组件，col1col2排版 */}
            <div key={col1} className={styles.col1}>
              {col1.map((item) => {
                return <ArticleCard key={item.article_id} item={item} />;
              })}
            </div>

            <div className={styles.col2}>
              {col2.map((item) => {
              return <ArticleCard key={item.article_id} item={item} />;
            }

            )}</div>

          </div>
        </div>
      </div>
    </div>

  );
}




export default Search;
