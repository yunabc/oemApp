<template>
  <div v-if="dataReturnFlag">
    <div id="product" v-if="dataAll && dataAll.length">
      <invest-header :dataHot="dataHot" ></invest-header>
      <clock-hint></clock-hint>
      <invest-list :promiseObj="promiseObj" :flag="flag" :dataList="dataList" :page="page" :url="url" :investurl="regular"></invest-list>
    </div>
    <div class="noContent" v-else>暂无数据</div>
  </div>


</template>
<script>
  import axios from 'axios';
  import qs from 'qs';
  import investHeader from 'components/page-components/investHeader';
  import investList from 'components/page-components/investList';
  import clockHint from 'components/common-components/clockHint';
  export default {
    data () {
      return {
        regular:'regular',
        url: "/x-service/pro/dq.htm",
        flag:true,
        dataAll:[],
        dataHot:{},
        dataList:[],
        page:1,
        promiseObj:{},
        singleNum:6,
        dataReturnFlag:false
      }
    },
    props:{
    },
    components:{
      investHeader,
      investList,
      clockHint
    },
    created(){
      // this.url = this.domain + this.url;
      this.promiseObj = new Promise(resolve => {
        axios.post(this.url,qs.stringify({
          page:this.page
        })).then((res) => {
          let data = res.data;
          if (data.status == 0) {
            if(data.result){
              this.dataAll = data.result;
              this.dataHot = data.result[0];
              this.dataList = data.result.slice(1);
            }
            if(!data.result || data.result.length === 0 || data.result.length<this.singleNum){
              this.flag = false
            }
            this.page++;
            this.dataReturnFlag = true
          } else {
            console.log(data.errorMsg)
          }
          return resolve(res);
        }).catch(function (error) {
          console.log(error);
        });
      })

      this.$root.$on('passObj', this.getObj);
    },
    methods:{
        getObj(obj){
            this.flag = obj.flag;
            this.dataList = obj.dataList;
            this.page = obj.page;
        }
    }
  }

</script>

<style lang="less" rel="stylesheet/less">


</style>
