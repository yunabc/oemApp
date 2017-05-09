<template>
<div class="erwei">
  <div class="erweibox">
    <div class="inner-erwei">
      
      <vue-q-art :config="config" :downloadButton="downloadButton"></vue-q-art>
    </div>
  </div>
  <foot-nav :active="active"></foot-nav>
</div>
</template>

<script>
  import footNav from 'components/common-components/footNav';
  import VueQArt from '../common-components/vueQart.vue';
  console.log(VueQArt);
  export default {
    data () {
      return {
        config: {
          value: '',
          imagePath: '/static/img/xinjrlogo.jpg',
          filter: 'threshold',
          size: 607,
          fillType:'scale_to_fit'
        },
        downloadButton: false,
        active:"active"
      }
    },
    props:{
      // sharelink:String;
    },
    created() {

     this.config.value = this.$route.params.shareurl;
     console.log( this.config.value );
    },
    methods: {
      caculateRate(){
        let doc = document.body || document.documentElement;
        let docW = doc.offsetWidth;
        return docW/10;
      }
    },
    components:{
      VueQArt,
      footNav,

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
      &>div{
        position:relative;
        z-index: 10;
        margin-top:; 
      }
    }
  }

</style>
