import "./searchpage.css";
import { useSearchParams, useNavigate} from 'react-router-dom'
const mockdata = [
  {article_id: '2412',
    title: "title",
    content: "看待问题，这似乎是一种不可避免的事实。 在这种不可避免的冲突下",
    tags: ["留学", "生活", "吃饭"],
    img_url: "",
  },
  {
    article_id: '2412',
    title: "title",
    content: "看待问题，这似乎是一种不可避免的事实。 在这种不可避免的冲突下",
    tags: ["留学", "生活", "吃饭"],
    img_url: "",
  },
  {
    article_id: '2412',
    title: "title",
    content: "看待问题，这似乎是一种不可避免的事实。 在这种不可避免的冲突下",
    tags: ["留学", "生活", "吃饭"],
    img_url: "",
  },
  {
    article_id: '2412',
    title: "title",
    content: "看待问题，这似乎是一种不可避免的事实。 在这种不可避免的冲突下",
    tags: ["留学", "生活", "吃饭"],
    img_url: "",
  },
];
function Searchpage() {
  const navigate = useNavigate()
  const handelClick = (e) => {
    if (e) {
      navigate('/article', {
        article_id: e
      })

    } else return
    console.log(e);
  };
  return (
    <div
      style={{ height: "100vh", width: "100vw", backgroundColor: "#FFF8F5", overflow: "auto", }}
    >
      <div style={{ height: "2vh" }}></div>
      <div className="location">美国</div>
      <div className="search-input">
        <input
          className="search-window"
          placeholder="还算好用的留学导航网站"
        ></input>
      </div>
        <div className="sort-by">
            <div className="sort">最新</div>
            <div className="sort">浏览最多</div>
        </div>
      <div className="result-container">
        {mockdata.map((item) => (
          <div key={item.article_id} className="card" onClick={() => handelClick(parseInt(item.article_id))}>
            <img className="card-img"></img>
            <div className="content-container">
              <div className="title">{item.title}</div>
              <div className="tags">
                {item.tags.map((tag) => (
                  <div className="tag">{tag}</div>
                ))}
              </div>

              <div className="content">{item.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Searchpage;
