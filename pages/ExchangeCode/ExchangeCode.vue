<template>
  <view>
    <view style="height:.15rem"></view>
    <van-field
      :value="code"
      data-name="code"
      @change="handleFieldChange"
      label="兑换码"
      placeholder="请输入兑换码"
    />
    <van-field
      :value="captcha"
      data-name="captcha"
      @change="handleFieldChange"
      label="图形验证码"
      center
      placeholder="请输入右侧验证码"
    >
      <template #button>
        <image
          class="captcha-image"
          :src="captchaUrl"
          mode="scaleToFill"
          @click="handleReqCaptcha"
        />
      </template>
    </van-field>

    <view class="footer-button" @click="handleExchangeCode">立即兑换</view>
  </view>
</template>

<script>
import { isEmpty } from 'lodash'
import Field from '@/wxcomponents/vant/field/index.vue'

export default {
  components: {
    'van-field': Field
  },
  data: () => ({
    code: '',
    captcha: '',
    captchaUrl: '',
    captchaKey: ''
  }),
  methods: {
    // 文本框发生改变
    handleFieldChange (e) {
      const value = e.detail
      const { name } = e.currentTarget.dataset
      this[name] = value
    },
    // 获取图形验证码
    async handleReqCaptcha () {
      const res = await this.$api.captchaImage()
      const { img, key } = res.data.data
      this.captchaUrl = img
      this.captchaKey = key
    },
    // 兑换验证码
    async handleExchangeCode () {
      const fields = [
        {field: 'code', message: '请输入兑换码'},
        {field: 'captcha', message: '请输入图形验证码'}
      ]
      const valid = this.validate(fields)
      if (!valid) return

      // 发起请求
      const _this_ = this
      const data = {
        code: _this_.code,
        captcha: _this_.captcha,
        captcha_key: _this_.captchaKey
      }
      uni.showLoading({title: '请求中'})
      const res = await this.$api.exchangeCode(data)
      uni.hideLoading()
      const resCode = res.data.code
      const resMessage = res.data.message
      if (resCode === 0) {
        uni.showToast({title: '兑换成功'})
        uni.navigateBack()
      } else if (resCode === 1) {
        uni.showToast({title: resMessage, icon: 'none'})
        // 刷新图形验证码
        this.handleReqCaptcha()
      }
    },
    // 校验
    validate (arr) {
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        if (isEmpty(this[item.field])) {
          uni.showToast({ title: item.message, icon: 'none' })
          return false
        }
      }
      return true
    }
  },
  onLoad () {
    this.handleReqCaptcha()
  }
}
</script>

<style lang="scss" scoped>
.captcha-image{
  width: 1rem;
  height: .4rem;
}
.footer-button{
  width: 100%;
  height: .5rem;
  line-height: .5rem;
  background-color: #E96359;
  @include font(.17rem, #FFFFFF, $align:center);
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>