<template>
<div id="lowerPerformance" v-if="data">
  <div class="chooseCondition">
    <date-picker @chooseMonth="getChooseMonth"></date-picker>
    <div class="btnWrap">
      <button class="refresh performanceBtn" v-tap="{methods:getData,num:0}">刷新</button>
      <button class="search performanceBtn" v-tap="{methods:getData,num:1}">查询</button>
    </div>

  </div>
  <table  class="performanceDetail">
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
</div>
<div class="noContent" v-else>暂无数据</div>

</template>

<script>
  import footNav from 'components/common-components/footNav';
  import datePicker from 'components/common-components/datePicker';
  import axios from 'axios';
  import qs from 'qs';
  export default {
        data () {
            return {
              selectMonth:'',
              data:null,
              month:0,
              initDate:'',
              userInfo:{},
              userId:null,
            }
        },
        components:{
          footNav,
          datePicker
        },
        created(){
          this.userInfo = this.$store.state.personalInfo || {};
          this.userId = this.userInfo['userId'];
          let today = new Date();
          this.initDate = today.getFullYear() +'.'+ this.padLeftZero(today.getMonth());
          this.getData(0);
          //this.months = this.getMonth();
        },
        methods:{
            getChooseMonth(chooseMonth){
              this.month = chooseMonth
              console.log(chooseMonth,this.month)
            },
            padLeftZero(str) {
              typeof(str) === 'number' && (str = str + '');
              return ('00' + str).substr(str.length);
            },
            getData(num){
              let date = this.month;
              if(!num.num){
                date = this.initDate.replace(/[^\d]/g,'');
              }
              axios.post('/x-service/user/lowerLevel.htm',qs.stringify({
                userId:this.userInfo.userId,
                curYearMonth:date
              })).then((res) => {
                  let data = res.data;
                  if (data.status == 0) {
                    this.data = data.result || [];

                  }else{
                     console.log(data.errorMsg)
                  }
              })
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';

  #lowerPerformance{
  padding:1.06666667rem .66666667rem;
  .chooseCondition{
    .btnWrap{
      float: right;
      margin-bottom: 0.3rem;
    }
  }
}

</style>
