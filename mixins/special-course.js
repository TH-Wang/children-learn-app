import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  data: () => ({
    id: null,
    // 本课程的关键字或者名字
    keyword: null,
    // 是否有本课程
    hasCourse: false,
    // 当前选择的章节
    chapter: 1,
    // 课程信息
    course: {},
    // 章节列表
    chapterList: [],
    // 所有视频列表
    videos: {},
    // 当前章节的视频列表
    commonList: [],
    // 是否购买
    isBuy: false,
    // 是否收藏
    isCollect: false,
    // 课程封面
    cover: ''
  }),
  computed: {
    ...mapState(['global']),
    ...mapGetters(['courseId', 'isLogin']),
    videosIsEmpty () {
      return Object.keys(this.videos).length === 0
    }
  },
  methods: {
    ...mapMutations(['setGlobalData']),
    // 请求课程列表
    async reqCourseList (login) {
      const data = {}
      if (!login) data.scene = 'recom,sub'
      if (this.global.category) data.category = this.global.category
      const res = await this.$api.getCoursesList(data)
      this.setGlobalData({ courseList: res.data.data.data })
    },
    // 获取章节列表
    async reqChapters () {
      try {
        const id = this.getId()
        if (!id) return
        uni.showLoading({title: '加载中'})
        const res = await this.$api.getCourseDetail(id)
        this.hasCourse = true
        const { chapters, videos, course, isBuy, isCollect } = res.data.data
        uni.hideLoading()
        this.chapterList = chapters
        this.chapter = chapters.length ? chapters[0].id : 1
        this.videos = videos
        this.course = course
        this.cover = course.thumb
        this.isBuy = isBuy
        this.isCollect = isCollect
        this.commonList = videos[0] || []
      } catch (error) {
        console.log(error);
      }
    },
    // 获取该课程对应的id
    getId () {
      if (!this.id) {
        const plan = this.global.courseList.find(i => i.title === this.keyword)
        if (plan) return plan.id
        else {
          setTimeout(() => {
            uni.hideLoading()
            uni.showToast({title: '敬请期待！', icon: 'none'})
          }, 300);
          return false
        }
      } else return this.id
    },
    // 点击重试
    async handleRetry () {
      if (!this.videosIsEmpty) return
      await this.reqChapters()
    },
    // 收藏状态发生改变
    async handleCollectionChange (value) {
      this.isCollect = value
      console.log(this.id)
      const res = await this.$api.courseLike(this.id)
      const { code, data } = res
      // 反馈
      if (code === 0) {
        const toast = value ? {title: '收藏成功'} : {title: '已取消收藏该课程', icon: 'none'}
        uni.showToast(toast)
      }
    },
    // 跳转详情页面
    async handleLink (record) {
      if (!this.isLogin) return
      if (record.charge > 0 && !this.isBuy) {
        uni.showToast({ title: '购买课程后即可观看', icon: 'none' })
        return
      }
      const id = record.id
      uni.navigateTo({
        url: `/pages/CourseDetail/CourseDetail?id=${id}`
      })
    },
    // 跳转到登录页面
    handleLinkLogin () {
      uni.navigateTo({ url: '/pages/Login/Login' })
    },
    // 跳转到支付页面
    handleLinkOrder () {
      console.log('跳转订单页面')
      uni.navigateTo({
        url: '/pages/Order/Order?goods_id=' + this.course.id +
          '&goods_name=' + this.course.title +
          "&goods_label=点播课程&goods_charge=" + this.course.charge + '&goods_type=vod'
      })
    },
    // 跳转到vip页面
    handleLinkVip () {
      uni.navigateTo({ url: '/pages/SubscribeVip/SubscribeVip' })
    }
  },
  onLoad (option) {
    if (option.keyword) this.keyword = option.keyword
    if (option.id) this.id = option.id
    this.reqChapters()
  },
  watch: {
    chapter: function (newVal) {
      const data = this.videos[newVal]
      this.commonList = data || []
    },
    'global.category': async function (newVal) {
      await this.reqCourseList()
      this.reqChapters()
    }
  }
}