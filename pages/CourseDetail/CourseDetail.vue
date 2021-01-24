<template>
  <div>
    <!-- navbar -->
    <nav-bar back-arrow :placeholder="false">
      <template #right>
        <van-icon name="wap-nav" size=".14rem" />
      </template>
    </nav-bar>

    <!-- header -->
    <view class="header">
      <!-- <play-video src="@/static/video/test.mp4" /> -->
      <video
        class="video"
        id="playerBox"
        :title="record.title"
        :src="playUrl"
        :initial-time="curDuration"
        :autoplay="true"
        @timeupdate="playTimeUpdate"
      />
    </view>

    <!-- content -->
    <view class="content">
      <view class="title">{{record.title}}</view>
      <page-title style="padding:0">简介</page-title>
      <view class="desc">
        <rich-text :nodes="record.render_desc" />
      </view>
    </view>
  </div>
</template>

<script>
import Icon from '@/wxcomponents/vant/icon/index.vue'
import NavBar from '@/components/NavBar'
import PageTitle from '@/components/HomeHeader'

export default {
  components: {
    NavBar,
    PageTitle,
    'van-icon': Icon,
    PlayVideo
  },
  data: () => ({
    id: null,
    isWatch: true,
    record: {},
    videos: [],
    chapters: [],
    progress: [],
    curProgress: {},
    curDuration: 0,
    source: {},
    playUrl: null
  }),
  methods: {
    async handleReqInfo () {
      const res = await this.$api.getVideoDetail(this.id)
      const data = res.data.data
      this.isWatch = data.is_watch
      this.record = data.video
      // 当前章节的视频列表
      this.videos = data.videos[data.video.chapter_id]
      // 当前章节的信息
      this.chapters = data.chapters
      // 所有视频的进度信息
      this.progress = data.video_watched_progress
      // 默认第一个视频为当前播放视频
      this.curVideoId = this.videos[0].id
      // 如果有进度信息
      if (data.video_watched_progress.length) {
        // 获取第一个视频的观看进度
        this.curProgress = data.video_watched_progress[this.videos[0].id]
        // 当前视频的观看时长
        this.curDuration = this.curProgress.watch_seconds
      }
      // 请求第一个视频的播放地址
      this.handleReqResource()
    },
    async handleReqResource () {
      const res = await this.$api.getVideoResource(this.curVideoId)
      this.source = res.data.data
      this.playUrl = this.source.urls[0].url
    },
    playTimeUpdate(e) {
      if (e.detail.currentTime - this.curDuration >= 10) {
        console.log(e.detail.currentTime, this.curDuration)
        this.curDuration = e.detail.currentTime;
        this.$api.videoRecord(this.record.id, e.detail.currentTime)
      }
    }
  },
  onLoad (option) {
    this.id = option.id
    this.handleReqInfo()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/static/scss/detail.scss';
.content{
  // padding: .24rem 0;

  .desc{
    padding: 0 .16rem;
    margin: 0;
  }
}

.video{
  width: 100%;
  height: 100%;
}
</style>