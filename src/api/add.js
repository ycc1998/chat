import {ERR_OK} from './config'
import {get} from './common'

export function find(username){
	if (username) {
		return get('/find_friend?username='+username).then((res) => {
      return Promise.resolve(res);
    })
	}
	return false;
}