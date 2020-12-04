<template>
  <view class="container">

    <!-- 顶部标题 -->
    <view class="header">
      <view class="headline">同学你好，</view>
      <view class="subline">欢迎来到听说读写</view>
    </view>

    <!-- 表单主体 -->
    <view class="main">
      <custom-input
        v-model="form.mobile"
        ref="mobile"
        type="tel"
        max-length="11"
        class="phone-input"
        placeholder="输入用户名/手机号"
        :rules="phoneRules"
      />
      <custom-input
        v-model="form.password"
        ref="password"
        type="password"
        placeholder="输入密码"
      />
      <view class="suffix">免密码登录</view>
    </view>

    <!-- 提交按钮 -->
    <view class="submit">
      <submit-button
        dark-word="没有账号"
        light-word="立即注册"
        @submit="handleSubmit"
      >登录</submit-button>
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
import { authApi } from '@/api'
import Input from '@/components/Input'
import SubmitButton from '@/components/Submit'

export default {
  components: {
    'custom-input': Input,
    'submit-button': SubmitButton
  },
  data: () => ({
    form: {
      mobile: '',
      password: ''
    },
    phoneRules: [
      {required: true, message: '请输入手机号码/用户名'},
      {pattern: /^\d{11}$/g, message: '请输入合理的手机号码'}
    ]
  }),
  methods: {
    handleSubmit () {
      const { err, errMsg } = this.$refs.mobile.validate()
      if(err){
        uni.showToast({title: errMsg, icon: 'none'})
        return
      }
      console.log(this.form)
    }
  },
  onLoad () {
    console.log('login onload')
    console.log(authApi)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/login.scss'
</style>