<template>
	<view class="content">
    <view>
      <view class="text-area">
        <text class="title">{{title}}</text>
      </view>
      <view @tap="onClick" class="text-area" style="margin-top:20px">
        <text class="title">欢迎来到听说读写</text>
      </view>
    </view>

    <van-button
      type="info"
      size="large"
      style="margin-top:30rpx"
      @click="onClick"
    >了解更多</van-button>

    <van-toast id="van-toast" />
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  
	export default {
		data() {
			return {
				// title: 'Hello'
				classMsg:{
					classType:'读',
					classTime:'9:30',
					classToTime:'3分17秒'
				},
				isVip:true,
				teacherMsg:{
					name:'杨超越老师',
					address:'巴黎圣母院',
					timeLength:'50分钟'
				}
			}
		},
		computed: {
			...mapState(['title'])
    },
    methods: {
      onClick () {
        this.$toast({
          message: '正在努力开发中...',
          position: 'bottom'
        })
      }
    },
		onLoad() {

		}
	}
</script>

<style lang="scss">
	.content {
    width: 100%;
    height: calc(100vh - 88rpx);
    padding: 200rpx 40rpx 150rpx 40rpx;
    box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: space-between;
		justify-content: space-between;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
  }
  
  .custom-title{
    margin-top: 20rpx;
    @include font(36rpx);
  }
</style>
