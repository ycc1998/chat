<template>
	<div class="find">
		该功能正在努力完善中....
	</div>
</template>

<script type="text/ecmascript-6">
import * as socketApi  from '@/common/js/socket';
import { mapMutations } from 'vuex'
export default {
	created(){
		//初始化socket
		socketApi.initWebSocket();
		this.set_header_title('发现');
	},
	methods:{
		...mapMutations([
			'set_header_title'
		])
	}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

	.find
		padding-top: 48px
		padding-bottom: 60px
		text-align: center
</style>