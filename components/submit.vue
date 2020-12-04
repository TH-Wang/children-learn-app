<template>
	<view>
		<view class="btn">
			{{btnText}}
		</view>
		<view class="text">
			<text class="dark">{{darkWord}}</text>
			<text>?</text>
			<text class="light" @click="fnClick">{{lightWord}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:['btnText','darkWord','lightWord','isLogin'],
		data() {
			return {
				// isLogin 表示的是，是否是登录页面
			};
		},
		methods:{
			fnClick(){
				console.log(this.isLogin);
				if(this.isLogin){
					uni.navigateTo({
						url: '../sign/sign'
					})
				}else{
					uni.navigateTo({
						url: '../login/login'
					})
				}
		  }
	  },
	}
	// 页面动态改变fsize
	document.documentElement.style.fontSize = 26.666667+'vw';
	document.getElementsByTagName('body')[0].style['font-size'] = 16 + 'px';
</script>

<style lang="scss" scoped>
.btn{
	width: 2.835rem;
	height: 0.5rem;
	line-height: 0.5rem;
	text-align: center;
	background: #FFFFFF;
	border-radius: 0.25rem;
	font-size: 0.16rem;
	font-family: "PingFang";
	font-weight: bold;
	color: #000000;
	margin: auto;
}
.text{
	text-align: center;
	font-size: 0.16rem;
	color: #FDA2A0;
	letter-spacing: 0.015rem;
	 margin-top: 0.1rem;
	.dark{
		font-family: "PingFang";
		font-weight: 500;
		color: #FDA2A0;
	}
	.light{
		font-family: "PingFang";
		font-weight: 500;
		color: #FFFFFF;
		padding: 0 0.075rem;
	}
}
</style>
