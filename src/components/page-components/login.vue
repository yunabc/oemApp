<template>
	<div class="login">
		<div class="inputbox">
			<input type="text" name="phone" placeholder="请输入手机号" @keydown="inputval(this)">
			<input type="password" name="password" placeholder="请输入密码" @keydown="inputval(this)">
		</div>
		<div v-if="loginTimes > 3" class="stage">
			<div class="slider" id="slider">
				<div class="label">向右滑动验证</div>
				<div class="track" id="track">
					<div id="callBack" class="bg-green"></div>
				</div>
				<div class="button" id="btn">
					<div class="icon" id="icon"></div>
					<div class="spinner" id="spinner"></div>
				</div>
			</div>
		</div>
		<button class="btn submit-btn" @click="checkInfo">登录</button>
		<div class="register-forget clearfix">
			<router-link class="fl" to="/lostpassword">忘记密码</router-link>
			<router-link class="fr" to="/register">注册账号</router-link>
		</div>
		<v-alert :msg="msg" @close="closeWindow" v-if="openWindow"></v-alert>	
	</div>
	
</template>
<script>
import alert from '../common-components/alert.vue' 
import axios from 'axios';

export default {
	name: 'login',
	props: {
		domain: String,
	},
	data (){
		return {
			loginTimes: 0,
			phone: '',
			password: '',
			msg:'测试提示文案测试提示文案测试提示文案测试提示文案测试提示文案',
			openWindow: true

		}
	},
	created() {

	},
	methods: {
		checkInfo() {
			//登录 判断情况
			if(this.loginTimes <= 3) {
				axios.post( this.domain + 'x-service/user/record.htm').then((res) => {
					if(res.status == 1){
						// 用户名密码错误
						this.msg = res.errorMsg;

					}
				})
			}
		},
		closeWindow(bool) {
			this.openWindow = bool; 
			
		},
		inputval(context) {
			this[context.name]=context.value;
		}
	},
	computed:{
		aaa() {

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