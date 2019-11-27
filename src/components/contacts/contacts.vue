<template>
	<Scroll v-loading="loading" :data="contacts_list" class="contacts">
		<div>
			<Search></Search>
			<ul class="content">
				<li v-for="group in contacts_list" class="list-group" ref="listGroup">
					<h2 class="title">{{group.title}}</h2>
					<ul>
						<li @click="firend_detail(item)" @touchstart="start(item.id)" @touchmove="move" :class="{click:item.id==index}" v-for="item in group.items"  class="list-group-item">
	            <img class="avatar" :src="item.picture"  width="50" height="50" />
	            <div class="name">
	            	<span>{{item.nickname}}</span>
	            </div>
	          </li>
					</ul>
				</li>
			</ul>
		</div>
	</Scroll>
</template>

<script type="text/ecmascript-6">
import * as socketApi  from '@/common/js/socket';
import Search from '@/components/search/search';
import Scroll from '@/base/scroll/scroll'
import axios from 'axios';
import {ERR_OK} from '@/api/config'
import singer from '@/common/js/singer'
import { mapMutations,mapGetters } from 'vuex'
import {Message} from 'element-ui'
import {set_friend_list,get_friend_list} from '@/common/js/cache'
import {select} from '@/api/common'

const HOT_SINGER_LEN = 10
export default {
	data(){
		return {
			contacts_list:[],
			'index':-1,
			loading:true,
		}
	},
	watch:{
		information_update(newName, oldName){
	    setTimeout(()=>{
	    	this._create();
				this.$refs.scroll.refresh();
	    },800);	    
		}
	},
	created(){
		this._create();
	},
	methods:{
		...mapMutations([
			'set_header_title',
			'set_friend_info',
			'set_initialization',
			'information_update'
		]),
		_create(){
			//初始化socket
			socketApi.initWebSocket();
			this.set_header_title('通讯录');
			let list  = get_friend_list();
			
			if (list.length <= 0) {
				this.loading = true;
				axios.get('/friend_list').then((res) => {
					if (res.data.code === ERR_OK) {
		        this.contacts_list = this._normalizeSinger(res.data.result)
		        this.loading = false;
		        set_friend_list(this.contacts_list);
		      }
				});
			}else{
				this.contacts_list = list;
				this.loading = false;
			}
		},
		firend_detail(item){
			item.is_friend = true;
			this.set_friend_info(item);
	    this.$router.push({
	      path: `/detail`
	    });
		},
		start(index){
			this.index = index
		},
		move(){
			if (this.index != 0) {
				this.index = 0
			}
		},
    _normalizeSinger(list){
    	let map = {};

      //循环数组 先push热门数据，在判断map中是否有key 
      list.forEach((item, index) => {

      	const key = item.Findex
      	if(!map[key]){
      		//判断是否为字母
	      	if (key.match(/[a-zA-Z]/)) {
	      		map[key] = {
		          title: key,
		          items: []
		        }
	      	}else{
	      		map[key] = {
		          title: '#',
		          items: []
		        }
	      	}
      		
      	}      	

      	//new singer 返回处理好的数据
      	map[key].items.push(item);

      });

      // 为了得到有序列表，我们需要处理 map
        let ret = [] //字母
        let hot = [] //热门
        let te = [] //非字母

        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          }else{
          	te.push(val)
          }
        }

        //排序
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })

        return hot.concat(ret,te);
    },
	},
	computed: {
    ...mapGetters([
      'initialization',
    ])
  },
	components:{
		Search,
		Scroll
	}
}
</script>

<style  scoped lang="stylus" rel="stylesheet/stylus">
	.click
		background:#dedede !important


	.contacts
		position: fixed
		overflow: hidden
		width: 100%				
		top: 48px
		bottom: 60px
		.content
			margin:0
			.title
				padding-left: 10px
				color: rgba(171, 83, 236, 0.5)
				background: #d9dad8
				height: 30px
				line-height: 30px
				font-size:14px
			.list-group-item
				margin:10px
				display: flex
				flex-direction: row
				align-items: center
				.avatar
					margin-right: 8px
					border-radius: 5px
				.name
					border-bottom: 1px solid #e2e2e2
					flex:1
					line-height:50px
					height:50px

</style>