<template>
  <div class="investHeader">
    <div class="title">360金融·{{dataHot.proName}}</div>
    <div class="profit">{{dataHot.proRate}}%</div>
    <div class="times">期限<span class="days">{{dataHot.proDayLimit}}</span>天</div>
    <div @click="checkInfo" class="buyBtn">立即购买</div>
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
        },
        methods: {
          checkInfo() {
            console.log('investHeader'+this.userInfo)
            //if(this.userInfo.userId && this.userInfo.userId !=''){
            if(this.userInfo && this.userInfo.userId && this.userInfo.userId !=''){
              this.$router.push('/user');
            }else{
              this.$router.push({path:"/login",query:{topage:"user"}});
            }
          }
        }
    };

</script>
