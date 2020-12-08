<template>
	<view>
		<view class="title">
			<view class="title-box"></view>
			<view class="title-text">{{task.title}}</view>
		</view>
		<view class="content">
			<view class="top-box"><image src="" mode=""></image></view>
			<view class="bottom-box">
				<view class="mask">	</view>
				<view class="task-name">
					<text v-if="task.isNewTask">今日解锁新任务</text>
					{{task.taskName}}
				</view>
				<view class="task-progress">
						<text v-if="isNoStart" class="task-needTime">预计用时{{task.needTime}}~{{task.needTime+10}}分钟</text>
						<text class="percent" v-show="isShow">完成进度为</text>
						<text class="finish" v-show="isSuccess">已完成</text>
						<text class="noStart" v-show="isNoStart">未开始</text>
				</view>
			
			</view>
		</view>
		<view class="aa">
			
		</view>
	</view>
</template>

<script>
	export default {
		props:['task'],
		data() {
			return {
				isShow:false,
				isSuccess:false,
				isNoStart:true
			};
		},
		mounted(){
			let percent = document.getElementsByClassName('percent');
			let progress = document.getElementsByClassName('mask');
			switch (this.task.taskProgress){
				case 0:
				this.isSuccess = false;
				this.isShow = false;
				this.isNoStart = true;
				progress.forEach(item=> item.style.backgroundColor = '#F2F2F2')
					break;
				case 100:
				this.isSuccess = true;
				this.isShow = false;
				this.isNoStart = false;
					break;
				default:
				this.isSuccess = false;
				this.isShow = true;
				this.isNoStart = false;
				percent.innerHTML = '完成进度：'+this.task.taskProgress+'%';
				progress.forEach(item=> item.style.backgroundColor = '#FFF1F1')
				progress.style.width = this.task.taskProgress/100 * 686 +'px'; //多个数据？
					break;
			}
		}
	}
	// 页面动态改变fsize
	document.documentElement.style.fontSize = 26.666667+'vw';
	document.getElementsByTagName('body')[0].style['font-size'] = 16 + 'px';
</script>

<style lang="scss" scoped>
	.title{
			height: 0.16rem;
			display: flex;
			align-items: center;
			margin: 0.245rem 0 0.15rem 0.16rem;
			.title-box{
				width: 0.05rem;
				height: 0.16rem;
				background: #FB5852;
				border-radius: 0.01rem;
			}
			.title-text{
				font-size: 0.18rem;
				font-family: "PingFang";
				font-weight: bold;
				padding-left: 0.07rem;
			}
		}
		.content{
			position: relative;
			width: 3.43rem;
			margin: 0 auto;
			.top-box{
				width: 0.81rem;
				height: 0.92rem;
				background: #BFBFBF;
				border-radius: 0.06rem;
				z-index: 200;
				position: absolute;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.bottom-box{
				width: 3.1rem;
				height: 0.89rem;
				box-shadow: 0rem 0.025rem 0.07rem 0.01rem rgba(167, 167, 167, 0.1);
				border-radius: 0.06rem;
			    position: absolute;
				top: 0.175rem;
				left: 0.315rem;
				position: relative;
				//遮罩层的样式
				.mask{
					width: 3.1rem;	
					height: 0.89rem;
					background: #FFFFFF;
					border-radius: 0.06rem;
				}
				.mask-noStart{
					background: #F2F2F2;
				}
				.task-name{
					font-size: 0.14rem;
					font-family: "PingFang";
					font-weight: 500;
					color: #666666;
					position: absolute;
					left: 0.61rem;
					top: 0.135rem;
				}
				.task-progress{
					width: 2.355rem;
					position: absolute;
					left: 0.61rem;
					bottom: 0.135rem;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					.task-needTime{
						font-size: 0.14rem;
						font-family: "PingFang";
						font-weight: 500;
						color: #666666;
					}
					.percent,.noStart{
						font-size: 0.12rem;
						color: #666666;
						text-align: end;
					}
					.finish{
						font-size: 0.12rem;
						color: #FB544F;
						text-align: end;
					}
					.noStart,.finish,.percent{
						margin: 0 0 0 auto;
					}
				}
			}
		}
</style>
