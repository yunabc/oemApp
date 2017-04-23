<template>
  <div class="footNav">
    <router-link to="/home" class="home footNavItem active">首页</router-link>
    <router-link to="/invest" class="invest footNavItem">投资</router-link>
    <router-link to="/user" class="user footNavItem">我的</router-link>
  </div>
</template>

<script>
    export default {
        data () {
            return {}
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';
  .footNav{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 98px;
  background-color: #fff;
  display: flex;
  z-index: 100;
  .footNavItem{
    flex: 1;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding-top: 55px;
    &.home{
      background: url("../../common/img/home.png") center 13px no-repeat;
      &.active{
        background: url("../../common/img/home.png") center 13px no-repeat;
        color: @color;
       }
     }
     &.invest{
      background: url("../../common/img/invite.png") center 13px no-repeat;
      &.active{
         background: url("../../common/img/home.png") center 13px no-repeat;
         color: @color;
       }
      }
     &.user{
        background: url("../../common/img/user.png") center 13px no-repeat;
        &.active{
           background: url("../../common/img/home.png") center 13px no-repeat;
           color: @color;
         }
      }
  }
}

</style>
