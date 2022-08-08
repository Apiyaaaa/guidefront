import styles from "./Article.module.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

function Article() {
  const { state } = useLocation();
  const article_id = 2;
  const [data, setData] = useState({
    article_id: "2412",
    title: "文章标题",
    user: "留导航",
    content:
      "看待问题，这似乎是一种不可避免的事实。 在这种不可避免的冲突下看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题",
    tags: ["留学", "生活", "吃饭"],
    updated_time: "2022/12/22",
    views: 300,
    summary:
      "看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题",
  });
  const getArticle = (article_id) => {
    axios({
      method: "GET",
      url: "api/api/get_article",
      params: {
        article_id: article_id,
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
              body: "暂无内容",
              tags: [],
              update_time: Date.now(),
              country: "国家",
              views: "0",
            },
          ]);
        } else {
          setData(res.data);
          console.log(res.data);
        }
      }
    });
  };
  useEffect(() => {
    getArticle(article_id);
  }, []);
  const tables = [];
  const catalog = () => {
    const raw_article = String(data.body);
    const articleContent = raw_article.replace(
      /<(h\d)>.*?<\/h\d>/g,
      (match, tag) => {
        const hash = match.replace(/<.*?>/g, "");
        tables.push({ hash, tag });
        return `<div class="blog-content-anchor" href="#${hash}" id="${hash}">${match}</div>`;
      }
    );
    console.log(tables);
    console.log(articleContent);
    return articleContent;
  };
  const scrollTo = (item) => {
    console.log(item);
    const element = document.getElementById(String(item.hash));
    element.scrollIntoView({ behavior: "smooth" });
  };
  const anchorArticle = catalog();
  return (
    <div className="mainContent">
      <div className={styles.article}>
        <div className={styles.leftToc}>
          <div className={styles.cataTitle}>目录</div>
          {tables.map((item) => (
            <div
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
                <RemoveRedEyeIcon fontSize="14px" />
                {" " + data.views}
              </div>
            </div>
            <div className={styles.title}>{data.title}</div>
            <div className={styles.detailBar}>
              {data.tags.map((tag) => (
                <div className={styles.tag}>#{tag}</div>
              ))}
              <div className={styles.updatedTime}>{data.updated_time}</div>
            </div>
            <div className={styles.summary}>{data.summary}</div>
            <div className="content">
              <div
                dangerouslySetInnerHTML={{
                  __html: anchorArticle,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
