import React, { useState, useEffect } from "react";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";

function MyEdit(props) {
  const [editor, setEditor] = useState(null); // 存储 editor 实例
  const [html, setHtml] = useState();
  const {getMsg} = props
  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    setTimeout(() => {
      setHtml();
    }, 1500);
  }, []);

  const toolbarConfig = {};
  const editorConfig = {
    placeholder: "请输入内容...",
  };

  // 及时销毁 editor
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  const htmlChanged = (editor) =>{
    setHtml(editor.getHtml())
    getMsg(editor.getHtml())
  }
  return (
    <>
        <div style={{zIndex: 100, width:'90%', margin:'auto'}}>
          <Toolbar
            editor={editor}
            defaultConfig={toolbarConfig}
            mode="default"
            style={{ borderBottom: "1px solid #ccc" }}
          />
          <Editor
            defaultConfig={editorConfig}
            value={html}
            onCreated={setEditor}
            onChange={(editor) => htmlChanged(editor)}
            mode="default"
            style={{ height: "400px"}}
          />
        </div>
    </>
  );
}

export default MyEdit;
