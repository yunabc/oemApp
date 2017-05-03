<template>
  <div id="myPerformance" v-if="data.length">
    <button class="refresh performanceBtn" v-tap="{methods:refresh}">刷新</button>
    <table  class="performanceDetail">
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
  </div>
  <div class="noContent" v-else>暂无数据</div>

</template>

<script>
  import footNav from 'components/common-components/footNav';
  import axios from 'axios';
  import qs from 'qs';
  export default {
        data () {
            return {
              data:[],
              userInfo:{},
              userId:null,
            }
        },
        components:{
          footNav
        },
        created(){
          this.userInfo = this.$store.state.personalInfo || {};
          this.userId = this.userInfo['userId'];
          this.getData()
        },
        methods:{
          reflesh(){
            this.getData()
          },
          getData(){
            axios.post('/x-service/user/perfor.htm',qs.stringify({
                userId: this.userInfo.userId
            })).then((res) => {
               let data = res.data;
                if (data.status == 0) {
                   this.data = data.result;
                }else{
                   console.log(data.errorMsg)
                }
            })
          }
        }
    }


</script>

<style lang="less" rel="stylesheet/less">
  #myPerformance {
    padding: 1.06666667rem .66666667rem;
    .performanceBtn {
      margin-bottom: .26666667rem;
    }
  }

</style>
