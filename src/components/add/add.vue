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
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
import {find} from '@/api/add.js'
import {Message} from 'element-ui'
import { mapMutations } from 'vuex'

	export default{
		data(){
			return {
				username:'',
				loading:false
			}
		},
		methods:{
			...mapMutations([
				'set_friend_info'
			]),
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
</style>