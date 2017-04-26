<template>
<div class="account">
  <ul class="account-list">
    <li class="account-li"><span class="key">旧密码:</span><input type="text" v-model="oldpassword"></li>
    <li class="account-li"><span class="key">新密码:</span><input type="text" v-model="newpassword"></li>
    <li class="account-li"><span class="key">确认密码:</span><input type="text" v-model="newpassword2"></li>
    
  </ul>
  <button class="change-btn">保存</button>
  <foot-nav></foot-nav>
</div>
</template>

<script>
  import footNav from 'components/common-components/footNav';
  import alert from '../common-components/alert.vue';
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


      }
    },
    porps:{
      domain:String,
      userId:String,
      phone:Number,
      realName:String,
      idNo:Number,
      bankCode:Number
    },
    methods: {
      checkinput() {
        let regp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if(this.oldpassword != "" && this.newpassword != "" && this.newpassword2){
          if(regp.test(this.oldpassword)){
            if(regp.test(this.newpassword)){
              if(regp.test(this.newpassword2)){
                this.upload()
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
        axios.post(this.domain + "/x-service/user/regInfo.htm",{
          userId:this.userId,
          bankTel:this.phone,
          pwd:this.password,
          rePwd:this.password2,
          code:this.code
        }).then((res) => {
          var data = res.data;

        })
      },
      sendCode() {
        if(this.count.indexOf('发送') > -1){

          
          /*axios.post( this.domain + "",{
            userInviterId:this.userInviterId
          }).then((res) => {
            var data = res.data;
            if(data.status == 0){*/

              this.count = 3;
              this.second = "s";
              console.log(this.count);
              this.counted();
              // this.code=data.code;
          /*  }
          })*/
        }
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
