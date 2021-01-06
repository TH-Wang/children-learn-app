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
        class="gap-bottom"
        placeholder="输入用户名/手机号"
      />
      <custom-input
        v-model="form.password"
        ref="password"
        type="password"
        placeholder="输入密码"
      />
      <view class="suffix" @click="handleSwitchMode('mobile')">验证码登录</view>
    </view>

    <!-- 手机验证码登录 -->
    <view class="main" v-show="mode === 'mobile'">

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
        :rules="mobileCodeRules"
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
import { isEmpty } from 'lodash'
import Input from '@/components/Input'
import SubmitButton from '@/components/submit'
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
      mobile_code: '',
      image_code: ''
    },
    // 图形验证码的图片路径和key
    imageCodeInfo: {
      img: '',
      key: ''
    },
    phoneRules: [
      {required: true, message: '请输入手机号码'},
      {pattern: /^\d{11}$/g, message: '请输入合理的手机号码'}
    ],
    imageCodeRules: [
      {required: true, message: '请输入图形验证码'}
    ],
    mobileCodeRules: [
      {required: true, message: '请输入验证码'},
      {pattern: /^\d{6}$/g, message: '验证码只能为6位数字'}
    ]
  }),
  methods: {
    // 切换登录方式
    handleSwitchMode (mode) {
      if (mode === 'mobile') {
        this.mode = mode
        // 如果没有图形验证码则请求
        if (isEmpty(this.imageCodeInfo.img)) this.reqCodeImage()
      }
    },
    // 请求图形验证码
    async reqCodeImage () {
      const res = await this.$api.captchaImage()
      this.imageCodeInfo = res.data.data
    },
    // 请求短信验证码
    async reqGetCode () {
      // 校验手机号码是否符合规范
      const validateResult = this.validate(['mobile', 'image_code'])
      if (!validateResult) return
      // 执行请求
      const { mobile, image_code } = this.form
      const { key } = this.imageCodeInfo
      const res = await this.$api.captchaSms({
        mobile,
        image_captcha: image_code,
        image_key: key,
        scene: 'login'
      })
      // 如果获取失败
      const message = res.data.message
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
      // 如果获取失败，则开始倒计时
      await this.changeCodeStatus()
    },
    // 提交
    async handleSubmit () {
      // 通过登录类型判断需要校验的字段
      const valid = this.mode === 'mobile'
        ? ['mobile', 'mobile_code']
        : ['mobile', 'password']
      // 进行校验
      const validateResult = this.validate(valid)
      if (!validateResult) return

      // 获取参数
      const { mobile, password, mobile_code } = this.form
      const data = this.mode === 'mobile'
        ? { mobile, mobile_code }
        : { mobile, password }
      
      // 发送请求
      uni.showLoading({title: '登录中'})
      const res = this.mode === 'mobile'
        ? await this.$api.loginByMobile(data)
        : await this.$api.loginByPassword(data)
      uni.hideLoading()

      // 如果登录失败
      const message = res.data.message
      if (!isEmpty(message)) {
        await this.$uni.showModal({
          title: '登录失败',
          content: message,
          showCancel: false
        })
        return
      }
      // 如果登录成功
      this.$store.commit('setToken', res.data.data.token)
      uni.showToast({ icon: 'success', title: '登录成功' })
      uni.switchTab({url: '/pages/Index/Index'})
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
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/scss/login.scss'
</style>