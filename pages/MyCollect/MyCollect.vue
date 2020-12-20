<template>
	<view class="myclass-page" :style="(myClassList?myClassList:[]).length>0?'':'padding-top: 1.65rem;'">
		<view class="list" v-if="(myClassList?myClassList:[]).length>0? true :false ">
			<listItem v-for="(item,index) in myClassList" :key="index" :listItem='item'></listItem>
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

		},
		components: {
			listItem: listItem,
		}
	}
</script>

<style lang="scss" scoped>
.list{
  padding-top: .12rem;
}
</style>
