<template>
  <div id="invest" class="stageScreen">
    <div class="tabNav">
      <router-link to="/invest/regular" class="regularProduct navItem">定期</router-link>
      <div class="verticalLine"></div>
      <router-link to="/invest/current" class="currentProduct navItem">活期</router-link>
    </div>
    <router-view :userInfo="userInfo"></router-view>
    <foot-nav :userInfo="userInfo" ></foot-nav>
  </div>

</template>

<script>
  import footNav from 'components/common-components/footNav';

  export default {
    data () {
      return {
        userInfo: {},
      }
    },
    props: {

    },
    components: {
      footNav
    },
    created() {
      this.userInfo = this.$store.state.personalInfo || {};
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';

</style>
