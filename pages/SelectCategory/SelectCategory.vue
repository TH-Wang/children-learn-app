<template>
  <view>
    <template v-if="show">

      <view class="container">
        <view class="title">幼儿园</view>
        <view
          :class="{category: true, active: active === item.id}"
          v-for="item in list[0]"
          :key="item.id"
          @click="handleChange(item.id)"
        >{{item.name}}</view>
      </view>

      <view class="container">
        <view class="title">小学</view>
        <view
          :class="{category: true, active: active === item.id}"
          v-for="item in list[1]"
          :key="item.id"
          @click="handleChange(item.id)"
        >{{item.name}}</view>
      </view>

      <view class="container">
        <view class="title">初中</view>
        <view
          :class="{category: true, active: active === item.id}"
          v-for="item in list[2]"
          :key="item.id"
          @click="handleChange(item.id)"
        >{{item.name}}</view>
      </view>
      
      <!-- 确认按钮 -->
      <view :class="{'footer-button': true, 'button-active': active !== null }"
        @click="handleConfirm"
      >确认</view>
    </template>
  </view>
</template>

<script>
import { isEmpty, isNull, isUndefined } from 'lodash'
import { mapMutations, mapState } from 'vuex'
export default {
  data: () => ({
    show: false,
    active: null
  }),
  computed: {
    ...mapState(['global']),
    list () {
      const data = this.global.categories
      if (isEmpty(data)) return new Array(3).fill([])
      const reg0 = /(幼儿园|班)/
      const reg1 = /年级/
      const reg2 = /初/
      return {
        0: data.filter(i => reg0.test(i.name)),
        1: data.filter(i => reg1.test(i.name)),
        2: data.filter(i => reg2.test(i.name))
      }
    }
  },
  methods: {
    ...mapMutations(['setGlobalData', 'setLocalStorage']),
    handleChange (id) {
      this.active = this.active === id ? null : id
    },
    handleConfirm () {
      if (!this.active) {
        uni.showToast({ title: '请选择年级', icon: 'none' })
      } else {
        const id = this.active
        this.setLocalStorage({ category: id })
        this.reqCourseList()
        uni.switchTab({ url: '/pages/Index/Index' })
      }
    },
    // 请求课程分类
    async reqCategories () {
      const res = await this.$api.getCourseCategories()
      const categories = res.data.data
      this.setGlobalData({ categories })
    },
    // 请求课程列表
    async reqCourseList (login) {
      const data = {}
      if (!login) data.scene = 'recom,sub'
      if (this.global.category) data.category = this.global.category
      const res = await this.$api.getCoursesList(data)
      this.setGlobalData({ courseList: res.data.data.data })
    }
  },
  onLoad: async function () {
    uni.showLoading({title: '加载中'})
    await this.reqCategories()
    const category = this.global.category
    if (!isNull(category) && !isUndefined(category)) {
      uni.hideLoading()
      uni.switchTab({ url: '/pages/Index/Index' })
    } else {
      uni.hideLoading()
      uni.setNavigationBarTitle({ title: '选择年级' })
      this.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
$primary: #FB5852;

.container{
  margin: 0 .2rem;

  .title{
    @include font(.16rem, #333, bold);
    margin: .15rem 0 .12rem;
  }
}
.category{
  display: inline-block;
  width: .64rem;
  padding: .02rem 0;
  margin: 0 .12rem .12rem 0;
  border-radius: 1rem;
  border: solid 1px #999;
  font-size: .14rem;
  color: #777;
  text-align: center;

  &.active{
    border: solid 1px $primary;
    background-color: $primary;
    color: #ffffff;
  }
}
.footer-button{
  width: 100%;
  height: .5rem;
  line-height: .5rem;
  background-color: #999;
  @include font(.17rem, #FFFFFF, $align:center);
  position: fixed;
  bottom: 0;
  left: 0;

  &.button-active{
    background-color: #E96359;
  }
}
</style>