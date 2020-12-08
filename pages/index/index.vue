<template>
	<view class="content">

    <!-- banner -->
    <view class="banner"></view>

    <!-- 导航按钮 -->
    <home-nav />

    <!-- 打卡时间 -->
    <div class="insist">
      您已经坚持完成一年级任务<span>0</span>天
    </div>
    
    <!-- 课程列表 -->
    <class-item v-for="item in classList" :key="item.id" :record="item" />

    <!-- 今日任务 -->
    <home-header>今日任务</home-header>
    <task-item :task="taskList[0]" />
    <task-item :task="taskList[1]" />

    <!-- 本周任务 -->
    <home-header>本周任务</home-header>
    <task-item :task="taskList[2]" />
    <task-item :task="taskList[3]" />
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  import HomeNav from '@/components/HomeNav'
  import Class from '@/components/Class'
  import Task from '@/components/Task'
  import HomeHeader from '@/components/HomeHeader'
  import { classList, taskList } from './data'
  
	export default {
    components: {
      'home-nav': HomeNav,
      'class-item': Class,
      'home-header': HomeHeader,
      'task-item': Task
    },
		data: () => ({
      classList: classList,
      taskList: taskList
    }),
		computed: {
			...mapState(['title'])
    },
    methods: {
      onClick () {
        this.$toast({
          message: '正在努力开发中...',
          position: 'bottom'
        })
      }
    },
		onLoad() {

		}
	}
</script>

<style lang="scss">
.banner{
  height: 2rem;
  background-color: #FB544F;
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
</style>
