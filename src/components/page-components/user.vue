<template>
<div id="user" class="stageScreen">
  <div v-if="vip" class="userHeader">
    <div class="moneyNum">1,111.00</div>
    <p>累计佣金(元)</p>
  </div>
  <ul class="userCenterList">
    <li class="invite userCenterItem userItemLine" @click="share()">
      <p class="text">邀请新用户</p>
    </li>
    <router-link to="/user/performance" :userInfo="userInfo" v-if="vip" class="performance userCenterItem userItemLine">
      <p class="text">规模绩效</p>
    </router-link>
    <li class="userCenterItem">
      <div class="logs  userItemLine" :class="logsStatus" @click="toggleList">
        <p class="text">投资记录</p>
      </div>
      <div class="logsList" v-show="logsStatus == 'up'">
        <a  v-for="item in logsList" :data-id="item.plateId"  href="javascript:void(0)" class="logsItem" @click="logHandler(item)">{{item.plateName}}</a>
      </div>
    </li>
    <router-link to="/account" class="manage userCenterItem userItemLine">
      <p class="text">账户管理</p>
    </router-link>
  </ul>
  <foot-nav :userInfo="userInfo"></foot-nav>
  <v-alert :msg="msg" @close="closeWindow" v-if="openWindow"></v-alert>
</div>
</template>

<script>
  import footNav from 'components/common-components/footNav';
  import alert from '../common-components/alert.vue'
  import axios from 'axios';
  import qs from 'qs';
  import {wxShare} from '../../common/js/wxShare'
  export default {
    data () {
        return {
          vip:false,
          logsStatus:"down",
          logsList:[],
          option:{},
          userInfo:{},
          msg:'敬请期待',
          openWindow: false,
        }
    },
    components:{
      footNav,
      'v-alert': alert
    },
    created(){
      console.log(this.userInfo);
      this.userInfo = this.$store.state.personalInfo || {};
      if(this.userInfo['signFlag'] == '00'){
        this.vip=true;
      }
      this.option.userInviterId = this.userInfo.userId;
       /*微信分享*/
      axios.get('/x-service/user/share.htm').then((res) => {
        let data = res.data;
        if (data.status == 0) {
        console.log(1)
           this.option.appId = data.result.appId
           this.option.timestamp = data.result.timestamp
           this.option.nonceStr = data.result.nonceStr
           this.option.signature = data.result.signature
        } else {
          console.log(data.errorMsg)
        }

      }).catch(function (error) {
        console.log(error);
      });
      /*获取列表*/
      axios.post('/x-service/user/plate.htm',qs.stringify({userId:this.userInfo.userId})).then((res) => {
        let data = res.data;
        if (data.status == 0) {
           this.logsList = data.result;
        } else {
          console.log(data.errorMsg)
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    methods:{
      toggleList(){
        //this.logsList = this.logsList == "down" ? "down" : "up";
        if(this.logsStatus == 'down'){
          this.logsStatus = 'up'
        }else{
          this.logsStatus = 'down'
        }
      },
      share(){
        console.log(2)
        wxShare(this.option)
      },

      closeWindow(bool) {
        this.openWindow = bool;

      },
      logHandler(item){
        if(item.plateStatus != 0){
          axios.post('/x-service/user/record.htm',qs.stringify({
            userId: this.userInfo.userId,
            plateId:item.plateId
          })).then((res) => {
            let data = res.data;
            if (data.status == 0) {
               window.location.href = data.result.allRedirectUrl
            } else {
              console.log(data.errorMsg)
            }
          }).catch(function (error) {
            console.log(error);
          });
        }else{
          this.openWindow = true;
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';

  #user{
    .userHeader{
      display: flex;
      align-items:center;
      justify-content:center;
      flex-flow: column;
      height: 5.12rem/* 384px */;
      margin-bottom: .26666667rem;
      background-color: @color;
      color: #fff;
      font-size:.26666667rem;
      .moneyNum{
        font-size: .8rem;
        line-height: .90666667rem;
      }
      p{
        color: #fff;
      }
    }
    .userCenterList{
      background-color: #fff;
      font-size: .32rem;
      padding:0 .4rem;
      .userCenterItem{
        border-bottom: .01333333rem solid @lineGrayColor;
        .logsList{
          padding-left: 1.02666667rem/* 77px */;
          .logsItem{
            color: #818181;
            border-bottom: none;
            height: .69333333rem/* 52px */;
          }
        }
      }
      .userItemLine{
        line-height: 1.38666667rem/* 104px */;
        padding-left:1.02666667rem;
        &:last-child{
           border-bottom:none;
         }
        &.invite{
          background: url("../../common/img/invite.png") left center no-repeat;
          background-size: .42666667rem .58666667rem/* 44px */;
         }
         &.performance{
            background: url("../../common/img/performance.png") left center no-repeat;
            background-size: .57333333rem .58666667rem;
          }
         &.logs{
           background: url("../../common/img/logs.png") left center no-repeat;
           background-size: .61333333rem .61333333rem;
           position:relative;
            &.down,&.up{
              &:after{
                 display:block;
                 content:"";
                 position:absolute;
                 width: 0;
                 height: 0;
                 top:50%;
                 right:0;

               }
             }
            &.down{
              &:after{
                 border-top: .13333333rem solid #000;
                 border-left: .13333333rem solid transparent;
                 border-right: .13333333rem solid transparent;
               }
             }
            &.up{
              &:after{
                 border-bottom: .13333333rem solid #000;
                 border-left: .13333333rem solid transparent;
                 border-right: .13333333rem solid transparent;
               }
            }
         }
         &.manage{
           background: url("../../common/img/manage.png") left center no-repeat;
           background-size: .58666667rem .58666667rem;
         }


      }

    }

  }


</style>
