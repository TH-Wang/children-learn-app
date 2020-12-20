<template>
	<view class="misrakes-page">
    <view style="height:.12rem"></view>
		<!-- tab栏 -->
		<tabs v-model="tabId" :tabs="tabs" style="margin: 0rem .16rem .24rem"></tabs>
		<listItem v-for="(item,index) in mistakesList" :key="index" :isWrong=true :listItem='item'></listItem>
	</view>
</template>

<script>
	import mistakeList from "@/components/myclassList.vue";
	import tabs from "@/components/Tabs.vue";
	export default {
		data() {
			return {
        tabId: 1,
        tabs: { 1: '最新', 2: '全部' },
				mistakesList:[{
					type:'听',
					className:'【听写词语】四年级语文专题班',
					wrongNum:3,
					sum:5,
					reason:'今日错点：静字发音需要加强，朗读情感表达不够。',
				},{
					type:'写',
					className:'【听写词语】六年级语文专题班',
					wrongNum:7,
					sum:1,
					reason:'今日错点：静字发音需要加强，朗读情感表达不够。',
				}],
				isWrong:true,
			}
		},
		methods: {
			
		},
		components:{
			listItem:mistakeList,
			tabs,
		}
	}
</script>

<style lang="scss" scoped>

</style>
