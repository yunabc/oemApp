<template>
	<div class="login">
		<div class="inputbox">
			<input type="text" v-model="name" placeholder="请输入真实姓名">
			<input type="text" v-model="idcard" placeholder="请输入身份证号">
			<input type="text" v-model="bankcard" placeholder="请输入银行卡号">
			<input type="text" v-model="bankcardphone" placeholder="请输入银行预留手机号">
		</div>
		<button class="btn submit-btn" @click="checkinput">下一步</button>
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
			name: '',
			idcard: '',
			bankcard: '',
			bankcardphone: '',
			msg:'测试提示文案测试提示文案测试提示文案测试提示文案测试提示文案',
			openWindow: false,
		}
	},
	porps:{
		domain:String,
		userId:String
	},
	methods: {
		checkinput() {
			let flag = true;
			let reg = /^[\u4e00-\u9fa5]{2,}$/;
			let regp = /^([0-9]){7,18}(x|X)?$/;
			let regbankcart =/^(998801|998802|622525|622526|435744|435745|483536|528020|526855|622156|622155|356869|531659|622157|627066|627067|627068|627069)d{10}$/;
			let regPhone = /^1(3[0-9]|4[57]|5[0-35-9]|8[0-9]|7[780])\d{8}$/;
			if(this.name != "" && this.idcard != "" && this.bankcard != "" && this.bankcardphone != ""){
				if(reg.test(this.name)){
					if(regp.test(this.idcard)){
						if(regbankcart.test(this.bankcard)){
							if(regPhone.test(this.bankcardphone)){
								
							}
							this.msg = '银行卡预留手机号格式不正确';
							this.openWindow = true;
							return ;
						}
						this.msg = '银行卡号格式不正确';
						this.openWindow = true;
						return ;
					}
					this.msg = '身份证号格式不对';
					this.openWindow = true;
					return ;
				}
				this.msg = '姓名格式不对';
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
			if(this.name==""){
				return "姓名不能为空"
			}
			if(this.idcard==""){
				return "身份证号不能为空"
			}
			if(this.bankcard==""){
				return "银行卡号不能为空"
			}
			if(this.bankcardphone==""){
				return "银行卡预留手机号不能为空"
			}
		},
		closeWindow(bool) {
			this.openWindow = bool; 
			
		},
		upload() {
			axios.post(this.domain + "x-service/user/regInfo.htm",{
				userId:this.userId,
				bankTel:this.bankcardphone,
				realName:this.name,
				idNo:this.idcard,
				bankCode:this.bankcard
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
				/*	}
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
		'v-alert': alert
	}
}
</script> 
<style scoped lang="less" rel="stylesheet/less">
	@import "../../common/style/login.less";
	
</style>