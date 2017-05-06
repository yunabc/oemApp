<template>
	<div class="alert">
		<div class="zhezhao"></div>
		<div class="alert-content">
			<div class="content">
				{{msg}}
			</div>
			<p class="sure" v-tap="{methods:sure}">确定</p>
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
@import "../../common/style/alert.less";
	
</style>