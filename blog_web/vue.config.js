module.exports = {

  devServer: {
    // 跨域代理
    proxy: {
      '/web': {
        target: 'http://127.0.0.1:7001',    //后台接口域名
        changeOrigin: true,    //是否跨域
        // ws: true,    //如果要代理 websockets，配置这个参数
        pathRewrite: {
          '^/web': '/web'
        }
      }
    }
  }
}