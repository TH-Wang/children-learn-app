<template>
  <view class="container" style="padding: 8vh .33rem 8vh .33rem">

    <!-- 顶部标题 -->
    <view class="header">
      <view class="headline">同学你好，</view>
      <view class="subline">欢迎来到听说读写</view>

      <!-- 描述 -->
      <view class="description">
        <view class="des-title">新用户注册</view>
        <view class="des-content">根据相关法律法规，请绑定手机号。</view>
      </view>
    </view>

    <!-- 表单主体 -->
    <view class="main">

      <!-- 手机号码 -->
      <custom-input
        v-model="form.mobile"
        ref="mobile"
        type="tel"
        max-length="11"
        class="gap-bottom"
        placeholder="输入手机号"
        :rules="phoneRules"
      ><template v-slot:prefix>
        <text style="margin-right:.10rem">+86</text>
      </template></custom-input>

      <!-- 图形验证码 -->
      <custom-input
        v-model="form.image_code"
        ref="image_code"
        max-length="4"
        placeholder="输入图形验证码"
        class="gap-bottom"
        :rules="imageCodeRules"
      ><template v-slot:float-suffix>
        <image class="code-image" :src="imageCodeInfo.img" @click="reqCodeImage" />
      </template></custom-input>

      <!-- 验证码 -->
      <custom-input
        v-model="form.mobile_code"
        ref="mobile_code"
        type="tel"
        max-length="6"
        placeholder="输入验证码"
        class="gap-bottom"
        :rules="mobileCodeRules"
      ><template v-slot:suffix>
        <text style="margin-left:.10rem" @click="reqGetCode">{{verifyCode.text}}</text>
      </template></custom-input>

      <!-- 密码 -->
      <custom-input
        v-model="form.password"
        type="password"
        ref="password"
        placeholder="输入密码"
        :rules="passwordRules"
      />
    </view>

    <!-- 提交按钮 -->
    <view class="submit">
      <submit-button
        dark-word="已有账号"
        light-word="立即登录"
        :is-login="false"
        @submit="handleSubmit"
      >注册</submit-button>
    </view>
  </view>
</template>

<script>
import { authApi } from '@/api'
import { isEmpty } from 'lodash'
import Input from '@/components/Input'
import SubmitButton from '@/components/Submit'
import vertifyCodeMixin from '@/mixins/vertify-code'

export default {
  mixins: [vertifyCodeMixin],
  components: {
    'custom-input': Input,
    'submit-button': SubmitButton
  },
  data: () => ({
    form: {
      mobile: '',
      image_code: '',
      mobile_code: '',
      password: ''
    },
    // 图形验证码的图片路径和key
    imageCodeInfo: {
      img: '',
      key: ''
    },
    phoneRules: [
      {required: true, message: '请输入手机号码'},
      {pattern: /^1\d{10}$/g, message: '请输入合理的手机号码'}
    ],
    imageCodeRules: [
      {required: true, message: '请输入图形验证码'}
    ],
    mobileCodeRules: [
      {required: true, message: '请输入验证码'},
      {pattern: /^\d{6}$/g, message: '验证码只能为6位数字'}
    ],
    passwordRules: [
      {required: true, message: '请设置登录密码'},
      {pattern: /^[a-z\d~!@#$%^&*{};,.?/'"]{6,}$/i, message: '密码至少6位，由数字、字母和特殊字符组成'}
    ]
  }),
  methods: {
    // 请求图形验证码
    async reqCodeImage () {
      const res = await authApi.captchaImage()
      this.imageCodeInfo = res.data.data
    },
    // 请求短信验证码
    async reqGetCode () {
      // 校验手机号码和图形验证码
      const validateResult = this.validate(['mobile', 'image_code'])
      if (!validateResult) return

      // 如果校验成功
      const { mobile, image_code } = this.form
      const { key } = this.imageCodeInfo
      // 执行请求
      const res = await authApi.captchaSms({
        mobile,
        image_captcha: image_code,
        image_key: key,
        scene: 'register'
      })
      const message = res.data.message
      // 如果获取失败
      if (!isEmpty(message)) {
        // 刷新验证码
        this.reqCodeImage()
        this.$uni.showModal({
          title: '获取失败',
          content: message,
          showCancel: false
        })
        return
      }
      // 如果获取成功，则开始倒计时
      await this.changeCodeStatus()
    },
    // 提交注册
    async handleSubmit () {
      // 表单值的格式验证
      const validList = ['mobile', 'image_code', 'mobile_code', 'password']
      const validateResult = this.validate(validList)
      if (!validateResult) return
      // 发送提交请求
      const { mobile, mobile_code, password } = this.form
      const res = await authApi.registerBySms({ mobile, mobile_code, password })
      const message = res.data.message
      // 如果注册失败
      if (!isEmpty(message)) {
        await this.$uni.showModal({
          title: '注册失败',
          content: message,
          showCancel: false
        })
        return
      }
      uni.switchTab({url: '/pages/Login/Login'})
    },
    // 校验
    validate (valid) {
      for (let i = 0; i < valid.length; i++) {
        const { err, errMsg } = this.$refs[valid[i]].validate()
        if(err){
          uni.showToast({title: errMsg, icon: 'none'})
          return false
        }
      }
      return true
    }
  },
  created () {
    this.reqCodeImage()
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/scss/login.scss';
</style>