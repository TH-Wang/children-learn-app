<template>
	<view class="detailTop-page">
		<view class="detail-top">
			<view class="detail-img">
				<image src="" mode=""></image>
			</view>
			<view class="detail-content" :style="style.main">
				<view class="class-name">
					{{detail.name}}
				</view>
				<view class="class-author">
					作者：&nbsp{{detail.author}}&nbsp（{{detail.fanyi}}&nbsp译)
				</view>
				<view class="class-content">
					{{detail.content}}
				</view>
				<view class="ling-du">
					<view class="people-img">
						<image src="" mode=""></image>
					</view>
					<view class="people" :style="style.lingDu">
						领读人：{{detail.lingDu}}|共10篇领读
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
		  detail: {
		    type: Object,
		    default: () => ({})
		  }
		},
		data() {
			return {
				
			};
		},
		computed:{
			style(){
				if(this.detail.type == 1){
					return {
						main:'color:#FFFFFF',
						lingDu:'color:#FFFFFF'
					}
				}else{
					return {
						main:'color:#999999',
						lingDu:'color:#666666'
					}
				}
			}
		}
	}
</script>

<style lang="scss">
.detail-top{
	width:3.415rem;
	height:1.43rem;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	.detail-img{
		width: 1.08rem;
		height: 1.43rem;
		background: #E96359;
		border-radius: 0.1rem;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.detail-content{
		width: 2.19rem;
		color: #999999;
		.class-name{
			font-size: 0.16rem;
			font-weight: bold;
		}
		.class-author{
			font-size: 0.11rem;
			margin: 0.2rem 0;
		}
		.class-content{
			height: 0.265rem;
			// overflow: hidden;
			// text-overflow:ellipsis;
			// white-space: nowrap;
			font-size: 0.12rem;
			font-weight: 500;
		}
		.ling-du{
			display: flex;
			align-items: center;
			margin-top:0.19rem;
			.people-img{
				width: 0.225rem;
				height: 0.225rem;
				background: #E96359;
				border-radius: 50%;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.people{
				font-size: 0.11rem;
				color: #666666;
				font-weight: 500;
				margin-left: 0.12rem;
			}
		}
	}
}
</style>
