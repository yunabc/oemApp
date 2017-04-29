<template>
	<div class="login">
		<div class="inputbox">
			<input type="text" v-model="phone"  placeholder="请输入手机号" >
			<input type="password" v-model="password" placeholder="请输入密码" >
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
			moveBlock: false,
			moveBlockCb: false,
			msg:'测试提示文案测试提示文案测试提示文案测试提示文案测试提示文案',
			openWindow: false,
			from: "",
		}
	},
	created() {
		console.log(this.$route,this.$router)
	},
	methods: {
		checkInfo() {
			//登录 判断情况
			if(this.loginTimes > 3) {
				this.moveBlock = true;
			}
			this.checkinput();
		},
		checkinput() {
			let flag = true;
			let reg = /^1(3[0-9]|4[57]|5[0-35-9]|8[0-9]|7[780])\d{8}$/;
			let regp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
			console.log(this.phone == '',this.password != null)
			if(this.phone != "" & this.password != ""){
				console.log(222)
				if(reg.test(this.phone)){
					if(regp.test(this.password)){
						if(this.moveBlock){
							if(this.moveBlockCb){
								this.upload();
								return ;
							}
							this.msg = '解锁失败';
							this.openWindow = true;
							return ;
						}
						this.upload();
						return;
					}
					this.msg = '密码格式不对';
					this.openWindow = true;
					return ;
				}
				this.msg = '手机号格式不对';
				this.openWindow = true;
				return;
			}
			this.msg = '手机号和密码不能为空';
			this.openWindow = true;
			return ;
		},

		upload() {
			// axios.post( this.domain + 'x-service/user/login.htm',{
			axios.get( '../../../static/login.json',{
				mobile:this.phone,
				pwd:this.password
			}).then((res) => {
				console.log(res);
				let data =res.data;
				let result = data.result;
				switch(data.status){
					case "1":
					  // 失败
						this.msg = res.errorMsg;
						this.openWindow = true;
						break;
					case "0":
						// 登陆成功
						console.log(result);
						
						this.save(result);
						this.$router.push({ name: this.from, params: result})

						break;
					case "2":
						// 登陆未绑定客户信息
						this.save(result);
						this.$router.push({ name: this.from, params: result})
						break;
					case "-1":	
					// 未登录
						this.msg = res.errorMsg;
						this.openWindow = true;
						break;
				}
				
			})
		},

		closeWindow(bool) {
			this.openWindow = bool; 
			
		},
		inputval(context) {
			this[context.name]=context.value;
		},
		save(result) {
			this.$store.dispatch('savePersonalInfo',result);
		}
	},
	computed:{
		
	},
	beforeRouteEnter(to, from, next){
		next(vm => {
        vm.from=from.name;
        // console.log(from);
    })
	},
	components: {
		'v-alert': alert
	}
}
</script> 
<style scoped lang="less" rel="stylesheet/less">
	@import "../../common/style/login.less";
	
</style>