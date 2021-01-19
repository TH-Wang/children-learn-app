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
				const res = await this.$api.getMemberLikeCourses();
				this.myClassList = res?res.data.data.data:[];
				console.log(this.myClassList)
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
