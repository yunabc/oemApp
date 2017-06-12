<template>
<div id="lowerPerformance" >
  <div class="chooseCondition clearfix">
    <date-picker @chooseMonth="getChooseMonth"></date-picker>
    <div class="btnWrap">
      <button class="refresh performanceBtn" v-tap="{methods:getData,item:'刷新成功'}">刷新</button>
      <button class="search performanceBtn" v-tap="{methods:getData}">查询</button>
    </div>
  </div>
  <div v-if="dataReturnFlag">
    <table  class="performanceDetail performanceDetail2" v-if="dataList && dataList.length">
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
      <tr v-for="item in dataList">
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
  <v-alert :msg="msg" @close="closeWindow" v-if="openWindow"></v-alert>
</div>

</template>

<script>
  import footNav from 'components/common-components/footNav';
  import alert from '../common-components/alert.vue'
  import datePicker from 'components/common-components/datePicker';
  import axios from 'axios';
  import qs from 'qs';
  export default {
        data () {
            return {
              selectMonth:'',
              dataList:[],
              chooseMonth:'',
              initDate:'',
              userId:null,
              dataReturnFlag:false,
              msg:'测试提示文案测试提示文案测试提示文案测试提示文案测试提示文案',
              openWindow: false,
            }
        },
        components:{
          footNav,
          datePicker,
          'v-alert': alert
        },
        created(){
          this.userId = this.$cookie.get('userId');
          let today = new Date();
          this.initDate = today.getFullYear() +"."+ this.padLeftZero(today.getMonth());
          this.getData();
        },
        methods:{
            closeWindow(bool) {
              this.openWindow = bool;

            },
            getChooseMonth(chooseMonth){
              this.chooseMonth = chooseMonth;
              console.log(chooseMonth,this.month)
            },
            padLeftZero(str) {
              typeof(str) === 'number' && (str = str + '');
              return ('00' + str).substr(str.length);
            },
            getData(params){
              let curYearMonth = this.chooseMonth ?this.chooseMonth: this.initDate;

              axios.post('/x-service/user/lowerLevel.htm',qs.stringify({
                userId:this.userId,
                curYearMonth:curYearMonth.replace(/[^\d]/g,'')
              })).then((res) => {
                  let data = res.data;
                  if (data.status == 0) {
                    this.dataList = data.result;
                    this.dataReturnFlag = true;
                      console.log(params);
                    if(params && params.item){
                      console.log(111);
                      this.msg = params.item;
                      this.openWindow = true;
                    }
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
