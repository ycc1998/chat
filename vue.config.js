const LinkAddress = "https://chat.yan168.cn/";


module.exports = {
  lintOnSave: true,
 
  devServer: {
    proxy: {
      '/sign': {
        target: LinkAddress+'sign',   //代理接口
        pathRewrite: {
          '^/sign': ''    //代理的路径
        }
      },    
    },

  }
}