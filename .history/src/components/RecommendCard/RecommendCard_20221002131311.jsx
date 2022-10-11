import { useEffect, useState } from 'react'
export default function RecommendCard(props) {
    const toArticle = (article_id) => {
        navigate(`/article/${article_id}`);
        console.log("跳转到文章页-id: ", article_id);
    };
    return 
}