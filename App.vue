<script>
import { mapMutations, mapState } from 'vuex'
import { isEmpty } from 'lodash'

export default {
  computed: {
    ...mapState(['global', 'auth']),
    category () {
      return this.global.category
    }
  },
  methods: {
    ...mapMutations(['setGlobalData', 'setLocalStorage']),
    // 请求课程分类
    async reqCategories () {
      const res = await this.$api.getCourseCategories()
      const categories = res.data.data
      this.setGlobalData({ categories })
      if (!this.global.category && categories.length) {
        const category = categories[0].id
        this.setLocalStorage({ category })
      }
    },
    // 请求课程列表
    async reqCourseList (login) {
      const data = {}
      if (!login) data.scene = 'recom,sub'
      if (this.global.category) data.category = this.global.category
      const res = await this.$api.getCoursesList(data)
      this.setGlobalData({ courseList: res.data.data.data })
    },
    // 请求会员列表
    async getVipList () {
      const res = await this.$api.getRolesList()
      this.setGlobalData({ rolesList: res.data.data })
    }
  },
  onLaunch: async function() {
    await this.reqCategories()
    await this.reqCourseList(this.auth.token)
    await this.getVipList()
  },
  onShow: function() {

  },
  onHide: function() {

  },
  watch: {
    category: function (newVal) {
      this.reqCourseList()
    }
  }
}
</script>

<style>
@import "/wxcomponents/vant/common/index.css";

html{
  font-size: 26.666667vw;
}
body{
  font-size: .16rem;
  font-family: 'PingFang';
}

uni-swiper .uni-swiper-dots-horizontal{
  bottom: 32px !important;
}
</style>
