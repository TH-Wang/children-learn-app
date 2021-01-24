<template>
	<view class="msgCenter-page">
		<navbar back-arrow @click-right="clickAll" color="dark">
      消息中心<template #right>全部已读</template>
    </navbar>
		<msgList
      v-for="(item,index) in msgList"
      :key="item.id"
      :listItem='item'
      @click="handleClick(item.notificationId)"
    />
	</view>
</template>

<script>
	import msgList from "@/components/msgList.vue"
	import navbar from "@/components/NavBar.vue"
	// import moment from "@/components/moment/moment.min.js"
	export default {
		data() {
			return {
				msgList:[]
			}
		},
		methods: {
			// 全部标记为已读
			clickAll(){
				this.orderList.map((item)=>item.total = '');//未读信息全部置为空
				this.$api.msgAllRead();
			},
			async handleReq() {
        uni.showLoading({title: '加载中'})
			  const res = await this.$api.getMemberMsgList();
				this.msgList = res.data.data.data;
        uni.hideLoading()
			},
			// 点击消息标记为已读信息
			handleClick(){
				//未读信息置为空
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
		}
	}
</script>

<style>

</style>
