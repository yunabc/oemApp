<template>
  <div id="product">
    <div class="investHeader" >
      <div class="title">{{currentDataHot.proName}}<!--360金融.活期-20170101--></div>
      <div class="profit">{{currentDataHot.proRate}}%</div>
      <div class="times">{{currentDataHot.proProspectiveEarnText}}<!--期限--><span class="days">{{currentDataHot.proProspectiveEarn}}</span><!--天--></div>
      <div class="buyBtn">立即购买</div>
    </div>
    <div class="clockHint">
      <i class="clockImg"><img src="../../common/img/clock.png" alt=""></i>
      <div class="desc">
        <p>开启新产品上线提醒</p>
        <p>抢购快人一步</p>
      </div>
      <div class="swichBtn"><img src="../../common/img/clock.png" alt=""></div>
    </div>
    <ul v-for="item in currentData" class="productList">
      <li class="productItem">
        <div class="itemTitle">{{item.proName}}<!--360金融.活期-20170101--></div>
        <div class="itemInfo">
          <div class="profit">
            <p class="profitNum">{{item.proRate}}%</p>
            <p>{{item.proRateTips}}<!--预期年化利率--></p>
          </div>
          <div class="verticalLine"></div>
          <div v-if="time" class="times">
            <p><span class="timesDay">{{item.proProspectiveEarn}}</span><!--天--></p>
            <p>{{item.proProspectiveEarnText}}期限</p>
          </div>
          <div class="buyBtn">立即购买</div>
        </div>
      </li>
    </ul>
  </div>

</template>

<script>
  import axios from 'axios';

  export default {
    data () {
      return {
        time: true,
        currentDataHot:{},
        currentData:[]
      }
    },
    props:{

    },
    created(){
      axios.get('../../../static/currentInvest.json').then((res) => {
        let data = res.data;
        if (data.status == 0) {
          this.currentDataHot = data.result[0];
          this.currentData = data.result.splice(1);
        } else {
          console.log(data.errorMsg)
        }

      }).catch(function (error) {
        console.log(error);
      });
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';

  #product {
    .investHeader {
      display: flex;
      flex-flow: column;
      align-items: center;
      padding: .53333333rem 0;
      background-color: #fff;
      margin-bottom: .26666667rem;
      div {
        margin-bottom: .53333333rem;
      }
      .title {
        font-size: .37333333rem;
        line-height: .37333333rem;
      }
      .profit {
        font-size: .64rem;
        line-height: .64rem;
        margin-bottom: .26666667rem;
      }
      .times {
        font-size: .26666667rem;
        .days {
          font-size: .32rem;
          color: red;
        }
      }
      .buyBtn {
        width: 6.4rem;
        height: .90666667rem;
        border: .04rem solid @color;
        text-align: center;
        font-size: .37333333rem;
        color: @color;
        line-height: .90666667rem;
        border-radius: .45333333rem /* 34px */;
      }
    }
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
    .productList {
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
