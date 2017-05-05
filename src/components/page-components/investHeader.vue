<template>
  <div class="investHeader">
    <div class="title">360金融·{{dataHot.proName}}</div>
    <div v-if="isH">
      <div class="profit">{{dataHot.proRate}}%</div>
      <div class="times">万份收益<span class="days">{{dataHot.proProspectiveEarn}}</span></div>
    </div>
    <div v-else>
      <div class="profit">{{dataHot.proRate}}%</div>
      <div class="times">期限<span class="days">{{dataHot.proDayLimit}}</span>天</div>
    </div>

    <div v-tap="{methods:checkInfo,params:dataHot.proId}" class="buyBtn">立即购买</div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';

  .investHeader {
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: .53333333rem 0;
    background-color: #fff;
    margin-bottom: .26666667rem;
    div {
      margin-bottom: .53333333rem;
    }
    .title {
      font-size: .37333333rem;
      line-height: .37333333rem;
    }
    .profit {
      font-size: .64rem;
      line-height: .64rem;
      margin-bottom: .26666667rem;
    }
    .times {
      font-size: .26666667rem;
      .days {
        font-size: .32rem;
        color: red;
      }
    }
    .buyBtn {
      width: 6.4rem;
      height: .90666667rem;
      border: .04rem solid @color;
      text-align: center;
      font-size: .37333333rem;
      color: @color;
      line-height: .90666667rem;
      border-radius: .45333333rem /* 34px */;
    }
  }
</style>
<script>
import axios from 'axios';
import qs from 'qs';
    export default{
        data () {
          return{
          };
        },
        props:{
          dataHot:{
            type:Object
          },
          userInfo: Object,
          isH: Boolean
        },
        methods: {
          checkInfo(params) {
            //if(this.userInfo.userId && this.userInfo.userId !=''){
            if(this.userInfo && this.userInfo.hasOwnProperty('userId') && this.userInfo["userId"] !=''){
              axios.post('/x-service/pro/detail.htm',qs.stringify({userId:this.userInfo['userId'],proId:params.params})).then((res) => {
                let data = res.data;
                if (data.status == 0) {
                  location.href = data.allRedirectUrl;
                } else {
                  console.log(data.errorMsg)
                }
              }).catch(function (error) {
                console.log(error);
              });
            }else{
              this.$router.push({path:"/login",query:{topage:"user"}});
            }
          }
        }
    };

</script>
