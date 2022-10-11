import styles from "./Article.module.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { nanoid } from 'nanoid'
impport 


function Article() {

  //接受传递的param参数，根据文章id标记
  const { article_id } = useParams();
  const navigate = useNavigate();

  // 因为Function Component的Hook中没有ComponentWillMount生命周期，
  // 在执行初始化hook（getArticle）前需要先有伪数据占位，避免第一次render时data为undefiend导致报错
  const [data, setData] = useState({
    article_id: "",
    title: "",
    user: "",
    body:"", 
    tags: "",
    updated_time: "",
    views: 0,
    summary:
      ""
  });
  const recommend = [{article_id:1, title:'母猪上树'},{article_id:2, title:'公猪上树'}]

  //根据文章ID，从后端调取文章全文
  const getArticle = (article_id) => {

    console.log("显示文章，ID为", article_id);
    //判断是否为Session内第一次浏览文章
    let isFirstView = false;
    if (isFirstSessionView(article_id)) {
      isFirstView = true;
    }
    console.log("SESSION viewed:", sessionStorage.getItem("viewed"));

    //获取文章详情,设置是否增加浏览量
    axios({
      method: "GET",
      url: "/api/api/article",
      params: {
        article_id: article_id,
        isFirstView: isFirstView,
      },
    }).then((res) => {
      console.log("Article res", res);
      if (res.data) {
        if (res.data.data.length === 0) {
          setData([
            {
              article_id: "0",
              title: "出错啦！请稍后再试或联系我们",
              summary: "暂无内容",
              body: "暂无内容",
              tags: "暂无",
              update_time: Date.now(),
              country: "国家",
              views: "0",
            },
          ]);
        } else {
          setData(res.data.data);

        }
      }
    });
  };

  //根据param传参获取文章
  useEffect(() => {
    getArticle(article_id);

  }, []);


  function isFirstSessionView(article_id) {

    
    if (!sessionStorage.getItem("viewed")) {

      sessionStorage.setItem("viewed", `${article_id}`);
      return true;

    } else {

      const curr = sessionStorage.getItem("viewed");
      if (curr.split(',').find(ele => ele === article_id) !== undefined) {
        return false;
      } else {
        sessionStorage.setItem("viewed", `${curr},${article_id}`);
        return true;
      }

    }
  }


  const tables = [];

  //摘取h？标签,作为目录栏导航
  const catalog = () => {
    const raw_article = String(data.body);
    const articleContent = raw_article.replace(
      /<(h\d).*?>.*?<\/h\d>/g,
      (match, tag) => {
        const hash = match.replace(/<.*?>/g, "");
        tables.push({ hash, tag });
        return `<div class="blog-content-anchor" href="#${hash}" id="${hash}">${match}</div>`;
      }
    );
    return articleContent;
  };

  //点击标题滚动文章
  const scrollTo = (item) => {
    console.log(item);
    const element = document.getElementById(String(item.hash));
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - 160;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  };

  const anchorArticle = catalog();


  return (
    <div className="mainContent">
      <div className={styles.background}>
      </div>

      <div className={styles.article}>
        <div className={styles.leftToc}>
          <div className={styles.backIcon} onClick={() => navigate(-1)}></div>
          <div className={styles.cataTitle}>目录</div>
          {tables.map((item) => (
            <div
              key={nanoid()}
              className={
                item.tag === "h1" ? styles.bigTitle : styles.smallTitle
              }
              onClick={() => scrollTo(item)}
            >
              {item.hash}
            </div>
          ))}
        </div>


        <div className={styles.articleBody}>

          <div className={styles.articleContent}>
            <div className={styles.header}>
              <div className={styles.user}>{data.user}</div>
              <div className={styles.views}>
                <RemoveRedEyeIcon fontSize="16px" className={styles.RemoveRedEyeIcon} />
                {" " + data.views}
              </div>
            </div>

            <h1 className={styles.title}>{data.title}</h1>
            <div className={styles.detailBar}>
              {data.tags.split('/').map((tag) => (
                <div className={styles.tag}>#{tag}</div>
              ))}
              <div className={styles.updatedTime}>{data.updated_time}</div>
            </div>

            <div className={styles.summary}>{data.summary}</div>
            <div >
              <div className={styles.content}
                dangerouslySetInnerHTML={{
                  __html: anchorArticle,
                }}
              ></div>
            </div>
          </div>
          
        </div>
      </div>
    </div>


  );
}

export default Article;
