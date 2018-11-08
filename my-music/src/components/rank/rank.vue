<template>
   <div class="rank" ref='rank'>
      <scroll class="ranklist" ref="scroll">
          <ul>
          <li class="item"  v-for="item in yunTopList" :key="item.id" @click="selectItem(item)">
          <div class="icon">
            <img v-lazy="item.coverImgUrl" >
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index) in item.top" :key="index">
              <span>{{index + 1}}.</span>
              <span>{{song.name}} - {{song.ar[0].name}}</span>
            </li>
          </ul>
        </li>
        </ul>
      

      </scroll>

 </div>
</template>
    

<script>
import {getTop} from '../../../src/api/rank.js'
import Scroll from '../../base/scroll/scroll'

const YUNMUSIC_TOP = [ 1, 2, 3,7, 10, 14, 15] //排行榜序号
export default {
    data(){
        return{
       yunTopList: [],
      showLoading: true
        }
    },
    created () {
    this._getTopList()
  },
    methods:{
    _getTopList () {
       
      for (let i = 0; i < YUNMUSIC_TOP.length; i++) {
        getTop(YUNMUSIC_TOP[i]).then((res) => {
            console.log(res)
          let list = res.data.playlist
          list.top = res.data.playlist.tracks.slice(0, 3)
          this.yunTopList.push(list)
           console.log(list)
        })
        if (i == YUNMUSIC_TOP.length - 1) {
          this.showLoading = false
        }
      }
    },
    },
    components:{
        Scroll
    }
}
</script>

<style lang="scss" scoped>
 @import "../../common/scss/variable";
 @import "../../common/scss/mixin";

.rank {
  position: fixed;
  width: 100%;
  top: 84px;
  bottom: 0;
  background-image: url(https://imgcache.gtimg.cn/mediastyle/app/download/img/index/banner_pc.jpg) ;
  
  .ranklist {
    height: 100%;
    overflow: hidden;
    padding-top: 5px;
    .item {
     
    background:rgba(227,231,230,.1); 
    display: flex;
      border-radius: 3px;
      margin: 5px 10px;
      height: 100px;
     
      &:last-child {
        padding-bottom: 20px;
      }
      .icon {
        flex: 0 0 100px;
        
        img {
          border-radius: 3px;
          width: 100px;
        height: 100px;
        }
      }
      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
         color: $color-theme-l;
        font-size: $font-size-small-x;
        .song {
          @include no-wrap();
          line-height: 30px;
        }
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .loading-content {
    position: fixed;
    width: 100%;
    top: 70%;
    transform: translateY(-50%);
  }
}


</style>

