<template>
<div class="account">
  <ul class="account-list">
    <li class="account-li"><span class="key">旧密码:</span><input type="text" name="oldpassword"></li>
    <li class="account-li"><span class="key">新密码:</span><input type="text" name="newpassword"></li>
    <li class="account-li"><span class="key">确认密码:</span><input type="text" name="newpassword2"></li>
    
  </ul>
  <button class="change-btn">保存</button>
  <foot-nav></foot-nav>
</div>
</template>

<script>
  import footNav from 'components/common-components/footNav';
  import axios from "axios";
  export default {
    data () {
      return {
        oldpassword: '',
        newpassword: '',
        newpassword2: '62343434343434',

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
