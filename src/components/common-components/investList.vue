<template>
  <div ref="listWrapper" class="list-wrapper  list-wrapper-hook">
    <ul class="productList list-content  list-content-hook" ref="listContent">
      <li class="productItem" v-for="item in dataList">
        <div class="itemTitle">360金融·{{item.proName}}</div>
        <div class="itemInfo">
          <div class="profit">
            <p class="profitNum">{{item.proRate}}%</p>
            <p>预期年化利率</p>
          </div>
          <div class="verticalLine"></div>
          <div  class="times">
            <p><span class="timesDay">{{item.proDayLimit}}</span>天</p>
            <p>期限</p>
          </div>
          <div class="buyBtn">立即购买</div>
        </div>
      </li>
    </ul>
    <div v-if="flag" class="loading-wrapper">
      <div class='uil-default-css' style='transform:scale(0.15);'>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(0deg) translate(0,-60px);transform:rotate(0deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(30deg) translate(0,-60px);transform:rotate(30deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(60deg) translate(0,-60px);transform:rotate(60deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(90deg) translate(0,-60px);transform:rotate(90deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(120deg) translate(0,-60px);transform:rotate(120deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(150deg) translate(0,-60px);transform:rotate(150deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(180deg) translate(0,-60px);transform:rotate(180deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(210deg) translate(0,-60px);transform:rotate(210deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(240deg) translate(0,-60px);transform:rotate(240deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(270deg) translate(0,-60px);transform:rotate(270deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(300deg) translate(0,-60px);transform:rotate(300deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
        <div
          style='top:80px;left:93px;width:14px;height:40px;background:rgb(248,142,45);-webkit-transform:rotate(330deg) translate(0,-60px);transform:rotate(330deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
      </div>
    </div>

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
          dataList:{
            type:Array
          },
          flag:{
            type:Boolean
          }
        }
    };

</script>
