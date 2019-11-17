import router from './router';
import {Message} from 'element-ui'
import {hasToken} from './common/js/cache'
import store from './store'
import {closeSocket} from '@/common/js/socket';

//前置操作
router.beforeEach((to, from, next) => {
  /*
    to 目标路由
    from 源路由
    next 跳转到下一个路由
  */
  if (to.meta.login) {
    // 如果需要，则跳转到登录页
    if (!hasToken()) {
    	Message({
		    message: '请先登录！',
		    type: 'warning',
		    duration: 3 * 1000
		  })
      //如果已连接socket则断开
      closeSocket();
			next('/sign');
    }else{
      if (store.getters.is_show == false && to.meta.tab == true) {
        store.commit('set_show',true);
      }else if(store.getters.is_show == true && to.meta.tab == false){
        store.commit('set_show',false);
      }
    	next();
    }    
  } else {
    // 如果不需要，则直接跳转到对应路由
    if (store.getters.is_show == true) {
      store.commit('set_show',false);
    }
    next();
  }
})