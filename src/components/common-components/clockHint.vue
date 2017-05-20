<template>
  <div class="clockHint" >
    <i class="clockImg"><img src="../../common/img/clock.png" alt=""></i>
    <div class="desc">
      <p>开启新产品上线提醒</p>
      <p>抢购快人一步</p>
    </div>
    <transition name="switch">
      <div class="switchBtnArea"  :class="clockFlag?'on':'off'" @click="toggleClick()">
        <div class="switchBtn"></div>
      </div>
    </transition>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                clockFlag:false
            }
        },
        methods:{
            toggleClick(){
                this.clockFlag = !this.clockFlag
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';

  .clockHint {
    display: flex;
     //display: none;
    background-color: #fff;
    padding: .29333333rem .66666667rem;
    img {
      margin-top: .05333333rem;
      margin-right: .4rem;
    }
    .desc {
      flex: 1;
      color: #666666;
      p{
        font-size: .32rem;
        line-height: 1.5;
      }
    }
    .switchBtnArea{
      border: 1px solid #e0e0e0;
      border-radius: 20px;
      height: 40px;
      width: 80px;
      margin: auto;
      .switchBtn{
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #fff;
        margin: 4px;
      }
      &.on{
        transition: all 1s;
        background-color: @color;
        .switchBtn{
          transition: all 1s;
          transform: translateX(40px);
        }
      }
      &.off{
        transition: all 1s;
        background-color: #f5f6f7;
        .switchBtn{
          transition: all 1s;
          transform: translateX(0);
        }
      }
      &.switch-enter,&.switch-leave-active{
        .switchBtn{
          transform: translateX(0);
        }
      }
      &.switch-enter-active,&.switch-leave{
        .switchBtn{
          transform: translateX(40px);
        }

      }
    }
/*动画*/

  }

</style>
