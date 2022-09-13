import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { CSSTransition } from 'react-transition-group';

//引入四角图片
import topLeft from "../images/topleft.svg";
import topRight from "../images/topright.svg";
import bottomLeft from "../images/bottomLeft.svg";
import bottomRight from "../images/bottomRight.svg";



// 留导航首页组件
export default function Home() {

  //搜索放大效果
  const [zoom, setZoom] = useState(true);

  //使用navigate进行页面跳转
  const navigate = useNavigate();

  //使用React ref获取input搜索值，而不是真实DOM方法
  const myRef = useRef();

  // 搜索框 - 按钮搜索
  const hadelClick_search = () => {
    const w = myRef.current.value;

    //跳转搜索页，用state方式传参
    // navigate("/search", { state: { word: w } });

    //跳转搜索页，用search方式传参
    navigate(`/search?word=${w}`);
  };

  // 搜索框 - 回车搜索
  const handelKey = (e) => {
    console.log(e);
    if (e.keyCode === 13) {
      navigate(`/search?word=${myRef.current.value}`);

    }
  };






  // TODO 四角Tag - 跳转对应tag文章
  const tagClick = (e) => {
    const classNAME = e.currentTarget.getAttribute("data-info");
    // const underscore_pos = classNAME.indexOf('_');
    // const classN = classNAME.slice(underscore_pos+1);
    console.log(classNAME);//已成功
    // navigate("/get_article", { state: { article_id: classNAME } })

  }

  const transitionStyles = {
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
  };


  //组件Render值
  return (
    <div className={styles.mainPage}>

      {/* {四角标签推荐} */}
      <div className={`${styles.topLeft} ${styles.upDown}`}>
        <img src={topLeft} alt=""></img>
        <div className={styles.clickArea} onClick={tagClick} data-info='Choosing'></div>
      </div>
      <div className={`${styles.topRight} ${styles.upDown}`}>
        <img src={topRight} alt=""></img>
        <div className={styles.clickArea} onClick={tagClick} data-info='Applying'></div>

      </div>
      <div className={`${styles.bottomLeft} ${styles.upDown}`}>
        <img src={bottomLeft} alt=""></img>
        <div className={styles.clickArea} onClick={tagClick} data-info='Studying'></div>

      </div>
      <div className={`${styles.bottomRight} ${styles.upDown}`}>
        <img src={bottomRight} alt=""></img>
        <div className={styles.clickArea} onClick={tagClick} data-info='Graduating'></div>

      </div>

      {/* {中间Logo与搜索框} */}
      <div className={styles.center}>
        <div className={styles.header}>
          <div className={styles.title}>留导航</div>
          <div className={styles.country}>美国</div>
        </div>
        
          <div className={styles.inputWindow}>

            <input
              id="search"
              type="text"
              className={styles.search}
              placeholder="还算好用的留学导航网站"
              onKeyUp={(e) => handelKey(e)}
              ref={myRef}
            ></input>



            <button className={styles.iconButton} onClick={hadelClick_search}>
              <SearchIcon className={styles.searchIcon}></SearchIcon>
            </button>
          </div>
       
      </div>
    </div>


  );
}

