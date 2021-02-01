<template>
	<view class="content">
    <!-- 顶部导航栏 -->
    <nav-bar color="light" :placeholder="false" :scrollHeight="scrollHeight">
      <template #left><nav-selector /></template>听说读写
    </nav-bar>

    <!-- banner -->
    <view class="banner">
      <swiper indicator-dots autoplay circular :interval="3000" class="swiper">
        <swiper-item v-for="item in bannerList" :key="item.thumb">
          <image :src="item.thumb" mode="aspectFill" />
        </swiper-item>
      </swiper>
    </view>

    <!-- 导航按钮 -->
    <home-nav />

    <!-- 打卡时间 -->
    <div class="insist">
      您已经坚持完成一年级任务<span>0</span>天
    </div>
		
		<!-- 日历 -->
    <view class="calendar">
      <uni-calendar 
        :insert="true"
        @change="handleCalendarChange"
      />
    </view>
    
    <!-- 课程列表 -->
    <course-item v-for="item in global.courseList" :key="item.id" :record="item" />

    <!-- 今日任务 -->
    <!-- <home-header>今日任务</home-header>
    <task-item :task="taskList[0]" />
    <task-item :task="taskList[1]" /> -->

    <!-- 本周任务 -->
    <!-- <home-header>本周任务</home-header>
    <task-item :task="taskList[2]" />
    <task-item :task="taskList[3]" /> -->
  </view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { isEmpty } from 'lodash'
  import NavBar from '@/components/NavBar'
  import HomeNav from '@/components/HomeNav'
  import NavSelector from '@/components/NavSelector'
  // import Class from '@/components/class'
  import CourseItem from '@/components/CourseItem'
  import Task from '@/components/task'
  import HomeHeader from '@/components/HomeHeader'
  import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
  import { classList, taskList } from './data'
  import navBarMixin from '@/mixins/nav-bar'
  
	export default {
    mixins: [navBarMixin],
    components: {
      'uni-calendar': uniCalendar,
      'nav-bar': NavBar,
      'nav-selector': NavSelector,
      'home-nav': HomeNav,
      'course-item': CourseItem,
      // 'class-item': Class,
      'home-header': HomeHeader,
      'task-item': Task
    },
		data: () => ({
      category: 1,
      classList: classList,
      taskList: taskList,
      bannerList: []
    }),
		computed: {
			...mapState(['global'])
    },
    methods: {
      ...mapMutations(['setGlobalData', 'setLocalStorage']),
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
      },
      // 请求会员列表
      async getVipList () {
        const res = await this.$api.getRolesList()
        this.setGlobalData({ rolesList: res.data.data })
      },
      // 请求banner
      async handleReqBanner () {
        const res = await this.$api.getSliderList()
        this.bannerList = res.data.data
      },
      handleCalendarChange (e) {
        console.log(e)
      }
    },
    onLoad: async function () {
      try {
        this.handleReqBanner()
        this.getVipList()
        if (isEmpty(this.global.categories)) await this.reqCategories()
        if (isEmpty(this.global.courseList)) this.reqCourseList()
      } catch (error) {
        uni.showModal({
          title: '信息',
          content: error
        })
      }
    },
    watch: {
      'global.category': function (newVal) {
        this.reqCourseList()
      }
    }
	}
</script>

<style lang="scss">
.banner{
  height: 2.4rem;
  background-color: #FB544F;

  .swiper{
    width: 100%;
    height: 100%;

    image{
      width: 100%;
      height: 100%;
    }
  }
}
.insist{
  width: 100%;
  height: .40rem;
  line-height: .36rem;
  padding: 0 .16rem;
  box-sizing: border-box;
  margin-top: .12rem;
  background-color: rgba(255, 235, 234, 1);
  @include font(.16rem, #333333);

  span{
    @include font(.25rem, #FB544F);
    margin: 0 2px;
  }
}
.calendar{
  width: 3.45rem;
  margin: 0 auto;
}
</style>
