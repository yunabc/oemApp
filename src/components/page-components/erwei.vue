<template>
<div class="erwei">
  <div class="erweibox">
    <div class="inner-erwei">
      
      <qrcanvas :options="options"></qrcanvas>
    </div>
  </div>
  <foot-nav :active="active"></foot-nav>
</div>
</template>

<script>
  import footNav from 'components/common-components/footNav';
  import qrcanvas from 'qrcanvas-vue';
  // import img from '/static/img/xinjrlogo.jpg';
  export default {
    data () {
      return {
        options:{},
        active:"active",

      }
    },
    props:{
      // sharelink:String;
    },
    created() {
      let that =this;
      let img = new Image();
      this.options={
         data:this.$route.params.shareurl,
         size:this.caculateRate(),
         typeNumber:4,
         logo:{
           image:'http://www.mu12.cn/app/static/xinjrlogo.jpg',
           size:.1,
         }

      }
      
      img.src = 'http://www.mu12.cn/app/static/xinjrlogo.jpg'
      console.log(this.$route.params.shareurl);
     
    },
    mounted() {
      console.log(1)
    },
    methods: {
      caculateRate(){
        let doc = document.body || document.documentElement;
        let docW = doc.offsetWidth;
        return docW/10*6;
      }
    },
    components:{
      footNav,qrcanvas

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/style/account.less";
  .erwei{
    position: fixed;
    // left: 0;
    height: 100%;
    width: 100%;
    // top: 0;
    // right: 0;
    // bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    .erweibox{
      position:absolute;
      width: 8.666667rem;
      text-align: center;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      border-radius: 8px;
      height: 8.666667rem;
      background-color: #fff;
      display: table-cell;
      vertical-align: middle;
    }
    .inner-erwei{
      width: 7.333333rem/*550px*/;
      height: 7.333333rem;
      // height: 6rem/* 450px */
      margin-left: 0.666667rem;
      margin: auto;
      background: url(/static/img/xinjrlogo.jpg) ;
      background-size: 100%;
      position: relative;
      margin-top: 0.666667rem;
      // display: table-cell;
      vertical-align: middle;
      &:after{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(242,242,242,.5) ;
        content: '';

      }
      canvas{
        position:relative;
        z-index: 10;
        width: 6rem;
        margin-top:.66666667rem; 
      }
    }
  }

</style>
