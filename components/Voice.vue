<template>
  <view :class="['voice', `voice-${type}`]">{{src}}</view>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'dark'
    },
    src: String
  }
}
</script>

<style lang="scss" scoped>
.voice{
  width: 1.08rem;
  height: .30rem;
  line-height: .30rem;
  background-size: 100%;
  background-repeat: no-repeat;
  padding-left: .36rem;
  box-sizing: border-box;
  display: inline-block;

  &-dark{
    background-image: url('~@/static/voice/voice-dark.png');
    @include font(.12rem, #FFFFFF, 100);
  }

  &-light{
    background-image: url('~@/static/voice/voice-light.png');
    @include font(.12rem, #333333);
  }
}
</style>