<template>
  <view class="content">
    <view class="top-box"><image src="" mode=""></image></view>
    <view class="bottom-box">
      <!-- 背景条 -->
      <view class="mask" :style="progress.style"></view>
      <!-- 任务名称 -->
      <view class="task-name">
        <text v-if="task.isNewTask" style="margin-right:5px">今日解锁新任务</text>
        {{task.taskName}}
      </view>
      <view class="task-progress">
        <!-- 预计用时 -->
        <text v-if="status === 'noStart'" class="task-needTime">
          预计用时{{task.needTime}}~{{task.needTime+10}}分钟
        </text>
        <!-- 进度条 -->
        <text :class="progress.className">{{progress.text}}</text>
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		props: {
      task: {
        type: Object,
        default: () => ({})
      }
    },
		data() {
			return {
				isShow:false,
				isSuccess:false,
				isNoStart:true
			};
    },
    computed: {
      // 任务状态
      status () {
        // noStart: 未开始, doing: 进行中, finish: 已完成
        const taskProgress = this.task.taskProgress
        if (taskProgress === 0) return 'noStart'
        if (taskProgress === 100) return 'finish'
        return 'doing'
      },
      // 进度条的文本和样式
      progress () {
        const taskProgress = this.task.taskProgress
        const type = {
          noStart: {
            className: 'noStart',
            text: '未开始',
            style: { backgroundColor: '#F2F2F2' }
          },
          finish: {
            className: 'finish',
            text: '已完成',
            style: { backgroundColor: '#FFFFFF' }
          },
          doing: {
            className: 'noStart',
            text: `完成进度为${taskProgress}%`,
            style: {
              width: taskProgress / 100 * 3.43 + 'rem',
              backgroundColor: '#FFF1F1'
            }
          }
        }
        return type[this.status]
      }
    }
	}
</script>

<style lang="scss" scoped>
.content{
  position: relative;
  width: 3.43rem;
  margin: 0 auto;
  margin-bottom: .36rem;
  
  .top-box{
    width: 0.81rem;
    height: 0.92rem;
    background: #BFBFBF;
    border-radius: 0.06rem;
    z-index: 200;
    position: absolute;

    image{
      width: 100%;
      height: 100%;
    }
  }

  .bottom-box{
    width: 3.1rem;
    height: 0.89rem;
    box-shadow: 0rem 0.025rem 0.07rem 0.01rem rgba(167, 167, 167, 0.1);
    border-radius: 0.06rem;
    position: absolute;
    top: 0.175rem;
    left: 0.315rem;
    position: relative;
      //遮罩层的样式
      .mask{
        width: 3.1rem;	
        height: 0.89rem;
        border-radius: 0.06rem;
      }
      .mask-noStart{
        background: #F2F2F2;
      }
      .task-name{
        font-size: 0.14rem;
        font-family: "PingFang";
        font-weight: 500;
        color: #666666;
        position: absolute;
        left: 0.61rem;
        top: 0.135rem;
      }
      .task-progress{
        width: 2.355rem;
        position: absolute;
        left: 0.61rem;
        bottom: 0.135rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
          .task-needTime{
            font-size: 0.14rem;
            font-family: "PingFang";
            font-weight: 500;
            color: #666666;
          }
          .percent,.noStart{
            font-size: 0.12rem;
            color: #666666;
            text-align: end;
          }
          .finish{
            font-size: 0.12rem;
            color: #FB544F;
            text-align: end;
          }
          .noStart,.finish,.percent{
            margin: 0 0 0 auto;
          }
      }
  }
}
</style>
