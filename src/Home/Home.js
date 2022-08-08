import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../planet.svg";
function Home() {
  const hadelClick = (tags) => {
    console.log(tags);
  };

  const navigate = useNavigate();
  const handelKey = (e) => {
    console.log(e);
    if (e.keyCode === 13) {
      const w = document.getElementById("search").value;
      navigate("/search", { state: { word: w } });
      console.log(w);
    }
  };

  return (
    <div className={styles.mainPage}>
      <div className={styles.round}>
        <div className={styles.topLeft}>
          <div>#申请</div>
          <img src={Logo} alt=""></img>
        </div>
        <div className={styles.topRight}>
          <div>#本科</div>
          <img src={Logo} alt=""></img>
        </div>
        <div className={styles.bottomLeft}>
        <div>#毕业</div>
          <img src={Logo} alt=""></img>
        </div>
        <div className={styles.bottomRight}>
        <div>#研究生</div>
          <img src={Logo} alt=""></img>
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.header}>
          <div className={styles.title}>留导航</div>
          <div className={styles.country}>美国</div>
        </div>
        <div className={styles.inputWindow}>
          <input
            id="search"
            className={styles.search}
            placeholder="还算好用的留学导航网站"
            onKeyUp={(e) => handelKey(e)}
          ></input>
          <button className={styles.iconButton}>
            <SearchIcon className={styles.searchIcon}></SearchIcon>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
