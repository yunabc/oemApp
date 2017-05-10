<template>
	<div class="login">
		<div class="inputbox">
			<input type="text" v-model="phone" maxlength="11" placeholder="请输入手机号">
			<div class="send-code">
				<input type="text" v-model="code" maxlength="6" placeholder="请输入验证码" >
				<span class="send" :class="{sended:second=='s'}" v-tap="{methods:sendCode}">{{count}}{{second}}</span>
			</div>
			<input type="password" v-model="password" maxlength="20" placeholder="请输入新密码">
			<input type="password" v-model="password2" maxlength="20" placeholder="请确认新密码">


		</div>
		<button class="btn submit-btn" v-tap="{methods:checkinput}">找回密码</button>
		<v-alert :msg="msg" @close="closeWindow" v-if="openWindow"></v-alert>
	</div>
</template>
<script>
import alert from '../common-components/alert.vue';
import axios from 'axios';
import qs from 'qs';

export default {
	name: 'lostpassword',
	data (){
		return {
			phone: null,
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
			document.activeElement.blur();
			let flag = true;
			let reg = /^1(3[0-9]|4[57]|5[0-35-9]|8[0-9]|7[780])\d{8}$/;
			let regp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
			let regcode = /^\d{6}$/;
			console.log(this.phone == '',this.password != null)
			if(this.phone != "" && this.password != "" && this.password2 != "" && this.code != "" ){
				if(reg.test(this.phone)){
					if(regp.test(this.password) && regp.test(this.password2)){
						if(this.password2 == this.password){
							console.log(regcode.test(this.code));
							if(regcode.test(this.code)){
									this.upload();
									return;
							}
							this.msg = '验证码格式不正确';
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
			var that =this;
			axios.post("/x-service/user/forget.htm",qs.stringify({
				mobile:this.phone,
				newPwd:this.password,
				conPwd:this.password2,
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
						// 登录成功
						this.count = 0;
             this.msg = "密码修改成功";
						this.openWindow = true;
						setTimeout(function(){
							that.$router.push({ name: 'login'})
						},1500)

						break;
					case "2":
						// 登录未绑定客户信息
						this.$router.push({ name: 'login'})
						break;
					case "-1":
					// 未登录
						this.msg = data.errorMsg;
						this.openWindow = true;
						break;
				}
			})
		},
		sendCode() {
			let reg = /^1(3[0-9]|4[57]|5[0-35-9]|8[0-9]|7[780])\d{8}$/;
			if(reg.test(this.phone)){
				console.log(reg.test(this.phone));
				if(this.count.indexOf('发送') > -1){
					axios.post("/x-service/user/msg.htm",qs.stringify({
						mobile:this.phone,
						smsTem:5
					})).then((res) => {
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
		'v-alert': alert
	}
}
</script>
<style scoped lang="less" rel="stylesheet/less">
	@import "../../common/style/login.less";

</style>
