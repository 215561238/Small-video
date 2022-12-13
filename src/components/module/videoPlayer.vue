<template>
 <div class='videoPlayer'>
  <video
  id="myVideo"
  class="video" 
  @click="click" 
  :src="item.src" :index="index"
  preload="auto"
  :loop="true"
  webkit-playsinline="true"
  playsinline="true"
  x-webkit-airplay="allow"
  x5-video-player-type="h5"
  x5-video-player-fullscreen="true"
  x5-video-orientation="portraint"
  style="object-fit:fill"
  width="100%" 
  height="100%"></video>
 </div>
</template>
<script>
  //这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
  //例如：import 《组件名称》 from '《组件路径》';
  var timer = null
  export default {
   //import 引入的组件需要注入到对象中才能使用
    components: {},
    props: ['video','index'],
    data () {
      //这里存放数据
      return {
        play:false,
        dblClick:false,
        autoplay:false
    }
    },
   //计算属性 类似于 data 概念
   computed: {},
    //监控 data 中的数据变化
    watch: {},
    //方法集合
    methods: {
      click(){
        clearTimeout(timer)
        this.dblClick=!this.dblClick
        timer=setTimeout(()=>{
          if(this.dblClick){ // 判断是单击 即为true
            //单击
            if(this.play===false){
              this.playThis()
            }else{
              this.pause()
            }
          }else{
            //双击
            this.$emit('changeClick')//向父组件传递一个事件
          }
          this.dblClick = false // 点击后重置状态 重置为fasle
        },300)
      },
      player(){
        //从头播放视频
        if(this.play===false){
          this.videoContext.seek(0)
          this.videoContext.play()
          this.play=true
        }
      },
      playThis(){
        //播放当前视频
        if(this.play===false){
          this.videoContext.play()
          this.play=true
        }
      },
      auto(){
        //首个视频自动播放
        if(this.index===0){
          this.autoplay=true
        }
      }
    },
    //生命周期 - 创建完成（可以访问当前 this 实例）
    created () {
      this.auto
    },
    //生命周期 - 挂载完成（可以访问 DOM 元素）
    mounted () {
      // this.videoContext=
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
</style>