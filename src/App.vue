<template>
  <div id="app">
      <Header v-if="is_show"></Header>
				<router-view />
			<Tab v-if="is_show"></Tab>
  </div>
</template>

<script type="text/ecmascript-6">
import Header from '@/components/header/header';
import Tab from '@/components/tab/tab';
import { mapGetters,mapMutations } from 'vuex'
import * as socketApi  from '@/common/js/socket';
import {select} from '@/api/common'
import storage from 'good-storage'
import { getUserInfo } from '@/common/js/cache';
export default {
	created(){
    //new this.$vconsole();
  },
  methods:{
    ...mapMutations([
      'set_initialization',
      'set_red2'
    ]),
  },
  mounted(){
    window.onbeforeunload = e => {      //刷新时弹出提示
        return ''
    };
  },
	computed: {
    ...mapGetters([
      'is_show',
      'information_update',
      'initialization'
    ])
  },
  watch:{
    information_update(newName, oldName){
      //初始化加载数据库中的未读消息
      if (this.initialization) {
        setTimeout(()=>{
          if (socketApi.is_normal()) {        
            this.set_initialization(false);
            select();       
          } 
        },220);   
      }

      setTimeout(()=>{
        let all = storage.getAll();
        let show_unread = 0;
        var UserInfo = getUserInfo();
        for(var key in all){
          if (key.indexOf(UserInfo.username+'_') != -1) {
            show_unread+=all[key]['unreadNumber'];
          }
        }
        if(show_unread > 0){
          this.set_red2(true);
        }else{
          this.set_red2(false);
        }
      },800);

    }
  },
  components:{
		Header,
		Tab
	},
}
</script>

<style lang="stylus">

</style>
