<template>
	<view class="msg-page">
			<view class="list-item">
				 <view class="tx-img">
				 	 <image src="" mode=""></image>
					 <view class="msg-num">{{listItem.unread}}</view>
				 </view>
				 <view class="msg-detail">
				 	 <view class="tit-time">
				 	 	<view class="title" :style="listItem.isVip?'color:#E96056;':''">
				 	 		{{listItem.msgFrom}}
				 	 	</view>
						<view class="time-ago">
							{{listItem.timeAgo}}
						</view>
				 	 </view>
					 <view class="jifen">
					 	{{listItem.msg}}
					 </view>
				 </view>
			</view>
	</view>
</template>

<script>
	export default {
		props: {
		  listItem: {
		    type: Object,
		    default: () => ({})
		  }
		},
		data() {
			return {
				
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.list-item{
	width: 3.43rem;
	height: 0.93rem;
	border-bottom: 0.005rem solid #E3E3E3;
	margin: 0 auto;
	display: flex;
  align-items: center;
	flex-direction: row;
	// padding-top: 0.275rem;
	.tx-img{
		width: 0.4rem;
		height: 0.4rem;
		background: #F1F4FD;
		border-radius: 50%;
		position: relative;
		image{
			width: 100%;
			height: 100%;
		}
		.msg-num{
      padding: 0 .03rem;
			height: 0.12rem;
			background: #E96056;
			border-radius: 0.06rem;
			color: #FFFEFE;
			font-size: 0.09rem;
			// font-weight: bold;
			text-align: center;
			position: absolute;
			right: 0.025rem;
			top:-0.025rem ;
		}
	}
	.msg-detail{
		margin-left: 0.165rem;
		flex: 1;
		.tit-time{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.title{
				font-size: 0.16rem;
				font-weight: bold;
				color: #333333;
			}
			.time-ago{
				font-size: 0.11rem;
				font-weight: 500;
				color: #999999;
				position: relative;
				top: 0.1rem;
			}
		}
	  .jifen{
			width: 1.75rem;
			font-size: 0.12rem;
			color: #999999;
			white-space: nowrap;
			text-overflow:ellipsis;
			overflow: hidden;
			margin-top: 0.115rem;
		}
	}
}
</style>
