<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from '@better-scroll/core'
  import PullDown from '@better-scroll/pull-down'
  import Pullup from '@better-scroll/pull-up'
  BScroll.use(Pullup)
  BScroll.use(PullDown)

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: [Array,Object],
        default: null
      },
      //上拉
      pullup: {
        type: Boolean,
        default: false
      },
      //下拉
      PullDown:{
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollY: true, //开启纵向滚动。
          pullUpLoad: this.pullup,
          pullDownRefresh: this.PullDown
        })

        //下拉
        if(this.PullDown){
          this.scroll.on('pullingDown', ()=>{
            this.$emit('scrollToDown')
            setTimeout(() => {
              this.scroll.finishPullDown()
              this.scroll.refresh()
            }, 800)
          })
        }

        //上拉
        if (this.pullup) {
          /*this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })*/

          this.scroll.on('pullingUp', ()=>{
            this.$emit('scrollToEnd')
            setTimeout(() => {
              this.scroll.finishPullUp()
              this.scroll.refresh()
            }, 800)
          })
        }

        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }

        

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      //禁用 BetterScroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应。
      disable() {
        this.scroll && this.scroll.disable()
      },
      //判断当前 bs 是否处于启用状态
      enable() {
        this.scroll && this.scroll.enable()
      },
      //重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      //滚动到指定的位置
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      //滚动到指定的目标元素
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    //watch的作用可以监控一个值的变换
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
