import Vue from 'vue'
import Router from 'vue-router'
import Video from '../components/module/video.vue'
import Home from '../components/Home.vue'

//挂载使用
Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path:'/',
      redirect:'/home'//重载
    },
    {
      path:'/home',
      name:'Home',
      component:Home
    },
    {
      path: '/video',
      name: 'Video',
      component: Video
    }
  ]
})
