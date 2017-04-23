<template>
  <div id="invest">
    <div class="tabNav">
      <router-link to="/invest/regular" class="regularProduct navItem" @click="">定期</router-link>
      <div class="verticalLine"></div>
      <router-link to="/invest/current" class="currentProduct navItem">活期</router-link>
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
      components:{
        footNav
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';

#invest{
  height:100%;
  background-color:@backGrayColor;

}

</style>
