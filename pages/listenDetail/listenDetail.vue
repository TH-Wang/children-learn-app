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
      <view class="scroll-container">
        <view class="title">大青树下的小学</view>
        <view class="teacher">
          <image class="avatar"></image>
          <text class="name">杨超越老师</text>
        </view>
        <view class="desc">本节课主要讲大青树下的小学这篇课文，其中容易错的生字是哪些，各位小朋友在学习的时候千万要注意哦～</view>
      </view>
      <!-- button -->
      <view class="footer-button">听写完成 拍照打卡</view>
    </view>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Icon from '@/wxcomponents/vant/icon/index.vue'

export default {
  components: {
    NavBar,
    'van-icon': Icon
  }
}
</script>

<style lang="scss" scoped>
@import '~@/static/scss/detail.scss'
</style>