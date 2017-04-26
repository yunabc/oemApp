<template>
  <div id="invest" class="stageScreen">
    <div class="tabNav">
      <router-link to="/regular" class="regularProduct navItem" @click="">定期</router-link>
      <div class="verticalLine"></div>
      <router-link to="/current" class="currentProduct navItem">活期</router-link>
    </div>
    <router-view ></router-view>
    <foot-nav></foot-nav>
  </div>

</template>

<script>
  import footNav from 'components/common-components/footNav';

  export default {
    data () {
      return {}
    },
    components: {
      footNav
    },
    created() {

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';

</style>
