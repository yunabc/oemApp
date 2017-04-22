<template>
<div id="user">
  <div class="userHeader">
    <div class="moneyNum">1,111.00</div>
    <p>累计佣金(元)</p>
  </div>
  <ul class="userCenterList">
    <li class="invite userCenterItem">
      <p class="text">邀请新用户</p>
    </li>
    <li class="scale userCenterItem">
      <p class="text">规模绩效</p>
    </li>
    <li class="">
      <div class="logs userCenterItem down">
        <p class="text">投资记录</p>
      </div>
      <ul class="logsList">
        <li>360财富投资</li>
        <li>绿地金融投资</li>
      </ul>
    </li>
    <li class="manage userCenterItem">
      <p class="text">账户管理</p>
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
  #user{
    height:100%;
    background-color:@backGrayColor;
    .userHeader{
      display: flex;
      align-items:center;
      justify-content:center;
      flex-flow: column;
      height: 384px;
      margin-bottom: 20px;
      background-color: @color;
      color: #fff;
      font-size:20px;
      .moneyNum{
        font-size: 60px;
        line-height: 68px;
      }

    }
    .userCenterList{
      background-color: #fff;
      font-size: 24px;
      padding:0 30px;
      li{
        border-bottom: 1px solid @lineGrayColor;
        .logsList{
          display: none;
          padding-left: 77px;
          color: #818181;
          li{
            border-bottom: none;
            height: 52px;
          }
        }
      }
      .userCenterItem{
        line-height: 104px;
        padding-left:77px;
        &:last-child{
           border-bottom:none;
         }
        &.invite{
          background: url("../../common/img/invite.png") left center no-repeat;
         }
         &.scale{
            background: url("../../common/img/scale.png") left center no-repeat;
          }
         &.logs{
           background: url("../../common/img/logs.png") left center no-repeat;
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
                 border-top: 10px solid #000;
                 border-left: 10px solid transparent;
                 border-right: 10px solid transparent;
               }
             }
            &.up{
              &:after{
                 border-bottom: 10px solid #000;
                 border-left: 10px solid transparent;
                 border-right: 10px solid transparent;
               }
            }
         }
         &.manage{
           background: url("../../common/img/manage.png") left center no-repeat;
         }


      }

    }

  }


</style>
