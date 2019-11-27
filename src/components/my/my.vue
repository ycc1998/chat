<template>
	<div class="my">
		<div class="user_info common">
			<img :src="user_info.picture"  width="60" height="60" />
			<div class="name">
				<span class="nickname">{{user_info.nickname}}</span>
				<span class="username">用户名：{{user_info.username}}</span>
			</div>
			<div class="right">
				<span class="iconfont">&#xe630;</span>
				<span class="iconfont">&#xe62d;</span>
			</div>
		</div>

		<div @click="clear" @touchstart="start(1)" @touchmove="move" :class="{click:1==index}" class="item common">
			<span class="iconfont">&#xe946;</span>
			<span class="text">清空聊天记录</span>
			<span class="iconfont">&#xe62d;</span>
		</div>

		<div @touchstart="start(2)" @touchmove="move" :class="{click:2==index}" class="item common">
			<span class="iconfont">&#xe6a9;</span>
			<span class="text">修改密码</span>
			<span class="iconfont">&#xe62d;</span>
		</div>

		<div @touchstart="start(3)" @touchmove="move" :class="{click:3==index}" class="item common">
			<span class="iconfont">&#xe60d;</span>
			<span class="text">个性签名</span>
			<span class="iconfont">&#xe62d;</span>
		</div>

		<div @touchstart="start(4)" @touchmove="move" :class="{click:4==index}" @click="exit" class="exit common">
			<span class="iconfont">&#xe61d;</span>
			<span>退出登录</span>
		</div>
		<transition name="my">
			<div @click="hidden_exit" v-show="show_exit" class="exit_info">
				<div  class="content">
					<div @click.stop="" class="title"><span>退出后不会删除任何历史数据，下次登录依然可以使用本账号。</span></div>
					<div @touchstart="start(5)" @touchmove="move" :class="{click:5==index}" @click.stop="sign_out" class="top">退出登录</div>
					<div @touchstart="start(6)" @touchmove="move" :class="{click:6==index}" @click.stop="hidden_exit" class="buttom">取消</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
import * as socketApi  from '@/common/js/socket';
import { mapMutations } from 'vuex'
import {Message} from 'element-ui'
import {exit_sign} from './my.js'
import { getUserInfo } from '@/common/js/cache';
import storage from 'good-storage'

export default {
	data(){
		return {
			'show_exit':false,
			'index':0,
			'user_info':[]
		}
	},
	created(){
		//初始化socket
		socketApi.initWebSocket();
		this.set_header_title('我的');
		this.user_info = getUserInfo();
	},
	methods:{
		...mapMutations([
			'set_header_title'
		]),
		clear(){
			if (this.index != 0) {
				this.index = 0
			}
      this.$confirm('此操作将永久删除所有记录！, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      	let all = storage.getAll();
      	for(var key in all){
					if (!isNaN(key)) {
						storage.remove(key);
					}
				}
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(()=>{

      });     
		},
		exit(){
			this.show_exit = true
		},
		hidden_exit(){
			this.show_exit = false;
		},
		sign_out(){
			exit_sign()
		},
		start(index){
			this.index = index
		},
		move(){
			if (this.index != 0) {
				this.index = 0
			}
		}
	}
}
</script>

<style  scoped lang="stylus" rel="stylesheet/stylus">

.click
	background:#dedede !important

.my
	padding-top: 48px
	padding-bottom: 60px	
	.common
		margin-bottom: 13px
		background: #fff
		padding: 15px 10px
	.user_info				
		display: flex
		padding: 23px 10px
		& img
			margin-right: 12px
		.name
			flex: 1
			display: flex
			flex-direction: column
			height: 60px
			.nickname
				font-size: 20px
				font-weight: 700
				margin-bottom: 14px
		.right
			line-height: 60px
			height: 60px
			& .iconfont
				font-weight: 700
				font-size: 18px
				margin-left:8px
	.item
		display:flex
		flex-direction:row
		.text
			flex:1
			margin-left:8px
		.iconfont
			font-weight: 700
			font-size: 18px
			margin-left:8px
	.exit
		text-align: center
		color:red
		font-size:18px
	.my-enter-active 
		transition: all .5s 
	.my-leave-active 
		transition: all .5s 
	.my-enter, .my-leave-to
		transform: translateY(100%)
		opacity: 0
	.exit_info
		position: fixed
		z-index: 100
		top: 0
		left: 0
		width: 100%
		height: 100%
		overflow: auto
		opacity: 1
		background: rgba(7,17,27,0.2)
		.content
			position: absolute
			bottom: 0
			left: 0
			background: #fff
			border-radius: 15px 15px 0 0
			padding: 15px 15px 5px 15px
			width: 100%
			overflow: hidden
			box-sizing: border-box
			text-align: center
			.title
				font-size: 13px
				padding-bottom: 18px
				border-bottom: 1px solid #e2e2e2
			.top
				padding: 5px 0
				height: 40px
				line-height: 40px
				color: red
				border-bottom: 1px solid #e2e2e2
			.buttom
				height: 45px
				line-height: 45px
</style>