<template>
	<div class="login">
		<div class="inputbox">
			<input type="text" name="phone" placeholder="请输入密码">
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