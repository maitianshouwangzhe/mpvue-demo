<template>
    <div class="listContainer">
      <swiper indicator-dots indicator-color="pink" indicator-active-color="red">
        <swiper-item>
          <img src="/static/images/detail/carousel/01.jpg" alt=""/>
        </swiper-item>
        <swiper-item>
          <img src="/static/images/detail/carousel/02.jpg" alt=""/>
        </swiper-item>
        <swiper-item>
          <img src="/static/images/detail/carousel/03.jpg" alt=""/>
        </swiper-item>
      </swiper>

      <div>
        <!-- 引入组件  -->
        <ListTemp v-for="(item, index) in listTemp" :key="index" :item="item" :index="index"/>
      </div>

    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import ListTemp from '../list_temp/ListTemp'
  export default {

    beforeMount(){
      // 分发action
      this.$store.dispatch('getList')
    },

    computed:{
      ...mapState(['listTemp'])
    },

    components: {
      ListTemp,
    }
  }
</script>


<style>
  .listContainer swiper{
    width: 100%;
    height: 400rpx;
  }

  .listContainer swiper img{
    width: 100%;
    height: 100%;
  }
</style>
