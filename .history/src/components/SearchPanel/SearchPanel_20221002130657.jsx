import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom";
import { nanoid } from 'nanoid';
import styles from './SearchPanel.module.css'
import axios from 'axios';



export default function SearchPanel(props) {
    const { data, setData, origData, getArticle } = props; //布局使用的文章数据，未排序的数据
    const navigate = useNavigate();

    const [area, setArea] = useState("美国");//未来需要接收area参数
    const [selectedTags, setSelectedTags] = useState([]);//被选择的标签们
    const [mostViewsClicked, setMostviewsClicked] = useState(true); //浏览最多排序状态
    const [newestClicked, setNewestClicked] = useState(false); //最新排序状态
    const [tags, setTags] = useState([]); //最新排序状态




    //搜索框
    //左侧搜索框查找（无按钮）
    const [search, setSearch] = useSearchParams();
    const searchChanged = () => {
        const word = document.getElementById("search").value;
        //更改search参数，同步搜索框url
        setTimeout(() => { setSearch(`word=${word}`); getArticle(word) }, 1000);
    };


    //排序
    //根据浏览量排序一个数组
    const sortByViews = (arr) => {
        const newArr = arr.slice().sort((a, b) => (a.views * 1 < b.views * 1 ? 1 : -1));
        return newArr;

    }
    //“浏览最多”点击事件
    const mostViews = () => {
        if (!mostViewsClicked) {
            const newData = sortByViews(data);
            setData(newData);
            console.log("以浏览量排列", newData);
            setMostviewsClicked(true);
            setNewestClicked(false);
        }

    }
    //根据时间排序一个数组
    const sortByNewest = (arr) => {
        const newArr = arr.slice().sort((a, b) => a.update_time < b.update_time ? 1 : -1);
        return newArr;
    }
    //“最新”点击事件
    const newest = () => {
        if (!newestClicked) {
            const newData = sortByNewest(data);
            setData(newData);
            console.log("以最新排列", newData);
            setNewestClicked(true);
            setMostviewsClicked(false);
        }
    };



    //筛选
    //标签筛选事件,设置已筛选标签
    const sortByTag = (tag) => {

        //判断tag是否已被选择，并更新State数列（已选择标签）
        if (selectedTags.includes(tag)) {
            const newSelectedTags = [...selectedTags.filter((t) => t !== tag)];
            setSelectedTags(newSelectedTags);
            console.log(`减去标签：${tag},当前标签：${newSelectedTags}`);

        } else {
            const newSelectedTags = [tag, ...selectedTags];
            setSelectedTags(newSelectedTags);
            console.log(`增加标签：${tag},当前标签：${newSelectedTags}`);

        }
    };
    //辅助函数-判断t标签是否已被选择
    const inSelectedTags = (t) => { return selectedTags.includes(t) };

    //筛选事件执行函数-监听selectedTags
    const filterDataByTags = () => {

        //无筛选条件时，根据排序方式还原展示data为原始数据
        if (selectedTags.length === 0) {
            if (mostViewsClicked) {
                setData(origData);
            } else {
                setData(sortByNewest(origData));
            }

        }
        else {
            //根据标签筛选展示data中的文章
            let result = origData.filter((article) => {
                const tagArr = article.tags.split('/');
                let matchCount = 0;

                for (let i = 0; i < tagArr.length; i++) {
                    if (inSelectedTags(tagArr[i])) {
                        matchCount+=1;
                    }
                }
                return matchCount === selectedTags.length;
            });

            //更新时，保证排列方式不变
            if (newestClicked) {
                result = sortByNewest(result);
            }
            const newData = [...result];
            setData(newData);

        }

    }

    //筛选更新时，重新筛选
    useEffect(() => {
        filterDataByTags();
    }, [selectedTags])

    useEffect(() => {
        //获取标签
        axios.get('api/api/get_tags').then(
            (res) => {
                //console.log('TAGS',res)
                if (res.data) {
                    let tags = res.data.data;
                    tags = tags.sort((a,b)=>a.tag_name.length - b.tag_name.length)
                    setTags(tags);
                }
            }
        )

    }, [])


    return (
        <div className={styles.searchPanel}>
            {/* 左侧功能栏 */}

            <div className={styles.backIcon} onClick={() => navigate(-1)}></div>
            <div className={styles.header}>
                <div className={styles.resulTitle} onClick={() => navigate("/")}>留导航</div>
                <div className={styles.country}>{area}</div>
            </div>

            {/* 搜索框 */}
            <div>
                <input
                    className={styles.inputWindow}
                    id="search"
                    placeholder="搜索关键词"
                    onChange={() => searchChanged()}
                ></input>
            </div>

            {/* 排列方式 */}
            <div>
                <div className={styles.leftTitle}>排列方式</div>
                <div className={styles.sortMethod}>
                    <button
                        className={`${mostViewsClicked ? styles.active : ''} ${styles.tag}`}
                        onClick={() => mostViews()}>浏览最多</button>
                    <button
                        className={`${newestClicked ? styles.active : ''} ${styles.tag}`}
                        onClick={() => newest()}>最新</button>
                </div>
            </div>

            {/* 标签筛选 */}
            <div>
                <div className={styles.leftTitle}>标签</div>
                <div className={styles.tags}>
                    {tags.map((item) => (
                        <button key={nanoid()}
                            className={`${selectedTags.includes(item.tag_name) ? styles.active : ""} ${styles.tag}`}
                            onClick={() => sortByTag(item.tag_name)}
                        >
                            {item.tag_name}
                        </button>
                    ))}
                </div>
            </div>
            {//差个}
            <div className={styles.ad}>超级广告</div>
        </div>
    )
}