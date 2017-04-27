<template>
<div id="user" class="stageScreen">
  <div v-if="vip" class="userHeader">
    <div class="moneyNum">1,111.00</div>
    <router-link to="/login">
      <p>累计佣金(元)</p>
    </router-link>
  </div>
  <ul class="userCenterList">
    <li class="invite userCenterItem userItemLine" @click="share()">
      <p class="text">邀请新用户</p>
    </li>
    <router-link to="/user/performance" v-if="vip" class="performance userCenterItem userItemLine">
      <p class="text">规模绩效</p>
    </router-link>
    <li class="userCenterItem">
      <div class="logs  userItemLine" :class="logsStatus" @click="toggleList">
        <p class="text">投资记录</p>
      </div>
      <div class="logsList" v-show="logsStatus == 'up'">
        <a v-for="item in logsList" href="" class="logsItem">360财富投资</a>
        <a href="" class="logsItem">绿地金服投资</a>
      </div>
    </li>
    <router-link to="/account" class="manage userCenterItem userItemLine">
      <p class="text">账户管理</p>
    </router-link>
  </ul>
  <foot-nav></foot-nav>
</div>
</template>

<script>
  import footNav from 'components/common-components/footNav';
  import axios from 'axios';
  import {wxShare} from '../../common/js/wxShare'
  export default {
        data () {
            return {
              vip:true,
              logsStatus:"down",
              logsList:[],
              option:{}
            }
        },
      components:{
        footNav
      },
      created(){
        axios.get('../../../static/record.json').then((res) => {
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
          wxShare(this.option)
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
