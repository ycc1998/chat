<template>
	<div>1</div>
</template>

<script type="text/ecmascript-6">
import Socket from '@/common/js/socket'
export default {
	data(){
		return {
			websock:null
		}
	},
	created(){
		this.websock = new Socket();
		//this.websock.websocketsend("PING");
		 setTimeout(() =>{
	     this.websock.websocketsend("PING");
		 },5*1000);
		
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>