<template>
  <view>
    <!-- header -->
    <view class="header">
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
        @click="index==0?handleOrderLink():handleLink(item[0])"
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
    <view class="card setting">
      <image src="@/static/mine/setting.png" mode="aspectFit" />
      <text class="label">设置</text>
      <van-icon name="arrow" size=".13rem" color="#999999" />
    </view>
  </view>
</template>

<script>
import { grid, list } from './config'

export default {
  data: () => ({
    config: { grid, list },
		isLogin:false
  }),
  methods: {
    // 跳转链接
    handleLink: url => uni.navigateTo({url}),
		// 判断是否登录
		handleOrderLink(){
			if(this.isLogin){
				uni.navigateTo({
				    url: '/pages/Myorder/Myorder'
				});
				console.log(11111111111);
			}else{
				uni.navigateTo({
				    url: '/pages/Login/Login'
				});
			}
			
		},
		async getMemberDetail () {
			const res = await this.$api.getMemberDetail()
			console.log(res.data.data)
		}
  },
  onLoad() {
		this.getMemberDetail();
		if(this.$store.state.auth.token){
			this.isLogin = true;
		}
		// console.log(this.$store.getters.token);
		console.log(this.$store.state.auth.token);
		console.log(this.isLogin);
    
	}
}
</script>

<style lang="scss" scoped>
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