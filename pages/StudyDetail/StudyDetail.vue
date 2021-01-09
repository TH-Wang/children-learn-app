<template>
  <div>
    <!-- navbar -->
    <nav-bar back-arrow :placeholder="false">
      <template #right>
        <van-icon name="wap-nav" size=".14rem" />
      </template>
    </nav-bar>

    <!-- header -->
    <view class="header"></view>

    <!-- content -->
    <view class="content">
      <view class="video-list">
        <view class="video-item" v-for="(item, index) in videoList">
          <image class="video-item-cover" />
          <view class="video-item-title">第28课：大青树下的小学第28课：大青树下的小学</view>
        </view>
        <view style="width:.16rem;height:100%" />
      </view>
      <page-title>简介</page-title>
      <view class="desc">从前有一个可爱的小姑娘，不管谁看见了都会忍不住喜欢她。有一次小姑娘的奶奶送给她一顶丝绒做的小红帽，戴在头上特别好看，从哪以后小姑娘整天把小红帽戴在头上，再也不愿意戴别的帽子了。于是大家便叫她“小红帽”。</view>
    </view>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import PageTitle from '@/components/HomeHeader'
// import DetailTop from '@/components/detailTop.vue'

export default {
  components: {
    NavBar,
    PageTitle
    // DetailTop
  },
  data: () => ({
    videoList: new Array(8).fill('')
  })
}
</script>

<style lang="scss" scoped>
@import '~@/static/scss/detail.scss';
.content{
  padding: .24rem 0;

  .desc{
    padding: 0 .16rem;
    margin: 0;
  }
}
.video-list{
  width: 100%;
  padding: 0 .16rem;
  box-sizing: border-box;
  height: 1rem;
  @include flex(flex-start, center);
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar{
    display: none;
  }
  
  .video-item{
    height: 100%;
    margin-right: .16rem;

    &-cover{
      width: 1rem;
      height: .5rem;
      border-radius: .1rem;
      background-color: #C5C5C5;
      margin-bottom: .05rem;
    }

    &-title{
      width: 1rem;
      @include font(.12rem, #000000);
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>