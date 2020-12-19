// 获取页面滚动距离顶部的高度
import { throttle } from 'lodash'

export default {
  data: () => ({
    scrollHeight: 0
  }),
	onPageScroll: throttle(function (res) {
		this.scrollHeight = res.scrollTop
	}, 200) 
}