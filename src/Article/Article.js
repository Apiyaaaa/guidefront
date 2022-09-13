import styles from "./Article.module.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";


function Article() {

  //接受传递的param参数，根据文章id标记
  const { article_id } = useParams();
  const navigate = useNavigate()

  // 因为Function Component的Hook中没有ComponentWillMount生命周期，
  // 在执行初始化hook（getArticle）前需要先有伪数据占位，避免第一次render时data为undefiend导致报错
  const [data, setData] = useState({
    article_id: "2412",
    title: "PLACEHOLDER",
    user: "留导航",
    body:
      "<h2>PLACEHOLDER</h2>PLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDER",
    tags: "PLACEHOLDER,PLACEHOLDER",
    updated_time: "PLACEHOLDER",
    views: 100,
    summary:
      "PLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDER"
  });

  //根据文章ID，从后端调取文章全文
  const getArticle = (article_id) => {
    console.log("显示文章，ID为", article_id);

    // setData({
    //   article_id: "2412",
    //   title: "文章标题文章标题文章标题文章标题文章标题",
    //   user: "留导航",
    //   body:
    //     `<h2> 看待问题，这似乎是一种不可避免的事实。</h2>  
    //     在这种不可避免的冲突下看待问题看待问题看待问题看待问题看
    //     待问题看待问题看待问题看题看待问题看待问题看待问题看待问题看待问题看
    //     待问题看待问题看待问题看待问题看待问题看待问题看待问题看
    //     待问题看待问题待问题看待问题看待问题看待问题看
    //     待问题看待问题看待问题看待问题看待问题看待问题看待问题看
    //     待问题看待问题
        
    //     <h2>在这种不可避免的冲突下看待问题</h2>
    //     在这种不可避免的冲突下看待问题看待问题看待问题看待问题看
    //     待问题看待问题看待问题看待问题看待问题看待问题看待问题看
    //     待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看
    //     待问题看待问题看待问题看待问题看待问题看待问题看待问题看
    //     待问题看待问题题看待问题看待问题看待问题看待问题看待问题看
    //     待问题看待问题看待问题看待问题看待问题看待问题看待问题看
    //     待问题看待问题题看待问题看待问题看待问题看待问题看
    //     待问题看待问题看待问题看待问题看待问题看待问题看待问题看
    //     待问题看待问题

    //     <h2>看待问题</h2>
    //     在这种不可避免的冲突下看待问题看待问题看待问题看待问题看
    //     待问题看待问题题看待问题看待问题看待问题看待问题看待问题看
    //     待问题看待问题看待题看待问题看待问题看待问题看待问题看待问题看
    //     待问题看待问题看待问题看待问题看待问题看待问题看待问题看
    //     待问题看待问题问题看待问题看待问题看待问题看待问题看
    //     待问题看待问题看待问题看待问题看待问题看待问题看待问题看
    //     待问题看待问

    //     <h2>冲突下看待问题</h2>
    //     在这种不可避免的冲突下看待问题看待问题看待问题看待问题看
    //     待问题看待问题题看待问题看待问题看待问题看待问题看待问题看
    //     待问题看待问题看待问题看待问题看待问题看待问题看待问题看
    //     待问题看待问题看待问题看待问题看待问题看待问题看待问题看
    //     待问题看待问
    //     `,
    //   tags: ["留学", "生活", "吃饭"],
    //   updated_time: "2022/12/22",
    //   views: 300,
    //   summary:
    //     "看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题看待问题"
    // });

    axios({
      method: "GET",
      url: "/api/api/article",
      params: {
        article_id: article_id,
      },
    }).then((res) => {
      console.log("Article res",res) ;
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
          console.log('article DATA',res.data.data);
          setData(res.data.data);
          
        }
      }
    });
  };

  //根据param传参获取文章
  useEffect(() => {
    getArticle(article_id);
  }, []);


  const tables = [];

  //摘取h？标签,作为目录栏导航
  const catalog = () => {
    const raw_article = String(data.body);
    const articleContent = raw_article.replace(
      /<(h\d).*?>.*?<\/h\d>/g,
      (match, tag) => {
        console.log('match',match);
        const hash = match.replace(/<.*?>/g, "");
        tables.push({ hash, tag });
        return `<div class="blog-content-anchor" href="#${hash}" id="${hash}">${match}</div>`;
      }
    );
    // console.log('table', tables);
    // console.log('articleContent', articleContent);
    return articleContent;
  };
  
  const scrollTo = (item) => {
    console.log(item);
    const element = document.getElementById(String(item.hash));
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - 160;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
    // scrollTo_ext({
    //   top: 200,
    //   behavior: "smooth"
    // });

    


    // let dims = element.getBoundingClientRect();
    // window.scrollTo(window.scrollX, dims.top - 50);
    //window.scrollTo(0, element.offsetTop - window.innerHeight / 2);
  };

  //   function scrollToTargetAdjusted(){
  //     var element = document.getElementById('targetElement');
  //     var headerOffset = 45;
  //     var elementPosition = element.getBoundingClientRect().top;
  //     var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  //     window.scrollTo({
  //          top: offsetPosition,
  //          behavior: "smooth"
  //     });
  // }

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
              {data.tags.split('，').map((tag) => (
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
