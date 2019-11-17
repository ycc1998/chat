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
      '/register': {
        target: LinkAddress+'register',   //代理接口
        pathRewrite: {
          '^/register': ''    //代理的路径
        }
      },
      '/find_friend': {
        target: LinkAddress+'find_friend',   //代理接口
        pathRewrite: {
          '^/find_friend': ''    //代理的路径
        }
      },    
    },

  }
}