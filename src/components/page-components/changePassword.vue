<template>
<div class="account">
  <ul class="account-list">
    <li class="account-li"><span class="key">旧密码:</span><input type="text" v-model="oldpassword"></li>
    <li class="account-li"><span class="key">新密码:</span><input type="text" v-model="newpassword"></li>
    <li class="account-li"><span class="key">确认密码:</span><input type="text" v-model="newpassword2"></li>

  </ul>
  <button class="change-btn" v-tap="{methods:checkinput}">保存</button>
  <v-alert :msg="msg" @close="closeWindow" v-if="openWindow"></v-alert>
  <foot-nav :active="active"></foot-nav>
</div>
</template>

<script>
  import footNav from 'components/common-components/footNav';
  import alert from '../common-components/alert.vue';
  import qs from 'qs';
  import axios from 'axios';

  export default {
    name: 'lostpassword',
    data (){
      return {
        oldpassword: '',
        newpassword: '',
        newpassword2: '',
        msg:'测试提示文案测试提示文案测试提示文案测试提示文案测试提示文案',
        openWindow: false,
        userInfo:{},
        active:"active",
        userId:null,

      }
    },
    props: {
    },
    created() {
      console.log(this.$route.params);
      this.userId = this.$route.params.userId;  
    },
    methods: {
      checkinput() {
        let regp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if(this.oldpassword != "" && this.newpassword != "" && this.newpassword2){
          if(regp.test(this.oldpassword)){
            if(regp.test(this.newpassword)){
              if(regp.test(this.newpassword2)){
                this.upload();
                return
              }
              this.msg = '确认新密码格式不对';
              this.openWindow = true;
              return;
            }
            this.msg = '新密码格式不对';
            this.openWindow = true;
            return;
          }
          this.msg = '旧密码格式不对';
          this.openWindow = true;
          return;
        }else{
          let msg = this.blank();
          this.msg = msg;
          this.openWindow = true;
          return ;
        }
      },
      blank() {
        if(this.oldpassword==""){
          return "旧密码不能为空"
        }
        if(this.newpassword==""){
          return "新密码不能为空"
        }
        if(this.newpassword2==""){
          return "确认新密码不能为空"
        }

      },
      closeWindow(bool) {
        this.openWindow = bool;

      },
      upload() {
        axios.post("/x-service/user/modify.htm",qs.stringify({
          userId:this.userId,
          originalPwd:this.oldpassword,
          newPwd:this.newpassword,
          conPwd:this.newpassword2
        })).then((res) => {
          var data = res.data;
          switch(data.status){
            case "1":
              // 失败
              this.msg = data.errorMsg;
              this.openWindow = true;
              break;
            case "0":
              // 修改密码成功
              var that =this;
              this.msg = "密码修改成功，请重新登陆";
              this.openWindow = true;
              setTimeout(function(){

                that.$router.push({ name: 'login',query:{topage:"user"}})
              },1500)

              break;
            case "2":
              // 登陆未绑定客户信息
              this.$router.push({ name: 'login',query:{topage:"user"}})
              break;
            case "-1":
            // 未登录
              this.msg = data.errorMsg;
              this.openWindow = true;
              break;
          }

        })
      },
      counted() {
        let timer = null;
        let that = this;
        timer = setInterval(function(){
          console.log(that.count);
          if(that.count > 0){
            that.count =that.count-1;
          }else{

            that.count = "发送验证码"
            that.second = "";
            clearInterval(timer);
          }

        },1000)
      }
    },
    components: {
      'v-alert': alert,
      footNav
    }
  }

</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/style/account.less";


</style>
