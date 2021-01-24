<template>
	<view>
		<view class="box">
			<view class="order-item" v-for="order in orderList" :key="order.id">
				<view class="title">
					<view class="date">{{ order.created_at }}</view>
					<view class="status">{{ order.status_text }}</view>
				</view>
				<view class="body">
					<view class="goods">
						<view class="name">
							{{ order.goods[0].goods_text }}[{{ order.order_id }}]
						</view>
						<view class="payment">{{ order.payment_text }}</view>
					</view>
					<view class="charge">￥{{ order.charge }}</view>
				</view>
			</view> 
			
			<!-- <view class="loadmore">
				<u-loadmore :status="loadStatus" @loadmore="getData(true)" />
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList:[]
			};
		},
		methods:{
			async handleReq() {
        uni.showLoading({title: '加载中'})
			  const res = await this.$api.getMemberOrders();
				this.orderList = res.data.data.data;
        uni.hideLoading()
			},
		},
		onLoad() {
			this.handleReq();
		}
	}
</script>

<style lang="scss" scoped>
	.order-item {
		width: 100%;
		height: auto;
		float: left;
		padding: 15px;
		background-color: white;
		box-sizing: border-box;
		margin-bottom: 1px;

		.title {
			width: 100%;
			height: auto;
			float: left;
			display: flex;
			margin-bottom: 20px;

			.date {
				flex: 1;
				font-size: 13px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				line-height: 13px;
			}

			.status {
				flex: 1;
				text-align: right;
				font-size: 13px;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				line-height: 13px;
			}
		}

		.body {
			width: 100%;
			height: auto;
			float: left;
			display: flex;

			.icon {
				width: 36px;
				height: 36px;
				padding-right: 15px;
			}

			.goods {
				flex: 1;

				.name {
					width: 100%;
					height: auto;
					float: left;
					font-size: 15px;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 15px;
					padding-top: 3px;
					margin-bottom: 10px;
				}
			}

			.payment {
				width: 100%;
				height: auto;
				float: left;
				font-size: 12px;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				line-height: 13px;
			}
		}

		.charge {
			width: 120px;
			height: auto;
			text-align: right;
			font-size: 20px;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			line-height: 20px;
			padding-top: 8px;
		}
	}
</style>

<style>
	page {
		background-color: #F8F8F8;
	}
</style>
