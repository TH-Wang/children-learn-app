<template>
	<view>
		<list-item v-for='(item,index) in commonList' :listData="item||{}" :key='index'></list-item>
	</view>
</template>

<script>
	import {commonList} from '@/pages/index/data';
	import commonListItem from '@/components/commonList';
	export default {
		data() {
			return {
				commonList: commonList,
			}
		},
		methods: {
			
		},
		components:{
			listItem:commonListItem,
		}
	}
</script>

<style>

</style>
