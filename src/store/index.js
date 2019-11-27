import Vue from "vue";
import Vuex from "vuex";
import * as getters from './getters'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex); 

export default new Vuex.Store({
	getters,
  state: {
  	is_show:false,
    header_title:"Yan", //标题
    friend_info:[], //好友信息
    user_info:[], //当前用户信息
    red:false,//好友请求 
    red2:false,//消息
    information_info:[],
    information_update:Math.round(Date.parse(new Date())),  //用于监听变化
    initialization:true,//初始化是否需要请求数据库查询是否有未读消息
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
    },
    set_user_info(state,value){
      state.user_info = value
    },
    set_red2(state,value){
      state.red2 = value
    },
    set_red(state,value){
      state.red = value
    },
    set_information_info(state,value){
      state.information_info = value
    },
    set_information_update(state,value){
      state.information_update = value
    },
    set_initialization(state,value){
      state.initialization = value
    }
  },  
  actions: {},
  modules: {},
  plugins: [createLogger()], //插件
});
