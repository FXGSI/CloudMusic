<template>
    <div class=recommend ref="recommend">
        <scroll class="recommend-content" ref="scroll">
            <div>
         <mt-swipe :auto="4000" style="height:165px">
  <mt-swipe-item v-for="item in banner" :key="item.id"><img :src="item.picUrl" alt=""></mt-swipe-item>
         </mt-swipe>  

        <!-- 推荐歌单 -->
         <div class="recommend-list">
           <h1 class="title">推荐歌单</h1> 
             <ul>
                 <li class="item" v-for="item in musicList" :key="item.id">
                     <div class="icon">
                        <img v-lazy="item.picUrl" >
                     </div>
                <p class="play-count">
                <i class="fa fa-headphones"></i>
                {{Math.floor(item.playCount / 10000) }}万
              </p>
              <div class="text">
                <p class="name">{{item.name}}</p>
              </div>
            </li>
          </ul>

          <!-- 推荐歌曲 -->
           <div class="recommend-song" ref="recommendSong">
          <h1 class="title">推荐歌曲</h1>
          <ul>
            <li class="item" v-for="item in recommendMusic" :key="item.id" @click="selectSong(item)">
              <div class="icon">
                <img v-lazy="item.image">
              </div>
              <p class="text">{{item.name}}</p>
              <p class="singer">{{item.singer}}</p>
            </li>
          </ul>
        </div>
</div>
</div>
        </scroll>
        <!--底部播放器  -->
     <router-view></router-view>
   </div> 
</template>


<script>
import Scroll from '../../base/scroll/scroll'
import {getBanner, getRecommendList, getRecommendMusic} from '../../../src/api/recommend.js'
import {createRecommendSong} from '../../common/js/song'
import {ERR_OK} from '../../common/js/config'

export default {
     data(){
         return{
          banner:[],
          musicList:[],
          recommendMusic:[]   
         }
     },
     created () {
    this._getBanner()
    this._getRecommendList()
    this._getRecommendMusic()
    
  },

     methods:{
         //发送请求获取轮播图
        _getBanner () {
        getBanner().then((res) => {
        if (res.status === ERR_OK) {
        let list = res.data.banners
          this.banner = list.splice(4)
           console.log(this.banner)
        } else {
          console.error('Banner 获取失败')
        }
      })
    },
     _getRecommendList () {
      getRecommendList().then((res) => {
        if (res.status === ERR_OK) {
          this.musicList = res.data.result
        } else {
          console.error('getRecommendList 获取失败')
        }
      })
    },
      _getRecommendMusic() {
          getRecommendMusic().then((res)=>{
             if (res.status === ERR_OK) {
                 console.log(res)
          let list = res.data.result.map((item) => {
            return createRecommendSong(item)
          })
           console.log(list)
          list.splice(9)
          this.recommendMusic = list
        } else {
          console.error('getRecommendMusic 获取失败')
        }
      })
    }
     },
components: {
    Scroll
  }

}
</script>


<style lang="scss" scoped>
   @import "../../common/scss/variable";
    @import "../../common/scss/mixin";
  .recommend {
  position: fixed;
  width: 100%;
  top: 84px;
  bottom: 60px;
  z-index: 100;
  .recommend-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    
    .mint-swipe {
      width: 96%;
      margin: 0 auto;
      border-radius: 5px;
      overflow: hidden;

      img{
          width: 100%;
          height: 100%;
      }
     }

     //推荐歌单
      .recommend-list {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      text-align: center;
      .title {
        height: 60px;
        line-height: 60px;
        padding-left: 1.5%;
        text-align: center;
        font-size: $font-size-medium;
        font-weight: bold;
        color: $color-text;
      }
      .item {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        width: 33%;
        padding: 0 1%;
        .icon {
          position: relative;
          display: inline-block;
          width: 100%;
          margin-bottom: 5px;
         
          img {
            width: 100%;
            height: 100%;
            border-radius: 3px;
          }
        }
        .play-count {
          position: absolute;
          top: 5px;
          right: 8px;
          font-size: $font-size-small-s;
          color: $color-text-l
        }
        .text {
          //float: left;
          line-height: 16px;
          text-align: left;
          height: 40px;
          line-height: 16px;
          overflow: hidden;
          margin-bottom: 10px;
          font-size: $font-size-small;
        }
      }
      //推荐歌曲
      .recommend-song{
          .text{
          height: 16px;
           line-height: 16px;
            margin-bottom:0; 
           @include no-wrap();
          }
          .singer{
            
             line-height: 16px;
          margin-bottom: 10px;
          text-align: left;
          font-size: $font-size-small;
           color: $color-text-g;
            @include no-wrap();
          }
      }
      }
}
    }

</style>
