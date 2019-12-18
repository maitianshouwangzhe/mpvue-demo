<template>
  <div>
    <div class="moviesContainer" v-for="(item, index) in moviesList" :key="index" @tap="toMoviesDetail(index)" v-if="item.images">
      <img class="movies_img" :src="item.images.large" alt="">
      <div class="movies_info">
        <p class="movies_name">{{ item.original_title}}</p>
        <p class="movies_year">年份：{{ item.year}}</p>
        <p class="movies_director">导演：{{ item.directors[0].name}}</p>
      </div>
      <p class="movies_rating">{{ item.rating.average}}</p>
    </div>
  </div>
</template>

<script>
  /* 请求的url地址   */
  const MOVIE_URL = 'http://t.yushu.im/v2/movie/top250';
  export default {

    data(){
      return {
        moviesList: [],
      }
    },

    // 发请求，越早越好
    beforeMount(){
      // 使用flyio发送请求
      this.$fly.get(MOVIE_URL).then(response => {
        console.log(response)
        if(response.status === 200){
          const result = response.data.subjects
          // 分发action
          this.$store.dispatch('getMoviesList', result)
          this.moviesList = result
        }
      }).catch(error =>{
        console.log(error)
      })
    },

    methods: {
      // 传递参数
      toMoviesDetail(index){
        wx.navigateTo({
          // 字符串拼接
          url: '/pages/moviesDetail/main?index=' + index
        })
      }
    },
  }
</script>


<style>
  .moviesContainer{
    display: flex;
    padding: 10rpx;
    border: 1rpx solid #eee;
  }

  .movies_img{
    width: 128rpx;
    height: 128rpx;
    margin-right: 20rpx;
  }

  .movies_info{
    width: 70%;
  }
  .movies_name{
     font-size: 32rpx;
     color: #333;
    /* 文字不换行 */
    white-space: nowrap;
    /* 多出去的部分，隐藏，相当于截断 */
    overflow: hidden;
    text-overflow: ellipsis;
   }
  .movies_year{
    font-size: 28rpx;
    color: #999;
    margin: 5rpx 0;
  }
  .movies_director{
    font-size: 30rpx;
    color: #666;
  }
  .movies_rating{
    font-size: 36rpx;
    font-weight: bold;
    color: red;
  }
</style>
