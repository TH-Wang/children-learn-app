<template>
	<view>
		 aaaaaaaaaa
		 <view class="read-list">
		 	 <view class="read-img">
		 	 	<image src="../static/logo.png" mode=""></image>
		 	 </view>
			 <view class="item-title">
			 	汉字
			 </view>
			 <view class="item-description">
			 	111111111111111111111111111111
			 </view>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.read-list{
	
	.read-img{
		width: 178px;
		height: 230px;
		background: #E3E3E3;
		border-radius: 20px;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.item-title{
		font-size: 24px;
		font-family: "PingFang";
		font-weight: 500;
		color: #333333;
	}
	.item-description{
		font-size: 24px;
		font-family: "PingFang";
		color: #666666;
	}
}
</style>
