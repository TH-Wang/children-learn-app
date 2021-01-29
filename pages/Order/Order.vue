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

		<view class="group-box">
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
						<image :src="item.icon" mode="widthFix"></image>
					</view>
					<view class="checkstatus" v-if="item.sign === payment">
						<icon type="success_no_circle" color="green" size=".16rem"></icon>
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
	// import config from '../../js/config/index.js';

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
				// config: config
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

      // 设置当前导航栏标题
      const title = this.goods.label
      uni.setNavigationBarTitle({title})

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
				this.$api.getPayments(this.paymentScene).then(res => {
					this.payments = res.data.data;
					if (res.data.data.length > 0) {
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
			async payHandler() {
				if (this.paymentScene === 'h5' && !this.payment) {
					this.$u.toast('请选择支付方式');
					return;
        }
        // 封装请求参数，确定接口函数
        const data = {}
        data.promo_code = this.promoCode
        let key = null
        let api = null
        switch (this.goods.type) {
          case 'vod':
            key = 'course_id';
            api = 'createCourseOrder'; break;
          case 'video':
            key = 'video_id';
            api = 'createVideoOrder'; break;
          case 'role':
            key = 'role_id';
            api = 'createRoleOrder'; break;
          default:
            key = 'goods_id';
            api = 'createCourseOrder'
        }
        data[key] = this.goods.id
        if (this.goods.type === 'tg') data.gid = this.goods.tgGid
        // 发起请求
        const res = await this.$api[api](data)
        if (res.data.code === 0) {
          this.orderCreatedHandler(res.data)
        } else {
          uni.showToast({title: res.data.message, icon: 'none'});
        }
			},
			orderCreatedHandler(order) {
        console.log('订单信息', order)
				// if (order.status_text === '已支付') {
				// 	// 优惠全部抵扣
				// 	this.$u.toast('支付成功');
				// 	setTimeout(() => {
				// 		uni.navigateBack();
				// 	}, 500);
				// } else {
				// 	// 未支付，跳转到支付网关或者调起支付
				// 	if (this.paymentScene === 'h5' || this.paymentScene === 'wechat') {
				// 		let redirect = encodeURIComponent(config.app_url + 'pages/order/success');
				// 		let indexUrl = encodeURIComponent(config.app_url);
				// 		window.location.href =
				// 			config.url +
				// 			"/api/v2/order/pay/redirect?order_id=" +
				// 			order.order_id +
				// 			"&payment_scene=" +
				// 			this.paymentScene +
				// 			"&scene=" +
				// 			this.paymentScene +
				// 			"&payment=" +
				// 			this.payment +
				// 			"&token=" +
				// 			uni.getStorageSync('token') +
				// 			"&redirect=" +
				// 			redirect +
				// 			"&cancel_redirect=" +
				// 			indexUrl;
				// 	} else if (this.paymentScene === 'mini') {
				// 		this.$u.api.Order.WechatMiniPay({
				// 			openid: '',
				// 			order_id: order.order_id
				// 		}).then(data => {
				// 			// 微信小程序发起支付
				// 		}).catch(e => {
				// 			this.$u.toast(e.data.message);
				// 		})
				// 	}
				// }
			},
			checkPromoCode() {
				if (!this.promoCode) {
					return;
				}
				this.$api.promoCodeCheck(this.promoCode).then(data => {
					if (data.can_use !== 1) {
						uni.showToast({title: '当前优惠码无法使用', icon: 'none'})
					} else {
						this.promoCodeModel = data.promo_code;
						this.discount = this.promoCodeModel.invited_user_reward;
					}
				}).catch(err => {
					uni.showToast({title: err, icon: 'none'})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
  $primary: #FB5852;
  .box {
    width: 100%;
    height: auto;
    float: left;
  }

  .mt-15 {
    margin-top: 15px;
  }

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
        
        image{
          width: 1rem;
        }
			}
		}

		.checkstatus {
			flex: 1;
			text-align: right;
		}
	}
</style>
