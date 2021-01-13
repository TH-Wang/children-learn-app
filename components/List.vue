<template>
  <view>
    <view v-if="list.length === 0">
      <van-emtpy description="暂无数据，点击刷新" @click="refresh" />
    </view>
    <view v-else><slot></slot></view>
    <uni-load-more :status="status" />
  </view>
</template>

<script>
import uniLoadMore from './uni-load-more/uni-load-more.vue'
import empty from '@/wxcomponents/vant/empty/index.vue'

export default {
  components: { uniLoadMore, 'van-empty': empty },
  // 双向数据绑定list：v-model="list"
  model: {
    prop: 'list',
    event: 'change'
  },
  props: {
    /**
     * @param {Number} page 页码
     * @param {Number} page_size 每页数据量
     * @returns {Object} {data: Array, total: Number} 返回请求到的列表数据，以及总数据量 
     */
    loadFunc: {
      type: Function,
      default: (page, page_size) => ({ data: [], total: 0 })
    },
    list: {
      type: Array,
      default: () => ([])
    },
    // 自定义每页数据量
    pageSize: {
      type: Number,
      default: 10
    },
    // 是否在created生命周期自动请求，默认为true
    loadInCreated: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    datas: [],
    status: 'more',
    page_num: 1,
    page_size: 10,
    total: 0
  }),
  methods: {
    // 请求数据，可使用ref调用此方法
    // 不需要关注页码等状态，该组件内部自己维护
    async request () {
      this.status = 'loading'
      // 获取页码，每页数据量
      const { page_num, page_size } = this
      // 调用请求函数
      const { data, total } = await this.loadFunc(page_num, page_size)
      // 更新数据
      if (page_num === 1) this.datas = data
      else this.datas.push(data)
      this.$emit('change', this.datas)
      // 更新状态
      this.page_num++
      this.total = total
      this.status = this.datas.length >= this.total ? 'noMore' : 'more'
    },
    // 刷新，可使用ref调用此方法
    // 例如在页面的下拉刷新生命周期 "onPullDownRefresh" 中调用此方法
    async refresh () {
      uni.showLoading({title: '加载中'})
      this.page_num = 1
      await this.request()
      uni.hideLoading()
    }
  },
  created () {
    if (this.loadInCreated) this.request()
  }
}
</script>