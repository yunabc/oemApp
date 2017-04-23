<template>
  <div id="home">
    <div class="home-banner">
      <div class="swiper-slide"><img src="../../common/img/banner.jpg" alt="" width="100%"></div>
    </div>
    <ul class="home-content">
      <li class="currentInvest investLi">
        <div class="infoDesc">
          <img src="../../common/img/current.png" alt="" >
          <div class="desc">
            <a href="" class="title">活期理财</a>
            <div class="subtitle">随存随取 复利计息</div>
          </div>
        </div>
        <div class="deviLine"></div>
        <div class="infoCharge">
          <div class="name">360金融.活期-20170101</div>
          <div class="profit">4.5%</div>
          <router-link to="/invest/current" class="buyBtn">购买</router-link>
        </div>
      </li>
      <li class="currentInvest investLi">
        <div class="infoDesc">
          <img src="../../common/img/regular.png" alt="">
          <div class="desc">
            <a href="" class="title">定期理财</a>
            <div class="subtitle">限期丰富 还可转让变活</div>
          </div>
        </div>
        <div class="deviLine"></div>
        <div class="infoCharge">
          <div class="name">360金融.活期-20170101</div>
          <div class="profit">4.5%</div>
          <router-link to="/invest/regular" class="buyBtn">购买</router-link>
        </div>
      </li>
    </ul>
    <foot-nav></foot-nav>
  </div>
</template>

<script>
  import footNav from 'components/common-components/footNav';
  export default {
    data () {
      return {}
    },
    components:{
      footNav
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';
  #home{
    background-color: @backGrayColor;
    height: 100%;
    .home-content{
      padding: 0 30px;
      .investLi{
        background-color: #fff;
        margin-top: 30px;
        border-radius:10px;
        &:active{
          background-color: @backGrayColor;
         }
        .infoDesc{
          display:flex;
          padding: 38px 50px 30px;
          img{
            width: 59px;
            height: 58px;
            margin-top: 16px;
          }
          .desc{
            margin-left:48px;
            .title{
              font-size: 32px;
              line-height: 36px;
              font-weight: bold;
              margin-bottom: 24px;
            }
            .subtitle{
              font-size: 24px;
              line-height: 30px;
              color: #666666;
            }
          }
        }
        .deviLine{
          border-top: 1px solid @backGrayColor;
          position:relative;
          margin:5px 0;
          &:before,&:after{
             display:block;
             content:"";
             position:absolute;
            width: 10px;
            height: 20px;
            background-color: @backGrayColor;
            top:-10px
          }
          &:before{
            left: 0;
             border-radius: 0 10px 10px 0;
          }
          &:after{
             right: 0;
             border-radius: 10px 0 0 10px;
           }
        }
        .infoCharge{
          display: flex;
          padding: 17px 50px;
          justify-content:space-between;
          line-height:48px;
          .name{
            font-size: 24px;
            color: #333333;
          }
          .profit{
            font-size: 32px;
            color: @color;
          }
          .buyBtn{
            width: 120px;
            height: 48px;
            border-radius: 24px;
            text-align: center;
            color: #fff;
            background-color: @color;

          }
        }

      }

    }
  }


</style>
