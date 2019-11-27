import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/home/home";
import Sign from "@/components/sign/sign";
import Register from "@/components/register/register";
import Yan from "@/components/yan/yan";
import Contacts from "@/components/contacts/contacts";
import Find from "@/components/find/find";
import My from "@/components/my/my.vue";
import Add from "@/components/add/add";
import Detail from "@/components/detail/detail";
import Information from '@/components/information/information'


Vue.use(VueRouter);
  
export default new VueRouter ({
  routes : [
    {
      path:"/",
      component:Yan,
      //是否需要登录
      meta:{
        login:true
      },
      redirect: '/contacts'
    },
    {
      path:"/sign",
      name:"sign",
      component:Sign
    },
    {
      path:"/register",
      name:"register",
      component:Register
    },
    {
      path:"/yan", //消息列表
      meta:{
        login:true,
        tab:true
      },
      component:Yan
    },
    {
      path:"/contacts", //联系人
      meta:{
        login:true,
        tab:true
      },
      component:Contacts
    },
    {
      path:"/find",  //发现
      meta:{
        login:true,
        tab:true
      },
      component:Find
    },
    {
      path:"/my",  //我的
      meta:{
        login:true,
        tab:true
      },
      component:My
    },
    {
      path:"/add_friend",  //添加好友
      meta:{
        login:true,
        tab:false
      },
      component:Add
    },
    {
      path:"/detail",  //好友详情
      meta:{
        login:true,
        tab:false
      },
      component:Detail
    },
    {
      path:"/information",  //好友详情
      meta:{
        login:true,
        tab:false
      },
      component:Information
    },
  ]
})


