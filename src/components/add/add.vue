<template>
	<transition name="my">
		<div class="add" v-loading="loading">
			<div class="header">
				<span @click="page" class="iconfont">&#xe604;</span>
				<span>添加朋友</span>
			</div>

			<div class="content">
				<span class="iconfont">&#xe613;</span>
				<input @keyup.enter="submit" class="text" v-model="username" type="text" placeholder="请输入用户名" />
				<span @click="clear" class="iconfont">&#xe616;</span>
			</div>

			<div class="friend_request">
				<scroll :data="friend_request" class="scroll_">
					<ul>
						<li class="item" v-for="item in friend_request">
							<img :src="item.u_pic" width="50" height="50" />
							<span class="username">{{item.u_username}}</span>
							<el-button @click="friend(1,item)" type="primary">接受</el-button>
							<el-button @click="friend(0,item)" type="danger">拒绝</el-button>
						</li>						
					</ul>
				</scroll>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
import {find,friend_operation,get_request_list} from '@/api/add.js'
import {Message} from 'element-ui'
import { mapMutations,mapGetters } from 'vuex'
import {get_friend_request,del_friend_request,del_friend_list,set_friend_request} from '@/common/js/cache';
import Scroll from '@/base/scroll/scroll'
import {ERR_OK} from '@/api/config'
	export default{
		data(){
			return {
				username:'',
				loading:false,
				friend_request:[]
			}
		},
		computed: {
	    ...mapGetters([
	      'red'
	    ])
	  },
		created(){
			this._friend_request();
			if (this.red) {
				this.set_red(false)
			}
		},
		methods:{
			...mapMutations([
				'set_friend_info',
				'set_red'
			]),

			_friend_request(){
				this.loading = true;
				get_request_list().then((res) => {
					if (res.data.code === ERR_OK) {
						console.log(res.data)
						set_friend_request(res.data.result.data,true);
						this.friend_request = res.data.result.data;
					}
					this.loading = false;
				})
				
			},
			//好友请求 接受 拒绝
			friend(type,item){
				friend_operation(type,item).then((res)=>{
					if (res.data.code == 200) {
						if (type == 1) {
							del_friend_list();
						}
						del_friend_request(item);
						this._friend_request();
					}
				});
			},
			page(){
				this.$router.go(-1);
			},
			clear(){
				this.username = '';
			},
			submit(){
				if (this.username) {
					this.loading = true;
					find(this.username).then((res)=>{
						this.loading = false;
						if (res.data.result.data.id) {
							this.set_friend_info(res.data.result.data);
							this.$router.push({
					      path: `/detail`
					    })
						}else{
							Message({
						    message: '用户不存在',
						    type: 'error',
						    duration: 1 * 1000
						  })
						}
					})
				}
			}
		},
		components:{
		Scroll
	}
	}
</script>

<style  scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"

	.my-enter-active 
		transition: all 0.4s linear
	.my-leave-active 
		transition: all .8s 
	.my-enter, .my-leave-to
		transform: translateX(100%)
		opacity: 0
	.add
		position: fixed
		background:$color-background
		z-index: 100
		top: 0
		left: 0
		width: 100%
		height: 100%
		.header
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
		.content
			position: fixed
			width:100%
			box-sizing: border-box
			margin-top:50px
			background: #fff
			height: 45px
			line-height: 45px
			padding: 0 10px
			display: flex
			.text
				flex:1
				outline: none
				padding: 0 8px
		.friend_request
			height:100%
			width:100%
			.scroll_
				position: fixed
				top:95px
				bottom:1px
				overflow: hidden
				width:100%
				.item
					padding: 10px
					display: flex
					align-items: center
					border-bottom: 1px solid #cac7c7
					& img
						margin-right:10px
					.username
						flex: 1
					button
						margin-left:10px
				li:last-child
					border-bottom: none
</style>