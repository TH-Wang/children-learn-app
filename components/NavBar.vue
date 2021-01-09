<template>
  <view>
    <!-- 状态栏 -->
    <view class="status-bar" :style="{'background-color': navBarBackground}"/>

    <!-- 导航栏主体 -->
    <view :class="[`nav-bar-${navBarColor}`]" :style="{'background-color': navBarBackground}">
      
      <!-- 左侧内容 -->
      <view class="prefix">
        <!-- 返回箭头 -->
        <view class="back-icon" @click="handleGoBack">
          <van-icon v-if="backArrow" size=".15rem" name="arrow-left" style="padding-right:.05rem" />
        </view>

        <!-- 左侧插槽 -->
        <view class="slot slot-left" @click="$emit('click-left')">
          <slot name="left" />
        </view>
      </view>

      <!-- 中间标题 -->
      <view class="main" @click="$emit('click')">
        <slot />
      </view>

      <!-- 右侧内容 -->
      <view class="slot slot-right" @click="$emit('click-right')">
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
      default: 'light'
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
  methods: {
    handleGoBack () {
      uni.navigateBack({ delta: 1 })
    }
  },
  mounted: async function () {
    const res = await this.$uni.getSystemInfo()
    this.statusHeight = res.statusBarHeight
  },
  watch: {
    // app平台下动态设置状态栏文本颜色
		// #ifdef APP-PLUS
    scrollHeight: function (newVal) {
      if (this.placeholder) return
      const color = this.scrollHeight - this.statusHeight > 45
        ? 'dark'
        : 'light'
      uni.setStatusBarStyle({ style: color })
    },
		// #endif
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
  padding-right: .15rem;
  box-sizing: border-box;
  @include flex(space-between, center);
  transition: all .15s;
  position: fixed;
  top: var(--status-bar-height);
  left: 0;
  z-index: 99;

  // 左侧内容
  .prefix{ @include flex; }

  // 返回箭头
  .back-icon{
    $height: .35rem;
    padding-left: .15rem;
    height: $height;
    line-height: $height;
  }

  // 中间标题
  .main{
    font-weight: bold;
    font-size: .18rem;
    text-align: center;
    @include position;
    z-index: -1;
    width: 100%;
    height: $nav-bar-height;
    line-height: $nav-bar-height;
    transition: all .05s;
  }

  // 插槽内容
  .slot{
    font-size: .16rem;
    flex-shrink: 0;

    &-left{ margin-right: .05rem; }
    &-right{ margin-left: .05rem; }
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