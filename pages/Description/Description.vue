<template>
  <view class="container">
    <view v-for="item in paragraph">{{item}}</view>
  </view>
</template>

<script>
import text from './text'

export default {
  data: () => ({
    id: null,
    content: text,
    navbarTitle: {
      0: '用户协议',
      1: '隐私协议',
      2: '关于我们'
    }
  }),
  computed: {
    paragraph () {
      return this.content[this.id] || ''
    }
  },
  onLoad (option) {
    this.id = option.id
    const title = this.navbarTitle[option.id]
    uni.setNavigationBarTitle({ title })
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding: 0 .15rem;
  @include font (.15rem, #444);
  line-height: .28rem;

  view{
    text-indent: 2em;
  }
}
</style>