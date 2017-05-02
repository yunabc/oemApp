<template>
	<div class="login">
		<div class="inputbox">
			<input type="text" v-model="phone" placeholder="请输入手机号">
			<div class="send-code">
				<input type="text" v-model="code" placeholder="请输入验证码" >
				<span class="send" :class="{sended:second=='s'}" @click="sendCode">{{count}}{{second}}</span>
			</div>
			<input type="password" v-model="password" placeholder="请输入新密码">
			<input type="password" v-model="password2" placeholder="请确认新密码">


		</div>
		<button class="btn submit-btn" @click="checkinput">找回密码</button>
		<v-alert :msg="msg" @close="closeWindow" v-if="openWindow"></v-alert>
	</div>
</template>
<script>
import alert from '../common-components/alert.vue';
import axios from 'axios';

export default {
	name: 'lostpassword',
	data (){
		return {
			phone: '',
			password: '',
			password2: '',
			code: '',
			msg:'测试提示文案测试提示文案测试提示文案测试提示文案测试提示文案',
			openWindow: false,
			count:'发送验证码',
			second:"",


		}
	},
	porps:{
		userInviterId:String
	},
	methods: {
		checkinput() {
			let flag = true;
			let reg = /^1(3[0-9]|4[57]|5[0-35-9]|8[0-9]|7[780])\d{8}$/;
			let regp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
			let regcode = /^\d{6}$/;
			console.log(this.phone == '',this.password != null)
			if(this.phone != "" && this.password != "" && this.password2 != "" && this.code != "" ){
				if(reg.test(this.phone)){
					if(regp.test(this.password) && regp.test(this.password2)){
						if(this.password2 == this.password){
							if(reg.test(this.code)){
									this.upload();
							}
							this.msg = '请输入验证码';
							this.openWindow = true;
							return ;
						}

						this.msg = '两次密码输入不一致';
						this.openWindow = true;
						return ;
					}
					this.msg = '新密码格式不对';
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
				return "新密码不能为空"
			}
			if(this.password2==""){
				return "确认新密码不能为空"
			}
			if(this.code==""){
				return "验证码不能为空"
			}
		},
		closeWindow(bool) {
			this.openWindow = bool;

		},
		upload() {
			axios.post("/x-service/user/forget.htm",{
				userInviterId:this.userInviterId,
				mobile:this.phone,
				newPwd:this.password,
				conPwd:this.password2,
				code:this.code
			}).then((res) => {
				var data = res.data;

			})
		},
		sendCode() {
			let reg = /^1(3[0-9]|4[57]|5[0-35-9]|8[0-9]|7[780])\d{8}$/;
			if(reg.test(this.phone)){
				if(this.count.indexOf('发送') > -1){
					axios.post( this.domain + "",{
						mobile:this.phone
					}).then((res) => {
						var data = res.data;
						if(data.status == 0){
							this.count = 59;
							this.second = "s";
							console.log(this.count);
							this.counted();
							// this.code=data.code;
						}
					})
				}
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
		'v-alert': alert
	}
}
</script>
<style scoped lang="less" rel="stylesheet/less">
	@import "../../common/style/login.less";

</style>
