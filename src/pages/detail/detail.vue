<template>
  <div class="detailContainer">
    <img class="detail_img" :src=" isMusicPlay ? detailObj.music.coverImgUrl : detailObj.detail_img" alt=""/>
    <img class="music_img" @tap="handleMusic" :src=" isMusicPlay ? '/static/images/music/music-start.png': '/static/images/music/music-stop.png' " alt="">
    <div class="avatar_date">
      <img :src="detailObj.avatar">
      <span>{{detailObj.author}}</span>
      <span>发布于</span>
      <span>{{detailObj.date}}</span>
    </div>
    <p class="company">{{detailObj.title}}</p>
    <div class="collect_share_container">
      <div class="collect_share">
        <img @tap="handleCollection" :src=" isCollection ? '/static/images/icon/collection.png' : '/static/images/icon/collection-anti.png' ">
<!--        <img :src=" isShared ? '/static/images/icon/share-anti.png' : '/static/images/icon/share.png' ">-->
        <img src="/static/images/icon/share-anti.png">
      </div>
      <div class="line"></div>
    </div>
    <Button>转发此文章</Button>
    <p class="content">{{detailObj.detail_content}}</p>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import isPlayObj from '../../mock/isPlay'
  export default {
    data(){
      return {
        // 详情页的对象
        detailObj: {},
        // 文章是否收藏
        isCollection: false,
        isMusicPlay: false,
      }
    },

   /*
    // 原生小程序的生命周期[注：能不用，尽量不用]
    // 取出路由路径传递过来的参数
    onLoad(options){
      console.log(options)
    },
    */

   beforeMount(){
     console.log('组件实例对象的this', this)
     // 使用this.$mp.query.index取出路由路径中的query参数
     this.index = this.$mp.query.index
     // console.log('路由路径中的query参数', this.index)


     // 预处理工作： 读取之前缓存到本地的状态，查看是否收藏
     let oldStorage = wx.getStorageSync('isCollected')
     if(!oldStorage){
       // 如果oldStorage没有值，即为空时，将oldStorage置为空对象。
       // 避免oldStorage[this.index] = this.isCollection 报错
       wx.setStorage({
         key: 'isCollected',
         data: {},
       })
     } else {
       /*
       *    下标控制一切
       */
       // 如果oldStorage有值，即：用户曾缓存过状态。
       // oldStorage[this.index] 有三种情况： true || false || undefined（根本没有操作过）
       this.isCollection = ( oldStorage[this.index] ?  true : false)
     }

     // 判断当前页面加载时,音乐是否在播放
     // 有这些情况：一、仍跳转至该页面； 二、进入另一个页面（上一次的状态的保留了下来）。
     ( isPlayObj.pageIndex === this.index &&  isPlayObj.isPlay ) ?  this.isMusicPlay = true : this.isMusicPlay = false

     // 反向操作（在弹出的音乐播放器中点击）：监听音乐的播放和暂停,
     // 使得 播放 与 暂停的图片不断切换
     wx.onBackgroundAudioPlay( () => {
       console.log('音乐播放');
       // 修改状态
       this.isMusicPlay = true
       isPlayObj.pageIndex = this.index
       isPlayObj.isPlay = true
     })
     wx.onBackgroundAudioPause( () => {
       console.log('音乐暂停');
       // 修改状态
       this.isMusicPlay = false
       isPlayObj.isPlay = false
     })

   },

    mounted(){
      console.log(' mounted函数中取vuex中this.listTemp', this.listTemp)
     // 在mounted里，更新状态
     this.detailObj = this.listTemp[this.index]
    },

    computed:{
     ...mapState(['listTemp'])
    },
    methods:{
      handleCollection(){
        this.isCollection = !this.isCollection
        let title = this.isCollection ? '收藏成功': '取消收藏'
        // 微信官方提供的api
        wx.showToast({
          title: title,
          icon: 'success',
        })

        // 读取之前缓存到本地的状态，查看是否收藏
        let oldStorage = wx.getStorageSync('isCollected')
        // 为了防止此次状态的结果，影响了其它页面
        // 将oldStorage生成为一个对象， 例如 {  0: true, 1: true, 4: true, 7: true }
        oldStorage[this.index] = this.isCollection
        // 将本次操作的结果再次缓存到本地
        wx.setStorage({
          key: 'isCollected',
          /*  data: this.isCollection, */     // 如果使用isCollected，则本次操作的结果，会影响下一个页面。即bug：此次状态的结果，影响了其它页面
          data: oldStorage
        })
      },

      handleMusic(){
        this.isMusicPlay = ! this.isMusicPlay
        let {dataUrl, title} = this.detailObj.music
        // 如果为true，则播放音乐
        if (this.isMusicPlay){
          wx.playBackgroundAudio({
            dataUrl,
            title,
          })
        } else {
          // 暂停
          wx.pauseBackgroundAudio()
        }
      },


    },
  }
</script>

<style>
  .detailContainer{
    display: flex;
    flex-direction: column;
  }
  .detail_img{
    width: 100%;
    height: 460rpx;
  }
  .avatar_date{
    padding: 10rpx
  }

  .avatar_date img{
    width: 64rpx;
    height: 64rpx;
    vertical-align: middle;
  }

  .avatar_date span{
    font-size: 30rpx;
    margin-left: 6rpx;
  }

  .company{
    font-size: 32rpx;
    font-weight: bold;
    padding: 10rpx;
  }

  .collect_share_container{
    position: relative;
  }

  .collect_share{
    float: right;
    margin-right: 30rpx;
  }
  .collect_share img{
    width: 90rpx;
    height: 90rpx;
    margin-right: 20rpx;
  }
  .line{
    /*  使用定位 */
    position: absolute;
    top: 45rpx;
    left: 5%;
    width: 90%;
    height: 1rpx;
    background: #eee;
    /* 设置为图片的下部（层叠式）  */
    z-index: -1;
  }
  .content{
    font-size: 32rpx;
    text-indent: 64rpx;
    letter-spacing: 3rpx;
    line-height: 50rpx;
  }

  .music_img{
    width: 60rpx;
    height: 60rpx;
    /* 设置音乐图片为图片的中央 */
    position: absolute;
    top: 200rpx;
    left: 50%;
    margin-left: -30rpx;

  }
</style>
