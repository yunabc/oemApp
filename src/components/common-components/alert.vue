<template>
	<div class="alert">
		<div class="zhezhao"></div>
		<div class="alert-content">
			<div class="content">
				{{msg}}
			</div>
			<p class="sure" @click="sure">确定</p>
		</div>
	</div>
</template>
<script>
export default {
	name:"alert",
	props:{
		msg:String,
		openWindow: Boolean,
	},
	methods: {
		sure() {
			this.$emit('close',false);
		}
	}
}
</script>
<style scoped lang="less" rel="stylesheet/less">
@import "../../common/style/commoncolor.less";
	.alert{
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		.zhezhao{
			position: fixed;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			background-color: rgba(0, 0, 0, 0.8);
			z-index: 5;
		}
		.alert-content{
			z-index: 6;
			width: 60%;
			left: 50%;
		  box-shadow:0 0 10px #ccc;  
			top: 1.33333333rem;
			margin-left: -30%;
			position: absolute;
			padding-top: .53333333rem;
			text-align: center;
			background-color: #fff;
			border-radius: 10px;

			.content{
				padding: 0 .26666667rem .26666667rem;
				line-height: .53333333rem;
				font-size: .32rem;
				color: #9a9a9a;
			} 
			.sure{
				color: @color;
				line-height: .90666667rem;
				line-height: .90666667rem;
				font-size: .37333333rem;
				border-top: 1px solid #e2e2e2;
			}
		}
	}
</style>