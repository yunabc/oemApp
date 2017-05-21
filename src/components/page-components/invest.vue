<template>
  <div id="invest" class="stageScreen">
    <div class="container">
      <div ref="tabNav" class="tabNav">
        <router-link to="/invest/regular" class="regularProduct navItem">定期</router-link>
        <div class="verticalLine"></div>
        <router-link to="/invest/current" class="currentProduct navItem">活期</router-link>
      </div>
      <router-view ></router-view>
    </div>
    <foot-nav></foot-nav>
  </div>

</template>

<script>
  import footNav from 'components/common-components/footNav';

  export default {
    data () {
      return {
      }
    },
    props: {

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
