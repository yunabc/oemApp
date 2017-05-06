<template>
<div id="user" class="stageScreen">
  <div v-if="vip" class="userHeader">
    <div class="moneyNum">{{userInfo.totalMoney}}</div>
    <p>{{userInfo.totalMoneyText}}</p>
  </div>
  <ul class="userCenterList">
    <li class="invite userCenterItem userItemLine" v-tap="{methods:share}">
      <p class="text">邀请新用户</p>
    </li>
    <router-link to="/user/performance" :userInfo="userInfo" v-if="vip" class="performance userCenterItem userItemLine">
      <p class="text">规模绩效</p>
    </router-link>
    <li class="userCenterItem">
      <div class="logs  userItemLine" :class="logsStatus" v-tap="{methods:toggleList}">
        <p class="text">投资记录</p>
      </div>
      <div class="logsList" v-show="logsStatus == 'up'">
        <a  v-for="item in logsList" :data-id="item.plateId"  href="javascript:void(0)" class="logsItem" v-tap="{methods:logHandler,item:item.plateId,item2:item.plateStatus}">{{item.plateName}}</a>
      </div>
    </li>
    <li class="manage userCenterItem userItemLine">
      <p class="text" v-tap="{methods:ckeckDetail}">账户管理</p>
    </li>
  </ul>
  <div class="logout" v-tap="{methods:logout}">退出</div>
  <div class="zhezhao" v-if="shareTo"></div>
  <div class="share-arrow" v-if="shareTo"><i class="fa fa-times" aria-hidden="true" v-tap="{methods:closeFn}"></i></div>
  <foot-nav :userInfo="userInfo" :active="active"></foot-nav>
  <v-alert :msg="msg" @close="closeWindow" v-if="openWindow"></v-alert>
  <v-confirm :msg="msg" @sure="confirmSure" @cancle="closeWindow" v-if="openConfirm"></v-confirm>
</div>
</template>

<script>
  import footNav from 'components/common-components/footNav';
  import alert from '../common-components/alert.vue'
  import confirm from '../common-components/confirm.vue'
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
          active:"active",
          msg:'敬请期待',
          openWindow: false,
          openConfirm: false,
          pathUrl:'',
          shareTo:false,
        }
    },
    components:{
      footNav,
      'v-alert': alert,
      'v-confirm': confirm,
    },
    created(){
      this.userInfo = this.$store.state.personalInfo || {};
      console.log(this.userInfo);
      if(this.userInfo['signFlag'] == '00'){
        this.vip=true;
      }
      this.option.userInviterId = this.userInfo.userId;
       /*微信分享*/
      axios.post('/x-service/user/share.htm',qs.stringify({
        signUrl: location.href.split('#')[0]
      })).then((res) => {
        let data = res.data;
        if (data.status == 0) {
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
          // var that =this;
          // this.msg = data.errorMsg;
          // this.openWindow = true;
          // setTimeout(function(){
          //   that.$router.push({ name: 'login',query:{topage:'user'}})
          // },1500)
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    methods:{
      closeFn() {
        this.shareTo = !this.shareTo
      },
      toggleList(){
        //this.logsList = this.logsList == "down" ? "down" : "up";
        if(this.logsStatus == 'down'){
          this.logsStatus = 'up'
        }else{
          this.logsStatus = 'down'
        }
      },
      share(){
        // console.log(window.location)
        this.pathUrl = window.location.origin + window.location.pathname;
        wxShare(this.option,this.pathUrl)
        this.shareTo = true;
      },
      logout(){
         
         this.openConfirm = true;
         this.msg = '确定要退出了吗？'
      },
      ckeckDetail() {
        axios.post('/x-service/user/info.htm',qs.stringify({userId:this.userInfo.userId})).then((res) => {
          let data = res.data;
          if (data.status == 0) {
            this.$router.push({
              name:'account',
              params:data.result
            })
          } else if(data.status == -1){
            var that =this;
            this.msg = data.errorMsg;
            this.openWindow = true;
            setTimeout(function(){
              that.$router.push({ name: 'login',query:{topage:'user'}})
            },1500)
          }else if(data.status == 2){
            var that =this;
            this.msg = "未绑定用户信息，请绑定";
            this.openWindow = true;
            setTimeout(function(){
              that.$router.push({ name: 'registernext',params:{userId:data.result.userId,topage:'user'}})
            },1500)
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      closeWindow(bool) {
        this.openWindow = bool;
        this.openConfirm = bool; 
        console.log(2);

      },
      confirmSure() {
        this.openConfirm=false;
        axios.post('/x-service/user/logout.htm',qs.stringify({userId:this.userInfo.userId})).then((res) => {
           let data = res.data;
           if (data.status == 0) {
             this.$cookie.delete('userId');
             this.$router.push({ name: 'login',query:{topage:'user'}});
             console.log("退出")
           }
        })
        console.log(1)
      },
      logHandler(params){
        if(params.item2 != 0){
          axios.post('/x-service/user/record.htm',qs.stringify({
            userId: this.userInfo.userId,
            plateId:params.item
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
      .fa-times{
        font-size: .53333333rem;
        position: absolute;
        right: 5%;
        top: 4%;
        color: #fff;
      }
    }
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
            height: .9333333rem;
            line-height: 0.933333rem;
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
    .logout{
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      font-size: .32rem;
      text-align: center;
      background-color: #fff;
      margin: 1.5rem auto;
    }
  }


</style>
