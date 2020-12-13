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
					<navigator url=""><image src="../../static/icon(4).png" mode=""></image></navigator>
					<view class="ting">
						听
					</view>
					<view class="ting-descrip">
						听名师示范
					</view>
				</uni-list-item>
				<uni-list-item title="" note="" class='list-item'>
					<navigator url=""><image src="../../static/icon(1).png" mode=""></image></navigator>
					<view class="ting">
						说
					</view>
					<view class="ting-descrip">
						标准普通话
					</view>
				</uni-list-item>
				<uni-list-item title="" note="" class='list-item'>
					<navigator url=""><image src="../../static/icon(2).png" mode=""></image></navigator>
					<view class="ting">
						读
					</view>
					<view class="ting-descrip">
						世界名著
					</view>
				</uni-list-item>
				<uni-list-item title="" note="" class='list-item'>
					<navigator url=""><image src="../../static/icon(3).png" mode=""></image></navigator>
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
		<task-list :task=task :key='1'></task-list>
		<task-list :task=task :key='2'></task-list>
	</view>
</template>

<script>
	import classList from "../../components/class.vue"
	import taskList from "../../components/task.vue"
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
				//任务信息
				task:{
					title:'今日任务',
					isNewTask:true, //是否是今日任务
					taskProgress: 0, //0-100的数值
					taskName:'阅读课外必读书目p34第三段',
					needTime:20 //需要的时间，最小分钟数
				}
			}
		},
		methods: {
			
		},
		components:{
			classList:classList,
			taskList:taskList,
		}
	}
	// 页面动态改变fsize
	document.documentElement.style.fontSize = 26.666667+'vw';
	document.getElementsByTagName('body')[0].style['font-size'] = 16 + 'px';
</script>

<style lang="scss" scoped>

.uni-padding-wrap{
	background-color: #FB5953;
	height: 2.475rem;
	border-radius: 0 0 0.25rem 0.25rem;

}
.icon-title{
	width: 3.52rem;
	height: 1.2rem;
	background: #FFFFFF;
	box-shadow: 0rem 0.05rem 0.175rem 0.015rem rgba(180, 46, 42, 0.1);
	border-radius: 0.1rem;
	margin: 0 auto;
	margin-top: -0.25rem;
	
	.icon-list{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0.13rem 0.12rem;
		.list-item{
			text-align: center;
			image{
				width: 0.475rem;
				height: 0.475rem;
			}
			.ting{
				font-size: 0.16rem;
				font-family: 'PingFang';
				font-weight: 500;
				color: #333333;
				margin: 0.06rem 0rem 0.025rem 0 ;
			}
			.ting-descrip{
				font-size: 0.12rem;
				font-family: 'PingFang';
				color: #666666;
			}
		}
	}
}
</style>}
