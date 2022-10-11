import { ListItemSecondaryAction } from "@mui/material";
import { useEffect, useState } from "react";
export default function RecommendCard(props) {
  const { items } = props;
  const navigate = useNavigate();
  const toArticle = (article_id) => {
    navigate(`/article/${article_id}`);

    console.log("跳转到文章页-id: ", article_id);
  };

  return (
    <div>
      <div>
        {items.map((item) => (
          <div onClick={() => toArticle(item.article_id)}>item.title</div>
        ))}
      </div>
    </div>
  );
}
