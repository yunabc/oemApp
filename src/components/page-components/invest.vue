<template>
  <div id="invest">
    <div class="tabNav">
      <router-link to="/invest/regular" class="regularProduct productLi active">定期宝</router-link>
      <div class="verticalLine"></div>
      <router-link to="/invest/current" class="currentProduct productLi">活期宝</router-link>
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
  .tabNav{
    display: flex;
    background-color: #fff;
    .productLi{
      padding: 27px 0;
      flex: 1;
      text-align: center;
      color: #000;
      font-size:28px;
      line-height:40px;
      border-bottom: 1px solid @lineGrayColor;
      font-weight:bold;
      &.active{
         border-bottom: 4px solid @color;
         color: @color;
       }
    }
  }
}

</style>
