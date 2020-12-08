<template>
  <view class="container">

    <!-- 顶部标题 -->
    <view class="header">
      <view class="headline">同学你好，</view>
      <view class="subline">欢迎来到听说读写</view>
    </view>

    <!-- 密码登录 -->
    <view class="main" v-show="mode === 'pswd'">
      <custom-input
        v-model="form.mobile"
        ref="mobile"
        type="tel"
        max-length="11"
        class="phone-input"
        placeholder="输入用户名/手机号"
      />
      <custom-input
        v-model="form.password"
        ref="password"
        type="password"
        placeholder="输入密码"
      />
      <view class="suffix" @click="mode = 'mobile'">验证码登录</view>
    </view>

    <!-- 手机验证码登录 -->
    <view class="main" v-show="mode === 'mobile'">
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
      <view class="suffix" @click="mode = 'pswd'">密码登录</view>
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
        <image class="qq-icon" src="@/static/icons/qq.png" mode="aspectFit">
      </view>
      <view class="other-login">
        <image src="@/static/icons/wechat.png" mode="aspectFit">
      </view>
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
    // 登录方式, mobile: 验证码, pswd: 密码
    mode: 'pswd',
    form: {
      mobile: '',
      password: '',
      mobile_code: ''
    },
    phoneRules: [
      {required: true, message: '请输入手机号码'},
      {pattern: /^\d{11}$/g, message: '请输入合理的手机号码'}
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
          content: res.data.message,
          showCancel: false
        })
      }
    },
    // 提交
    async handleSubmit () {
      // 通过登录类型判断需要校验的字段
      const valid = this.mode === 'mobile'
        ? ['mobile', 'mobile_code']
        : ['mobile', 'password']
      // 进行校验
      for (let i = 0; i < valid.length; i++) {
        const { err, errMsg } = this.$refs[valid[i]].validate()
        if(err){
          uni.showToast({title: errMsg, icon: 'none'})
          return
        }
      }
      // 获取参数
      const { mobile, password, mobile_code } = this.form
      const data = this.mode === 'mobile'
        ? { mobile, mobile_code }
        : { mobile, password }
      
      // 发送请求
      uni.showLoading({title: '登录中'})
      const res = this.mode === 'mobile'
        ? await authApi.loginByMobile(data)
        : await authApi.loginByPassword(data)
      uni.hideLoading()

      // 如果登录失败
      if (isEmpty(res.data.data)) {
        const result = await this.$uni.showModal({
          title: '登录失败',
          content: res.data.message,
          confirmText: '前往首页',
          cancelText: '继续登录'
        })
        if (result.confirm) uni.switchTab({url: '/pages/Index/Index'})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/scss/login.scss'
</style>