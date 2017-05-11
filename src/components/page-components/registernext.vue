<template>
	<div class="login">
		<div class="inputbox">
			<input type="text" v-model="name" maxlength="8" placeholder="请输入真实姓名">
			<input type="text" v-model="idcard" maxlength="18" placeholder="请输入身份证号">
			<input type="text" v-model="bankcard" maxlength="32" placeholder="请输入银行卡号">
			<input type="text" v-model="bankcardphone" maxlength="11" placeholder="请输入银行预留手机号">
		</div>
		<div class="twobtns">
			
			<button class="btn submit-btn btnleft" v-tap="{methods:checkinput}">保存</button>
			<router-link class="btn submit-btn btnright" :to="{name:topage}">不了，跳过</router-link>
		</div>
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
			topage:'login',
		}
	},
	created(){
		this.userId = this.$cookie.get('userId') || this.$route.params.userId;
		this.topage = this.$cookie.get('userId')?this.$route.params.topage:'login';
	},
	methods: {
		checkinput() {
			document.activeElement.blur();
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
						this.$cookie.set('userId',this.userId);
						this.$cookie.delete('signFlag');
						this.$cookie.delete('totalMoney');
						this.$cookie.delete('totalMoneyText');
						this.msg ="绑定成功";
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
	.twobtns{
		display: flex;
		.btn{
			&.btnright{
				margin-left: .26666667rem;
			}
		}
	}
</style>
