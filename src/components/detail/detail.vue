<template>
	<div class="detail">
		<div class="header">
			<span @click="page" class="iconfont">&#xe604;</span>
			<span class="iconfont reght">&#xe701;</span>			
		</div>
		<div class="user_info common">
			<img :src="friend_info.picture"  width="60" height="60" />
			<div class="name">
				<span class="nickname">{{friend_info.nickname}}</span>
				<span class="username">用户名：{{friend_info.username}}</span>
			</div>			
		</div>
		<div v-if="!friend_info.is_friend" class="common icon">
			<span class="iconfont">&#xe698;</span>
			<span>添加为好友</span>
		</div>
		<div v-if="friend_info.is_friend" class="common icon">
			<span class="iconfont">&#xe614;</span>
			<span>发信息</span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import { mapGetters,mapMutations } from 'vuex'

export default{
	created(){
		if (this.friend_info.length == 0) {
			this.$router.go(-1);
		}
	},
	methods:{
		...mapMutations([
			'set_friend_info'
		]),
		page(){
			this.$router.go(-1);
		},
	},
	beforeDestroy(){
		if (this.friend_info.length !== 0) {
			this.set_friend_info([]);
		}
	},
	computed: {
    ...mapGetters([
      'friend_info',
    ])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
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
		.reght
			font-size: 22px
			float:right

	.common
		margin-bottom: 13px
		background: #fff
		padding: 15px 10px
	.user_info			
		margin-top:50px	
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
	.icon
		text-align: center
		color:#3668b7
		& span
			font-weight: 700
		.iconfont
			padding-right:5px
			font-size:18px


</style>