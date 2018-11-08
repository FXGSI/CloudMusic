<template>
  <div id="app" class="app-container">
     <!-- 顶部导航 -->
   <mt-header fixed title="MYMUSIC ">
  <router-link to="/" slot="left">
    <mt-button icon="back"></mt-button>
  </router-link>

  <mt-button icon="search" slot="right"></mt-button>
</mt-header>
    <tabbar></tabbar>
  
    <!-- 路由显示其他模块 -->
    <router-view></router-view>
  </div>
</template>

<script>

 import  tabbar from '../src/components/tabbar/tabbar.vue';


export default {
  name: 'App',
  data(){
    return{}
  } ,
   components: {
     tabbar
   }

}
</script>

<style lang="scss">
  @import 'common/scss/index.scss';
  body{
    margin: 0;
  }
#app {
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
}
.app-container{
     padding-top:40px; 
      padding-bottom:50px;
     overflow-x:hidden;
   }
   .mint-header{
     background-color:#d44439; 
   }
</style>
