// 引入依赖包
import axios from 'axios'
import Vue from "vue";
import {setToken,getToken,removeToken} from './common/js/cache'
import {Message} from 'element-ui'
import router from "@/router";

//设置axios为form-data
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';


//  REQUEST 请求异常拦截
axios.interceptors.request.use(config => {
		//携带token
		if(router.currentRoute.meta.login){			
			let token = getToken();
			if (token.length < 1) {
				Message({
			    message: '请先登录！',
			    type: 'warning',
			    duration: 3 * 1000
			  })
			  router.push({
		      path: `/sign`
		    })
			  return false;
			}
			config.headers.token = token;
		}

    return config;
  }, function (error) {
  	Message({
	    message: '请求超时！',
	    type: 'error',
	    duration: 3 * 1000
	  })
    return Promise.resolve(error) 
  }
)

//  RESPONSE 响应异常拦截
axios.interceptors.response.use((res) => {
	//存储token
	if (res.data.result.token) {
		setToken(res.data.result.token);
	}

	Message({
		showClose: true,
    message: res.data.msg,
    type: 'success',
    duration: 2 * 1000
  })

    return res;  
}, function(err) {
	if (err.response.data) {
		let data = err.response.data;
		Message({
	    message: data.msg,
	    type: 'error',
	    duration: 3 * 1000
	  })
	  
	  if (data.result.code == 999) {
	  	removeToken()
	  }
	}
  return Promise.resolve(err.response) 
})

//然后再修改原型链
Vue.prototype.$axios = axios

/*
999 token验证失败或过期
*/