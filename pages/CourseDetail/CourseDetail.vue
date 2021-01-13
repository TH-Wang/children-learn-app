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
      <play-video src="@/static/video/test.mp4" />
    </view>

    <!-- content -->
    <view class="content">
      <view class="title">{{record.title}}</view>
      <page-title style="padding:0">简介</page-title>
      <view class="desc">
        <rich-text :nodes="nodes" />
      </view>
    </view>
  </div>
</template>

<script>
import Icon from '@/wxcomponents/vant/icon/index.vue'
import NavBar from '@/components/NavBar'
import PageTitle from '@/components/HomeHeader'
import PlayVideo from '@/components/yfs-video/yfs-video'

export default {
  components: {
    NavBar,
    PageTitle,
    'van-icon': Icon,
    PlayVideo
  },
  data: () => ({
    id: null,
    record: {},
    source: {},
    nodes: '<p>这是一个灰姑娘</p>'
  }),
  methods: {
    async handleReqInfo () {
      const res = await this.$api.getVideoDetail(this.id)
      this.record = res.data.data.video
    },
    async handleReqResource () {
      const res = await this.$api.getVideoResource(this.id)
      this.source = res.data.data
      console.log(this.source)
    }
  },
  onLoad (option) {
    this.id = option.id
    this.handleReqInfo()
    this.handleReqResource()
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
</style>