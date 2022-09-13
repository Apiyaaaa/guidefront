import React from 'react'
import { useEffect, useState } from 'react'
import {  useNavigate } from "react-router-dom";
import { nanoid } from 'nanoid';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import styles from './ArticleCard.module.css'

export default function ArticleCard(props) {

    const { item } = props;

    const navigate = useNavigate();

    //点击文章卡片事件
    const toArticle = (article_id) => {
        navigate(`/article/${article_id}`);
        console.log("跳转到文章页-id: ", article_id);
    };

    return (
        <div 
            className={styles.card}
            onClick={() => toArticle(item.article_id)}>
            <div className={styles.cardContent}>

                <div className={styles.cardTop}>
                    <div className={styles.user}>{item.user}</div>
                    <div className={styles.postTime}>{item.update_time.slice(0,10)}</div>
                </div>

                <div className={styles.title}>{item.title}</div>

                <div className={styles.tagContainer}>
                    {item.tags.split('，').map((tag) => (
                        <div className={styles.tagCard} key = {nanoid()}>{"#" + tag}</div>
                    ))}
                    <div className={styles.views}>
                        <RemoveRedEyeIcon fontSize="14px" className={styles.RemoveRedEyeIcon} />
                        {" " + item.views}
                    </div>
                </div>

                <div className={styles.summary}>{item.summary}</div>
            </div>
        </div>
    )
}
