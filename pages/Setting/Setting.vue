<template>
  <view>
    <view class="group-box">
			<view class="group-item" @click="handleLink(0)">
				<view class="name">用户协议</view>
        <van-icon name="arrow" color="#999" />
			</view>
			<view class="group-item" @click="handleLink(1)">
				<view class="name">隐私协议</view>
        <van-icon name="arrow" color="#999" />
			</view>
			<view class="group-item" @click="handleLink(2)">
				<view class="name">关于我们</view>
        <van-icon name="arrow" color="#999" />
			</view>
			<view class="group-item">
				<view class="name">当前程序版本v1.0.0</view>
			</view>
		</view>

		<view class="save-button-box">
			<view class="save-button" @click="logout">
				安全退出
			</view>
		</view>
  </view>
</template>

<script>
import Icon from "@/wxcomponents/vant/icon/index.vue";
import { mapMutations } from 'vuex';

export default {
  components: {
    'van-icon': Icon
  },
  data: () => ({
    typeId: null
  }),
  methods: {
    ...mapMutations(['clearToken']),
    handleLink (id) {
      uni.navigateTo({ url: `/pages/Description/Description?id=${id}` })
    },
    logout () {
      this.clearToken()
      uni.showToast({title: '已安全退出', icon: 'none'})
      setTimeout(() => {
        uni.navigateBack()
      }, 300);
    }
  }
}
</script>

<style lang="scss" scoped>
$primary: #FB5852;

.group-box {
	width: 100%;
	height: auto;
	float: left;
	margin-bottom: 15px;
	
	.title {
		width: 100%;
		height: auto;
		float: left;
		box-sizing: border-box;
		padding-left: 15px;
		font-size: 12px;
		color: #999999;
		line-height: 30px;
	}
	
	.group-item {
		width: 100%;
		height: auto;
		float: left;
		margin-bottom: 1px;
		display: flex;
    justify-content: space-between;
		box-sizing: border-box;
		padding: 5px 15px;
		background-color: white;
    border-bottom: solid 1px #EAEAEA;
		
		.name {
			width: 150px;
			height: auto;
			float: left;
			line-height: 36px;
			font-size: 15px;
			color: #333333;
		}
		
		.value {
			flex: 1;
			text-align: right;
			line-height: 36px;
			font-size: 14px;
			color: #999999;
			
			.u-image,u-image {
				display: inline-block;
			}
			
			input {
				width: 100%;
				height: 36px;
				line-height: 36px;
				border: 0;
				text-align: right;
				outline: none;
				font-size: 14px;
				
				&::placeholder {
					color: #CCCCCC;
				}
			}
		}
		
		.captcha {
			width: auto;
			height: auto;
			line-height: 36px;
			margin-left: 30px;
			
			.u-image {
				display: inline-block;
			}
		}
		
		.buttons {
			width: auto;
			height: auto;
			line-height: 36px;
			margin-left: 30px;
			
			.send-sms-button,.promo-code-check-button {
				width: 100px;
				height: 30px;
				line-height: 30px;
				margin-top: 3px;
				text-align: center;
				color: white;
				background-color: $primary;
				font-size: 14px;
				border-radius: 3px;
				float: left;
			}
			
			.promo-code-check-button {
				width: 50px;
			}
		}
	}
}
.save-button-box {
	width: 100%;
	height: auto;
	float: left;
	margin-top: 15px;
	box-sizing: border-box;
	padding-left: 15px;
	padding-right: 15px;
	margin-bottom: 15px;
	
	.save-button {
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: white;
		background-color: $primary;
		font-size: 14px;
		border-radius: 5px;
	}
}
</style>