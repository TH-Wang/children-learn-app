<template>
	<view class="myclasList-page">
		<view class="list-item">
			<!-- 标题部分 -->
			<view class="content-tit">
				<view class="title">
					<text class="type">{{listItem.type}}</text>
					{{listItem.className}}
				</view>
				<view class="is-tuijian" v-if="listItem.isTuijian&&!listItem.isWrong">
					
				</view>
			</view>
			<!-- 错题集的内容 -->
			<view v-if="isWrong">
				<view class="w-msg">
					<text class="w-num">做错<text style="color: #FB5650;">{{listItem.wrongNum}}</text>次</text>
					<text class="w-sum">累计作答<text style="color: #FB5650;">{{listItem.sum}}</text>次</text>
				</view>
				<view class="reason">
					{{listItem.reason}}
				</view>
			</view>
			<view v-else>
				<!-- 收藏人数，课程 -->
				<view class="content-pelass">
					{{listItem.classMsg}}
				</view>
				<!-- 老师和价格 -->
				<view class="content-thermoy">
					<view class="teacher">
						<view class="t-img">
							<image :src="listItem.teacherImg" mode=""></image>
						</view>
						<text class="t-name">
							{{listItem.teacherName}}
						</text>
					</view>
					<view class="price">
						￥{{listItem.price}}
					</view>
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
      },
			isWrong: {
			  type: Boolean,
			  default: false
			},
    },
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.list-item{
	width: 3.43rem;
	height: 1.405rem;
	margin: 0 auto .12rem;
  padding: .12rem .12rem 0;
  box-sizing: border-box;
	box-shadow: 0rem 0.01rem 0.135rem 0rem rgba(167, 167, 167, 0.14);
	border-radius: 0.1rem;
	.content-tit{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding:0.12rem 0.03rem 0;
		.title{
			font-size: 0.16rem;
			font-weight: bold;
			color: #333333;
			.type{
				font-size: 0.14rem;
				font-weight: 500;
				color: #FFFEFE;
				width: 0.34rem;
				height: 0.195rem;
				text-align: center;
				line-height: 0.195rem;
				display: inline-block;
				background-image: url(../static/myClass/type-bg.png);
				background-size: 100%;
			}
		}
		.is-tuijian{
			width: 0.225rem;
			height: 0.245rem;
			background-image: url(../static/myClass/tuijian.png);
			background-size: 100%;
		}
	}
	.content-pelass{
		font-size: 0.12rem;
		line-height: 0.21rem;
		color: #999999;
		padding: 0 0.03rem;
	}
	.content-thermoy{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 0.25rem;
		padding: 0 0.03rem;
		.teacher{
			.t-img{
				width: 0.24rem;
				height: 0.24rem;
				background: #E1E1E1;
				border-radius: 50%;
				display: inline-block;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.t-name{
				font-size: 0.13rem;
				color: #999999;
				position: relative;
				top: -0.075rem;
				left: 0.09rem;
			}
		}
		.price{
			font-size: 0.16rem;
			font-weight: 500;
			color: #E96056;
		}
	}
  //错题集的样式
	.w-msg{
		font-size: 0.12rem;
		color: #999999;
		margin: 0.085rem 0.03rem 0.235rem;
		.w-num{
			
		}
		.w-sum{
			padding-left: 0.475rem;
		}
	}
	.reason{
		font-size: 0.12rem;
		color: #999999;
		padding: 0 0.03rem;
		
	}
}
</style>
