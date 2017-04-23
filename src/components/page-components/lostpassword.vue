<template>
	<div class="login">
		<div class="inputbox">
			<div class="send-code">
				<input type="text" name="phone" placeholder="请输入手机号">
				<span class="send">发送验证码</span>
			</div>
			
			<input type="password" name="password" placeholder="请输入手机号">
		</div>
		<button class="btn submit-btn">找回密码</button>
		
	</div>
</template>
<script>
export default {
	name: 'lostpassword',
	data (){
		return {

		}
	}
}
</script> 
<style scoped lang="less" rel="stylesheet/less">
	@import "../../common/style/login.less";
	
</style>