<template>
  <view>

    <!-- navbar -->
    <nav-bar back-arrow :placeholder="false">订阅会员</nav-bar>

    <!-- header -->
    <view class="header">
      <!-- 用户会员信息 -->
      <view class="image-cell">
        <image class="avatar" src="" mode="aspectFill" />
        <view class="info">
          <view class="info-main">
            J先生
            <text class="tag">体验会员</text>
          </view>
          <view class="info-description">您当前为免费会员，购买后有效期顺延</view>
        </view>
      </view>
    </view>

    <!-- headline -->
    <view class="headline">选择会员套餐</view>

    <!-- options -->
    <view class="options">
      <view
        :class="{'options-item': true, 'options-active': chooseId === item.id}"
        v-for="item in options"
        :key="item.id"
        @click="chooseId = item.id"
      >
        <text class="time">{{item.time}}</text>
        <text class="price">￥{{item.price}}</text>
        <text class="ori-price">{{item.oriPrice}}</text>
      </view>
    </view>

    <!-- footer -->
    <view class="footer-button">立即开通</view>
  </view>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  components: { 'nav-bar': NavBar },
  data: () => ({
    chooseId: 2,
    options: [
      { id: 1, time: '1个月', price: 99, oriPrice: 120 },
      { id: 2, time: '3个月', price: 199, oriPrice: 299 },
      { id: 3, time: '12个月', price: 599, oriPrice: 899 },
    ]
  })
}
</script>

<style lang="scss" scoped>
// 顶部
.header{
  width: 100%;
  height: 1.67rem;
  background: linear-gradient(89deg, #676983 0%, #4E5063 99%);
  position: relative;

  .image-cell{
    padding: 0 .18rem;
    @include flex;
    position: absolute;
    left: 0;
    bottom: .22rem;

    .avatar{
      width: .38rem;
      height: .38rem;
      border-radius: 50%;
      overflow: hidden;
      margin-right: .16rem;
      background-color: #FFFFFF;
    }

    .info{
      flex: 1;

      &-main{
        margin-bottom: .09rem;
        @include font(.16rem, #FFFFFF, bold);
      }

      .tag{
        display: inline-block;
        height: .15rem;
        line-height: .15rem;
        padding: 0 .05rem;
        margin-left: .05rem;
        border: solid 1px #FFD7A5;
        border-radius: .1rem;
        @include font(.10rem, #F3E4D0);
      }

      &-description{
        @include font(.11rem, #E3E3E3);
      }
    }
  }
}

// 标题
.headline{
  @include font(.18rem, #333333);
  margin: .25rem .16rem .32rem;
}

// 会员选项
.options{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .07rem;
  margin: 0 .16rem;

  &-item{
    width: 1.1rem;
    height: 1.1rem;
    background-color: #FFFFFF;
    box-shadow: 0rem .03rem .07rem .01rem rgba(167, 167, 167, 0.1);
    border: solid 1px #FFFFFF;
    border-radius: .1rem;
    @include flex(center, center, column);

    .time{
      @include font(.14rem, #333333);
    }
    .price{
      margin: .06rem;
      @include font(.24rem, #E96056, bold);
    }
    .ori-price{
      @include font(.14rem, #999999);
      text-decoration: line-through;
    }
  }

  &-active{
    background-color: #FFF8F8;
    border: 1px solid #E96056;
  }
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