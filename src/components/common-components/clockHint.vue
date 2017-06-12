<template>
  <div class="clockHint" v-if="clockTip">
    <i class="clockImg"><img src="../../common/img/clock.png" alt=""></i>
    <div class="desc">
      <p>开启新产品上线提醒</p>
      <p>抢购快人一步</p>
    </div>
    <transition name="switch">
      <div class="switchBtnArea"  :class="clockFlag?'on':'off'" v-tap="{methods:toggleClick}">

        <div class="switchBtn"></div>
      </div>
    </transition>
    <v-confirm :leftmsg="leftmsg" :msg="msg" @sure="confirmSure" @cancle="closeWindow" v-if="openConfirm"></v-confirm>
  </div>
</template>

<script>
  import confirm from '../common-components/confirm.vue'

    export default {
        data () {
            return {
                clockFlag:false,
                clockTip:false,
                openConfirm: false,
                msg:'',
                leftmsg:'去设置'
            }
        },
        created(){
          var that = this;
          if(this.deviceN()){
            this.clockTip = true;
            // 调app方法
            if(typeof android4js !=="undefined" && typeof android4js.isPushStopped == 'function'){
              if(android4js.isPushStopped()){
                this.clockFlag = true;
              }
            }else{
              window.webkit.messageHandlers.ViewController.postMessage({methodName:'isPushStopped'});
            }
          }
          window.toMessageStatus=function(status){
            
            if(status=="true"){
              that.clockFlag = true;
            }

          };
          // window.toMessageStatus('aaa');
        },
        methods:{
            toggleClick(){
              // 调app打开或关闭提醒
              if(typeof android4js !=="undefined" && typeof android4js.opentOrCloseMessage == 'function'){
                this.clockFlag = !this.clockFlag;
                android4js.opentOrCloseMessage(this.clockFlag);
              }else{
                  // 关闭状态打开
                  this.openConfirm = true,
                  this.msg='请到设置-通知-信金融中设置消息通知'
              }
            },
            confirmSure() {
              this.openConfirm=false;
              this.clockFlag = !this.clockFlag;
              window.webkit.messageHandlers.ViewController.postMessage({methodName:'openMessage'});
            },
            closeWindow(bool) {
              this.openConfirm = bool; 

            },
        },
        components:{
          'v-confirm':confirm,
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';

  .clockHint {
    display: flex;
     //display: none;
    background-color: #fff;
    padding: .15333333rem .66666667rem;
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
