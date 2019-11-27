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
      '/operation_friend': {
        target: LinkAddress+'operation_friend',   //代理接口
        pathRewrite: {
          '^/operation_friend': ''    //代理的路径
        }
      },
      '/add_friend': {
        target: LinkAddress+'add_friend',   //代理接口
        pathRewrite: {
          '^/add_friend': ''    //代理的路径
        }
      },
      '/friend_list': {
        target: LinkAddress+'friend_list',   //代理接口
        pathRewrite: {
          '^/friend_list': ''    //代理的路径
        }
      },
      '/request_list': {
        target: LinkAddress+'request_list',   //代理接口
        pathRewrite: {
          '^/request_list': ''    //代理的路径
        }
      },
      '/offline_message': {
        target: LinkAddress+'offline_message',   //代理接口
        pathRewrite: {
          '^/offline_message': ''    //代理的路径
        }
      },     
    },

  }
}