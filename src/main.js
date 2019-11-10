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

Vue.use(ElementUI);
Vue.use(VueAxios, axios)


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
