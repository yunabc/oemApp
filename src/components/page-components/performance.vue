<template>
<div id="performance">
  <div class="tabNav">
    <router-link to="/user/myPerformance" class="regularProduct navItem">我的绩效</router-link>
    <div class="verticalLine"></div>
    <router-link to="/user/lowerPerformance" class="currentProduct navItem">下级推广人绩效</router-link>
  </div>
  <router-view></router-view>
  <foot-nav :active="active"></foot-nav>
</div>
</template>

<script>
  import footNav from 'components/common-components/footNav';

  export default {
        data () {
            return {
              active:"active"
            }
        },
        props:{
        },
        components:{
          footNav
        }
    }
</script>

<style lang="less" rel="stylesheet/less">


</style>
