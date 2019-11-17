<template>
	<div class="tab">
		<router-link tag="div" class="item" to="/yan">
			<div class="iconfont">&#xe614;</div>
			<div class="text">Yan</div>
		</router-link>
		<router-link tag="div" class="item" to="/contacts">
			<div class="iconfont">&#xe722;</div>
			<div class="text">通讯录</div>
		</router-link>
		<router-link tag="div" class="item" to="/find">
			<div class="iconfont">&#xe612;</div>
			<div class="text">发现</div>
		</router-link>
		<router-link tag="div" class="item" to="/my">
			<div class="iconfont">&#xe758;</div>
			<div class="text">我</div>
		</router-link>
	</div>
</template>

<script type="text/ecmascript-6">

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"

	.tab
		position: fixed
		text-align: center
		height: 60px
		bottom: 0
		left: 0
		background: #e4e4e4
		display: flex
		width: 100%
		flex-direction: row
		justify-content: space-around
		align-items: center
		.item
			padding: 6px 22px
			display: flex
			flex-direction: column
			align-items: center
			.iconfont
				font-size: 24px
				width:24px
				height:24px
				font-weight: 700
			.text
				margin-top:4px
				font-size: 14px
		.router-link-active
			color:#e04343
        
		
</style>