<template>
  <div ref="listWrapper" class="list-wrapper  list-wrapper-hook">
    <ul class="productList list-content  list-content-hook" ref="listContent">
      <li class="productItem" v-for="item in dataList">
        <div class="itemTitle">360金融·{{item.proName}}</div>
        <div class="itemInfo">
          <div class="profit">
            <p class="profitNum">{{item.proRate}}%</p>
            <p>预期年化利率</p>
          </div>
          <div class="verticalLine"></div>
          <div  class="times">
            <p><span class="timesDay">{{item.proDayLimit}}</span>天</p>
            <p>期限</p>
          </div>
          <div class="buyBtn">立即购买</div>
        </div>
      </li>
    </ul>
    <div v-if="flag" class="loading-wrapper">
      <div class='uil-default-css' style='transform:scale(0.15);'>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(0deg) translate(0,-60px);transform:rotate(0deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(30deg) translate(0,-60px);transform:rotate(30deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(60deg) translate(0,-60px);transform:rotate(60deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(90deg) translate(0,-60px);transform:rotate(90deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(120deg) translate(0,-60px);transform:rotate(120deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(150deg) translate(0,-60px);transform:rotate(150deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(180deg) translate(0,-60px);transform:rotate(180deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(210deg) translate(0,-60px);transform:rotate(210deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(240deg) translate(0,-60px);transform:rotate(240deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(270deg) translate(0,-60px);transform:rotate(270deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(300deg) translate(0,-60px);transform:rotate(300deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(330deg) translate(0,-60px);transform:rotate(330deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';
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
  /*上拉加载*/
  .list-wrapper {
    position: fixed;
    width: 100%;
    height: 9.67rem;
    overflow: hidden;
    background-color: @backGrayColor;
  }

  .list-wrapper .list-content {
    position: relative;
    z-index: 10;
  }

  .list-wrapper .loading-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  /*上拉刷新等待*/
  @-webkit-keyframes uil-default-anim {
    0% {
      opacity: 1
    }
    100% {
      opacity: 0
    }
  }

  @keyframes uil-default-anim {
    0% {
      opacity: 1
    }
    100% {
      opacity: 0
    }
  }

  .uil-default-css {
    position: relative;
    background: none;
    width: 100%;
    height: 100px;

  }

  .uil-default-css > div:nth-of-type(1) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }

  .uil-default-css > div:nth-of-type(2) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: -0.4166666666666667s;
    animation-delay: -0.4166666666666667s;
  }

  .uil-default-css > div:nth-of-type(3) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: -0.33333333333333337s;
    animation-delay: -0.33333333333333337s;
  }

  .uil-default-css > div:nth-of-type(4) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: -0.25s;
    animation-delay: -0.25s;
  }

  .uil-default-css > div:nth-of-type(5) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: -0.16666666666666669s;
    animation-delay: -0.16666666666666669s;
  }

  .uil-default-css > div:nth-of-type(6) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: -0.08333333333333331s;
    animation-delay: -0.08333333333333331s;
  }

  .uil-default-css > div:nth-of-type(7) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }

  .uil-default-css > div:nth-of-type(8) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: 0.08333333333333337s;
    animation-delay: 0.08333333333333337s;
  }

  .uil-default-css > div:nth-of-type(9) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: 0.16666666666666663s;
    animation-delay: 0.16666666666666663s;
  }

  .uil-default-css > div:nth-of-type(10) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: 0.25s;
    animation-delay: 0.25s;
  }

  .uil-default-css > div:nth-of-type(11) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: 0.33333333333333337s;
    animation-delay: 0.33333333333333337s;
  }

  .uil-default-css > div:nth-of-type(12) {
    -webkit-animation: uil-default-anim 1s linear infinite;
    animation: uil-default-anim 1s linear infinite;
    -webkit-animation-delay: 0.41666666666666663s;
    animation-delay: 0.41666666666666663s;
  }
</style>
<script type="text/ecmascript-6">
  import {getData} from  '../../common/js/investListGetData';
  import BScroll from 'better-scroll';

  export default{
    data () {
      return {
        page:2,
        flag:true,
        singleNum:6
      };
    },
    props: {
      dataList: {
        type: Array
      },
      url:{
        type:String
      }
    },
    mounted(){
      this.$nextTick(() => {
        // 代码保证 this.$el 在 document 中
        this._initScroll();
      });
    },
    methods: {
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.listWrapper, {
            probeType: 1,
            click: true
          });
          this.scroll.on('touchend', (pos) => {
            //条件判断有误,第一次移动不了
            console.log(pos)
            let listContent = this.$refs.listContent;
            let listWrapper = this.$refs.listWrapper;
            let contentH = listContent.offsetHeight;
            let screenH = listWrapper.clientHeight;
            let scrollTop = Number(listContent.style.transform.replace(/[^\d\.px]/g, '').split('px')[1]);
            if (-pos.y + contentH > screenH + scrollTop - 50) {
              console.log(-pos.y, contentH, screenH + scrollTop - 50);
              setTimeout(() => {
                getData(this.url);
                this.scroll.refresh()
              }, 1000)
            }
          })
        } else {
          // 未取到数据,所以不能滚动
          this.scroll.refresh();
        }
      },
    }
  };

</script>
