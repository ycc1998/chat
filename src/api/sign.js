import {ERR_OK} from './config'
import {post} from './common'

export function user_sign(username,password) {
	if (username && password) {
		return post('/sign',{username,password}).then((res) => {
          return Promise.resolve(res);
        })
	}
	return false;
}


export function user_register(username,password) {
	if (username && password) {
		return post('/register',{username,password}).then((res) => {
          return Promise.resolve(res);
        })
	}
	return false;
}