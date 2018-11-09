import axios from 'axios'
import {HOST} from '../common/js/config'

export function getBanner () {
  const url = HOST + '/banner' //轮播图
  return axios.get(url)
}

export function getRecommendList () { 
  const url = HOST + '/personalized' //推荐歌单
  return axios.get(url)
}

export function getRecommendMusic () {
  const url = HOST + '/personalized/newsong' //推荐新音乐
  return axios.get(url)
}

export function getRecommendListDetail (id) {
  const url = HOST + `/playlist/detail?id=${id}`
  return axios.get(url)
}
