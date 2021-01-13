<template>
	<view class="myclass-page" :style="(myClassList?myClassList:[]).length>0?'':'padding-top: 1.65rem;'">
		<view class="list" v-if="(myClassList?myClassList:[]).length>0? true :false ">
			<listItem v-for="(item,index) in myClassList" :key="index" :listItem='item'></listItem>
		</view>
		<!-- 没有数据 -->
		<view class="noData" v-else>
			<view class="img">
				<image src="../../static/myClass/dataGo.png" mode=""></image>
			</view>
			<view class="msg">
				这里还没有记录哦～
			</view>
		</view>
	</view>
</template>

<script>
	import listItem from "@/components/myclassList"
	export default {
		data() {
			return {
				myClassList: [{
					type: '听',
					className: '【听写词语】四年级语文专题班',
					classMsg: '共10人收藏，java课程',
					teacherImg: '',
					teacherName: '大地老师',
					price: 1999,
					isTuijian: true,
				}, {
					type: '说',
					className: '【说英语】四年级英语专题班',
					classMsg: '共10人收藏，java课程',
					teacherImg: '',
					teacherName: '爱莎老师',
					price: 3999,
					isTuijian: true,
				}] //后端获取的
			}
		},
		methods: {
      async handleReq () {
        const res = await this.$api.getMemberCourses()
        this.myClassList= res.data.data.courses
      }
		},
		components: {
			listItem: listItem,
    },
    onLoad () {
      this.handleReq()
    }
	}
</script>

<style lang="scss" scoped>
.myclass-page {
	// padding-top: 1.65rem;
  .list{
    padding-top: .12rem;
  }

	.noData {
		margin: 0 auto;
		width: 2.015rem;
		height: 300;
		.img {
			height: 1.23rem;

			image {
				width: 100%;
				height: 100%;
			}
		}
		.msg {
			margin-top: 0.1rem;
			font-size: 0.12rem;
			font-family: "PingFang";
			color: #999999;
			text-align: center;
		}
	}
}
</style>
