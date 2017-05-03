<template>
  <div id="product" v-if="dataAll && dataAll.length">
    <invest-header :dataHot="dataHot" :userInfo="userInfo"></invest-header>
    <div class="clockHint">
      <i class="clockImg"><img src="../../common/img/clock.png" alt=""></i>
      <div class="desc">
        <p>开启新产品上线提醒</p>
        <p>抢购快人一步</p>
      </div>
      <div class="swichBtn"><img src="../../common/img/clock.png" alt=""></div>
    </div>

    <invest-list :promiseObj="promiseObj" :flag="flag" :dataList="dataList" :page="page" :url="url" :userInfo="userInfo" :investurl="regular"></invest-list>
  </div>
  <div class="noContent" v-else>暂无数据</div>

</template>
<script>
  import axios from 'axios';
  import qs from 'qs';
  import investHeader from 'components/page-components/investHeader';
  import investList from 'components/page-components/investList';
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
        singleNum:6
      }
    },
    props:{
      userInfo: Object,
    },
    components:{
      investHeader,
      investList
    },
    created(){
      // this.url = this.domain + this.url;
      this.promiseObj = new Promise(resolve => {
        axios.post(this.url,qs.stringify({
          page:this.page
        })).then((res) => {
          let data = res.data;
          if (data.status == 0) {
            this.dataAll = data.result;
            this.dataHot = data.result[0];
            this.dataList = data.result.slice(1);
            this.page++;
            if(data.result.length === 0 || data.result.length<this.singleNum){
              this.flag = false
            }
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
  @import '../../common/style/commoncolor.less';

  #product {
    .clockHint {
      display: flex;
      display: none;
      background-color: #fff;
      padding: .29333333rem .66666667rem;
      img {
        margin-top: .05333333rem;
        margin-right: .4rem;
      }
      .desc {
        font-size: .32rem;
        line-height: .37333333rem;
        flex: 1;
        color: #666666;
      }
    }
  }

</style>
