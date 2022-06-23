const {createProxyMiddleware}=require('http-proxy-middleware')

module.exports=function (app){
    console.log(app)
    app.use(createProxyMiddleware('/api',{
            target:"http://localhost:80",
            changeOrigin:true,
            pathRewrite:{'^/api':''}
        })

    )
}