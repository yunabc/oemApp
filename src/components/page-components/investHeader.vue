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
    padding: .33333333rem 0;
    background-color: #fff;
    margin-bottom: .26666667rem;
    div {
      margin-bottom: .15rem;
    }
    .title {
      font-size: .37333333rem;
      line-height: .37333333rem;
    }
    .profit {
      font-size: .64rem;
      line-height: .64rem;
      margin-bottom: .13rem;
    }
    .times {
      font-size: .26666667rem;
      text-align: center;
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
            userId:null,
          };
        },
        props:{
          dataHot:{
            type:Object
          },
          isH: Boolean
        },
        created() {
          this.userId = this.$cookie.get('userId');
          console.log(this.$route)

        },
        methods: {
          checkInfo(params) {
            //if(this.userInfo.userId && this.userInfo.userId !=''){
            if(this.userId && this.userId !=''){
              axios.post('/x-service/pro/detail.htm',qs.stringify({userId:this.userId,proId:params.params})).then((res) => {
                let data = res.data;
                if (data.status == 0) {
                  location.href = data.result.allRedirectUrl;;
                } else {
                  this.$router.push({path:"/login",query:{topage:this.$route.name}});
                }
              }).catch(function (error) {
                this.$router.push({path:"/login",query:{topage:this.$route.name}});
              });
            }else{
              this.$router.push({path:"/login",query:{topage:this.$route.name}});
            }
          }
        }
    };

</script>
