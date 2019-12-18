<template>
  <div class="detailContainer" v-if="movieDetail.images">
    <img :src="movieDetail.images.large" alt="">
    <p class="movie_name">{{ movieDetail.original_title}}</p>
    <div class="detail_content">
      <span>评分：{{ movieDetail.rating.average}}</span>
      <span>导演：{{ movieDetail.directors[0].name}}</span>
      <!--  取出多个主演   -->
      <span>主演：{{movieDetail.casts[0].name}} {{movieDetail.casts[1].name}} {{movieDetail.casts[2].name}}</span>
    </div>
    <button open-type="contact">我要观影</button>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data(){
      return {
        movieDetail: {},
      }
    },
    beforeMount(){
      // 取出传递过来的index
      const num = this.$mp.query.index
      this.movieDetail = this.moviesArr[num]
    },
    computed: {
      ...mapState(['moviesArr'])
    },
  }
</script>

<style scoped>
  .detailContainer{
    display: flex;
    flex-direction: column;
  }

  .detailContainer img{
    width: 80%;
    height: 700rpx;
    margin: 50rpx auto;
  }

  .movie_name{
    font-size: 40rpx;
    text-align: center;
    font-weight: bold;
  }

  .detail_content{
    display: flex;
    flex-direction: column;
    margin-left: 20%;
    margin-top: 30rpx;
    line-height: 50rpx;
    font-size: 26rpx;
  }

  button{
    width:70%;
    height:80rpx;
    background: #489B99;
    line-height: 80rpx;
    color: #fff;
    font-size: 28rpx;
    margin-top: 20rpx;
  }

</style>
