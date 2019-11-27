import axios from 'axios'
import qs from 'qs';
import {hasToken} from '../common/js/cache';
import router from "@/router";
import {get_friend_list} from '@/common/js/cache'
import storage from 'good-storage'
import store from '@/store/index.js'

export function post(url,params){
	return axios.post(
		url,
		qs.stringify(params)
		).then((res) =>{
			return Promise.resolve(res);
	})
}


export function get(url,params){
	return axios.get(
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

//用户离线消息
export function select(){
	return get('/offline_message').then((res) => {
		let result = res.data.result.data;

		if (result.length > 0) {			
			result.forEach((item, index) => {
				var user = storage.get(item.uid);

				if (user) {
					user.unreadNumber++;
					user.sortTime = Math.round(Date.parse(new Date()) / 1000);
					user.data.push({
						'content':item.content,
						'own':false,
						'time':item.create_time
					})
					storage.set(item.uid,user);
				}else{
					let user_ = {};
					let userInfo = getUserItem(item.uid);

					if (userInfo) {
						user_ = userInfo;
						user_.unreadNumber = 1;
						user_.sortTime = Math.round(Date.parse(new Date()) / 1000);
						user_.data = [];
						user_.data.push({
							'content':item.content,
							'own':false,
							'time':item.create_time
						})

						storage.set(item.uid,user_);
					}
				}				
			});
			store.commit('set_information_update', Math.round(Date.parse(new Date())))
		}    
  })
}


//传入用户id返回用户信息
export function getUserItem(id){
	var data = get_friend_list();
	var response = {};
	if (data) {
    data.forEach((item, index) => {
      item.items.forEach((value,key) => {
        if(value.id == id){
          response = value;
        }
      });
    });
	}
	return response;
}