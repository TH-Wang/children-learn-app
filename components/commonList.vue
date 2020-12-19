<template>
	<view class="commonList-page">
		<view class="list-item">
			<!-- 课程图片 -->
			<view class="item-img">
				<image src="../static/logo.png" mode=""></image>
			</view>
			<!-- 课程内容 -->
			<view class="item-content">
				<view class="content-text">
					<view class="content-name">
						{{listData.className}}
					</view>
					<view class="content-teacher">
						<view class="t-teacher">
							{{listData.teacher}}
						</view>
						<view class="t-progress">
							<image src="../pages/pen.png" mode=""></image>
							<text v-if="listData.isTbx">{{listData.progress||0}}</text>
							<text v-else>{{listData.finishNumber||0}}/{{listData.sumNumber||0}}</text>
						</view>
					</view>
					<view class="content-btn">
						<view class="b-littWords" v-if="listData.isTbx">
							{{listData.classTime}}
						</view>
						<view class="b-littWords" v-else>
							需要掌握{{listData.sumNumber}}个词语
						</view>
						<view :class="progress.className">
							<!-- <image src="../pages/dianzan.png" mode=""></image> -->
							<text>{{progress.btnText}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		</view>
</template>

<script>
	export default {
		props: {
		  listData: {
		    type: Object,
		    default: () => ({})
		  }
		},
		data() {
			return {

			};
		},
		mounted() {
			console.log(this.listData.progress);
		},
		computed:{
			status () {
			  // noStart: 未开始, doing: 进行中, finish: 已完成
				let taskProgress;
				if(this.listData.isTbx){
					taskProgress = parseInt(this.listData.progress);
				}else{
					taskProgress = (this.listData.finishNumber/this.listData.sumNumber)*100;
				}
			  if (taskProgress === 0) return 'noStart'
			  if (taskProgress === 100) return 'finish'
			  return 'doing'
			},
			// 进度条的文本和样式
			progress () {
			  const type = {
			    noStart: {
			      className: 'btn-noStart',
			      btnText: '未开始',
			    },
			    finish: {
			      className: 'btn-finish',
			      btnText: '已完成',
			    },
			    doing: {
			      className: 'btn-notFin',
			      btnText: '未完成',
			    }
			  }
			  return type[this.status]
			}
		}
	}
</script>

<style lang="scss">
.btn-common{
    width: 0.71rem;
    height: 0.24rem;
    border-radius: 0.12rem;
    position: relative;
    top: -0.1rem;
}
.test-common{
    font-size: 0.11rem;
    font-weight: bold;
}
.commonList-page {
		font-family: "PingFang";
		.list-item {
			width: 3.43rem;
			height: 1.21rem;
			border: solid 0.005rem transparentize($color: #FFFFFF, $amount: 0);
			margin: 0 auto;
			position: relative;
			
			.item-img {
				width: 0.8rem;
				height: 1.21rem;
				background-color: #eee;
				position: absolute;
				left: 0;
				top: 0;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.item-content {
				width: 3.43rem;
				height: 1rem;
				background: #FFFFFF;
				box-shadow: 0rem 0.025rem 0.07rem 0.01rem rgba(167, 167, 167, 0.1);
				border-radius: 0.1rem;
				margin-top: 0.11rem;
				.content-text{
					 padding: 0.08rem 0.16rem 0 0.89rem;
					.content-name {
						font-size: 0.14rem;
						font-weight: bold;
						color: #666666;
					}
					.content-teacher {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						height: 0.3rem;
						line-height: 0.25rem;
						.t-teacher {
							font-size: 0.12rem;
							color: #666666;
						}
						.t-progress {
							display: flex;
							align-items: center;
							position: relative;
							top: -0.04rem;
							right: 0.025rem;
							image {
								width: 0.205rem;
								height: 0.205rem;
								padding-right: 0.05rem;
							}
							text {
								font-size: 0.12rem;
								font-weight: 500;
								color: #FB5852;
							}
						}
					}
					.content-btn {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						margin-top: 0.13rem;
						line-height: 0.25rem;
						.b-littWords {
							font-size: 0.12rem;
							color: #FB5852;
						}
						// 完成的按钮样式，
						.btn-finish {
							background: #FFDFDE;
							box-shadow: 0rem -0.01rem 0.01rem 0.015rem #FFC7C5 inset;
							display: flex;
							justify-content: space-around;
							align-items: center;
							background-image: url(../pages/dianzan.png);
							background-size: 0.225rem 0.175rem;
							background-repeat: no-repeat;
							background-position: 0.1rem 0.005rem;
							text{
								color: #000000;
								margin-left: 0.225rem;
							}
						}
						//未完成 
						.btn-notFin{
							background: #FFDFDE;
							border-radius: 0.12rem;
							box-shadow: 0rem -0.01rem 0.01rem 0.015rem #FFC7C5 inset;
							line-height: 0.24rem;
							text-align: center;
							text{
								color: #FFFFFF;
							}
						}
						//未开始
						.btn-noStart{
							background: #EAEAEA;
							box-shadow: 0rem -0.01rem 0.01rem 0.015rem #DBDBDB inset;
							line-height: 0.24rem;
							text-align: center;
							text{
								color: #FFFFFF;
							}
						}
					}	
				}	
			}
		}
	}
</style>
