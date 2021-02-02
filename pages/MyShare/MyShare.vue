<template>
	<view class="box" v-if="user">
		<view class="user-info">
			<view class="avatar">
				<image :src="user.avatar"></image>
			</view>
			<view class="nickname">{{user.nick_name}}</view>
		</view>

		<view class="stat-box">
			<view class="invite-count item">
				<view class="value">{{invite.count}}</view>
				<view class="name">邀请人数</view>
			</view>
			<view class="invite-balance item">
				<view class="value">{{invite.balance}}.00</view>
				<view class="name">邀请余额</view>
			</view>
			<view class="withdraw-button-box item">
				<text class="withdraw-button">去提现</text>
			</view>
		</view>

		<view class="options-box">
			<view class="copy-link item">
				<view class="icon">
					<van-icon name="question-o" size="20px" color="rgba(0, 0, 0, .7)"></van-icon>
				</view>
				<view class="name">奖励规则</view>
			</view>
			<view class="copy-link item">
				<view class="icon">
					<van-icon name="photo-o" size="20px" color="rgba(0, 0, 0, .7)"></van-icon>
				</view>
				<view class="name">海报分享</view>
			</view>
			<view class="copy-link item">
				<view class="icon">
					<van-icon name="shop-o" size="20px" color="rgba(0, 0, 0, .7)"></van-icon>
				</view>
				<view class="name">推广商品</view>
			</view>
		</view>
	</view>
</template>

<script>
  import { mapState } from 'vuex'
  import Icon from '@/wxcomponents/vant/icon/index.vue'

	export default {
    components: {
      'van-icon': Icon
    },
		data: () => ({
      invite: {
        count: 0,
        balance: 0,
      }
    }),
		computed: {
      ...mapState(['global']),
      user () {
        return this.global.userInfo
      }
		},
		methods: {
			async getInviteData() {
        // 邀请人数
        const res = await this.$api.MultiLevelShare()
        const { invite_balance, invite_count } = res.data.data
        this.invite.count = invite_count
        this.invite.balance = invite_balance
			},
			goPage(page) {
				uni.navigateTo({
					url: page
				})
			}
		},
		onLoad () {
			this.getInviteData()
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		box-sizing: border-box;
		padding: 15px;
	}

	.user-info {
		width: 100%;
		height: auto;
		float: left;
		box-sizing: border-box;
		display: flex;
		margin-bottom: 15px;

		.avatar {
			width: auto;
			height: auto;
			margin-right: 15px;

      image{
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
		}

		.nickname {
			flex: 1;
			font-size: 14px;
			color: #333333;
			line-height: 40px;
		}
	}

	.stat-box {
		width: 100%;
		height: auto;
		float: left;
		box-sizing: border-box;
		margin-bottom: 15px;
		background-color: white;
		padding: 15px;
		border-radius: 5px;
		box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
		display: flex;

		.item {
			flex: 1;
			text-align: center;

			.value {
				width: 100%;
				height: auto;
				float: left;
				font-size: 16px;
				font-weight: 700;
				line-height: 40px;
				color: #333333;
			}

			.name {
				width: 100%;
				height: auto;
				float: left;
				font-size: 12px;
				line-height: 24px;
				color: #aaaaaa;
			}

			.withdraw-button {
				display: inline-block;
				width: auto;
				height: auto;
				margin-top: 17px;
				padding: 5px 15px;
				border-radius: 15px;
				background-color: white;
				border: 1px solid #0b76de;
				font-size: 12px;
				color: #0b76de;
				text-decoration: none;
			}
		}
	}

	.options-box {
		width: 100%;
		height: auto;
		float: left;
		margin-bottom: 15px;
		background-color: white;
		padding: 15px;
		border-radius: 5px;
		box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
		display: flex;
		box-sizing: border-box;

		.item {
			flex: 1;
			text-align: center;

			.icon {
				width: 100%;
				height: auto;
				float: left;
				margin-bottom: 10px;
			}

			.name {
				width: 100%;
				height: auto;
				float: left;
				font-size: 12px;
				color: rgba(0, 0, 0, .7);
				line-height: 18px;
			}
		}
	}
</style>
