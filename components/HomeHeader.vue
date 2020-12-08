<template>
  <view class="title">
    <view class="title-box"></view>
    <view class="title-text">
      <slot />
    </view>
  </view>
</template>

<style lang="scss" scoped>

.title{
    height: 0.16rem;
    display: flex;
    align-items: center;
    margin: 0.245rem 0 0.15rem 0.16rem;
    .title-box{
      width: 0.05rem;
      height: 0.16rem;
      background: #FB5852;
      border-radius: 0.01rem;
    }
    .title-text{
      font-size: 0.18rem;
      font-family: "PingFang";
      font-weight: bold;
      padding-left: 0.07rem;
    }
  }
</style>