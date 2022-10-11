import { ListItemSecondaryAction } from '@mui/material';
import { useEffect, useState } from 'react'
export default function RecommendCard(props) {
    const toArticle = (article_id) => {
        navigate(`/article/${article_id}`);
        console.log("跳转到文章页-id: ", article_id);
    };
    const items = []
    return (
        <div>
            <div>{items.map(article_id) => (<div></div>)}</div>
        </div>
    )
}