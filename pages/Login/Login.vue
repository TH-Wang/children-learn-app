<template>
  <view class="container">
    <!-- 顶部标题 -->
    <view class="header">
      <view class="headline">同学你好，</view>
      <view class="subline">欢迎来到听说读写</view>
    </view>
    <!-- 表单主体 -->
    <view class="main">
      <custom-input class="phone-input" placeholder="输入用户名/手机号" />
      <custom-input placeholder="输入密码" />
      <div class="suffix">免密码登录</div>
    </view>
    <!-- 提交按钮 -->
    <view class="submit">
      <view class="register-button">没有账号？<text>立即注册</text></view>
    </view>
    <!-- 底部其他登录方式 -->
    <view class="footer">
      <view class="other-login">
        <image class="qq-icon" src="@/assets/icons/qq.png" mode="aspectFit">
      </view>
      <view class="other-login">
        <image src="@/assets/icons/wechat.png" mode="aspectFit">
      </view>
    </view>
  </view>
</template>

<script>
import Input from '@/components/Input'

export default {
  components: {
    'custom-input': Input
  }
}
</script>

<style lang="scss" scoped>
$main-color: #FB544F;
$back-color: #FC7470;
$opacity-text: #FDA2A0;
$normal-text: #FFAAA8;

.container{
  background-color: $main-color;
  width: 100vw;
  height: 100vh;
  padding: 10vh .33rem;
  box-sizing: border-box;
  @include flex(space-between, flex-start, column);

  // 顶部标题
  .header{
    
    .headline{
      @include font(.33rem, #FFFFFF, bold);
      margin-bottom: .1rem;
    }

    .subline{
      @include font(.23rem, #FFFFFF);
    }
  }

  // 表单主体
  .main{
    width: 100%;

    .phone-input{
      margin-bottom: .20rem;
    }

    .suffix{
      margin-top: .15rem;
      @include font(.16rem, #FFFFFF, $align: right);
    }
  }

  // 提交部分
  .submit{
    width: 100%;

    .register-button{
      @include font(.16rem, $opacity-text, $align: center);

      text{
        @include font(.16rem, #FFFFFF, bold);
      }
    }
  }

  // 底部其他登录方式按钮
  .footer{
    width: 100%;
    padding: .35rem .50rem 0 .50rem;
    box-sizing: border-box;
    border-top: solid 1px $normal-text;
    @include flex(space-evenly, center);

    .other-login{
      width: .44rem;
      height: .44rem;
      background-color: $back-color;
      border-radius: 50%;
      @include flex;

      image{
        width: .24rem;
        height: .24rem;
      }

      .qq-icon{
        width: .20rem;
        height: .20rem;
      }
    }
  }
}
</style>