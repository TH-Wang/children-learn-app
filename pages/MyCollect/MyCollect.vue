<template>
	<view class="myclass-page" :style="(myClassList?myClassList:[]).length>0?'':'padding-top: 1.65rem;'">
		<view class="list" v-if="(myClassList?myClassList:[]).length>0? true :false ">
			<listItem v-for="(item,index) in myClassList" :key="index" :record='item'></listItem>
		</view>
	</view>
</template>

<script>
	import listItem from "@/components/CourseItem.vue"
	export default {
		data() {
			return {
				myClassList: [] //后端获取的
			}
		},
		methods: {
			async handleReq() {
        uni.showLoading({title: '加载中'})
				const res = await this.$api.getMemberLikeCourses();
				this.myClassList = res?res.data.data.data:[];
        uni.hideLoading()
			},
		},
		components: {
			listItem: listItem,
		},
		onLoad() {
			this.handleReq();
		},
	}
</script>

<style lang="scss" scoped>
.list{
  padding-top: .12rem;
}
</style>
