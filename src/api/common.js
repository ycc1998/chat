import axios from 'axios'
import qs from 'qs';
import {hasToken} from '../common/js/cache';
import router from "@/router";
export function post(url,params){
	return axios.post(
		url,
		qs.stringify(params)
		).then((res) =>{
			return Promise.resolve(res);
	})
}

//是否登录
export function is_sign(){
	if (!hasToken()) {
		router.push({
      path: `/sign`
    })
	}
}