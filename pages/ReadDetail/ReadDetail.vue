<template>
  <view class="container">
    <view class="header"></view>

    <page-title description="明星教师领读，重点情节梳理，轻松掌握名著脉络">
      图书领读
      <template #suffix>
        <view class="gradual-button-blue">正在阅读78%</view>
      </template>
    </page-title>

    <page-title description="课后问答互动，增强有效输入，培养独立思考能力">
      名言警句摘抄
      <template #suffix>
        <view class="gradual-button-red">去互动</view>
      </template>
    </page-title>
  </view>
</template>

<script>
import PageTitle from '@/components/HomeHeader'

export default {
  components: {
    'page-title': PageTitle
  }
}
</script>

<style lang="scss" scoped>
// 顶部
.header{
  height: 1.6rem;
}

// 渐变按钮
.gradual-button{
  padding: .04rem .12rem;
  border-radius: .30rem;
  letter-spacing: .8px;
  @include font(.14rem, #FFFFFF);

  &-blue{
    @extend .gradual-button;
    background: linear-gradient(98deg, #838FD8 0%, #4F599A 100%);
  }

  &-red{
    @extend .gradual-button;
    background: linear-gradient(98deg, #EB9885 0%, #E9645A 99%);
  }
}
</style>