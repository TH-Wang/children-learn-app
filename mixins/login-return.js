export default {
  data: () => ({
    backRoute: null
  }),
  methods: {
    handleReturn () {
      const url = this.backRoute
      uni.switchTab({
        url,
        fail: () => {uni.navigateTo({ url })}
      })
    }
  },
  onLoad () {
    const reg = /(login|sign)/gi
    let targetRoute = null
    const pages = getCurrentPages().map(i => i.route).reverse()
    for (let i = 0; i < pages.length; i++) {
      if (reg.test(pages[i])) continue
      targetRoute = '/' + pages[i]
    }
    this.backRoute = targetRoute || '/pages/Index/Index'
  }
}