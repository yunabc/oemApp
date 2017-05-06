<template>
<div class="account">
  <ul class="account-list">
    <li class="account-li"><i class="fa fa-user-o" aria-hidden="true"></i><span>真实姓名：{{realname}}</span></li>
    <li class="account-li"><i class="fa fa-address-card-o" aria-hidden="true"></i><span>身份证号：{{idcode}}</span></li>
    <li class="account-li"><i class="fa fa-credit-card" aria-hidden="true"></i><span>银行卡号：{{bankcard}}</span></li>
    <li class="account-li"><i class="fa fa-phone" aria-hidden="true"></i><span>银行预留手机号：{{bankphone}}</span></li>
    
  </ul>
  <router-link class="change-btn" :to="{name:'changePassword',params:{userId:userId}}">修改密码</router-link> 
  <!-- <button class="change-btn">修改密码</button> -->
  <foot-nav :active="active"></foot-nav>
</div>
</template>

<script>
  import footNav from 'components/common-components/footNav';
  import qs from 'qs';
  import axios from "axios";
  export default {
    data () {
      return {
        realname: '',
        idcode: '',
        bankcard: '',
        bankphone: '',
        userId:null,
        account:{},
        active:'active',
        promiseObj:null,

      }
    },
    created() {
      this.userId = this.$cookie.get('userId');
      if(this.$route.params['idNo']){
        this.account = this.$route.params;
      }else{
        this.promiseObj = new Promise((resolve) =>{
          axios.post('/x-service/user/info.htm',qs.stringify({userId:this.userId})).then((res) => {
            let data = res.data;
            return resolve(data);
          })
        })
      }
      if(this.promiseObj){
        this.promiseObj.then((data) =>{
          console.log(data);
          this.account=data.result;
          this._renderProperty()
        })
      }else{
        this._renderProperty();
      }
    },
    methods: {
      _renderProperty() {
        this.realname = this.account.realName;
        this.idcode = this.account.idNo;
        this.userId = this.account.userId;
        this.bankcard = this.account.bankCode;
        this.bankphone = this.account.bankTel;
      }
    },
    components:{
      footNav
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/style/account.less";
  

</style>
