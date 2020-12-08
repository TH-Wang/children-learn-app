<template>
  <view class="container" style="padding: 8vh .33rem 16vh .33rem">

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
        class="phone-input"
        placeholder="输入手机号"
        :rules="phoneRules"
      ><template v-slot:prefix>
        <text style="margin-right:.10rem">+86</text>
      </template></custom-input>
      <!-- 密码 -->
      <custom-input
        v-model="form.password"
        ref="password"
        placeholder="输入密码"
        class="phone-input"
        :rules="passwordRules"
      />
      <!-- 验证码 -->
      <custom-input
        v-model="form.mobile_code"
        ref="mobile_code"
        type="tel"
        max-length="6"
        placeholder="输入验证码"
        :rules="codeRules"
      ><template v-slot:suffix>
        <text style="margin-left:.10rem" @click="reqGetCode">{{verifyCode.text}}</text>
      </template></custom-input>
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
      password: '',
      mobile_code: ''
    },
    phoneRules: [
      {required: true, message: '请输入手机号码'},
      {pattern: /^1\d{10}$/g, message: '请输入合理的手机号码'}
    ],
    passwordRules: [
      {required: true, message: '请输入手机号码'},
      {pattern: /^[^\s\S]{6,}$/g, message: '请输入至少6位密码'}
    ],
    codeRules: [
      {required: true, message: '请输入验证码'},
      {pattern: /^\d{6}$/g, message: '验证码只能为6位数字'}
    ]
  }),
  methods: {
    // 请求短信验证码
    async reqGetCode () {
      // 校验手机号码是否符合规范
      const { err, errMsg } = this.$refs.mobile.validate()
      if (err) {
        uni.showToast({title: errMsg, icon: 'none'})
        return
      }
      // 开始倒计时
      await this.changeCodeStatus()
      // 执行请求
      const res = await authApi.captchaSms(this.form.mobile)
      if (isEmpty(res.data.data)) {
        this.$uni.showModal({
          title: '获取失败',
          content: res.data.message
        })
      }
    },
    // 提交注册
    async handleSubmit () {
      // 表单值的格式验证
      const valid = ['mobile', 'password', 'mobile_code']
      for (let i = 0; i < valid.length; i++) {
        const { err, errMsg } = this.$refs[valid[i]].validate()
        if(err){
          uni.showToast({title: errMsg, icon: 'none'})
          return
        }
      }

      // 发送提交请求
      const res = await authApi.registerBySms(this.form)
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/scss/login.scss'
</style>