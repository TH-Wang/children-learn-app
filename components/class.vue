<template>
	<view>
		<view class="class-wap">
			<view class="class-top">
				<view class="left">
				 <view class="left-top">
					 <view class="class-type">{{classMsg.classType}}</view>
					 <view class="class-time">上课时间</view>
				 </view>
				 <view class="left-bottom">
					{{classMsg.classTime}}
				 </view>
			</view> 
			<view class="right">
				<view class="right-top">
					<view class="isVipClass" v-if="isVip">
						距离上课时间还有{{classMsg.classToTime}} 
					</view>
					<view class="noVipClass" v-if="!isVip">
						课程暂未开始
					</view>
				</view>
				<view class="right-bottom">
					<!-- 此处为vip的情况 非vip的情况为-->
					<view class="goToClass" v-if="isVip">
					  进入教室	
					</view>
					 <view class="goTo" v-if="!isVip"><navigator url="">></navigator></view>
				</view>
			</view> 
			</view>
			
			<view class="class-bottom">
				<view class="teacher-img">
					<image src="../static/vip-bg.png" mode=""></image>
				</view>
				 {{teacherMsg.name}}<text class="line">|</text>{{teacherMsg.address}}<text class="line">|</text>{{teacherMsg.timeLength}}
			</view> 
		</view>
	</view>
</template>

<script>
	export default {
		props:['classMsg','teacherMsg','isVip'],
		data() {
			return {
				
			}
		},

	methods: {
	  
	},
	 mounted() {
		 // 非Vip的classType样式的变换
		 let classTypeCss = document.getElementsByClassName('class-type')[0];//课程类型的样式
		  switch (this.classMsg.classType) {
		      case '听':
		          classTypeCss.style.background = '#FFFFFF';
		          classTypeCss.style.color = '#FB5953'; //未设置
		          break;
		      case '说':
		          classTypeCss.style.background = '#FFFFFF';
		          classTypeCss.style.color = '#FB5953'; //未设置
		           break;
		      case '读':
		 		 console.log(classTypeCss);
		          classTypeCss.style.background = '#FFCCC2';
		          classTypeCss.style.color = '#FB5953';
		           break;
		      case '写':
		          classTypeCss.style.background = '#FFF1C2';
		          classTypeCss.style.color = '#FF9000';
		           break;
		 		  
		 			  }
			 // 是否是Vip
			if(this.isVip){
				console.log(document.getElementsByClassName('class-bottom')[0].style.color);
				let teacherMsgCss = document.getElementsByClassName('class-bottom')[0]; //老师信息的字体样式
				let classTypeCss = document.getElementsByClassName('class-type')[0];//课程类型的样式
				let  classWapCss = document.getElementsByClassName('class-wap')[0];//整体的框
				let  classTimeCss = document.getElementsByClassName('class-time')[0];//上课时间
				let  classLeftBootCss = document.getElementsByClassName('left-bottom')[0];//9.30
				console.log(classWapCss);
				classWapCss.style.backgroundImage = 'url(../static/vip-bg.png)';
				classWapCss.style.backgroundSize = '100%';
				classWapCss.style.color='#FFFFFF';
				classTypeCss.style.background = '#FFFFFF';
				classTypeCss.style.color = '#FB5953';
				classTimeCss.style.color='#FFFFFF';
				classLeftBootCss.style.color='#FFFFFF';
				teacherMsgCss.style.color='#FFFFFF';
			}
		  }
		  
		 }
		
	// 页面动态改变fsize
	document.documentElement.style.fontSize = 26.666667+'vw';
	document.getElementsByTagName('body')[0].style['font-size'] = 16 + 'px';
</script>

<style lang="scss" scoped>
	*{
			margin: 0;
			padding: 0;
		}
		.class-wap{
			font-family:'PingFang';
			width: 3.43rem;
			height: 1.42rem;
			background-color:#FAFAFA;
			/* #FAFAFA */
			border-radius: 0.1rem;
			margin: auto;
			margin-top: 0.12rem;
			// background-image: url(../static/vip-bg.png);
			.class-top{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 0.125rem 0.14rem;
			.left{
				.left-top{
					margin-bottom: 0.125rem;
					.class-type{
						display: inline-block;
						width: 0.42rem;
						height: 0.19rem;
						line-height: 0.19rem;
						background: #FFF1C2;
						box-shadow: 0rem 0.03rem 0.045rem 0.005rem rgba(180, 46, 42, 0.1);
						border-radius: 0.02rem;
						color: #FF9000;
						font-weight: bold;
						font-size: 0.11rem;
						text-align: center;
						margin: auto 0.05rem auto 0;
					}
					.class-time{
						display: inline-block;
						font-size: 0.15rem;
						font-family: "PingFang";
						color: #666666;
					}
				}
				.left-bottom{
						width: 0.81rem;
						height: 0.24rem;
						font-size: 0.32rem;
						font-family: "PingFang";
						font-weight: bold;
						color: #666666;
						margin-bottom: 0.15rem;
				}
			}
			.right{
				 .right-top{
					.isVipClass{
						font-size: 0.12rem;
						font-family: 'PingFang';
						font-weight: bold;
						color: #FFFFFF;
					} 
					.noVipClass{
						color: #999999;
						font-size: 0.12rem;
						font-weight: bold;
					}
				 }
				 .right-bottom{
					.goToClass{
						width: 0.75rem;
						height: 0.28rem;
						background: #FFFFFF;
						border-radius: 0.14rem;
						line-height: 0.28rem;
						text-align: center;
						color: #FB554F;
						font-size: 0.13rem;
					  font-weight: bold;
						margin: 0.26rem 0 0 auto;
					}
					.goTo{
						color: #999999;
						font-size: 0.13rem;
						font-weight: bold;
						margin: 0.26rem 0 0 auto;
						text-align: end;
					}
				 }
			}
			}
			.class-bottom{
				display: flex;
				font-size: 0.13rem;
				color: #999999;
				.teacher-img{
					width: 0.24rem;
					height: 0.24rem;
					background: #E1E1E1;
					border-radius: 50%;
					overflow: hidden;
					margin: 0 0.12rem 0 0.14rem;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.line{
					padding: 0 0.12rem;
				}
			}
		}
	
</style>
