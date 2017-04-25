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
  import axios from 'axios';
  export default {
    data () {
      return {
        userId: ""
      }
    },
    props: {
      domain: String
    },
    created() {
      /*axios.post(this.domain + 'x-service/user/info.htm').then((res) => {
        let response = res.data,result = response.result;
        if(response.status == 0){
          this.userId = result.userId;
        }
      })*/
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
      padding: 0 .4rem;
      .investLi{
        background-color: #fff;
        margin-top: .4rem;
        border-radius:.13333333rem;
        &:active{
          background-color: @backGrayColor;
         }
        .infoDesc{
          display:flex;
          padding: .50666667rem .66666667rem .4rem;
          img{
            width: .78666667rem;
            height: .77333333rem;
            margin-top: .21333333rem;
          }
          .desc{
            margin-left:.64rem;
            .title{
              font-size: .42666667rem;
              line-height: .48rem;
              font-weight: bold;
              margin-bottom: .32rem;
            }
            .subtitle{
              font-size: .32rem;
              line-height: .4rem;
              color: #666666;
            }
          }
        }
        .deviLine{
          border-top: .01333333rem solid @backGrayColor;
          position:relative;
          margin:.06666667rem 0;
          &:before,&:after{
            display:block;
            content:"";
            position:absolute;
            width: .13333333rem;
            height: .26666667rem;
            background-color: @backGrayColor;
            top:-.13333333rem;
          }
          &:before{
            left: 0;
             border-radius: 0 .13333333rem .13333333rem 0;
          }
          &:after{
             right: 0;
             border-radius: .13333333rem 0 0 .13333333rem;
           }
        }
        .infoCharge{
          display: flex;
          padding: .22666667rem .66666667rem;
          justify-content:space-between;
          line-height:.64rem;
          .name{
            font-size: .32rem;
            color: #333333;
          }
          .profit{
            font-size: .42666667rem;
            color: @color;
          }
          .buyBtn{
            width: 1.6rem;
            height: .64rem;
            border-radius: .32rem;
            text-align: center;
            color: #fff;
            background-color: @color;

          }
        }

      }

    }
  }


</style>
