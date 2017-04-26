<template>
<div id="myPerformance">
  <table v-if="data.length" class="performanceDetail">
    <thead>
      <tr>
        <td>时间</td>
        <td>累计人数</td>
        <td>累计规模</td>
        <td>累计佣金</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data">
        <td>{{item.curMonthTime}}</td>
        <td>{{item.curPersonCount}}</td>
        <td>{{item.curMonthTotalMoney}}</td>
        <td>{{item.curMonthComm}}</td>
      </tr>
    </tbody>
  </table>
  <div class="noContent" v-else>暂无数据</div>
</div>
</template>

<script>
  import footNav from 'components/common-components/footNav';
  import axios from 'axios';
  export default {
        data () {
            return {
              data:[]
            }
        },
        components:{
          footNav
        },
        created(){
          axios.get('../../../static/myPerformance.json').then((res) => {
             let data = res.data;
              if (data.status == 0) {
                 this.data = data.result;
              }else{
                 console.log(data.errorMsg)
              }
          })
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
#myPerformance{
  padding: 1.06666667rem .66666667rem;
}

</style>
