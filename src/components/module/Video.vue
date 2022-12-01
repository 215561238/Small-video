<!--  -->
<template>
  <div>
    <van-swipe :show-indicators="false" :loop="false" vertical @change="onChange" style="height: 100vh;">
      <van-swipe-item v-for="(item,index) in dataList" :key="index">
        <div class="video_container">
          <video
            class="video_box"
            @click="pauseVideo"
            @ended="onPlayerEnded($event)"
            autoplay
            id="video"
            preload="auto"
            webkit-playsinline="true"
            playsinline="true"
            x-webkit-airplay="allow"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
            x5-video-orientation="portraint"
            style="object-fit:fill"
            width="100%" height="100%" :src="item.src"></video>
        <!-- 播放暂停按钮 -->
        <img src="../../assets/start.png" v-show="iconPlayShow" class="icon_play" @click="playvideo" alt="">
        </div>
        <div>

        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import axios from 'axios';

  export default {
    data () {
      return {
        dataList :[],
        iconPlayShow:true,
        current:0,
      }
    },
    //生命周期 - 创建完成（访问当前this实例）
    created () {

    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted () {
      this.getVideoList();
    },
    methods:{
       //滑动改变播放的视频
    onChange(index) {
      //改变的时候 暂停当前播放的视频
      let video = document.querySelectorAll("video")[this.current];
      video.pause();
      this.playOrPause = false;
      this.current = index;
      if (this.isiOS) {
        //ios切换直接自动播放下一个
        this.isVideoShow = false;
        this.pauseVideo();
      } else {
        //安卓播放时重置显示封面。图标等
        this.isVideoShow = true;
        this.iconPlayShow = true;
      }
    },
    playvideo() {
      let video = document.querySelectorAll("video")[this.current];
      console.log(video.play());
      console.log("playvideo：" + this.current);
      this.isVideoShow = false;
      this.iconPlayShow = false;
      video.play();
      window.onresize = function () {
        video.style.width = window.innerWidth + "px";
        video.style.height = window.innerHeight + "px";
      };
    },
    pauseVideo() {
      //暂停\播放
      let video = document.querySelectorAll("video")[this.current];
      console.log("pauseVideo" + this.current);
      if (this.playOrPause) {
        video.pause();
        this.iconPlayShow = true;
      } else {
        video.play();
        this.iconPlayShow = false;
      }
      this.playOrPause = !this.playOrPause;
    },
    onPlayerEnded() {
      //视频结束
      this.isVideoShow = true;
      this.current += this.current;
    },
      getVideoList:function(){
        axios({  
              method:'post',
              url:'https://bdb24c6d-8c19-4f80-8e7e-c9c9f037f131.bspapp.com/video',
              data:{info:'get_video'}
              }).then(res => {
              var msg = res.data.data;
              for(let i = 0;i<msg.length;i++){
                  this.dataList.push(msg[i]);
                  this.dataList.forEach(item=>{
                    item.flag = false;
              })
            }
        })
      }
    },
    computed:{

    }
  }
</script>
<style scoped>
  /* @import url(); 引入css类 */
  /* 暂停按钮 */
  .icon_play{
    position: absolute;
    top: 44%;
    right: 0;
    left: 0;
    bottom: auto;
    margin: auto;
    z-index: 999;
    height: 60px;
    border-radius: 50%;
  }
  /* 视频盒子 */
  .video_box{
    object-fit: cover !important;
    z-index: 999;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
  }
</style>