<template>
	<div class="login">
		<div class="inputbox">
			<input type="text" v-model="phone" maxlength="11" placeholder="请输入手机号">
			<input type="password" v-model="password" maxlength="20" placeholder="请输入密码，密码格式为 6-20个数字和字母的组合">
			<input type="password" v-model="password2" maxlength="20" placeholder="请确认密码">
			<div class="send-code">
				<input type="text" v-model="code" maxlength="6" placeholder="请输入验证码" >
				<span class="send" :class="{sended:second=='s'}" v-tap="{methods:sendCode}">{{count}}{{second}}</span>
			</div>
			<div class="read-checkbox">
				<label for="checkread">
					<input id="checkread" :checked="checkread"  v-model="checkread" type="checkbox">
					<span>我已阅读并同意</span><router-link to="/agreement" class="xieyi">《平台协议》</router-link>
				</label>
			</div>
		</div>

		<button class="btn submit-btn" v-tap="{methods:checkinput}">注册</button>
		<v-alert :msg="msg" @close="closeWindow" v-if="openWindow"></v-alert>
		<v-confirm :rightMsg="rightMsg" :msg="msg" @sure="confirmSure" @cancle="closeWindow2" v-if="openConfirm"></v-confirm>
	</div>
</template>
<script>
import alert2 from '../common-components/alert.vue';
import confirm from '../common-components/confirm.vue'
import axios from 'axios';
import qs from 'qs';
import {wxShare} from '../../common/js/wxShare';

export default {
	name: 'lostpassword',
	data (){
		return {
			phone: '',
			password: '',
			password2: '',
			code: '',
			checkread: false,
			msg:'测试提示文案测试提示文案测试提示文案测试提示文案测试提示文案',
			openWindow: false,
			count:'发送验证码',
			second:"",
			openConfirm: false,
			userInviterId:null,
			userId:'',
			pathUrl:'',
			option:{},
			rightMsg:'跳过',


		}
	},
	porps:{
	},
	created(){
		let that = this;
		this.pathUrl = window.location.origin + window.location.pathname;
		this.userInviterId = location.search.substring(0).split('=')[1];
		window.appGiveUrl=function(url){
      that.bindUserInvitedId(url);
    }
	},
	methods: {
		checkval() {
			console.log(this.checkread);

			this.checkread
			console.log(this.checkread);
		},
		checkinput() {
			document.activeElement.blur();
			let flag = true;
			let reg = /^1(3[0-9]|4[57]|5[0-35-9]|8[0-9]|7[780])\d{8}$/;
			let regp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
			let regcode = /^\d{6}$/;
			if(this.phone != "" && this.password != "" && this.password2 != "" && this.code != "" && this.checkread){
				if(reg.test(this.phone)){
					if(regp.test(this.password) && regp.test(this.password2)){
						if(this.password2 == this.password){
							console.log(regcode.test(this.code));
							if(regcode.test(this.code)){
									this.upload();
									return;
							}else{

								this.msg = '验证码格式不正确';
								this.openWindow = true;
								return ;
							}
						}

						this.msg = '两次密码输入不一致';
						this.openWindow = true;
						return ;
					}
					this.msg = '密码格式为 6-20个数字和字母的组合';
					this.openWindow = true;
					return ;
				}
				this.msg = '手机号格式不对';
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
			if(this.phone==""){
				return "手机号不能为空"
			}
			if(this.password==""){
				return "密码不能为空"
			}
			if(this.password2==""){
				return "确认密码不能为空"
			}
			if(this.code==""){
				return "验证码不能为空"
			}
			if(this.checkread==""){
				return "请勾选我已阅读"
			}
		},
		closeWindow(bool) {
      this.openWindow = bool;
    },
    closeWindow2(bool) {
      this.openWindow = bool;
      this.openConfirm = bool;
      this.$router.push({name:'registernext',params:{topage:'home'}})
    },
		confirmSure() {
      this.openConfirm=false;
      this.addInvited()

    },
		 bindUserInvitedId(url) {
        let userInviterId = url.split('?')[1].split('#')[0].split('=')[1];
        if(userInviterId != ''){
          axios.post('/x-service/user/bind.htm',qs.stringify({
            userInviterId: userInviterId
          })).then((res) => {
            let data = res.data;
            switch(data.status){
              case "1":
                // 失败
                this.msg = data.errorMsg;
                this.openWindow = true;
                break;
              case "0":
                // 已绑定
                this.msg = "绑定成功,请完善个人信息";
                this.openWindow = true;
                setTimeout(()=>{

                	this.$router.push({name:'registernext',params:{topage:'home'}})
                },1500)
                break;
              case "-1":
                // 未登录
                this.$router.push({name:'login',params:{topage:'user'}})
                break;
            }  
          })
        }else{
          this.msg = "二维码错误，未找到邀请人信息";
          this.openWindow = true;
        }
      },
		share(cb) {
			axios.post('/x-service/user/share.htm',qs.stringify({
			  signUrl: location.href.split('#')[0]
			})).then((res) => {
			  let data = res.data;
			  if (data.status == 0) {
			     this.option.appId = data.result.appId;
			     this.option.timestamp = data.result.timestamp;
			     this.option.nonceStr = data.result.nonceStr;
			     this.option.signature = data.result.signature;
			     
			     wxShare(this.option,this.pathUrl);
			     if(cb && typeof cb == 'function'){
			       wx.ready(() => {
			       	cb.apply(this)
			       });
			       return;
			     }
			  } else if (data.status == 1) {
			    // 失败
			    this.msg = data.errorMsg
			    this.openWindow = true;
			  }else if (data.status == -1) {
			    // 失败未登录
					console.log('未登录')			    
			  }

			}).catch(function (error) {
			  console.log(error);
			});
		},
		upload() {
			// this.qrcode();
			axios.post("/x-service/user/reg.htm",qs.stringify({
				userInviterId:this.userInviterId,
				mobile:this.phone,
				pwd:this.password,
				rePwd:this.password2,
				code:this.code
			})).then((res) => {
				var data = res.data;
				switch(data.status){
					case "1":
					  // 失败
						this.msg = data.errorMsg;
						this.openWindow = true;
						break;
					case "0":
						// 注册成功
						var that =this;
						this.count = 0;
						this.msg = "您是否要通过扫码绑定邀请好友？";
						// this.openWindow = true;
						this.userId = data.result.userId
						this.$cookie.set('userId',this.userId);
						this.$cookie.delete('signFlag');
						this.$cookie.delete('totalMoney');
						this.$cookie.delete('totalMoneyText');

						// setTimeout(function(){
						// 	that.$router.push({ name: 'registernext',params:{userId:data.result.userId,topage:'home'}})
						// },1500)
						this.openConfirm = true;
						break;
					case "2":
						// 注册未绑定客户信息
						var that =this;
						this.count = 0;
						this.msg = "您是否要通过扫码绑定邀请好友？";
						// this.openWindow = true;
						this.userId = data.result.userId
						this.$cookie.set('userId',this.userId);
						this.$cookie.delete('signFlag');
						this.$cookie.delete('totalMoney');
						this.$cookie.delete('totalMoneyText');
						// setTimeout(function(){
						// 	that.$router.push({ name: 'registernext',params:{userId:data.result.userId,topage:'home'}})
						// },1500)
						this.openConfirm = true;
						// this.addInvited()
						break;
					case "-1":
					// 未登录
						this.msg = data.errorMsg;
						this.openWindow = true;
						break;
				}

			})
		},
		addInvited() {
			var that =this;
      axios.post('/x-service/user/inviter.htm').then((res) => {
        let data = res.data;
        switch(data.status){
          case "1":
            // 失败
            this.msg = data.errorMsg;
            this.openWindow = true;
            break;
          case "0":
            // 已绑定
            this.msg = "注册成功";
            this.openWindow = true;
            setTimeout(() =>{
							this.$router.push({ name: 'registernext',params:{userId:this.userId,topage:'home'}})
						},1500)
            break;
          case "3":
            // 未绑邀请人信息
            // console.log(this.browVersions)
            if(this.browVersions.weixin){
              // 微信中；
              this.share(() => {
                console.log(12212);
                wx.scanQRCode({
                   needResult: 1,
                   scanType: ["qrCode"],
                   // desc: '清扫描二位码',
                   success: function (res) {
                     //扫码后获取结果参数:htpp://xxx.com/c/
                    var url = res.resultStr;
                    that.bindUserInvitedId(url);
                  }
                 });
              })
            }else if(this.deviceN()=="android"){
             // APP中
              android4js.opencarema();
            }else{
            	// 其他非微信的web端
	            this.msg = "注册成功";
	            this.openWindow = true;
	            setTimeout(() =>{
								this.$router.push({ name: 'registernext',params:{userId:this.userId,topage:'home'}})
							},1500)
            }
            
            break;
          case "-1":
          // 未登录
            this.$router.push({name:'login',params:{topage:'home'}})
            break;
        }
          
        

      }).catch((error) =>{
        if(this.islogout){
          this.$router.push({name:'login',params:{topage:'user'}})
        }
      });
    },
		sendCode() {
			let reg = /^1(3[0-9]|4[57]|5[0-35-9]|8[0-9]|7[780])\d{8}$/;
			console.log(reg.test(this.phone));
			if(reg.test(this.phone)){

				if(this.count.indexOf('发送') > -1){

					console.log(1);
					axios.post("/x-service/user/msg.htm",qs.stringify({
						mobile:this.phone,
						smsTem:1
					})).then((res) => {
						var data = res.data;
						/*if(data.status == 0){

							this.count = 3;
							this.second = "s";
							console.log(this.count);
							this.counted();
							// this.code=data.code;
						}*/
						switch(data.status){
							case "1":
							  // 失败
								this.msg = data.errorMsg;
								this.openWindow = true;
								break;
							case "0":
								//
								this.count = 59;
								this.second = "s";
								console.log(this.count);
								this.counted();

								break;
						}
					})
				}
			}else{

				this.msg = "手机号码格式不对";
				this.openWindow = true;
				return ;
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
		'v-alert': alert2,
		'v-confirm': confirm,
	}
}
</script>
<style scoped lang="less" rel="stylesheet/less">
	@import "../../common/style/login.less";
	.read-checkbox{
		margin-top: .06666667rem;
		#checkread{
			width:.4rem;
			height:.4rem;
			margin-bottom: 0;
			vertical-align: middle;
			padding: 0;
		}
		span{
			vertical-align: middle;
		}
		a{
			display: inline;;
			vertical-align: middle;
			color: @color;
		}
	}

</style>
