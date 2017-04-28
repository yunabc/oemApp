<template>
  <div id="product">
    <invest-header :dataHot="regularDataHot"></invest-header>
    <div class="clockHint">
      <i class="clockImg"><img src="../../common/img/clock.png" alt=""></i>
      <div class="desc">
        <p>开启新产品上线提醒</p>
        <p>抢购快人一步</p>
      </div>
      <div class="swichBtn"><img src="../../common/img/clock.png" alt=""></div>
    </div>
    <invest-list :dataList="regularData" :flag="flag" :url="url"></invest-list>
  </div>

</template>
<script>
  import investHeader from 'components/common-components/investHeader';
  import investList from 'components/common-components/investList';
  import {getData} from '../../common/js/investListGetData';
  export default {
    data () {
      return {
        url:'../../../static/regularInvest.json',
        regularDataHot:{},
        regularData:[],
        flag:true
      }
    },
    props:{

    },
    components:{
      investHeader,
      investList
    },
    created(){
       let dataObj = getData({url:this.url,page:1});
       console.log(dataObj)
       this.regularDataHot = dataObj.dataHot;
       this.regularData = dataObj.dataList;
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
