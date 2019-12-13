<template>
    <div class="indexContainer">
      <!-- 一旦v-if变为true， 则v-else自动变化为false -->
      <img v-if=" userInfo.nickName || isShow " class="index_img" :src="userInfo.avatarUrl" alt="logo">
      <Button v-else class="btn" open-type="getUserInfo" @getuserinfo="getUserInfo">点击获取用户信息</Button>
      <p class="userName">hello {{userInfo.nickName}}</p>
      <div class="goStudy" @tap="toDetail">
        <!-- 阻止向上的冒泡事件, 即：仅仅执行此处绑定的事件，不执行外部父元素的事件  -->
        <!--
             <p @tap.stop="toChild">开启第一个小程序之旅</p>
        -->
        <p>开启第一个小程序之旅</p>
      </div>
    </div>
</template>

<script>
  export default {
    data(){
      return {
        userInfo: {},
        isShow: false,
      }
    },
    beforeMount(){
      // 获取用户的登录信息
      this.handleGetUserInfo()
    },

    methods:{
      // 写成一个方法
      handleGetUserInfo(){
        // 获取用户的登录信息
        wx.getUserInfo({
          success: (data) => {
            console.log("公共函数里面的data", data )
            this.userInfo = data.userInfo
          },
          fail: () => {
            console.log("获取失败" )
          },
        })
      },

      // 点击获取用户信息
      getUserInfo(data){
        console.log('点击获取', data)
        // 判断用户是否授权
        if (data.mp.detail.rawData){
          this.handleGetUserInfo()
          this.isShow = true
        }
      },

      toDetail(){
        // 页面的路由跳转
        wx.navigateTo({
          url: '/pages/list/main',
        })
      },

      toChild(){
        console.log('toChild')
      },

    }
  }
</script>


<style>
  page{
    background: #489B99;
  }
  .indexContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .index_img{
    width: 200rpx;
    height: 200rpx;
    border-radius: 100rpx;
    margin: 100rpx 0;
  }

  .btn{
    width: 300rpx;
    height: 300rpx;
    border-radius: 150rpx;
    margin: 100rpx 0;
    line-height: 300rpx;
    font-size: 26rpx;

  }

  .userName{
    font-size: 40rpx;
    font-weight: bold;
    margin: 100rpx 0;
  }
  .goStudy{
    width: 410rpx;
    height: 80rpx;
    border: 1rpx solid #eee;
    font-size: 41rpx;
    line-height: 80rpx;
    border-radius: 10rpx;
  }
</style>
