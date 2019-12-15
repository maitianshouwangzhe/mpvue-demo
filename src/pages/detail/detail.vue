<template>
  <div class="detailContainer">
    <img class="detail_img" :src="detailObj.detail_img" alt=""/>
    <div class="avatar_date">
      <img :src="detailObj.avatar">
      <span>{{detailObj.author}}</span>
      <span>发布于</span>
      <span>{{detailObj.date}}</span>
    </div>
    <p class="company">{{detailObj.title}}</p>
    <div class="collect_share_container">
      <div class="collect_share">
        <img src="/static/images/icon/collection-anti.png">
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
  import list from '../list/list'
  export default {
    data(){
      return {
        detailObj: {},
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
   },

    mounted(){
      console.log(' mounted函数中取vuex中this.listTemp', this.listTemp)
     // 在mounted里面更新状态
     this.detailObj = this.listTemp[this.index]
    },

    computed:{
     ...mapState(['listTemp'])
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
</style>
