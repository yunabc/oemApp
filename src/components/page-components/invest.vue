<template>
  <div id="invest" class="stageScreen">
    <div class="tabNav">
      <router-link to="regular" class="regularProduct navItem">定期</router-link>
      <div class="verticalLine"></div>
      <router-link to="current" class="currentProduct navItem">活期</router-link>
    </div>
    <router-view :userInfo="userInfo" ></router-view>
    <login v-if="loginShow"></login>
    <foot-nav></foot-nav>
  </div>

</template>

<script>
  import footNav from 'components/common-components/footNav';
  import login from 'components/common-components/login';
  export default {
    data () {
      return {
        userId:"",
        loginShow:false,
        userInfo:{}
      }
    },
    props: {
    },
    components: {
      footNav,login
    },
    created() {
      this.userId = {userId:234324};
      console.log(this.userInfo);
      this.$router.push({name:'current',params:this.userInfo});
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';

</style>
