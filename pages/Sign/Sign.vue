<template>
  <view class="container" style="padding: 8vh .33rem 20vh .33rem">

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
        v-model="form.phone"
        ref="phone"
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
        v-model="form.password"
        ref="code"
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
      phone: '',
      password: ''
    },
    phoneRules: [
      {required: true, message: '请输入手机号码'},
      {pattern: /^1\d{10}$/g, message: '请输入合理的手机号码'}
    ],
    codeRules: [
      {required: true, message: '请输入验证码'},
      {pattern: /^\d{6}$/g, message: '验证码只能为6位数字'}
    ]
  }),
  methods: {
    // 请求短信验证码
    async reqGetCode () {
      // 开始倒计时文本的变化
      await this.changeCodeStatus()
      // 执行请求...
    },
    // 提交注册
    handleSubmit () {
      // 表单值的格式验证
      const valid = ['phone', 'code']
      for (let i = 0; i < valid.length; i++) {
        const { err, errMsg } = this.$refs[valid[i]].validate()
        if(err){
          uni.showToast({title: errMsg, icon: 'none'})
          return
        }
      }

      console.log(this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/login.scss'
</style>