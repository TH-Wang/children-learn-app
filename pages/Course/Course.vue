<template>
	<view>
    <!-- navbar -->
    <nav-bar back-arrow :placeholder="false" :scrollHeight="scrollHeight">
      <template #right>
        <collection :active="isCollect" @change="handleCollectionChange" />
        <!-- <nav-selector /> -->
      </template>
    </nav-bar>

    <!-- header -->
    <view class="header">
      <image :src="cover" lazy-load mode="aspectFill" />
    </view>
    <!-- <view class="header">
      <view class="status-bar"/>
      <view class="sentence">多读书,到底怎样才能学会语文。</view>
      <view class="quote">-----叶圣陶</view>
    </view> -->

    <!-- tabs -->
    <tab-selector v-model="chapter" :selections="chapterList" />

    <!-- list -->
    <view
      v-if="commonList.length === 0"
      @click="handleRetry">
      <van-empty :description="videosIsEmpty ? '暂无课程，点击刷新' : '该章节暂无课程'" />
    </view>
		<list-item
      v-else
      v-for="item in commonList"
      :listData="item||{}"
      :cover="cover"
      :key="item.id"
      @click="handleLink(item)"
    />

    <!-- footer -->
    <view class="footer" v-if="!isLogin || !isBuy">
      <view
        v-if="!isLogin"
        class="footer-button"
        @click="handleLinkLogin"
      >请登录后观看</view>
      <template v-else-if="!isBuy">
        <view class="price">￥{{course.charge}}</view>
        <view
          class="footer-button"
          @click="handleLinkOrder"
        >购买课程</view>
        <view
          class="footer-button vip-button"
          @click="handleLinkVip">会员免费看</view>
      </template>
    </view>
	</view>
</template>

<script>
import Image from '@/wxcomponents/vant/image/index.vue'
import Empty from '@/wxcomponents/vant/empty/index.vue'
import NavBar from '@/components/NavBar'
import NavSelector from '@/components/NavSelector'
import TabSelector from '@/components/TabSelector'
import commonListItem from '@/components/commonList';
import Collection from '@/components/Collection'
import navBarMixin from '@/mixins/nav-bar'
import { mapGetters, mapState } from 'vuex';

export default {
  mixins: [navBarMixin],
  components:{
    listItem:commonListItem,
    NavBar,
    NavSelector,
    TabSelector,
    Collection,
    'van-empty': Empty,
    'van-image': Image
  },
  data: () => ({
    id: null,
    type: null,
    // 当前选择的章节
    chapter: 1,
    // 课程信息
    course: {},
    // 章节列表
    chapterList: [],
    // 所有视频列表
    videos: {},
    // 当前章节的视频列表
    commonList: [],
    // 是否购买
    isBuy: true,
    // 是否收藏
    isCollect: false,
    // 课程封面
    cover: ''
  }),
  computed: {
    ...mapState(['global']),
    ...mapGetters(['courseId', 'isLogin', 'isVip']),
    videosIsEmpty () {
      return Object.keys(this.videos).length === 0
    }
  },
  methods: {
    // 获取章节列表
    async reqChapters () {
      const id = this.id || this.courseId(this.type)
      if (!id) return
      uni.showLoading({title: '加载中'})
      const res = await this.$api.getCourseDetail(id)
      const { chapters, videos, course, isBuy, isCollect } = res.data.data
      uni.hideLoading()
      this.chapterList = chapters
      this.chapter = chapters.length ? chapters[0].id : 1
      this.videos = videos
      this.course = course
      this.cover = course.thumb
      this.isBuy = isBuy
      this.isCollect = isCollect
      this.commonList = videos[0] || []
    },
    // 点击重试
    async handleRetry () {
      if (!this.videosIsEmpty) return
      await this.reqChapters()
    },
    // 收藏状态发生改变
    async handleCollectionChange (value) {
      this.isCollect = value
      console.log(this.id)
      const res = await this.$api.courseLike(this.id)
      const { code, data } = res
      // 反馈
      if (code === 0) {
        const toast = value ? {title: '收藏成功'} : {title: '已取消收藏该课程', icon: 'none'}
        uni.showToast(toast)
      }
    },
    // 跳转详情页面
    handleLink (record) {
      if (!this.isLogin) return
      if (record.charge > 0 && !this.isBuy) {
        uni.showToast({ title: '购买课程后即可观看', icon: 'none' })
        return
      }
      const id = record.id
      uni.navigateTo({
        url: `/pages/CourseDetail/CourseDetail?id=${id}`
      })
    },
    // 跳转到登录页面
    handleLinkLogin () {
      uni.navigateTo({ url: '/pages/Login/Login' })
    },
    // 跳转到支付页面
    handleLinkOrder () {
      console.log('跳转订单页面')
      uni.navigateTo({
        url: '/pages/Order/Order?goods_id=' + this.course.id +
          '&goods_name=' + this.course.title +
          "&goods_label=点播课程&goods_charge=" + this.course.charge + '&goods_type=vod'
      })
    },
    // 跳转到vip页面
    handleLinkVip () {
      uni.navigateTo({ url: '/pages/SubscribeVip/SubscribeVip' })
    }
  },
  onLoad (option) {
    this.id = option.id
    this.type = option.type
    this.reqChapters()
  },
  watch: {
    chapter: function (newVal) {
      const data = this.videos[newVal]
      this.commonList = data || []
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  height: 2rem;
  width: 100%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #FB5852;

  image{
    width: 100%;
    height: 100%;
  }
}
// 底部提示栏
.footer{
  @include flex(space-between, center);
  width: 100%;
  height: .65rem;
  padding: .1rem;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: #FFFFFF;
  border-top: solid 1px #F5F5F5;
  
  .price{
    @include font(.18rem, #FB5852, bold);
    margin-right: .2rem;
  }

  &-button{
    flex: 1;
    border-radius: .5rem;
    height: 100%;
    background-color: #FB5852;
    @include font(.14rem, #FFFFFF);
    @include flex(center, center);
  }
  
  .vip-button{
    margin-left: .1rem;
    background-color: #555;
    @include font(.14rem, #FFFFFF);
  }
}
// 顶部背景(原设计图)
// .header{
//   width: 100%;
//   height: 1.5rem;
//   background-color: #E96359;
//   background-image: url(@/static/read-bg.png);
//   background-size: 90% 70%;
//   background-position: center;
//   background-repeat: no-repeat;
//   border-bottom-left-radius: .1rem;
//   border-bottom-right-radius: .1rem;
//   padding: 1px .15rem;
//   box-sizing: border-box;

//   // 名言句子
//   .sentence{
//     margin-top: .48rem;
//     @include font(.18rem, #FFFFFF, bold);
//   }
//   .quote{
//     margin-top: .02rem;
//     @include font(.16rem, #FFFFFF, $align:right);
//   }
// }
</style>
