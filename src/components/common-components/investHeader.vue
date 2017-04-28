<template>
  <div class="investHeader">
    <div class="title">360金融·{{dataHot.proName}}</div>
    <div class="profit">{{dataHot.proRate}}%</div>
    <div class="times">期限<span class="days">{{dataHot.proDayLimit}}</span>天</div>
    <div class="buyBtn">立即购买</div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script type="text/ecmascript-6">
    export default{
        data () {
            return{

            };
        },
        props:{
          dataHot:{
            type:Object
          }
        }
    };

</script>
