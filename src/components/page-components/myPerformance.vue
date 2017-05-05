<template >
  <div v-if="this.dataReturnFlag">
    <div id="myPerformance" v-if="dataList && dataList.length">
      <button class="refresh performanceBtn" v-tap="{methods:getData,item:'刷新成功'}">刷新</button>
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
        <tr v-for="item in dataList">
          <td>{{item.curMonthTime}}</td>
          <td>{{item.curPersonCount}}</td>
          <td>{{item.curMonthTotalMoney}}</td>
          <td>{{item.curMonthComm}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="noContent" v-else>暂无数据</div>
    <v-alert :msg="msg" @close="closeWindow" v-if="openWindow"></v-alert>
  </div>


</template>

<script>
  import footNav from 'components/common-components/footNav';
  import alert from '../common-components/alert.vue'
  import axios from 'axios';
  import qs from 'qs';
  export default {
        data () {
            return {
              dataList:[],
              userInfo:{},
              userId:null,
              dataReturnFlag:false,
              openWindow:false,
              msg:'刷新成功'
            }
        },
        components:{
          footNav,
          'v-alert': alert
        },
        created(){
          this.userInfo = this.$store.state.personalInfo || {};
          this.userId = this.userInfo['userId'];
          this.getData()
        },
        methods:{
          closeWindow(bool) {
            this.openWindow = bool;
          },
          getData(params){
            axios.post('/x-service/user/perfor.htm',qs.stringify({
                userId: this.userInfo.userId
            })).then((res) => {
               let data = res.data;
                if (data.status == 0) {
                   this.dataList = data.result;
                   this.dataReturnFlag = true;
                   console.log(params)
                  if(params && params.item !=""){
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
  #myPerformance {
    padding: 1.06666667rem .66666667rem;
    .performanceBtn {
      margin-bottom: .26666667rem;
    }
  }

</style>
