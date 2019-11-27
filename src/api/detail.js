import {get,post} from './common'

export function add(id,username){
	if (id && username) {
		return post('/add_friend',{
			id,
			username,
		}).then((res) => {
      return Promise.resolve(res);
    })
	}else{
		return false;
	}
}