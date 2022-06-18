import "./Edit.css";
import MyEdit from "../conponents/MyEdit";
import { useState } from "react";
import axios from "axios";

function Edit() {
  const [html, setHtml] = useState("");
  const handle = (e) => {
    setHtml(e);
  };
  const getdata = () => {
    const data = {
      title: document.getElementById("title").value,
      summary: document.getElementById("summary").value,
      tags: document.getElementById("tags").value,
      country: document.getElementById("country").value,
      is_publish: document.getElementById("is_publish").value,
      body: html,
    };
    return data;
  };

  const submit = (e) => {
    const data = getdata();
    console.log(data);
    if (window.confirm("是否编写完成，点击确定提交")) {
      axios({
        method: "POST",
        url: "http://127.0.0.1:80/api/upload_article",
        data: data,
      }).then((res) => {
        if (res.data) {
          if (res.data === "saved") {
            window.location.reload();
          } else {
            alert("没有填写完");
          }
        }
      });
    } else return;
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#FFF8F5",
        overflow: "auto",
      }}
    >
      <div className="panel">
        <div className="nav-bar"></div>
        <div className="display-window">
          <div className="fillup-form">
            标题
            <input
              placeholder="输入标题"
              style={{ width: "300px", height: "30px" }}
              id="title"
            ></input>
            <br />
            简介
            <input
              placeholder="输入简介"
              style={{ width: "600px", height: "30px" }}
              id="summary"
            ></input>
            <br />
            标签
            <input
              placeholder="输入标签并且以“,”隔开"
              style={{ width: "300px", height: "30px" }}
              id="tags"
            ></input>
          </div>
          <div className="selection-form">
            <div>
              国家
              <select id="country">
                <option value={"美国"}>美国</option>
                <option value={"英国"}>英国</option>
                <option value={"加拿大"}>加拿大</option>
                <option value={"澳大利亚"}>澳大利亚</option>
              </select>
            </div>
            <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
              是否发布
              <select id="is_publish">
                <option value={1}>是</option>
                <option value={0}>否</option>
              </select>
            </div>
          </div>
          <MyEdit getMsg={handle} style={{ margin: "auto" }}></MyEdit>
          <button
            className="submitarticle"
            onClick={(e) => {
              submit(e);
            }}
          >
            上传
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
