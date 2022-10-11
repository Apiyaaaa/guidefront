import { ListItemSecondaryAction } from "@mui/material";
import { useEffect, useState } from "react";
import styles from './RecommendCard.module.css'
import { useNavigate } from "react-router-dom";
export default function RecommendCard(props) {
  const { recommends } = props;
  const navigate = useNavigate();
  const toArticle = (article_id) => {
    navigate(`/article/${article_id}`);
    console.log("跳转到文章页-id: ", article_id);
  };

  return (
    <div style={styles.recommendCard}>
      推荐文章
      <div style={styles.recommendItems}>
        {recommends.map((item) => (
          <div style={styles.recommendItem} onClick={() => toArticle(item.article_id)}>item.title</div>
        ))}
      </div>
    </div>
  );
}
