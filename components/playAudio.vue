<template>
	<view class="playlist-page" @click="$emit('click')">
		<view class="read-content">
			<view class="content">
				<view class="book-name">
					{{listItem.bookName}}
				</view>
				<view class="book-time">
					<text>{{sumTime}}</text>
					<text :style="state.style">{{state.text}}</text>
				</view>
			</view>
			<view class="btn-play">
				<image src="../static/read/play.png" mode=""></image>
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
		},
		computed: {
			sumTime() {
				let time = parseInt(this.listItem.vedioTime)
				let day = parseInt(time / 3600 / 24);
				let hour = parseInt(time / 60 / 60) % 24;
				let mini = parseInt(time / 60) % 60 ;
				let second = time % 60;
				let str = '';
				if (day > 0) {
					str += day + '天';
				}
				if (hour > 0) {
					str += hour + '小时';
				}
				if (mini > 0) {
					str += mini + '分';
				}
				if (second > 0 && second < 10) {
					str += '0' + second + '秒';
				}else{
					str += second + '秒';
				}
				return str;
			},
			state() {
				let sumtime = parseInt(this.listItem.vedioTime);
				let studyTime = parseInt(this.listItem.studyTime);
				if (sumtime == studyTime) {
					return {
						style: 'color:#E96359',
						text: '已完成'
					}
				} else if (studyTime == 0) {
					return {
						style: 'color:#666666',
						text: '未学习'
					}
				} else {
					return {
						style: 'color:#666666',
						text: '未完成'
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.playlist-page {
	width: 3.43rem;
	height: 0.87rem;
	background: #FFFFFF;
	box-shadow: 0rem 0.02rem 0.135rem 0rem rgba(167, 167, 167, 0.14);
	border-radius: 0.1rem;
	margin: 0 auto;

	.read-content {
		display: flex;
		justify-content: space-between;
		padding: 0.18rem 0.15rem 0 0.16rem;

		.content {
			.book-name {
				font-size: 0.14rem;
				font-weight: bold;
				color: #333333;
			}

			.book-time {
				font-size: 0.11rem;
				color: #666666;
				margin-top: 0.115rem;

				text {
					padding-right: 0.13rem;
				}
			}
		}

		.btn-play {
			align-self: flex-end;
			position: relative;
			top: 0.05rem;

			image {
				width: 0.35rem;
				height: 0.275rem;
			}
		}
	}
}
</style>
