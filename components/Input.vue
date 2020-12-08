<template>
  <view class="input-container">
    <div class="prefix"><slot name="prefix" /></div>
    <view class="main">
      <input
        :focus="focus"
        :value="value"
        :type="type"
        :placeholder="placeholder"
        :maxlength="maxLength"
        placeholder-style="color:#FDA2A0"
        @input="handleChange"
      />
      <van-icon
        v-show="!isEmptyValue"
        color="#eee"
        name="cross"
        size=".16rem"
        @click="clear"
      />
    </view>
    <div class="suffix"><slot name="suffix" /></div>
  </view>
</template>

<script>
import { isEmpty } from 'lodash'
import Icon from '@/wxcomponents/vant/icon/index.vue'

export default {
  components: {
    'van-icon': Icon
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    },
    maxLength: {
      type: String,
      default: '999'
    },
    rules: Array
  },
  data: () => ({
    focus: false
  }),
  computed: {
    isEmptyValue () {
      return isEmpty(this.value)
    }
  },
  methods: {
    // 输入框发生改变
    handleChange (e) {
      this.$emit('change', e.target.value)
    },
    // 主动让输入框获取焦点，外部组件可调用
    autoFocus () {
      this.focus = true
    },
    // 清空输入框内容
    clear () {
      this.$emit('change', '')
      this.autoFocus()
    },
    // 校验函数
    validate () {
      // 如果当前字段不需要做校验，则跳过
      if (!this.rules || this.rules.length === 0) return true
      // 输入框的值
      const value = this.value
      const len = this.rules.length
      for (let i = 0; i < len; i++) {
        const item = this.rules[i]
        const msg = item.message
        // 必填校验
        if (item.required && isEmpty(value)) {
          return { err: true, errMsg: msg }
        }
        // 自定义校验
        if (item.validator && !item.validator(value)) {
          return { err: true, errMsg: msg }
        }
        // 正则校验
        if (item.pattern && !new RegExp(item.pattern).test(value)) {
          return { err: true, errMsg: msg }
        }
      }
      return {err: false, errMsg: null}
    } 
  }
}
</script>

<style lang="scss" scoped>
.input-container{
  width: 100%;
  height: .52rem;
  border-radius: .33rem;
  background-color: #FC7470;
  padding: 0 .24rem;
  box-sizing: border-box;
  @include flex(space-between, center);

  .main{
    flex: 1;
    // @include font(.18rem, #FFFFFF);
    @include flex(space-between, center);

    input{
      flex: 1;
      @include font(.18rem, #FFFFFF);
    }
  }
}

// 左插槽
.prefix, .suffix{
  @include font(.15rem, #FFFFFF);
  text-align: center;
}
</style>