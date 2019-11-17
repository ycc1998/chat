<template>
	<Scroll :data="contacts_list" class="contacts">
		<div>
			<Search></Search>
			<ul class="content">
				<li v-for="group in contacts_list" class="list-group" ref="listGroup">
					<h2 class="title">{{group.title}}</h2>
					<ul>
						<li @touchstart="start(item.id)" @touchmove="move" :class="{click:item.id==index}" v-for="item in group.items"  class="list-group-item">
	            <img class="avatar" src="http://downun.com/uploads/images/20191021/5a42d704722781bcf761d76009f8e069.jpg"  width="50" height="50" />
	            <div class="name">
	            	<span>{{item.name}}</span>
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
import { mapMutations } from 'vuex'

const HOT_SINGER_LEN = 10
export default {
	data(){
		return {
			contacts_list:[],
			'index':-1
		}
	},
	created(){
		//初始化socket
		socketApi.initWebSocket();
		this.set_header_title('通讯录');
		axios.get('/data.json').then((res) => {
			if (res.data.code === ERR_OK) {
          this.contacts_list = this._normalizeSinger(res.data.result.list)
          console.log(this.contacts_list)
        }
		});
	},
	methods:{
		...mapMutations([
			'set_header_title'
		]),
		start(index){
			this.index = index
		},
		move(){
			if (this.index != 0) {
				this.index = 0
			}
		},
    _normalizeSinger(list){
    	let map = {
        hot: {
          title: '',
          items: []
        }
      };

      //循环数组 先push热门数据，在判断map中是否有key 
      list.forEach((item, index) => {
      	if(index < HOT_SINGER_LEN){
      		map.hot.items.push(new singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
      	}

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
      	map[key].items.push(new singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }));

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