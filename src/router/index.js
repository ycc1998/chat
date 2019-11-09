import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/home/home";
import Sign from "@/components/sign/sign";
import Register from "@/components/register/register";
Vue.use(VueRouter);
  
export default new VueRouter ({
  routes : [
    {
      path:"/",
      component:Home
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
    }
  ]
})
