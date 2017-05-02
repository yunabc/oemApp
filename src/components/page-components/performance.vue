<template>
<div id="performance">
  <div class="tabNav">
    <router-link to="/user/myPerformance" class="regularProduct navItem">我的绩效</router-link>
    <div class="verticalLine"></div>
    <router-link to="/user/lowerPerformance" class="currentProduct navItem">下级推广人绩效</router-link>
  </div>
  <router-view :userInfo="userInfo"></router-view>
  <foot-nav></foot-nav>
</div>
</template>

<script>
  import footNav from 'components/common-components/footNav';

  export default {
        data () {
            return {}
        },
        props:{
          userInfo:Object
        },
        components:{
          footNav
        }
    }
</script>

<style lang="less" rel="stylesheet/less">


</style>
