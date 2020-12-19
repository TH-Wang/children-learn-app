<template>
  <view>
    <view class="cover">
      <van-image width="100%" height="1.15rem" />
    </view>
    <view class="title">{{record.name}}</view>
    <view class="description">{{record.teacher}}</view>
  </view>
</template>

<script>
import Image from '@/wxcomponents/vant/image/index.vue'

export default {
  components: {
    'van-image': Image
  },
  props: {
    record: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.cover{
  border-radius: 10px;
  overflow: hidden;
}
.title{
  @include font(.12rem, #333333, bold);
  margin: .06rem 0 .02rem 0;
}
.description{
  @include font(.12rem, #666666);
}
</style>