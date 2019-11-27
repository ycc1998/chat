<template>
	<div class="information">
		<div class="header">
			<span @click="page" class="iconfont">&#xe604;</span>
			<span class="text">{{information_info.nickname}}</span>
			<span class="iconfont reght">&#xe701;</span>			
		</div>
		<Scroll class="content" :data="this.information_data.data" :scrollToEndFlagValue="true" ref="scroll">
			<div>
				
				<template v-for="item in information_data.data">
					<template v-if="item.own == false">
						<div class="left">
							<img :src="information_info.picture"  width="50" height="50" />
							<div class="content-text">
								{{item.content}}
							</div>
						</div>
					</template>

					<template v-else>
						<div class="right">
							<div class="content-text">
								{{item.content}}
							</div>
							<img :src="user_info.picture"  width="50" height="50" />
							
						</div>
					</template>
				</template>
				
			</div>
		</Scroll>
		<div class="bottom">
			<span class="iconfont bottom-left">&#xe805;</span>
			<input v-model="news" type="text" name="text" />
			<span class="iconfont">&#xe605;</span>
			<span class="iconfont">&#xe627;</span>
			<el-button @click="send" @keyup.enter="send" class="button" type="primary">发送</el-button>
		</div>
	</div>
</template> 

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
import { mapGetters,mapMutations } from 'vuex'
import storage from 'good-storage'
import {sendSock,is_normal,initWebSocket} from '@/common/js/socket';
import { getUserInfo } from '@/common/js/cache';
export default{
	data(){
		return {
			'information_data':{},
			'click':true,
			'news':'',
			'user_info':[],
		}
	},
	computed: {
    ...mapGetters([
      'information_info',
      'information_update'
    ])
  },
	methods:{
		...mapMutations([
			'set_information_info'
		]),
		send(){
			if (this.click && this.news) {
				if(!is_normal()){
					initWebSocket();
					return false;
				}
				this.click = false;
				let action = {
					'classs':'Index',
					'action':'send',
					'content':{
						'fid':this.information_info.id,
						'data':this.news
					}
				}
				sendSock(action);
				if (!this.information_data.data) {
					this.information_data.data = [];
				}
				
				this.information_data.data.push({
		      'own':true,
		      'content':this.news,
		      'time':Math.round(Date.parse(new Date()) / 1000)
		    });
				
				this.information_data.sortTime = Math.round(Date.parse(new Date()) / 1000);

		    let data = this.information_data
		    storage.set(this.key,data);
		    
		    this.$refs.scroll.refresh();
		    setTimeout(()=>{
		    	this.$refs.scroll.scrollToEndFlag();
		    },40);

				this.news = '';
				this.click = true;
			}
		},
		page(){
			this.$router.go(-1);
		},
		_create(){
			if (this.information_info.length <= 0) {
				this.$router.go(-1);
			}else{
				this.user_info = getUserInfo();
				this.key = this.user_info.username+'_'+this.information_info.id; //聊天记录键名
				setTimeout(() =>{
			    let data = storage.get(this.key,[]);
			    if (data.length <= 0) {
			    	let obj = {
			    		'id':this.information_info.id,
			    		'username':this.information_info.username,
			    		'nickname':this.information_info.nickname,
			    		'picture':this.information_info.picture,
			    		'sortTime':Math.round(Date.parse(new Date()) / 1000), //排序时间值
			    		'unreadNumber':0, //未读消息
			    		'data':[]
			    	};
			    	storage.set(this.key,obj);
			    	this.information_data = obj;
			    }else{
			    	data.unreadNumber = 0;
			    	this.information_data = data;
			    	storage.set(this.key,data);//清除未读消息
			    }
			    
				},50);
			}				
		}
	},
	created(){
		this._create();		
	},
	watch:{
		information_update(newName, oldName){
			setTimeout(()=>{
				this._create();
				this.$refs.scroll.refresh();
			},290);
	    setTimeout(()=>{
	    	this.$refs.scroll.scrollToEndFlag();
	    },390);
		}
	},
	beforeDestroy(){
		if (this.information_info.length !== 0) {
			this.set_information_info([]);
		}
	},
	components:{
		Scroll
	}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"

.information
	position:fixed
	top:0
	left:0
	width:100%
	height:100%
	.header
		background:$color-background
		z-index:2
		position: fixed
		top: 0
		left: 0
		height: 50px
		width: 100%
		padding: 14px 10px
		text-align: center
		font-size: 18px
		box-sizing: border-box
		.iconfont
			font-size: 18px
			float:left
		span
			font-weight:700
		.reght
			font-size: 22px
			float:right

	.content
		background:#fff
		position:fixed
		top:50px
		bottom:50px
		padding:10px
		width:394px
		img
			border-radius: 6px
		.left
			display:flex
			margin-bottom:10px			
		  .content-text
			  margin: 0 7px
			  max-width: 53%
			  min-width:5%
			  background: #e4e3e3
			  border-radius: 10px
			  padding: 5px
		.right
			display: flex
			margin-bottom:10px	
			justify-content: flex-end
			.content-text
				background: #42b535
				color: black

	.bottom
		background:$color-background
		position: fixed
		z-index:2
		bottom: 0
		left: 0
		width: 100%
		display: flex
		justify-content: center
		align-items: center
		height: 48px
		border-top: 1px solid #c1c1c1
		line-height: 45px
		& input
			flex: 1
			margin: 5px 8px
			line-height: 38px
			height: 38px
		.iconfont
			font-weight:700
			font-size:26px
		span
			margin-left:5px
		.bottom-left
			margin-left:10px
		.button
			margin:0 10px 0 5px


</style>