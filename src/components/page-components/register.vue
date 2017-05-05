<template>
	<div class="login">
		<div class="inputbox">
			<input type="text" v-model="phone" placeholder="请输入手机号">
			<input type="password" v-model="password" placeholder="请输入密码">
			<input type="password" v-model="password2" placeholder="请确认密码">
			<div class="send-code">
				<input type="text" v-model="code" placeholder="请输入验证码" >
				<span class="send" :class="{sended:second=='s'}" v-tap="{methods:sendCode}">{{count}}{{second}}</span>
			</div>
			<div class="read-checkbox">
				<label for="checkread">
					<input id="checkread"  v-model="checkread" type="checkbox" v-tap="{methods:checkval}">
					<span>我已阅读并同意</span><a href="" class="xieyi">《平台协议》</a>
				</label>
			</div>
		</div>

		<button class="btn submit-btn" v-tap="{methods:checkinput}">注册</button>
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
			phone: '',
			password: '',
			password2: '',
			code: '',
			checkread: false,
			msg:'测试提示文案测试提示文案测试提示文案测试提示文案测试提示文案',
			openWindow: false,
			count:'发送验证码',
			second:"",
			userInviterId:null


		}
	},
	porps:{
	},

	methods: {
		checkval() {
			this.checkread = !this.checkread
		},
		checkinput() {
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

								this.msg = '请输入验证码';
								this.openWindow = true;
								return ;
							}
						}

						this.msg = '两次密码输入不一致';
						this.openWindow = true;
						return ;
					}
					this.msg = '密码格式不对';
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
		upload() {
			
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
						this.msg = "注册成功，请完善用户信息";
						this.openWindow = true;
						setTimeout(function(){
							that.$router.push({ name: 'registernext',params:{userId:data.result.userId}})
						},1500)
						break;
					case "2":
						// 注册未绑定客户信息
						var that =this;
						this.msg = "注册成功，请完善用户信息";
						this.openWindow = true;
						setTimeout(function(){
							that.$router.push({ name: 'registernext',params:{userId:data.result.userId}})
						},1500)
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
			console.log(reg.test(this.phone));
			if(reg.test(this.phone)){

				if(this.count.indexOf('发送') > -1){

					console.log(1);
					axios.post("/x-service/user/msg.htm",qs.stringify({
						mobile:this.phone
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
		'v-alert': alert
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
