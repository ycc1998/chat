import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './common/stylus/index.styl';
import axios from 'axios';
import VueAxios from 'vue-axios';
import request from './request';
import prepose from './prepose';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VConsole from 'vconsole'
import {is_normal,initWebSocket} from '@/common/js/socket';

import * as socketApi from './common/js/socket'
Vue.prototype.socketApi = socketApi

Vue.prototype.$vconsole = VConsole;

Vue.use(ElementUI);
Vue.use(VueAxios, axios)


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");


setInterval(function(){
	if(router.currentRoute.meta.login){
		if(!is_normal()){
			initWebSocket();
			store.commit('set_information_update', Date.parse(new Date()))
			return false;
		}
	}
},10*1000);