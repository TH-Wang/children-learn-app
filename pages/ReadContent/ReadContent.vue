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
        <view class="title">观潮</view>
        <view class="teacher">
          <image class="avatar"></image>
          <text class="name">张三老师</text>
        </view>
        <view class="desc">从前有一个可爱的小姑娘，不管谁看见了都会忍不住喜欢她。有一次小姑娘的奶奶送给她一顶丝绒做的小红帽，戴在头上特别好看，从哪以后小姑娘整天把小红帽戴在头上，再也不愿意戴别的帽子了。于是大家便叫她“小红帽”。</view>
      </view>
      <!-- button -->
      <view class="footer-button">按住朗读</view>
    </view>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
// import DetailTop from '@/components/detailTop.vue'

export default {
  components: {
    NavBar
    // DetailTop
  }
}
</script>

<style lang="scss" scoped>
@import '~@/static/scss/detail.scss';
.footer-button{
  border-radius: .1rem;
}
</style>