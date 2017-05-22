<template>
	<div class="alert">
		<div class="zhezhao"></div>
		<div class="alert-content">
			<div class="content">
				{{msg}}
			</div>
			<div class="btn-box">
				
				<span class="sure" v-tap="{methods:surefn}">确定</span>
				<span class="sure" v-tap="{methods:canclefn}">{{cancleMsg}}</span>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name:"alert",
	data(){
		return {
			cancleMsg:"取消",
		}
	},
	props:{
		msg:String,
		rightMsg:String,
		openWindow: Boolean,
	},
	created(){
		if(this.rightMsg){
			this.cancleMsg = this.rightMsg;
		}
	},
	methods: {
		surefn() {
			this.$emit('sure',false);
		},
		canclefn() {
			this.$emit('cancle',false);
		}
	}
}
</script>
<style scoped lang="less" rel="stylesheet/less">
@import "../../common/style/alert.less";
	.alert{
		.alert-content{
			.btn-box{
		    border-top: 1px solid #e2e2e2;
		    span.sure{
		    	border:none;
		    	padding:0 .89rem;
		    }
			}
		}
	}
</style>