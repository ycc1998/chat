<template>
  <div id="app">
      <Header v-if="is_show"></Header>
				<router-view />
			<Tab v-if="is_show"></Tab>
  </div>
</template>

<script type="text/ecmascript-6">
import Header from '@/components/header/header';
import Tab from '@/components/tab/tab';
import { mapGetters } from 'vuex'

export default {
	
	computed: {
    ...mapGetters([
      'is_show',
    ])
  },

  components:{
		Header,
		Tab
	},
}
</script>

<style lang="stylus">

</style>
