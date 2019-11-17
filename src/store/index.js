import Vue from "vue";
import Vuex from "vuex";
import * as getters from './getters'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex);

export default new Vuex.Store({
	getters,
  state: {
  	is_show:false,
    header_title:"Yan",
    friend_info:[]
  },
  mutations: {
  	set_show(state,value){
  		state.is_show = value
  	},
    set_header_title(state,value){
      state.header_title = value
    },
    set_friend_info(state,value){
      state.friend_info = value
    }
  },  
  actions: {},
  modules: {},
  plugins: [createLogger()], //插件
});
