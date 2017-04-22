<template>
  <div id="product">
    <div class="investHeader">
      <div class="title">360金融.活期-20170101</div>
      <div class="profit">7.0%</div>
      <div class="times">期限<span class="days">242</span>天</div>
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
    <ul class="productList">
      <li class="productItem">
        <div class="itemTitle">360金融.活期-20170101</div>
        <div class="itemInfo">
          <div class="profit">
            <p class="profitNum">6.5%</p>
            <p>预期年化利率</p>
          </div>
          <div class="verticalLine"></div>
          <div class="times">
            <p><span class="timesDay">233</span>天</p>
            <p>期限</p>
          </div>
          <div class="buyBtn">立即购买</div>
        </div>
      </li>
    </ul>
  </div>

</template>

<script>
    export default {
      name:'product',
      data () {
            return {}
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';

  #product{
  .investHeader{
    display: flex;
    flex-flow:column;
    align-items:center;
    padding: 40px 0;
    background-color: #fff;
    margin-bottom: 20px;
    div{
      margin-bottom: 40px;
    }
    .title{
      font-size: 28px;
      line-height: 28px;
    }
    .profit{
      font-size: 48px;
      line-height: 48px;
      margin-bottom: 20px;
    }
    .times{
      font-size: 20px;
      .days{
        font-size: 24px;
        color: red;
      }
    }
    .buyBtn{
      width: 480px;
      height: 68px;
      border: 3px solid @color;
      text-align: center;
      font-size: 28px;
      color: @color;
      line-height: 68px;
      border-radius: 34px;
    }
  }
  .clockHint{
    display: flex;
    background-color: #fff;
    padding:22px 50px;
    img{
      margin-top: 4px;
      margin-right: 30px;
    }
    .desc{
      font-size: 24px;
      line-height: 28px;
      flex: 1;
      color: #666666;
    }
  }
  .productList{
    padding: 0 20px;
    .productItem{
      margin-top: 20px;
      padding: 30px;
      border-radius: 15px;
      background-color: #fff;
      color:#666666;
      font-size:20px;
      .itemTitle{
        font-size: 24px;
        line-height: 24px;
        margin-bottom: 26px;
        color: #333333;
        font-weight: bold;
      }
      .itemInfo{
        display:flex;
        line-height:1.5;
        justify-content:space-between;
        .profit{
          .profitNum{
            font-size: 36px;
            color: red;
            line-height: 42px;
          }
        }
        .times{
          text-align: center;
          .timesDay{
            font-size: 28px;
            color: @color;
            line-height: 38px;
          }
        }
        .buyBtn{
          width: 180px;
          height: 48px;
          background-color: @color;
          color: #fff;
          text-align: center;
          line-height: 48px;
          border-radius: 24px;
        }
      }

    }

  }

}

</style>
