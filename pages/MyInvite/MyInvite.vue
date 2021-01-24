<template>
  <view>
    <!-- navbar -->
    <nav-bar back-arrow :placeholder="false">我的邀请</nav-bar>

    <!-- header -->
    <view class="header"></view>

    <!-- card -->
    <view class="card">
      <!-- 上方信息 -->
      <view class="detail">
        <view class="info">
          <view class="title">邀请人数</view>
          <view class="content">{{users}}人</view>
        </view>
        <view class="line"></view>
        <view class="info">
          <view class="title">邀请奖励</view>
          <view class="content">{{price}}元</view>
        </view>
      </view>
      <!-- 操作按钮 -->
      <view class="handle-button">去提现</view>
    </view>

    <view class="tip">{{code ? '您的邀请码为' : ''}}</view>
    <view class="code">{{code}}</view>

    <!-- footer -->
    <view class="footer-button" @click="handleCreateCode">生成邀请码</view>
  </view>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  components: { 'nav-bar': NavBar },
  data: () => ({
    users: '-',
    price: '-',
    code: ''
  }),
  methods: {
    async handleReq () {
      uni.showLoading({title: '加载中'})
      const res = await this.$api.inviteUsers()
      this.users = res.data.data.total || 0
      this.price = 0
      uni.hideLoading()
    },
    async handleCreateCode () {
      uni.showLoading({title: '加载中'})
      const res = await this.$api.promoCode()
      const code = res.data.data.code
      uni.hideLoading()
      this.code = code
    }
  },
  onLoad () {
    this.handleReq()
  }
}
</script>

<style lang="scss" scoped>
// 顶部
.header{
  width: 100%;
  height: 2.1rem;
  background-color: #FB544F;
}

// 卡片
.card{
  width: 3.43rem;
  height: 1.8rem;
  margin: 0 auto;
  border-radius: .1rem;
  background-color: #FFFFFF;
  box-shadow: 0 .03rem .12rem .02rem rgba(167, 167, 167, 0.1);
  transform: translateY(-1.2rem);
  @include flex(center, center, column);
  
  .detail{
    width: 90%;
    margin-bottom: .24rem;
    @include flex(center, flex-end);
    
    .line{
      height: 0.75rem;
      width: 1px;
      background-color: #E3E3E3;
    }

    .info{
      flex: 1;
      @include flex(center, center, column);

      .title{
        @include font(.14rem, #333333);
        margin-bottom: .12rem;
      }

      .content{
        @include font(.24rem, #333333, bold);
      }
    }
  }

  .handle-button{
    width: 1.16rem;
    height: .27rem;
    line-height: .27rem;
    background-color: #FB544F;
    border-radius: .05rem;
    @include font(.14rem, #FFFFFF, $align:center);
  }
}

// 邀请码
.tip{
  @include font(.14rem, #666, $align: center);
}
.code{
  margin-top: .08rem;
  @include font(.28rem, #444, bold, center);
}

// 底部按钮
.footer-button{
  width: 100%;
  height: .5rem;
  line-height: .5rem;
  background-color: #E96359;
  @include font(.17rem, #FFFFFF, $align:center);
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
