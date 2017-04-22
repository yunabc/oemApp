<template>
  <div class="footNav">
    <div class="home">
      <i><img src="../../common/img/home.png" alt=""> </i>
      <span>首页</span>
    </div>
    <div class="invest">
      <i><img src="../../common/img/invest.png" alt=""> </i>
      <span>首页</span>
    </div>
    <div class="user">
      <i><img src="../../common/img/user.png" alt=""> </i>
      <span>首页</span>
    </div>
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
.footNav{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 98px;
  background-color: #fff;
  display: flex;
  z-index: 100;
  div{
    flex: 1;
    text-align: center;
    display: flex;
    flex-flow:column;
  }
}

</style>
