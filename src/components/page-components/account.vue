<template>
<div class="account">
  <ul class="account-list">
    <li class="account-li"><i class="fa fa-user-o" aria-hidden="true"></i><span>真实姓名：{{realname}}</span></li>
    <li class="account-li"><i class="fa fa-address-card-o" aria-hidden="true"></i><span>身份证号：{{idcode}}</span></li>
    <li class="account-li"><i class="fa fa-credit-card" aria-hidden="true"></i><span>银行卡号：{{bankcard}}</span></li>
    <li class="account-li"><i class="fa fa-phone" aria-hidden="true"></i><span>银行预留手机号：{{bankcardphone}}</span></li>
    
  </ul>
  <router-link class="change-btn" :realname="realname" idcode="idcode" bankcardphone="bankcardphone" bankcard="bankcard" to="/changePassword">修改密码</router-link> 
  <!-- <button class="change-btn">修改密码</button> -->
  <foot-nav></foot-nav>
</div>
</template>

<script>
  import footNav from 'components/common-components/footNav';
  import qs from 'qs';
  import axios from "axios";
  export default {
    data () {
      return {
        realname: '张三',
        idcode: '123123123',
        bankcard: '62343434343434',
        bankcardphone: '155555555',

      }
    },
    created() {
      // axios.post().then((res) => {
      //   if(res.code){
      //     this.realname = '';
      //     this.idcode = '';
      //     this.phone = '';
      //     this.bankcard = '';
      //   }
      // })
    },
    components:{
      footNav
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/style/account.less";

</style>
