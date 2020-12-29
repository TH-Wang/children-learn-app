<template>
	<view class="container">
    <!-- 主体 -->
		<view class="title">
		  <view class="title-box"></view>
      <!-- 标题 -->
		  <view class="title-text"><slot /></view>
      <!-- 后缀内容 -->
			<view class="title-suffix">
				<slot name="suffix" />
			</view>
		</view>
    <!-- 描述文字 -->
		<view class="desc">{{description}}</view>
	</view>
</template>

<script>
export default {
  props: {
    description: String
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
  padding: 0rem 0.16rem 0.15rem 0.16rem;
  margin-top: 0.245rem;
  box-sizing: border-box;
}
.title{
    height: 0.16rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title-box{
      width: 0.05rem;
      height: 0.16rem;
      background: #FB5852;
      border-radius: 0.01rem;
    }
    .title-text{
      flex: 1;
      font-size: 0.18rem;
      font-family: "PingFang";
      font-weight: bold;
      padding-left: 0.07rem;
    }
}
.desc{
  @include font(.12rem, #999999);
  margin-top: .12rem;
}
</style>