<template>
	<div class="login">
		<div class="inputbox">
			<input type="text" v-model="name" placeholder="请输入真实姓名">
			<input type="text" v-model="idcard" placeholder="请输入身份证号">
			<input type="text" v-model="bankcard" placeholder="请输入银行卡号">
			<input type="text" v-model="bankcardphone" placeholder="请输入银行预留手机号">
		</div>
		<button class="btn submit-btn" v-tap="{methods:checkinput}">下一步</button>
		<v-alert :msg="msg" @close="closeWindow" v-if="openWindow"></v-alert>
	</div>
</template>
<script>
import alert from '../common-components/alert.vue';
import qs from 'qs';
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
			userId:null,
			topage:'',
		}
	},
	created(){
		this.userId = this.$route.params.userId;
		this.topage = this.$route.params.topage;
		console.log(this.topage)
	},
	methods: {
		checkinput() {
			let flag = true;
			let reg = /^[\u4e00-\u9fa5]{2,}$/;
			let regp = /^([0-9]){7,18}(x|X)?$/;
			let regbankcart =/\d{16,}$/;
			let regPhone = /^1(3[0-9]|4[57]|5[0-35-9]|8[0-9]|7[780])\d{8}$/;
			if(this.name != "" && this.idcard != "" && this.bankcard != "" && this.bankcardphone != ""){
				if(reg.test(this.name)){
					if(regp.test(this.idcard)){
						if(regbankcart.test(this.bankcard)){
							if(regPhone.test(this.bankcardphone)){
								this.upload();
								return;
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
			axios.post( "/x-service/user/regInfo.htm",qs.stringify({
				userId:this.userId,
				bankTel:this.bankcardphone,
				realName:this.name,
				idNo:this.idcard,
				bankCode:this.bankcard
			})).then((res) => {
				let data = res.data;
				switch(data.status){
					case "1":
					  // 失败
						this.msg = data.errorMsg;
						this.openWindow = true;
						break;
					case "0":
						//
						let msg2 = null; 
						if(this.topage == 'login'){
							msg2 = "，请登录";
						}
						this.msg ="绑定成功" + msg2;
						this.openWindow = true;
						setTimeout(() =>{
							this.$router.push({ name: this.topage})
						},1500)
						break;
					case "-1":
					// 未登录
						this.msg = data.errorMsg;
						this.openWindow = true;
						break;
				}
			})
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
