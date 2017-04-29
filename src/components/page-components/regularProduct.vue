<template>
  <div id="product">
    <invest-header :dataHot="dataHot"></invest-header>
    <div class="clockHint">
      <i class="clockImg"><img src="../../common/img/clock.png" alt=""></i>
      <div class="desc">
        <p>开启新产品上线提醒</p>
        <p>抢购快人一步</p>
      </div>
      <div class="swichBtn"><img src="../../common/img/clock.png" alt=""></div>
    </div>
    <invest-list :oldObj="dataObj"></invest-list>
  </div>

</template>
<script>
  import axios from 'axios';
  import investHeader from 'components/page-components/investHeader';
  import investList from 'components/page-components/investList';
  export default {
    data () {
      return {
        dataObj:{
            isCurrent:false
        },
        dataHot:{}
      }
    },
    props:{
      userInfo: Object,
    },
    components:{
      investHeader,
      investList
    },
    created(){

      axios.get('../../../static/regularInvest.json').then((res) => {
        let data = res.data;
        if (data.status == 0) {
            this.dataHot = data.result[0];
        } else {
          console.log(data.errorMsg)
        }
      }).catch(function (error) {
        console.log(error);
      });
      this.$root.$on('passObj', this.getObj);
    },
    methods:{
        getObj(obj){
            this.dataObj = Object.assign({},this.dataObj,obj);
        }
    }
  }

</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';

  #product {
    .clockHint {
      display: flex;
      display: none;
      background-color: #fff;
      padding: .29333333rem .66666667rem;
      img {
        margin-top: .05333333rem;
        margin-right: .4rem;
      }
      .desc {
        font-size: .32rem;
        line-height: .37333333rem;
        flex: 1;
        color: #666666;
      }
    }
  }

</style>
