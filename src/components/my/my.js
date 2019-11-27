import {clear} from '@/common/js/cache';
import {closeSocket} from '@/common/js/socket';
import router from "@/router";

function exit_sign(){
	clear();
	closeSocket();
	router.push({
    path: `/sign`
  })
}

export {exit_sign}