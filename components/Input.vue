<template>
  <view class="input-container">
    <view class="main">
      <input type="text" :placeholder="placeholder" placeholder-style="color:#FDA2A0">
      <van-icon name="cross" size=".20rem" />
    </view>
  </view>
</template>

<script>
import Icon from '@/wxcomponents/vant/icon/index.vue'

export default {
  components: {
    'van-icon': Icon
  },
  props: {
    value: String,
    placeholder: String,
    
  }
}
</script>

<style lang="scss" scoped>
.input-container{
  width: 100%;
  height: .52rem;
  border-radius: .33rem;
  background-color: #FC7470;
  padding: 0 .1rem;
  box-sizing: border-box;
  @include flex(space-between, center);

  .main{
    flex: 1;
    margin: 0 .15rem;
    @include font(.18rem, #FFFFFF);
    @include flex(space-between, center);

    input{
      flex: 1;
    }
  }
}
</style>