<template>
	<div class="login">
		<div class="inputbox">
			<input type="text" name="phone" placeholder="请输入手机号">
			<input type="password" name="password" placeholder="请输入手机号">
		</div>
		<button class="submit-btn">登录</button>
		<div class="register-forget clearfix">
			<router-link class="fl" to="/goods">忘记密码</router-link>
			<router-link class="fr" to="/goods">注册账号</router-link>
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
<style scoped>
	.login{
		padding: .8rem .53333333rem;
		.inputbox{
			padding-bottom: .4rem;
			input{
				display: inline-block;
				border: .01333333rem solid #c9c9c9;
				height: 66px;
				line-height: 66px;
				font-size: 24px;
				color: #000;
				padding-left: .26666667rem;
			}
		}
		.submit-btn{
			background-color: #6ce09e;
			color: #fff;
			font-size: 28px;
			line-height: 68px;
			line-height: 68px;
			text-align: center;
		}
	}
</style>