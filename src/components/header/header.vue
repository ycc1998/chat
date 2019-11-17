<template>
	<div class="header">
		<h1>{{header_title}}</h1>
		<router-link to="/add_friend">
			<div class="iconfont">&#xe698;</div>
		</router-link>
	</div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default{
	computed: {
    ...mapGetters([
      'header_title',
    ])
  }
	
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"

	.header
		z-index: 10
		position: fixed
		width: 100%
		height: 48px
		text-align: center
		color: $color-text
		font-size: 0
		background:#e4e4e4
		h1
			display: inline-block
			vertical-align: top
			line-height: 48px
			font-size: 20px
			font-weight: 700
		.iconfont
			float: right
			line-height: 48px
			margin-right: 20px
			font-size: 20px
			font-weight: 700


</style>