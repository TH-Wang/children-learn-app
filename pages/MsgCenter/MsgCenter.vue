<template>
	<view class="msgCenter-page">
		<msgList v-for="(item,index) in msgList" :key="index" :listItem='item'></msgList>
	</view>
</template>

<script>
	import msgList from "@/components/msgList.vue"
	export default {
		data() {
			return {
				msgList:[{
					isVip:true,
					msgFrom:'会员信息',
					unread:23,
					timeAgo:'18分钟前',
					msg:'会员啊啊啊恭喜恭喜啊啊啊'
				},{
					isVip:false,
					msgFrom:'系统信息',
					unread:23,
					timeAgo:'18分钟前',
					msg:'积分变动11111111111111111111'
				}]
			}
		},
		methods: {
			
		},
		components:{
			msgList,
		}
	}
</script>

<style>

</style>
