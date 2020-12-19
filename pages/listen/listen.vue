<template>
	<view>
		<list-item v-for='(item,index) in commonList' :listData="item||{}" :key='index'></list-item>
	</view>
</template>

<script>
	import {commonList} from '../Index/data.js';
	import commonListItem from '../../components/commonList.vue';
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
