<template>
 <div class='videoList'>
    <div class="swiper-box">
        <van-swipe class="swiper" :vertical="true" @change="changeplay" @touchable="true">
            <van-swipe-item v-for="(item,index) in videos" :key="item._id">
                <div class="van-swipe-item" style="color: #0000;">
                    
                </div>
                <div class="listleftbox">
                    <list-left></list-left>
                </div>
                <div class="listrightbox">
                    <list-right ref="right"></list-right>
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>
 </div>
</template>
<script>
  //这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
  //例如：import 《组件名称》 from '《组件路径》';
  import listLeft from './listLeft.vue'
  import listRight from './listRight.vue'
  import videoPlayer from './videoPlayer.vue'

  var time = null
  export default {
   //import 引入的组件需要注入到对象中才能使用
    components: {
      videoPlayer,
      listLeft,
      listRight
    },
    props: ['list'],
    data () {
      //这里存放数据
      return {
        videos:[],
        pageStatrY:0,
        pageEndY:0,
        page:0
    }
    },
   //计算属性 类似于 data 概念
   computed: {},
    //监控 data 中的数据变化
    watch: {
      //当list发生改变 就触发这个方法 所以用watch
      list(){
        this.videos = this.list
        console.log(this.videos)
      }
    },
    //方法集合
    methods: {
      changeClick(){
        //双击点赞，调用子组件listright的方法
        this.$refs.right[0].change()
      },
      //上下滑动触发事件
      changeplay(res){
        clearTimeout(time)
        this.page = res.detail.current
        time = setTimeout(()=>{
          if(this.pageStatrY < this.pageEndY){
            console.log('向上滑动')
            setTimeout(()=>{
              this.$refs.player[this.page].player()
            },20)
            this.$refs.player[this.page+1].pause()
            this.pageStatrY=0
            this.pageEndY=0
          }else{
            console.log('向下滑动')
            setTimeout(()=>{
              this.$refs.player[this.page].player()
            },20)
            this.$refs.player[this.page-1].pause()
            this.pageStatrY=0
            this.pageEndY=0
          }
        },1)
      },
      //获取向下滑动的值
      touchStart(res){
        this.pageStatrY = res.changedTouches[0].pageY
        console.log(this.pageStatrY)
      },
      //获取向上滑动的值
      touchEnd(res){
        this.pageEndY = res.changedTouches[0].pageY
        console.log(this.pageEndY)
      }
    },
    //生命周期 - 创建完成（可以访问当前 this 实例）
    created () {
    },
    //生命周期 - 挂载完成（可以访问 DOM 元素）
    mounted () {
    },
    beforeCreate () { }, //生命周期 - 创建之前
    beforeMount () { }, //生命周期 - 挂载之前
    beforeUpdate () { }, //生命周期 - 更新之前
    updated () { }, //生命周期 - 更新之后
    beforeDestroy () { }, //生命周期 - 销毁之前
    destroyed () { }, //生命周期 - 销毁完成
    activated () { }, //如果页面有 keep-alive 缓存功能，这个函数会触发
  }
</script>
<style lang='' scoped>
  /* @import url(); 引入公共 css 类 */
  .videoList{
    height:770px;
    width:100%;
  }
  .swiper-box{
	height: 100%;
	width: 100%;
}
.swiper{
	height: 100%;
	width: 100%;
}
.swiper-item{
	height: 100%;
	width: 100%;
	z-index:19;
}
.title{
	color: #FFFFFF;
}
/deep/.listleftbox{
	z-index:20;
	position: absolute;
	bottom: 50px;
	left: 10px;
}
/deep/.listrightbox{
	z-index:20;
	position: absolute;
	bottom: 50px;
	right: 10px;
	color: #FFFFFF;
}
</style>