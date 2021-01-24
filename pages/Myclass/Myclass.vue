<template>
  <view
    class="myclass-page"
    :style="
      (myClassList ? myClassList : []).length > 0 ? '' : 'padding-top: 1.65rem;'
    "
  >
    <view
      class="list"
      v-if="(myClassList ? myClassList : []).length > 0 ? true : false"
    >
      <listItem
        v-for="(item, index) in myClassList"
        :key="index"
        :record="item"
      ></listItem>
    </view>
    <!-- 没有数据 -->
    <view class="noData" v-else>
      <view class="img">
        <image src="../../static/myClass/dataGo.png" mode=""></image>
      </view>
      <view class="msg"> 这里还没有记录哦～ </view>
    </view>
  </view>
</template>

<script>
import listItem from "@/components/CourseItem.vue";
export default {
  data() {
    return {
      myClassList: [], //后端获取的
    };
  },
  methods: {
		async handleReq() {
      uni.showLoading({title: '加载中'})
		  const res = await this.$api.getMemberCourses();
      this.myClassList = res.data.data.data;
      uni.hideLoading()
		},
   //  async handleReq() {
   //    const res = await this.$api.getMemberCourses();
			// this.myClassList = handdleData(res.data.data.data);
			// function handdleData(list){
			// 	for (let item of list) {
			// 	 item.render_desc = item.render_desc.replace(/<[^>]+>/g,"");
			// 	}
			// 	return list
			// }
			// console.log(this.myClassList);
   //  },
  },
  components: {
    listItem: listItem,
  },
  onLoad() {
    this.handleReq();
  },
};
</script>

<style lang="scss" scoped>
.myclass-page {
  // padding-top: 1.65rem;
  .list {
    padding-top: 0.12rem;
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
