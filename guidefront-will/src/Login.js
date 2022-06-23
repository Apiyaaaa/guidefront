// import axios from "axios";
import { useState } from "react";
import { Alert, Fade } from "@mui/material";
import { useSearchParams, useNavigate} from 'react-router-dom'
function Login() {
  const [data, setData] = useState();
  const [showalert, setShowalert] = useState(false);
  const navigate = useNavigate()
  // const url = '/api/login'
  // const login = (url) => {
  //   axios.post(data).then(res=>{
  //     console.log()
  //     if (res.data.msg === 1) {
  //       console.log('good')
  //     } else {
  //       alert('啊 不对啊')
  //     }
  //   })
  // };
  const alert = <Alert severity="error">账号或密码错误</Alert>;
  const submit = () => {
    const data = {
      user_name: document.getElementById("user_name").value,
      password: document.getElementById("password").value,
    };
    console.log(data);
    setShowalert(true);
    setTimeout(() => {
      setShowalert(false);
    }, 500);
    
    
    navigate('/edit', {
      token:''
    }) //路由传参
    // login(data)
  };
  return (
    <div
      style={{
        backgroundColor: "#FFF8F5",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Fade
        style={{ width: "fit-content", position: "absolute", margin: "auto",left:'0px',right:'0px', top:'30%' }}
        in={showalert}
      >
        {alert}
      </Fade>
      <div style={{height:'10%'}}></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "690px",
          height: "480px",
          backgroundColor: "#E6DCD8",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "20px",
          boxShadow: "1px 3px 5px 1px #bfbab7",
        }}
      >
        <div style={{
          marginLeft:'70px',
          marginTop:'80px',
          fontSize:'32px',
        }}>留导航创作平台</div>
        <div
          style={{flexDirection:'column',
          display:'flex',
            marginTop: "70px",
            marginLeft: "70px",
          }}
        >
          <input
            style={{
              width: "270px",
              border: "none",
              borderBottom: "2px solid rgba(0, 0, 0, 0.5)",
              backgroundColor: "#E6DCD8",
            }}
            type={"text"}
            id={"user_name"}
            name={"user_name"}
            placeholder={"用户名"}
          ></input>
          <input
            style={{
              width: "270px",
              marginTop: "60px",
              border: "none",
              borderBottom: "2px solid rgba(0, 0, 0, 0.5)",
              backgroundColor: "#E6DCD8",
            }}
            type={"password"}
            id={"password"}
            name={"password"}
            placeholder={"密码"}
          ></input>
        </div>
        <button
          style={{
            width: "140px",
            height: "35px",
            marginTop: "40px",
            marginLeft: "130px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "F0E7E4",
            border: 'none',
            borderRadius: '10px',
            boxShadow: "0px 0px 3px 1px #bfbab7"
          }}
          onClick={submit}
        >
          登录
        </button>
      </div>
    </div>
  );
}

export default Login;
