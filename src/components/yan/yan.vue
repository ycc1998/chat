<template>
	<Scroll class="yan" ref="scroll">
		<div>		
			<Search></Search>		
			<ul class="lists">
				<li @click="send(item)" v-for="item in data" class="item">
					<img :src="item.picture"  width="50" height="50" />
					<div class="content">
						<div class="init">
							<span class="name">{{item.nickname}}</span>
							<span class="news">{{item.newData.content}}</span>
						</div>
						<div class="time">
							{{item.newData.time}}
							<div class="red" v-show="item.unreadNumber > 0">{{item.unreadNumber}}</div>
						</div>
					</div>
					
				</li>
				
			</ul>		
		</div>
	</Scroll>
</template>

<script type="text/ecmascript-6">
import * as socketApi  from '@/common/js/socket';
import Search from '@/components/search/search';
import Scroll from '@/base/scroll/scroll'
import { mapMutations,mapGetters } from 'vuex'
import storage from 'good-storage'
import moment from 'moment';
import {select} from '@/api/common'
import { getUserInfo } from '@/common/js/cache';
export default {
	data(){
		return {
			data:[]
		}
	},
	created(){
		this._create();
	},
	computed: {
    ...mapGetters([
      'information_update',
      'red2',
      'initialization'
    ])
  },
	watch:{
		information_update(newName, oldName){
	    setTimeout(()=>{
	    	this._create();
				this.$refs.scroll.refresh();
	    },800);

	    
		}
	},
	methods:{
		...mapMutations([
			'set_header_title',
			'set_information_info',
			'set_red2',
			'set_initialization'
		]),
		send(item){
			this.set_information_info(item)
			this.$router.push({
	      path: `/information`
	    });
		},
		_create(){
			//初始化socket
			socketApi.initWebSocket();
			this.set_header_title('Yan');
			
			let all = storage.getAll();

			var UserInfo = getUserInfo();
			 
			let data = [];
			let show_unread = 0;
			for(var key in all){
				if (key.indexOf(UserInfo.username+'_') != -1) {
					let time = Math.round(Date.parse(new Date()) / 1000);
					let newTime;
					let content;

					if (all[key]['data'].length > 0) {
						let pop = all[key]['data'].pop();
						if (time - pop['time'] < 86400) {
							newTime = moment(pop['time'] * 1000).format('HH:mm');
						}else{
							newTime = moment(pop['time'] * 1000).format('YYYY/MM/DD');
						}
						content = pop['content'];
					}

					data.push({
						'id':all[key]['id'],
						'username':all[key]['username'],
						'nickname':all[key]['nickname'],
						'picture':all[key]['picture'],
						'unreadNumber':all[key]['unreadNumber'],
						'sortTime':all[key]['sortTime'],
						'newData':{
							'content':content,
							'time':newTime
						}
					});
					show_unread+=all[key]['unreadNumber'];
				}
			}
			if(show_unread > 0){
				this.set_red2(true);
			}else{
				this.set_red2(false);
			}
			data.sort((a, b) => {
				return b.sortTime - a.sortTime
			});
			this.data = data;
		}
	},
	components:{
		Search,
		Scroll
	}
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
	.yan
		position: fixed
		width: 100%				
		top: 48px
		bottom: 60px
		.lists
			margin: 0
			.item
				overflow: hidden
				margin: 12px 10px
				display: flex
				flex-direction: row
				img
					margin-right: 8px
					border-radius: 5px
				.content
					width: 70%
					flex: 1
					display: flex
					flex-direction: row
					border-bottom: 1px solid #e2e2e2
					.init
						width: 60%
						flex: 1
						display: flex
						flex-direction: column
						.name
							color:#1f1f1f
						.news
							margin-top:7px
							font-size:14px
							
							overflow: hidden
							text-overflow: ellipsis
							white-space: nowrap
					.time
						text-align: center
						//width:65px
						font-size:14px
						display: flex
						flex-direction: column
						align-items: flex-end
				.red
					width: 24px
					height: 18px
					background: red
					color: #fff
					line-height: 18px
					text-align: center
					border-radius: 50%
					font-size: 12px
					margin-top: 5px
</style>