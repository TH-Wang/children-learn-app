<template>
  <view class="icon-title">
    <navigator :url="item[0]" class='list-item' v-for="(item, idx) in config" :key="idx">
      <image :src="item[1]" mode="" />
      <view class="ting">{{item[2]}}</view>
      <view class="ting-descrip">{{item[3]}}</view>
    </navigator>
  </view>
</template>

<script>
import navConfig from '@/config/home-nav'

export default {
  data: () => ({ config: navConfig })
}
</script>

<style lang="scss" scoped>
.icon-title{
	width: 3.52rem;
	height: 1.2rem;
	background: #FFFFFF;
	box-shadow: 0rem 0.05rem 0.175rem 0.015rem rgba(180, 46, 42, 0.1);
	border-radius: 0.1rem;
	margin: 0 auto;
	margin-top: -0.25rem;
  @include flex(space-between, center);

  .list-item{
    flex: 1;
    height: 100%;
    @include flex(center, center, column);
    text-align: center;
    
    image{
      width: 0.475rem;
      height: 0.475rem;
    }
    .ting{
      font-size: 0.16rem;
      font-family: 'PingFang';
      font-weight: 500;
      color: #333333;
      margin: 0.06rem 0rem 0.025rem 0 ;
    }
    .ting-descrip{
      font-size: 0.12rem;
      font-family: 'PingFang';
      color: #666666;
    }
  }
}
</style>