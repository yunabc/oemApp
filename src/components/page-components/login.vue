<template>
	<div class="login">
		<div class="inputbox">
			<input type="text" name="phone" placeholder="请输入手机号">
			<input type="password" name="password" placeholder="请输入手机号">
		</div>
		<button class="btn submit-btn">登录</button>
		<div class="register-forget clearfix">
			<router-link class="fl" to="/lostpassword">忘记密码</router-link>
			<router-link class="fr" to="/register">注册账号</router-link>
		</div>
	</div>
	
</template>
<script>
export default {
	name: 'login',
	data (){
		return {

		}
	}
}
</script> 
<style scoped lang="less" rel="stylesheet/less">
	@import "../../common/style/login.less";
	
</style>