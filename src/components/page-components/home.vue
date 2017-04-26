<template>
  <div id="home" class="stageScreen">
    <div class="swiper-container home-banner">
      <div class="swiper-wrapper">
        <a href="" class="swiper-slide"><img src="../../common/img/banner.jpg" alt="" width="100%"></a>
        <a href="" class="swiper-slide"><img class="imgload" src="http://mooc.inxedu.com/images/upload/image/20151026/1446026905031.jpg" alt="首页banner图片02"></a>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <!-- <div class="swiper-button-prev"></div>
       <div class="swiper-button-next"></div>-->
    </div>
    <ul class="home-content">

      <li v-if="productHqViews.length" class="currentInvest investLi" v-for="item in productHqViews" data-id="item.proId">
        <div class="infoDesc">
          <img src="../../common/img/current.png" alt="">
          <div class="desc">
            <a href="" class="title">活期理财</a>
            <div class="subtitle">随存随取 复利计息</div>
          </div>
        </div>
        <div class="deviLine"></div>
        <div class="infoCharge">
          <div class="name">{{item.proName}}</div>
          <div class="profit">{{item.proProspectiveEarn}}%</div>
          <router-link to="/invest/current" class="buyBtn">购买</router-link>
        </div>
      </li>
      <li v-for="(item,index) in productDqViews" class="regularInvest investLi">
        <div class="infoDesc">
          <img src="../../common/img/regular.png" alt="">
          <div class="desc">
            <a href="" class="title">定期理财</a>
            <div class="subtitle">限期丰富 还可转让变活</div>
          </div>
        </div>
        <div class="deviLine"></div>
        <div class="infoCharge">
          <div class="name">{{item.proName}}</div>
          <div class="profit">{{item.proRate}}</div>
          <router-link :to="{ path: 'regular', query: { userId: userId }}"  class="buyBtn">购买</router-link>
        </div>
      </li>
    </ul>
    <foot-nav></foot-nav>
  </div>
</template>

<script>
  import footNav from 'components/common-components/footNav';
  import axios from 'axios';
  import Swiper from 'swiper';
  export default {
    data () {
      return {
        productDqViews: [],
        productHqViews: [],
        userId: "00"
      }

    },
    props: {
      domain: String
    },
    components: {
      footNav
    },
    created(){
      axios.get('../../../static/home.json').then((res) => {
        let data = res.data;
        if (data.status == 0) {
          let result = data.result;
          this.productDqViews = result.productDqViews;
          this.productHqViews = result.productHqViews;
        } else {
          console.log(data.errorMsg)
        }

      }).catch(function (error) {
        console.log(error);
      });
      /*axios.post(this.domain + 'x-service/user/info.htm').then((res) => {
        let response = res.data,result = response.result;
        if(response.status == 0){
          this.userId = result.userId;
        }
      })*/
    },
    mounted () {
      let mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        autoplay: '3000',
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
      })
    },
  }

</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';
  @import '../../../static/css/swiper-3.4.2.min.css';

  #home {
    .home-banner {
      height: 4.8rem;
      /*.swiper-slide{
        img{
          width: 100%;
        }
      }*/
    }

    .home-content {
      padding: 0 .4rem;

      .investLi {
        background-color: #fff;
        margin-top: .4rem;
        border-radius: .13333333rem;

        &:active {
          background-color: @backGrayColor;
        }

        .infoDesc {
          display: flex;
          padding: .50666667rem .66666667rem .4rem;

          img {
            width: .78666667rem;
            height: .77333333rem;
            margin-top: .21333333rem;
          }

          .desc {
            margin-left: .64rem;

            .title {
              font-size: .42666667rem;
              line-height: .48rem;
              font-weight: bold;
              margin-bottom: .32rem;
            }

            .subtitle {
              font-size: .32rem;
              line-height: .4rem;
              color: #666666;
            }

          }
        }
        .deviLine {
          border-top: .01333333rem solid @backGrayColor;
          position: relative;
          margin: .06666667rem 0;

          &:before,
          &:after {
            display: block;
            content: "";
            position: absolute;
            width: .13333333rem;
            height: .26666667rem;
            background-color: @backGrayColor;
            top: -.13333333rem;
          }

          &:before {
            left: 0;
            border-radius: 0 .13333333rem .13333333rem 0;
          }

          &:after {
            right: 0;
            border-radius: .13333333rem 0 0 .13333333rem;
          }

        }
        .infoCharge {
          display: flex;
          padding: .22666667rem .66666667rem;
          justify-content: space-between;
          line-height: .64rem;

          .name {
            font-size: .32rem;
            color: #333333;
          }

          .profit {
            font-size: .42666667rem;
            color: @color;
          }

          .buyBtn {
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
    .swiper-pagination-bullet {
      height: 0.2rem;
      width: 0.2rem;
      margin: 0 0.15rem;
    }

    .swiper-pagination-bullet-active {
      background: @color;
    }

  }


</style>
