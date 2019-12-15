<template>
  <!--  绑定事件监听  -->
  <div @tap="toDetailPage" class="tempContainer">
    <div class="avatar_date">
      <img :src="item.avatar" alt=""/>
      <span>{{item.date}}</span>
    </div>
    <p class="company">{{item.title}}</p>
    <img class="detail_img" :src="item.detail_img" alt=""/>
    <p class="content">{{item.detail_content}}</p>
    <div class="view_star">
      <img src="/static/images/icon/star.png" alt="">
      <span>{{item.love_count}}</span>
      <img src="/static/images/icon/view.png">
      <span>{{item.attention_count}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      item: Object,
      index: Number,
    },

    methods: {
      toDetailPage(){
        // 跳转至详情页面， 并且传参数(将数组所对应的下标也传递过去)
        wx.navigateTo({
          url: '/pages/detail/main?index=' + this.index,
        })
      },
    }

  }
</script>


<style>
  .tempContainer{
    display: flex;
    flex-direction: column;
    border: 1rpx solid #eee;
  }

  .avatar_date{
    padding: 10rpx;
  }
  .avatar_date img{
    width: 60rpx;
    height: 60rpx;
    vertical-align: middle;
    margin-right: 10rpx;
  }

  .avatar_date span{
    font-size: 30rpx;
    color: #333;
    font-weight: bold;
  }

  .company{
    font-size: 40rpx;
    font-weight: bold;
    padding: 20rpx;
  }

  .detail_img{
    width: 100%;
    height: 460rpx;
  }

  .content{
    font-size: 32rpx;
    /* 首字母缩进两个字符 */
    text-indent: 64rpx;
    /* 行与行之间的间距 */
    line-height: 50rpx;
    /* 英文单词与英文单词的间距， 对中文不生效 */
    /*    word-spacing: 10rpx;        */
    /* 汉字与汉字的间距 */
    letter-spacing: 3rpx;
  }

  .view_star img{
    width: 32rpx;
    height: 32rpx;
    /*  照片垂直居中  */
    vertical-align: middle;
    margin-left: 16rpx;
  }

  .view_star span{
    font-size: 26rpx;
    color: #333;
    margin-left: 16rpx;
  }
</style>
