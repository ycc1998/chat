<template>
	<transition name="my">
		<div class="sign">
			<h1>Yan</h1>
			<div>
				<div class="input">
					<span>用户名</span>
					<input v-model="username" type="text" name="username" />
				</div>
				<div class="input">
					<span>密码</span>
					<input v-model="password" type="password" name="password" />
				</div>
				<div @click="sign" class="input">
					<button :disabled="false">立即登录</button>
				</div>
				<div>
					<router-link to="register">立即注册</router-link> | <span>忘记密码？</span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
import {user_sign} from '@/api/sign'
import {getToken} from '@/common/js/cache';
	export default{
		data(){
			return {
				username:'',
				password:'',
				submit:true
			}
		},
		created(){
			if (getToken()) {
				this.$router.go(-1);
			}
		},
		methods:{
			sign(){
				var username = this.username;
				var password = this.password;
				if(username && password && this.submit){
					this.submit = false;					
					this.username = '';
					this.password = '';
					user_sign(username,password).then((res) => {
						this.submit = true;
	          if(res.data.code == 200){
		          setTimeout(() =>{
						    this.$router.push({
						      path: `/`
						    })
							},300);		        	
		      	}
	        })

				}
			}			
		}
	}


</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/variable.styl"

	.my-enter-active 
		transition: all .5s 
	.my-leave-active 
		transition: all .8s 
	.my-enter, .my-leave-to
		transform: translateX(100%)
		opacity: 1
	.sign
		background:$color-background
		position: fixed
		top: 0
		left: 0
		width: 100%
		height: 100%
		overflow: auto
		text-align: center
		h1
			margin-top: 110px
			margin-bottom: 80px
			font-size: 65px
			font-weight: 700
			font-family: inherit
		.input
			border: 1px solid
			margin: 15px 55px
			line-height: 40px
			border-radius: 25px
			display: flex
			justify-content: space-between
			padding: 2px 5px
			span
				font-size: 14px
			input
				flex: 1
				width:50px
				outline: none
				margin: 0 5px
				border-radius: 0 30px 30px 0
				background-color: $color-background
			button
				width: 100%
				outline: none
				line-height: 40px
				border: none
				background-color: rgba(0,0,0,0)
				font-size: 18px
				margin: 0 8px
				background-color: $color-background
				color:#497ef5
		
			
</style>