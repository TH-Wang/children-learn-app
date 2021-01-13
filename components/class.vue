<template>
  <view :class="[`class-wap-${record.isVip ? 'vip' : 'normal'}`]">
    <view class="class-top">
      <view class="main-info">
        <!-- 课程类型 -->
        <view class="left-top">
          <view :class="[`tag-${tagType[record.title].name}`, `${record.isVip ? 'tag-vip' : ''}`]">
            <!-- {{tagType[record.type].text}} -->
            {{record.title}}
          </view>
          <view class="class-time">上课时间</view>
        </view>
        <!-- 距离上课时间 -->
        <view class="right-top">
          <view class="isVipClass" v-if="record.isVip">
            距离上课时间还有{{record.distanceTime}}
          </view>
          <view class="noVipClass" v-else>课程暂未开始</view>
        </view>
      </view>
      <view class="time-info">
        <!-- 上课时间 -->
        <view class="left-bottom">{{record.beginTime}}</view>
        <!-- 进入教师按钮 -->
        <view class="right-bottom">
          <view class="goToClass" v-if="record.isVip">进入教室</view>
          <view class="goTo" v-else>
            <navigator url=""><van-icon name="arrow" size=".16rem" /></navigator>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部信息 -->
    <view class="class-bottom">
      <!-- 头像 -->
      <view class="teacher-img">
        <image src="@/static/index/listen.png" mode=""></image>
      </view>
      {{record.teacher}}
      <text class="line">|</text>
      {{record.address}}
      <text class="line">|</text>
      {{record.timeLength}}
    </view>
  </view>
</template>

<script>
import Icon from '@/wxcomponents/vant/icon/index.vue'

export default {
  components: {
    'van-icon': Icon
  },
  props: {
    record: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    // 课程类型
    tagType: {
      '听': { name: 'listen', text: '听' },
      '说': { name: 'speak', text: '说' },
      '读': { name: 'read', text: '读' },
      '写': { name: 'write', text: '写' }
    }
  })

}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.class-wap {
  font-family: "PingFang";
  width: 3.43rem;
  height: 1.42rem;
  border-radius: 0.1rem;
  margin: .12rem .16rem 0 .16rem;
  padding-bottom: .08rem;
}
// 普通课程
.class-wap-normal{
  @extend .class-wap;
  background-color: #FAFAFA;
  color: #999999;

  .left-bottom, .class-time{ color: #666666 } // 课程时间
}
// vip课程
.class-wap-vip{
  @extend .class-wap;
  color: #FFFFFF;
  background-image: url(~static/vip-bg.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.class-top {
  padding: 0.125rem 0.14rem;

  .main-info{
    @include flex(space-between, center);
    margin-bottom: 0.125rem;

    .left-top {
      @include flex(flex-start, center);

      // 标签
      .tag {
        width: 0.42rem;
        height: 0.19rem;
        line-height: 0.19rem;
        box-shadow: 0rem 0.03rem 0.045rem 0.005rem rgba(180, 46, 42, 0.1);
        border-radius: 0.02rem;
        font-weight: bold;
        font-size: 0.11rem;
        text-align: center;
        margin-right: .05rem;

        &-vip{
          color: #FB5953 !important;
          background-color: #FFFFFF !important;
        }
        
        // 听
        &-listen{
          @extend .tag;
          color: #FB5953;
          background-color: #FFCCC2;
        }
        // 说
        &-speak{
          @extend .tag;
          color: #FF9000;
          background-color: #FFF1C2;
        }
        // 读
        &-read{
          @extend .tag;
          color: #FB5953;
          background-color: #FFCCC2;
        }
        // 写
        &-write{
          @extend .tag;
          color: #FF9000;
          background-color: #FFF1C2;
        }
      }
      
      // 上课时间标题
      .class-time {
        font-size: 0.15rem;
      }
    }
    .right-top {
      font-size: 0.12rem;
    }
  }

  .time-info {
    @include flex(space-between, center);

    .left-bottom {
      font-size: 0.32rem;
      // font-weight: bold;
    }

    .right-bottom {

      .goToClass {
        width: 0.75rem;
        height: 0.28rem;
        background-color: #ffffff;
        color: #FB554F;
        border-radius: 0.14rem;
        line-height: 0.28rem;
        text-align: center;
        font-size: 0.13rem;
        font-weight: bold;
      }
    }
  }
}

.class-bottom {
  display: flex;
  align-items: center;
  font-size: 0.13rem;

  .teacher-img {
    width: 0.24rem;
    height: 0.24rem;
    background: #e1e1e1;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 0.12rem 0 0.14rem;

    image {
      width: 100%;
      height: 100%;
    }
  }
  .line {
    padding: 0 0.12rem;
    font-size: .1rem;
    line-height: .16rem;
  }
}
</style>
