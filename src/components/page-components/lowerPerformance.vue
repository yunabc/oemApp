<template>
<div id="lowerPerformance">
  <div class="chooseCondition">
    <label for="">月份:</label>
    <select class="chooseMonth">
      <option value="1">2017.1</option>
      <option value="2">2017.2</option>
      <option value="3">2017.3</option>
      <option value="4">2017.4</option>
    </select>
  </div>
  <table class="performanceDetail">
    <thead>
      <tr>
        <td>推广人ID</td>
        <td>姓名</td>
        <td>累计人数</td>
        <td>累计规模</td>
        <td>累计佣金</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1111</td>
        <td>张三</td>
        <td>15</td>
        <td>1000.00</td>
        <td>2000.00</td>
      </tr>
    </tbody>
  </table>
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

  #lowerPerformance{
  padding:1.06666667rem .66666667rem;
  .chooseCondition{
    margin-bottom: .26666667rem;
    .chooseMonth{
      font-size: .32rem;
      border-bottom: .01333333rem solid @lineGrayColor;
      padding: .06666667rem;
      margin-left: .4rem;
    }
  }
}

</style>
