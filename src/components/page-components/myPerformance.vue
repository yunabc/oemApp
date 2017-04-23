<template>
<div id="myPerformance">
  <table class="performanceDetail">
    <thead>
      <tr>
        <td>时间</td>
        <td>累计人数</td>
        <td>累计规模</td>
        <td>累计佣金</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2017.1</td>
        <td>15</td>
        <td>1000.00</td>
        <td>200.00</td>
      </tr>
    </tbody>
  </table>
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
#myPerformance{
  padding: 80px 50px;
}

</style>
