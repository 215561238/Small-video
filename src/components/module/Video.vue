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
        <!-- 右侧点赞，分享功能 -->
        <div class="tools_right">
          <div class="tools_r_li" @click="changeFollow(item,index)">
            <i
             class="iconfont icon-dianzan"
             :class="item.follw ? 'follow_active' : ''"></i>
            <div class="tools_r_num">{{item.like}}</div>
          </div>
          <div class="tools_r_li" @click="changeShare">
            <i class="iconfont icon-fenxiang"></i>
            <div class="tools_r_num">{{item.sms_n}}</div>
          </div>
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
        showShareBox:false,
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
      //改变点赞状态
      changeFollow(item,index){
        this.dataList[index].flag = !this.dataList[index].flag;
        console.log('点赞喜欢')
      },
      //展示分享弹窗
      changeShare(){
        this.showShareBox = true;
      },
      //取消分享
      cancelShare(){
      this.showShareBox = false;
      },
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
      //获取数据
      getVideoList:function(){
        axios({  
              method:'post',
              url:'https://bdb24c6d-8c19-4f80-8e7e-c9c9f037f131.bspapp.com/video',
              data:{info:'get_video'}
              }).then(res => {
              var msg = res.data.data;
              console.log(msg)
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
  /* 右边功能区 */
  .tools_right {
  z-index: 1001;
  position: absolute;
  right: 16px;
  bottom: 238px;
}
.tools_r_li {
  margin-bottom: 20px;
  color: #fff;
  font-size: 16px;
}
.tools_r_li:last-child {
  margin-bottom: 0px;
}
.icon_right {
  margin-bottom: 5px;
  font-size: 42px;
  display: block;
  text-shadow: 0px 0px 10px #9d9d9d;
  /*transition: .5s;*/
}
.icon_right {
  margin-bottom: 5px;
  font-size: 42px;
  display: block;
  text-shadow: 0px 0px 10px #9d9d9d;
  /*transition: .5s;*/
}
.production_box {
  z-index: 1001;
  position: absolute;
  /* right: 16px; */
  bottom: 54px;
  text-align: left;
  padding: 0 15px 15px 15px;
  color: #fff;
  width: 100%;
  left: 0;
  box-sizing: border-box;
  background: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    top,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    top,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  ); /* 标准的语法 */
}
</style>