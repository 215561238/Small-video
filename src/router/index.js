import Vue from 'vue'
import Router from 'vue-router'
import Video from '../components/module/video.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path:'/',
      redirect:'/video'//重载
    },
    {
      path: '/video',
      name: 'Video',
      component: Video
    }
  ]
})
