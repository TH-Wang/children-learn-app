<template>
  <view>
    <!-- header -->
    <view v-if="isLogin" class="header-info">
      <view class="avatar">
        <image :src="info.avatar" lazy-load mode="aspectFill" />
      </view>
      <view class="info">
        <view class="username">{{info.nick_name}}</view>
        <view class="vip-tag">{{vipType}}</view>
      </view>
    </view>
    <view v-else class="header">
      <view class="panda">
        <image src="@/static/mine/panda.png" mode="aspectFit" />
      </view>
      <!-- 登录按钮 -->
      <view class="button" @click="handleLink('/pages/Login/Login')">登录/注册</view>
    </view>

    <!-- 会员引导按钮 -->
    <image
      class="vip-button"
      src="@/static/mine/vip-btn.png"
      mode="aspectFit"
      @click="handleLink('/pages/SubscribeVip/SubscribeVip')"
    />

    <!-- grid -->
    <view class="card grid">
      <view
        class="grid-item"
        v-for="(item, index) in config.grid"
        :key="index"
        @click="handleLink(item[0])"
      ><image :src="item[1]" mode="aspectFit" />
       <text class="title">{{item[2]}}</text>
      </view>
    </view>

    <!-- list -->
    <view class="card list">
      <view
        class="list-item"
        v-for="(item, index) in config.list"
        :key="index"
        @click="handleLink(item[0])"
      ><image :src="item[1]" mode="aspectFit" />
       <text class="label">{{item[2]}}</text>
       <van-icon name="arrow" size=".13rem" color="#999999" />
      </view>
    </view>

    <!-- setting -->
    <view class="card setting" @click="handleLink('/pages/Setting/Setting')">
      <image src="@/static/mine/setting.png" mode="aspectFit" />
      <text class="label">设置</text>
      <van-icon name="arrow" size=".13rem" color="#999999" />
    </view>
  </view>
</template>

<script>
import { isEmpty } from 'lodash'
import { mapGetters, mapState } from 'vuex';
import { grid, list } from './config'

export default {
  data: () => ({
    config: { grid, list }
  }),
  computed: {
    ...mapState(['global']),
    ...mapGetters(['isLogin', 'vipType']),
    info () {
      return this.global.userInfo
    }
  },
  methods: {
		// 跳转页面
		handleLink(path){
      // 如果未登录，则跳转到登录页面
      if (!this.isLogin) {
        uni.navigateTo({ url: '/pages/Login/Login' })
        return
      }
      if (isEmpty(path)) {
        uni.showToast({ title: '功能尚未开放~', icon: 'none' })
      } else uni.navigateTo({ url: path })
		},
		async getMemberDetail () {
			const res = await this.$api.getMemberDetail()
      this.$store.commit('setGlobalData', { userInfo: res.data.data })
		}
  },
  onLoad() {
    if (this.isLogin) {
		  this.getMemberDetail();
    }
  },
  onShow () {
    if (this.isLogin && isEmpty(this.global.userInfo)) {
      this.getMemberDetail();
    }
  }
}
</script>

<style lang="scss" scoped>
// 用户信息
.header-info {
  height: 1.2rem;
  background-color: #FB544F;
  padding: 0 .16rem;
  box-sizing: border-box;
  @include flex(flex-start, center);

  .avatar{
    width: .64rem;
    height: .64rem;
    margin-right: .16rem;
    border-radius: 50%;
    overflow: hidden;

    image{
      width: 100%;
      height: 100%;
    }
  }

  .info{
    height: .6rem;
    @include flex(space-between, flex-start, column);
    .username{
      color: #FFFFFF;
      font-weight: bold;
    }
    .vip-tag{
      padding: .03rem .1rem;
      border-radius: .2rem;
      background-color: #4E5065;
      @include font(.13rem, #FFFFFF);
    }
  }
}
// 顶部
.header{
  margin: 0 auto;
  padding-top: .4rem;
  height: 1.2rem;
  position: relative;

  .panda{
    width: .8rem;
    @include position(absolute, 50%, 50%);
    transform: translate(-50%, -50%);

    image{
      width: 100%;
    }
  }

  .button{
    width: 1.77rem;
    height: .4rem;
    line-height: .4rem;
    border-radius: .4rem;
    background-color: #E96056;
    @include font(.18rem, #FFFFFF, $align:center);
    transform: translateX(-50%);
    box-shadow: 0 .02rem .14rem 0 rgba(167, 167, 167, 0.3);
    position: absolute;
    left: 50%;
    bottom: 0;
  }
}

// vip按钮
.vip-button{
  width: 3.17rem;
  height: .39rem;
  margin: 0 auto;
  margin-top: .23rem;
  display: block;
}

// 卡片容器
.card{
  margin: 0 .16rem;
  box-shadow: 0 .02rem .14rem 0 rgba(167, 167, 167, 0.14);
  border-radius: .1rem;
}

// 网格导航
.grid{
  @include flex(space-around, center);
  height: .96rem;
  overflow: hidden;

  &-item{
    flex: 1;
    height: 100%;
    @include flex(center, center, column);
  }
  
  image{
    width: .32rem;
    height: .3rem;
    margin-bottom: .1rem;
  }

  .title{
    @include font(.14rem, #333333);
  }
}

// 列表
.list{
  margin-top: .1rem;
  padding: .1rem .16rem;
  box-sizing: border-box;

  &-item{
    @include flex(space-between, center);
    height: .45rem;

    image{
      width: .18rem;
      height: .18rem;
      margin-right: .16rem;
    }

    .label{
      @include font(.14rem, #333333);
      flex: 1;
    }
  }
}

// 设置
.setting{
  height: .66rem;
  padding: .1rem .16rem;
  box-sizing: border-box;
  margin-top: .1rem;
  @include flex(space-between, center);

  image{
    width: .18rem;
    height: .18rem;
    margin-right: .16rem;
  }

  .label{
    @include font(.14rem, #333333);
    flex: 1;
  }
}
</style>