<template>
	<div class="login">
		<div class="inputbox">
			<input type="text" name="name" placeholder="请输入真实姓名">
			<input type="text" name="idcard" placeholder="请输入身份证号">
			<input type="text" name="bankcard" placeholder="请输入银行卡号">
			<input type="text" name="bankcardphone" placeholder="请输入银行预留手机号">
		</div>
		<button class="btn submit-btn">下一步</button>
		
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