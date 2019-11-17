import {removeToken} from '@/common/js/cache';
import {closeSocket} from '@/common/js/socket';
import router from "@/router";

function exit_sign(){
	removeToken();
	closeSocket();
	router.push({
    path: `/sign`
  })
}

export {exit_sign}