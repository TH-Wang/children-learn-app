<template>
  <view>
    <!-- 状态栏 -->
    <view class="status-bar"></view>

    <!-- 导航栏主体 -->
    <view :class="`nav-bar-${navBarColor}`" :style="{'background-color': navBarBackground}">
      <!-- 返回箭头 -->
      <van-icon
        v-if="backArrow"
        size=".13rem"
        name="arrow-left"
        @click="handleGoBack"
      />

      <!-- 左侧内容 -->
      <view class="slot" @click="$emit('click-left')">
        <slot name="left" />
      </view>

      <!-- 中间标题 -->
      <view class="main" @click="$emit('click')">
        <slot />
      </view>

      <!-- 右侧内容 -->
      <view class="slot" @click="$emit('click-right')">
        <slot name="right" />
      </view>
    </view>

    <!-- 页面占位符 -->
    <view v-if="placeholder" class="placeholder"></view>
  </view>
</template>

<script>
import Icon from '@/wxcomponents/vant/icon/index.vue'

export default {
  components: {
    'van-icon': Icon
  },
  props: {
    // 是否显示左侧返回箭头
    backArrow: {
      type: Boolean,
      default: false
    },
    // 导航栏文字颜色，light：白色，dark：黑色
    color: {
      type: String,
      default: 'dark'
    },
    // 是否在页面自动生成占位的view元素
    placeholder: {
      type: Boolean,
      default: true
    },
    // 页面滚动距离顶部高度
    scrollHeight: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    // 状态栏高度
    statusHeight: 0
  }),
  computed: {
    navBarBackground () {
      if (this.placeholder) return '#FFFFFF'
      else {
        // 如果导航栏划出顶部
        if (this.scrollHeight - this.statusHeight > 45) {
          return '#FFFFFF'
        } else return 'transparent'
      }
    },
    navBarColor () {
      if (this.placeholder) return this.color
      else {
        if (this.scrollHeight - this.statusHeight > 45) {
          return 'dark'
        } else return this.color
      }
    }
  },
  mounted: async function () {
    const res = await this.$uni.getSystemInfo()
    this.statusHeight = res.statusBarHeight
  }
}
</script>

<style lang="scss" scoped>
$nav-bar-height: .44rem;

// 状态栏
.status-bar{
  height: var(--status-bar-height);
  width: 100%;
}
// 页面顶部占位符
.placeholder{
  height: $nav-bar-height;
  width: 100%;
}

// 导航栏主体
.nav-bar{
  width: 100%;
  height: $nav-bar-height;
  padding: 0 .15rem;
  box-sizing: border-box;
  @include flex(space-between, center);
  transition: all .2s;
  position: fixed;
  top: var(--status-bar-height);
  left: 0;
  z-index: 99;

  // 中间标题
  .main{
    font-weight: bold;
    font-size: .18rem;
    text-align: center;
    @include position;
    width: 100%;
    height: $nav-bar-height;
    line-height: $nav-bar-height;
    transition: all .2s;
  }

  // 插槽内容
  .slot{
    font-size: .16rem;
  }
}
// 白色字体
.nav-bar-light{
  @extend .nav-bar;
  color: #FFFFFF;
}
// 黑色字体
.nav-bar-dark{
  @extend .nav-bar;
  color: #000000;
}
</style>