<template>
	<div class="login">
		<div class="inputbox">
			<input type="text" v-model="phone" placeholder="请输入手机号">
			<input type="password" v-model="password" placeholder="请输入密码">
			<input type="password" v-model="password2" placeholder="请确认密码">
			<div class="send-code">
				<input type="text" v-model="code" placeholder="请输入验证码">
				<span class="send">发送验证码</span>
			</div>
			<div class="read-checkbox">
				<label for="checkread">
					<input id="checkread"  v-model="checkread"type="checkbox">
					<span>我已阅读并同意</span><a href="" class="xieyi">《平台协议》</a>
				</label>
			</div>
		</div>
		<router-link to="/next">
			<button class="btn submit-btn">注册</button>
		</router-link>
	</div>
</template>
<script>
export default {
	name: 'lostpassword',
	data (){
		return {
			phone: '',
			password: '',
			password2: '',
			code: '',
			checkread: false,
		}
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