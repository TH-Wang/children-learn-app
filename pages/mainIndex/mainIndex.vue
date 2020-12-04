<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item>
							<view class="swiper-item"><image src="../../static/vip-bg.png" mode=""></image></view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item">B</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item">C</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		
		<view class="icon-title">
			<uni-list class='icon-list'>
				<uni-list-item title="" note="" class='list-item'>
					<image src="../../static/icon(4).png" mode=""></image>
					<view class="ting">
						听
					</view>
					<view class="ting-descrip">
						听名师示范
					</view>
				</uni-list-item>
				<uni-list-item title="" note="" class='list-item'>
					<image src="../../static/icon(1).png" mode=""></image>
					<view class="ting">
						说
					</view>
					<view class="ting-descrip">
						标准普通话
					</view>
				</uni-list-item>
				<uni-list-item title="" note="" class='list-item'>
					<image src="../../static/icon(2).png" mode=""></image>
					<view class="ting">
						读
					</view>
					<view class="ting-descrip">
						世界名著
					</view>
				</uni-list-item>
				<uni-list-item title="" note="" class='list-item'>
					<image src="../../static/icon(3).png" mode=""></image>
					<view class="ting">
						写
					</view>
					<view class="ting-descrip">
						文章意境
					</view>
				</uni-list-item>
			</uni-list>
		</view>
		<class-list :classMsg=classMsg :isVip=isVip :teacherMsg=teacherMsg></class-list>
	</view>
</template>

<script>
	import classList from "../../components/class.vue"
	export default {
		data() {
			return {
				classMsg:{
					classType:'读',
					classTime:'9:30',
					classToTime:'3分17秒'
				},
				isVip:true,
				teacherMsg:{
					name:'杨超越老师',
					address:'巴黎圣母院',
					timeLength:'50分钟'
				},
				//轮播的样式配置 
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true, //是否有小点
				autoplay: true,//是否自动播放
				interval: 2000, //总共时长
				duration: 500, //切换的时间
			}
		},
		methods: {
			
		},
		components:{
			classList:classList,
		}
	}
</script>

<style lang="scss" scoped>
.uni-padding-wrap{
	background-color: #FB5953;
	height: 495px;
	border-radius: 0 0 50px 50px;

}
.icon-title{
	width: 704px;
	height: 240px;
	background: #FFFFFF;
	box-shadow: 0px 10px 35px 3px rgba(180, 46, 42, 0.1);
	border-radius: 20px;
	margin: 0 auto;
	margin-top: -50px;
	
	.icon-list{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 26px 24px;
		.list-item{
			text-align: center;
			image{
				width: 95px;
				height: 95px;
			}
			.ting{
				font-size: 32px;
				font-family: 'PingFang';
				font-weight: 500;
				color: #333333;
				margin: 12px 0px 5px 0 ;
			}
			.ting-descrip{
				font-size: 24px;
				font-family: 'PingFang';
				color: #666666;
			}
		}
	}
}

</style>}
