<template>
  <div id="app">
    
    <router-view/>
    <NavBottomVue />
  </div>
</template>

<script>
import NavBottomVue from './components/NavBottom.vue';
export default {
  name: 'App',
  components:{
    NavBottomVue,
  }
}
</script>

<style>
  @import url('./assets/css/index.css');
</style>