<template>
	<view class="box mt-15">
		<view class="goods-box">
			<view class="goods-name">
				<text class="label">{{goods.label}}</text>
				<text>{{goods.name}}</text>
			</view>
			<view class="goods-charge charge">
				<text class="small">￥</text>{{goods.charge}}
			</view>
		</view>

		<view class="group-box" v-if="config.func.promoCode">
			<view class="title">优惠码</view>
			<view class="group-item">
				<view class="name">优惠码</view>
				<view class="value">
					<input type="text" v-model="promoCode" placeholder="优惠码" />
				</view>
				<view class="buttons">
					<view class="promo-code-check-button" @click="checkPromoCode">检测</view>
				</view>
			</view>
		</view>

		<view class="group-box">
			<view class="title">收银台</view>
			<view class="group-item">
				<view class="name">总价</view>
				<view class="value">
					<text class="charge">
						<text class="small">￥</text>{{total}}
					</text>
				</view>
			</view>
			<view class="group-item">
				<view class="name">优惠</view>
				<view class="value">
					<text class="charge free">
						<text class="small">￥</text>{{discount}}
					</text>
				</view>
			</view>
			<view class="group-item">
				<view class="name">实收</view>
				<view class="value">
					<text class="charge">
						<text class="small">￥</text>{{totalVal}}
					</text>
				</view>
			</view>
		</view>

		<view class="payments-box">
			<view class="title">支付方式</view>
			<template v-if="paymentScene !== 'mini'">
				<view class="payment-item" @click="setPayment(item.sign)" v-for="item in payments" :key="item.sign" :class="{active: item.sign === payment}">
					<view class="icon">
						<u-image :src="item.icon" width="100px" mode="widthFix"></u-image>
					</view>
					<view class="checkstatus" v-if="item.sign === payment">
						<u-icon name="checkmark" color="green" size="30"></u-icon>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="payment-item">
					<view class="name" v-if="paymentScene === 'mini'">微信支付</view>
				</view>
			</template>
		</view>

		<view class="save-button-box">
			<view class="save-button" @click="payHandler">
				立即支付
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../js/config/index.js';

	export default {
		data() {
			return {
				goods_type: null,
				goods: {
					id: null,
					icon: null,
					name: null,
					charge: null,
					label: null,
					type: null,
					tgGid: null
				},
				discount: 0,
				payments: [],
				payment: null,
				promoCode: null,
				total: 0,
				promoCodeBoxStatus: false,
				promoCodeModel: null,
				loading: false,
				paymentScene: "",
				config: config
			}
		},
		computed: {
			totalVal() {
				let val = this.total - this.discount;
				val = val < 0 ? 0 : val;

				return val;
			}
		},
		onLoad(option) {
			this.goods.id = option.goods_id;
			this.goods.name = option.goods_name;
			this.goods.charge = option.goods_charge;
			this.goods.label = option.goods_label;
			this.goods.type = option.goods_type;
			this.total = this.goods.charge;
			this.goods.tgGid = option.tg_gid || 0;

			// 当前运行环境
			let platform = process.env.VUE_APP_PLATFORM;
			console.log('当前运行平台', platform);
			if (platform === 'h5') {
				if (this.isWechat()) {
					this.paymentScene = 'wechat';
				} else {
					this.paymentScene = 'h5';
				}
			} else if (platform === 'mp-weixin') {
				// 微信小程序
				this.paymentScene = 'mini';
			}
		},
		onShow() {
			if (this.paymentScene) {
				this.$u.api.Order.Payments({
					scene: this.paymentScene
				}).then(data => {
					this.payments = data;
					if (data.length > 0) {
						this.payment = this.payments[0].sign;
					}
				})
			}
		},
		methods: {
			isWechat() {
				var ua = navigator.userAgent.toLowerCase();
				return /micromessenger/.test(ua) ? true : false;
			},
			setPayment(sign) {
				this.payment = sign;
			},
			payHandler() {
				if (this.paymentScene === 'h5' && !this.payment) {
					this.$u.toast('请选择支付方式');
					return;
				}
				if (this.goods.type === 'vod') {
					// 点播课程
					this.$u.api.Order.CreateCourseOrder({
						course_id: this.goods.id,
						promo_code: this.promoCode
					}).then(data => {
						this.orderCreatedHandler(data);
					}).catch(e => {
						this.$u.toast(e.data.message);
					})
				} else if (this.goods.type === 'video') {
					// 视频
					this.$u.api.Order.CreateVideoOrder({
						video_id: this.goods.id,
						promo_code: this.promoCode
					}).then(data => {
						this.orderCreatedHandler(data);
					}).catch(e => {
						this.$u.toast(e.data.message);
					})
				} else if (this.goods.type === 'role') {
					// 视频
					this.$u.api.Order.CreateRoleOrder({
						role_id: this.goods.id,
						promo_code: this.promoCode
					}).then(data => {
						this.orderCreatedHandler(data);
					}).catch(e => {
						this.$u.toast(e.data.message);
					})
				} else if (this.goods.type === 'live') {
					this.$u.api.Live.CreateOrder(this.goods.id, {
						goods_id: this.goods.id,
						promo_code: this.promoCode
					}).then(data => {
						this.orderCreatedHandler(data);
					}).catch(e => {
						this.$u.toast(e.data.message);
					})
				} else if (this.goods.type === 'book') {
					this.$u.api.Book.CreateOrder(this.goods.id, {
						goods_id: this.goods.id,
						promo_code: this.promoCode
					}).then(data => {
						this.orderCreatedHandler(data);
					}).catch(e => {
						this.$u.toast(e.data.message);
					})
				} else if (this.goods.type === 'paper') {
					this.$u.api.Exam.CreatePaperOrder(this.goods.id, {
						goods_id: this.goods.id,
						promo_code: this.promoCode
					}).then(data => {
						this.orderCreatedHandler(data);
					}).catch(e => {
						this.$u.toast(e.data.message);
					})
				} else if (this.goods.type === 'practice') {
					this.$u.api.Exam.CreatePracticeOrder(this.goods.id, {
						goods_id: this.goods.id,
						promo_code: this.promoCode
					}).then(data => {
						this.orderCreatedHandler(data);
					}).catch(e => {
						this.$u.toast(e.data.message);
					})
				} else if (this.goods.type === 'path') {
					this.$u.api.LearnPath.CreateOrder(this.goods.id, {
						goods_id: this.goods.id,
						promo_code: this.promoCode
					}).then(data => {
						this.orderCreatedHandler(data);
					}).catch(e => {
						this.$u.toast(e.data.message);
					})
				} else if (this.goods.type === 'tg') {
					this.$u.api.TuanGou.CreateOrder(this.goods.id, {
						goods_id: this.goods.id,
						promo_code: this.promoCode,
						gid: this.goods.tgGid
					}).then(data => {
						this.orderCreatedHandler(data);
					}).catch(e => {
						this.$u.toast(e.data.message);
					})
				} else if (this.goods.type === 'ms') {
					this.$u.api.MiaoSha.CreateOrder(this.goods.id, {
						goods_id: this.goods.id,
						promo_code: this.promoCode
					}).then(data => {
						this.orderCreatedHandler(data);
					}).catch(e => {
						this.$u.toast(e.data.message);
					})
				} else if (this.goods.type === 'topic') {
					this.$u.api.Topic.CreateOrder(this.goods.id, {
						goods_id: this.goods.id,
						promo_code: this.promoCode
					}).then(data => {
						this.orderCreatedHandler(data);
					}).catch(e => {
						this.$u.toast(e.message);
					})
				}
			},
			orderCreatedHandler(order) {
				if (order.status_text === '已支付') {
					// 优惠全部抵扣
					this.$u.toast('支付成功');
					setTimeout(() => {
						uni.navigateBack();
					}, 500);
				} else {
					// 未支付，跳转到支付网关或者调起支付
					if (this.paymentScene === 'h5' || this.paymentScene === 'wechat') {
						let redirect = encodeURIComponent(config.app_url + 'pages/order/success');
						let indexUrl = encodeURIComponent(config.app_url);
						window.location.href =
							config.url +
							"/api/v2/order/pay/redirect?order_id=" +
							order.order_id +
							"&payment_scene=" +
							this.paymentScene +
							"&scene=" +
							this.paymentScene +
							"&payment=" +
							this.payment +
							"&token=" +
							uni.getStorageSync('token') +
							"&redirect=" +
							redirect +
							"&cancel_redirect=" +
							indexUrl;
					} else if (this.paymentScene === 'mini') {
						this.$u.api.Order.WechatMiniPay({
							openid: '',
							order_id: order.order_id
						}).then(data => {
							// 微信小程序发起支付
						}).catch(e => {
							this.$u.toast(e.data.message);
						})
					}
				}
			},
			checkPromoCode() {
				if (!this.promoCode) {
					return;
				}
				this.$u.api.Order.PromoCodeCheck(this.promoCode).then(data => {
					if (data.can_use !== 1) {
						this.$u.toast('当前优惠码无法使用');
					} else {
						this.promoCodeModel = data.promo_code;
						this.discount = this.promoCodeModel.invited_user_reward;
					}
				}).catch(e => {
					this.$u.toast(e.data.message);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
  $primary: #FB5852;

	.goods-box {
		width: 100%;
		height: auto;
		float: left;
		box-sizing: border-box;
		padding: 15px;
		background-color: white;
		display: flex;
		margin-bottom: 15px;

		.goods-name {
			flex: 1;
			font-size: 15px;
			color: #333333;
			line-height: 20px;
			word-break: break-all;

			.label {
				padding: 2px 5px;
				border-radius: 3px;
				font-size: 10px;
				background-color: $primary;
				color: white;
				margin-right: 10px;
			}
		}

		.goods-charge {
			width: auto;
			height: auto;
			margin-left: 15px;
		}
	}

	.charge {
		font-size: 18px;
		color: rgba(red, .8);

		&.free {
			color: rgba(green, .8);
		}

		.small {
			font-size: 14px;
		}
	}

	.payments-box {
		width: 100%;
		height: auto;
		float: left;
		box-sizing: border-box;
		margin-bottom: 30px;

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

		.payment-item {
			width: 100%;
			height: auto;
			float: left;
			box-sizing: border-box;
			padding: 15px;
			background-color: white;
			display: flex;

			&.active {
				background-color: rgba(green, .1);
			}

			.icon {
				width: auto;
				height: auto;
				margin-right: 15px;
			}
		}

		.checkstatus {
			flex: 1;
			text-align: right;
		}
	}
</style>

<style>
	page {
		background-color: #F8F8F8;
	}
</style>
