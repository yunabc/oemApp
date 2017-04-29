<template>
  <div id="product">
    <invest-header :dataHot="currentDataHot"></invest-header>
    <div class="clockHint">
      <i class="clockImg"><img src="../../common/img/clock.png" alt=""></i>
      <div class="desc">
        <p>开启新产品上线提醒</p>
        <p>抢购快人一步</p>
      </div>
      <div class="swichBtn"><img src="../../common/img/clock.png" alt=""></div>
    </div>
    <invest-list :oldObj="dataObj"></invest-list>
  </div>

</template>

<script>
  import axios from 'axios';
  import investHeader from 'components/common-components/investHeader';
  import investList from 'components/common-components/investList';
  export default {
    data () {
      return {
        dataObj:{
            isCurrent:true
        }
      }
    },
    props:{

    },
     components:{
      investHeader,
      investList
    },
    created(){
      axios.get('../../../static/regularInvest.json').then((res) => {
        let data = res.data;
        if (data.status == 0) {
          this.dataHot = data.result[0];
        } else {
          console.log(data.errorMsg)
        }
      }).catch(function (error) {
        console.log(error);
      });
      this.$root.$on('passObj', this.getObj);
    },
    methods:{
      getObj(obj){
        this.dataObj = Object.assign({},this.dataObj,obj);
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
    .productList{
      padding: 0 .26666667rem;
      .productItem {
        margin-top: .26666667rem;
        padding: .4rem;
        border-radius: .2rem;
        background-color: #fff;
        color: #666666;
        font-size: .26666667rem;
        .itemTitle {
          font-size: .32rem;
          line-height: .32rem;
          margin-bottom: .34666667rem /* 26px */;
          color: #333333;
          font-weight: bold;
        }
        .itemInfo {
          display: flex;
          line-height: 1.5;
          justify-content: space-between;
          .profit {
            .profitNum {
              font-size: .48rem;
              color: red;
              line-height: .56rem /* 42px */;
            }
          }
          .times {
            text-align: center;
            .timesDay {
              font-size: .37333333rem;
              color: @color;
              line-height: .50666667rem;
            }
          }
          .buyBtn {
            width: 2.4rem /* 180px */;
            height: .64rem;
            background-color: @color;
            color: #fff;
            text-align: center;
            line-height: .64rem;
            border-radius: .32rem;
          }
        }

      }

    }

  }

</style>
