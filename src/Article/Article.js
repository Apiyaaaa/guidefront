import "./Article.css";
import {useSearchParams} from 'react-router-dom'
function Article() {

  const [searchParams, setSearchParams] = useSearchParams();
  const mockdata = {
    article_id: "2412",
    title: "文章标题",
    content: "看待问题，这似乎是一种不可避免的事实。 在这种不可避免的冲突下",
    tags: ["留学", "生活", "吃饭"],
    updated_time: "2022/12/22",
    img_url: "",
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#FFF8F5",
        overflow: "hidden",
        display:'flex',
        flexDirection:'column'
      }}
    >
      <div className="article-nav"></div>
      <div className="article-body">
        <div className="head">
          <div className="article-title">{mockdata.title}</div>
          <div className="time">{mockdata.updated_time}</div>
        </div>
        <div className="content">{mockdata.content}</div>
      </div>
    </div>
  );
}

export default Article;
