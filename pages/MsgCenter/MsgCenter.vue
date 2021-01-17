<template>
	<view class="msgCenter-page">
		<navbar back-arrow @click-right="clickAll" color="dark">
      消息中心<template #right>全部已读</template>
    </navbar>
		<msgList v-for="(item,index) in msgList" :key="index" :listItem='item'  @click="handleClick(item.notificationId)"></msgList>
	</view>
</template>

<script>
	import msgList from "@/components/msgList.vue"
	import navbar from "@/components/NavBar.vue"
	import moment from "@/components/moment/moment.min.js"
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
					unread:1,
					timeAgo:'18分钟前',
					msg:'积分变动11111111111111111111'
				}]
			}
		},
		methods: {
			// 全部标记为已读
			clickAll(){
				this.orderList.map((item)=>item.total = '');//未读信息全部置为空
				this.$api.msgAllRead();
			},
			async handleReq() {
			  const res = await this.$api.getMemberMsgList();
				this.orderList = res.data;
			  console.log(this.orderList);
			},
			// 点击消息标记为已读信息
			handleClick(){
				console.log(this.orderList);
				;//未读信息置为空
				this.$api.msgRead(this.orderList.msgId);
			},
			// 对时间进行处理
			handleTime(res){
				// res.time = 
			}
		},
		components:{
			msgList,
			navbar,
		},
		onLoad() {
			this.handleReq()
			console.log(moment("20201031", "YYYYMMDD").fromNow());
		}
	}
</script>

<style>

</style>
