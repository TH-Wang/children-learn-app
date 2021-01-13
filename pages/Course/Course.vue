<template>
	<view>
    <!-- navbar -->
    <nav-bar back-arrow :placeholder="false" :scrollHeight="scrollHeight">
      <template #right><nav-selector /></template>
    </nav-bar>

    <!-- header -->
    <view class="header"></view>
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
      :key="item.id"
      @click="handleLink(item.id)"
    />
	</view>
</template>

<script>
import Empty from '@/wxcomponents/vant/empty/index.vue'
import NavBar from '@/components/NavBar'
import NavSelector from '@/components/NavSelector'
import TabSelector from '@/components/TabSelector'
import commonListItem from '@/components/commonList';
import navBarMixin from '@/mixins/nav-bar'
import { mapGetters, mapState } from 'vuex';

export default {
  mixins: [navBarMixin],
  components:{
    listItem:commonListItem,
    NavBar,
    NavSelector,
    TabSelector,
    'van-empty': Empty
  },
  data() {
    return {
      type: '',
      chapter: 1,
      chapterList: [],
      videos: {},
      commonList: []
    }
  },
  computed: {
    ...mapState(['global']),
    ...mapGetters(['courseId']),
    videosIsEmpty () {
      return Object.keys(this.videos).length === 0
    }
  },
  methods: {
    // 获取章节列表
    async reqChapters () {
      const id = this.courseId(this.type)
      if (!id) return
      uni.showLoading({title: '加载中'})
      const res = await this.$api.getCourseDetail(id)
      const { chapters, videos } = res.data.data
      uni.hideLoading()
      this.chapterList = chapters
      this.chapter = chapters[0].id
      this.videos = videos
      this.commonList = videos[this.chapter]
    },
    // 点击重试
    async handleRetry () {
      if (!this.videosIsEmpty) return
      await this.reqChapters()
    },
    // 跳转详情页面
    handleLink (id) {
      uni.navigateTo({
        url: `/pages/CourseDetail/CourseDetail?id=${id}`
      })
    }
  },
  onLoad (option) {
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
  height: 1.5rem;
  width: 100%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #FB5852;
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
