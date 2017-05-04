<template>
	<div class="login">
		<div class="inputbox">
			<input type="text" v-model="phone"  placeholder="请输入手机号" >
			<input type="password" v-model="password" placeholder="请输入密码" >
			<div v-if="loginTimes > 3" class="stage">
				<div class="slider" ref="slider" id="slider">
					<div class="label">向右滑动验证</div>
					<div class="track" ref="track" id="track">
						<div ref="callBack" id="callBack" class="bg-green"></div>
					</div>
					<div class="button" @touchstart="estart" @touchmove="emove" @touchend="eend" ref="btn" id="btn">
						<div class="icon" ref="icon" id="icon"></div>
						<div class="spinner" ref="spinner" id="spinner"></div>
					</div>
				</div>
			</div>
		</div>
		
		<button class="btn submit-btn" v-tap="{methods:checkInfo}">登录</button>
		<div class="register-forget clearfix">
			<router-link class="fl" to="/lostpassword">忘记密码</router-link>
			<router-link class="fr" to="/register">注册账号</router-link>
		</div>
		<v-alert :msg="msg" @close="closeWindow" v-if="openWindow"></v-alert>
	</div>

</template>
<script>
import alert from '../common-components/alert.vue'
import qs from 'qs';
import axios from 'axios';

export default {
	name: 'login',
	props: {
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
			topage: "",
			oW:null,
			oLeft:null,
			flag:1,
		}
	},
	created() {
		this.topage = this.$route.query.topage;

	},
	methods: {
		estart(e) { 
			console.log(e);
			if(this.flag==1){
				let oBtn = this.$refs.btn;
				let oTrack = this.$refs.track;
				var touches = e.touches[0];
				this.oW = touches.clientX - oBtn.offsetLeft;
				oBtn.className="button";
				oTrack.className="track";
			}
		},
		emove(e) {
			console.log(document.documentElement.clientWidth);
			if(this.flag==1){
				let oBtn = this.$refs.btn;
				let oTrack = this.$refs.track;
				let oSlider = this.$refs.slider;
				let touches = e.touches[0];
				this.oLeft = touches.clientX - this.oW;
				if(this.oLeft < 0) {
					this.oLeft = 0;
				}else if(this.oLeft > oSlider.offsetWidth - oBtn.offsetWidth) {
					this.oLeft = (oSlider.offsetWidth - oBtn.offsetWidth);
				}
				oBtn.style.left = this.oLeft + "px";
				oTrack.style.width=this.oLeft+ 'px';			
			}
		},
		eend(e) {
			console.log('q1');
			let oBtn = this.$refs.btn;
			let oTrack = this.$refs.track;
			let oSlider = this.$refs.slider;
			let oIcon = this.$refs.icon;
			let oSpinner = this.$refs.spinner;
			let callBack = this.$refs.callBack;
			if(this.oLeft>=(oSlider.clientWidth-oBtn.clientWidth)){
        oBtn.style.left = (document.documentElement.clientWidth - oBtn.offsetWidth-30);
        oTrack.style.width= (document.documentElement.clientWidth - oBtn.offsetWidth-30);
        oIcon.style.display='none';
        oSpinner.style.display='block';	
        callBack.innerText="验证通过";			
	      this.flag=0;	
	      this.moveBlockCb=true;		
      }else{
        oBtn.style.left = 0;
        oTrack.style.width= 0;
      }
      oBtn.className="button-on";
      oTrack.className="track-on";   

		},
		checkInfo() {
			//登录 判断情况
			this.loginTimes++;
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
							this.msg = '请拖动滑块验证';
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
			axios.post('/x-service/user/login.htm',qs.stringify({
				mobile:this.phone,
				pwd:this.password
			})).then((res) => {
				console.log(res);
				let data =res.data;
				let result = data.result;
				switch(data.status){
					case "1":
					  // 失败
						this.msg = data.errorMsg;
						this.openWindow = true;
						break;
					case "0":
						// 登陆成功
						console.log(this.topage);

						this.save(result);
						this.$router.push({ name: this.topage, params: result})

						break;
					case "2":
						// 登陆未绑定客户信息
						this.save(result);
						this.$router.push({ name: this.topage, params: result})
						break;
					case "-1":
					// 未登录
						this.msg = data.errorMsg;
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
	mounted() {

	},

	components: {
		'v-alert': alert
	}
}
</script>
<style scoped lang="less" rel="stylesheet/less">
	@import "../../common/style/login.less";
  @import "../../common/style/slider.css";
</style>
