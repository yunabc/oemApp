<template>
  <div id="home">
    <div class="home-banner">
      <div class="swiper-slide"><img src="../../common/img/banner.jpg" alt="" width="100%"></div>
    </div>
    <ul class="home-content">
      <li class="currentInvest">
        <img src="../../common/img/invest.png" alt="">
        <div class="desc">

        </div>
      </li>
      <li class="regularInvest">
        <img src="../../common/img/invest.png" alt="">
        <div class="desc">

        </div>
      </li>
    </ul>
    <foot-nav></foot-nav>
  </div>
</template>

<script>
  import footNav from 'components/common-components/footNav';
  export default {
    data () {
      return {}
    },
    components:{
      footNav
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #home{
    background-color: #f0f1f2;
    height: 100%;
    .home-content{
      padding: 0 30px;


    }
  }


</style>
