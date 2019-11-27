import {ERR_OK} from './config'
import {get,post} from './common'

//查找
export function find(username){
	if (username) {
		return get('/find_friend?username='+username).then((res) => {
      return Promise.resolve(res);
    })
	}
	return false;
}

//好友接受 拒绝
export function friend_operation(type,item){
	if (type || item) {
		return post('/operation_friend',{
			uid:item.uid,
			fid:item.fid,
			type:type
		}).then((res) => {
      return Promise.resolve(res);
    })
	}
	return false;
}


//获取好友请求列表
export function get_request_list(){
	return get('/request_list').then((res) => {
      return Promise.resolve(res);
    })
}