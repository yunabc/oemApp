<template>
<div id="lowerPerformance">
  <div class="chooseCondition">
    <label>月份:</label>
    <select  class="chooseMonth" v-model="selectMonth">
      <option v-for="item in months" :value="item">{{item}}</option>
    </select>
    <button class="refresh performanceBtn" @click="select()">刷新</button>
    <button class="search performanceBtn" @click="select()">查询</button>
  </div>
  <table v-if="data.length" class="performanceDetail">
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
      <tr v-for="item in data">
        <td>{{item.userId}}</td>
        <td>{{item.userName}}</td>
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
              selectMonth:'',
              data:[],
              months:[]
            }
        },
        components:{
          footNav
        },
        created(){
          this.getData()
          this.months = this.getMonth();
        },
        methods:{
            getMonth(){
              let monthsArr = [];
              let nowTime = new Date();
              let nowYear = nowTime.getFullYear();
              let nowMonth = nowTime.getMonth() + 1
              for(var i = 1;i<nowMonth;i++){
                monthsArr.push(nowYear+ '.'+ i)
              }
              return monthsArr
            },
            getData(monthNum){
              axios.get('../../../static/lowerPerformance.json').then((res) => {
                  let data = res.data;
                  if (data.status == 0) {
                    this.data = data.result;
                  }else{
                     console.log(data.errorMsg)
                  }
              })
            },
            select(){
              let monthNum = (this.selectMonth);
              this.getData(monthNum)
            }
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
