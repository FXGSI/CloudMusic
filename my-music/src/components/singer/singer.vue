<template>
  <div class="singer" ref="singer">
    <list-view :data="this.singers" @select="selectSinger" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>



<script>
import Singer from '../../common/js/singer'
import ListView from '../../base/listview/listview'
export default {
    


    
}
</script>
