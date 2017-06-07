<template>
  <div class="wrapper-box">
    <div id="home" class="stageScreen">
      <div class="container">
        <div class="swiper-container home-banner" v-if="bannerImgs.length>1">
          <div class="swiper-wrapper">
            <a v-for="item in bannerImgs" :href="item.triggerType==1?item.tiggerUrl:noUrl" class="swiper-slide"><img
              :src="item.bannerUrl" :alt="item.bannerTitle" width="100%"></a>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <!-- <div class="swiper-button-prev"></div>
           <div class="swiper-button-next"></div>-->
        </div>
        <div class="home-banner" v-else>
          <a v-for="item in bannerImgs" :href="item.triggerType?item.tiggerUrl:noUrl" class="swiper-slide">
            <img :src="item.bannerUrl" :alt="item.bannerTitle" width="100%">
          </a>
        </div>
        <div class="download-txt" v-if="notApp" v-tap="{methods:downLoadApp}">点击下载信金融APP</div>
        <div class="home-content" v-if="productDqViews || productHqViews">
          <div class="currentInvest investLi" v-if="productHqViews" >
            <router-link to="/invest/current">
              <div class="infoDesc">
                <img src="../../common/img/current.png" alt="">
                <div class="desc">
                  <a href="" class="title">活期理财</a>
                  <!-- <div class="subtitle">随存随取 复利计息</div> -->
                </div>
                <div class="nextIcon"></div>
              </div>
              <ul>
                <li v-for="item in productHqViews" :data-id="item.proId">
                  <div class="deviLine"></div>
                  <div class="infoCharge">
                    <div class="name qhicon" >{{item.proName}}</div>
                    <div class="profit">{{item.proRate}}%</div>
                    <div class="buyBtn">购买</div>
                  </div>
                </li>
              </ul>
            </router-link>
          </div>
          <div class="regularInvest investLi" v-if="productDqViews">
            <router-link :to="{ path: '/invest/regular'}">
              <div class="infoDesc">
                <img src="../../common/img/regular.png" alt="">
                <div class="desc">
                  <a href="" class="title">定期理财</a>
                  <!-- <div class="subtitle">限期丰富 还可转让变活</div> -->
                </div>
                <div class="nextIcon"></div>
              </div>
              <ul>
                <li v-for="item in productDqViews" :data-id="item.proId">
                  <div class="deviLine"></div>
                  <div class="infoCharge">
                    <div class="name " :class="item.proName.indexOf('360')>-1 ? 'qhicon':''" >{{item.proName}}</div>
                    <div class="profit">{{item.proRate}}</div>
                    <div class="buyBtn">购买</div>
                  </div>
                </li>
              </ul>
            </router-link>

          </div>
        </div>
        <div class="noContent" v-else>暂无数据</div>
      </div>
      <div class="zhezhao" v-if="shareTo"></div>
      <div class="share-arrow shareArrow2" v-if="shareTo"><div class="close" v-tap="{methods:closeFn}"></div></div>
    </div>
    <foot-nav></foot-nav>
    
  </div>
</template>

<script>
  import footNav from 'components/common-components/footNav';
  import qs from 'qs';
  import axios from 'axios';
  import Swiper from 'swiper';
  export default {
    data () {
      return {
        bannerImgs: [],
        noUrl: "javascript:void(0)",
        productDqViews: [],
        productHqViews: [],
        shareTo:false,
        notApp:false,

      }

    },
    components: {
      footNav
    },
    created(){
      console.log(this.browVersions)
      if(!this.deviceN()){
        // 不是app
        if(!this.browVersions.ios){
          this.notApp = true;
        }
      }
      axios.post('/x-service/pro/index.htm').then((res) => {
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
      /*轮播图接口*/
      axios.post('/x-service/banner/ls.htm').then((res) => {
        let data = res.data;
        if (data.status == 0) {
          this.bannerImgs = data.result;
          this.$nextTick(() => {
            this.swiperHandle()
          })
        } else {
          console.log(data.errorMsg)
        }
      }).catch(function (error) {
        console.log(error);
      });

    },
    methods: {
      /*swiper*/
      swiperHandle(){
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
      closeFn() {
        this.shareTo = !this.shareTo;
      },
      downLoadApp() {
        if (this.browVersions.weixin || this.browVersions.weibo) {
          this.shareTo = true;
        } else if (!this.browVersions.ios) {
          // 安卓
          clearTimeout(timer);
          var state = null;
          try {
            // timer=window.location = 'jmwiki://';
            setTimeout(function () {
              window.location = "/file/app/android/xinjinrong.apk";

            }, 25);
          } catch (e) {
            console.log(e);
          }

        } else if (this.browVersions.ios) {
          // ios
          // 方案一
          clearTimeout(timer);
          var loadDateTime = new Date();
          var timer = window.setTimeout(function () {
            var timeOutDateTime = new Date();
            if (timeOutDateTime - loadDateTime < 5000) {
              // window.location = "https://itunes.apple.com/cn/app/%E7%9D%80%E8%BF%B7wiki-%E6%BA%90%E8%87%AA%E4%B8%AD%E5%9B%BD%E9%A2%86%E5%85%88%E7%9A%84%E5%85%B4%E8%B6%A3wiki%E7%A4%BE%E7%BE%A4%E5%B9%B3%E5%8F%B0/id1214161152?ls=1&mt=8";
              window.location = 'itms-apps%3A%2F%2Fitunes.apple.com%2Fus%2Fapp%2F%E4%BF%A1%E9%87%91%E8%9E%8D-%E6%8F%90%E4%BE%9B%E5%89%8D%E6%B2%BF-%E4%B8%93%E4%B8%9A-%E9%AB%98%E6%95%88%E7%9A%84%E7%BB%BC%E5%90%88%E9%87%91%E8%9E%8D%E6%9C%8D%E5%8A%A1%E4%BF%A1%E6%81%AF%E5%B9%B3%E5%8F%B0%2Fid1238561217%3Fl%3Dzh%26ls%3D1%26mt%3D8';
            } else {
              window.close();
            }
          }, 25);
        }
      },
    },
  }


</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';
  @import '../../../static/css/swiper-3.4.2.min.css';

  #home {
    .zhezhao{
      position: fixed;
      z-index: 100;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.8)
    }
    .share-arrow{
      position: fixed;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 101;
      top: 0;
      background: url(../../../static/img/tip_content_01.png) 65% 18% no-repeat;
      background-size: 80%;
      &.shareArrow2{
        background: url(../../common/img/tip_content_01.png) 65% 18% no-repeat;
        background-size: 80%;
      }
      .close{
        width: 2.906667rem;
        height: 1.453333rem;
        background: url(../../common/img/button.png) left top no-repeat;
        background-size: 100%;
        position: absolute;
        top: 45%;
        left: 50%;
        margin-left: -1.453333rem;

      }
    }
    .home-banner {
      width: 100%;
      height: 4.8rem;
      background-color: #fff;
      .swiper-slide {
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .download-txt {
      height: .8rem;
      font-size: .32rem;
      color: #333333;
      padding-left: .4rem;
      background-color: rgba(240, 123, 85, 0.2);
      line-height: .8rem;
      text-align: center;
      font-weight: normal;
      cursor: pointer;
    }
    .home-content {
      padding: .3rem .4rem 0;
      .investLi {
        background-color: #fff;
        margin-bottom: .4rem;
        border-radius: .13333333rem;

        &:active {
          background-color: @backGrayColor;
        }

        .infoDesc {
          // display: flex;
          padding: .50666667rem .66666667rem .4rem;

          img {
            width: 0.786667rem;
            vertical-align: middle;
          }

          .desc {
            margin-left: .64rem;
            // width: 100%;
            display: inline-block;
            vertical-align: middle;
            .title {
              font-size: .42666667rem;
              line-height: .48rem;
              font-weight: bold;
            }
            .subtitle {
              font-size: .32rem;
              line-height: .4rem;
              color: #666666;
            }
          }
          .nextIcon {
            float: right;
            // display: inline-block;
            margin-top: .22rem ;
            height: 0.25rem;
            width: 0.25rem;
            border-top: 0.03rem solid #d4d4d4;
            border-right: 0.03rem solid #d4d4d4;
            transform: rotate(45deg);
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
            &.qhicon{
              padding-left: 50px;
              background:url(../../common/img/360.jpg) left center no-repeat;
              background-size: 40px;
            }
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
