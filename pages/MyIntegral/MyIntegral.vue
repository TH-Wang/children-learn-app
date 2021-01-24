<template>
  <view>
    <!-- navbar -->
    <nav-bar back-arrow :placeholder="false">我的积分</nav-bar>

    <!-- header -->
    <view class="header"></view>

    <!-- card -->
    <view class="card-container">
      <view class="card">
        <!-- 上方信息 -->
        <view class="detail">
          <view class="integral">{{resData?resData.total:300}}</view>
          <view class="tag">当前积分</view>
          <view class="description">上次更新{{resData.data?resData.data[0].created_at:'12月17日'}}</view>
        </view>
        <!-- 操作按钮 -->
        <view class="handle-button">点击更新</view>
      </view>
    </view>

    <!-- list -->
    <view class="image-cell" v-for="item in list" :key="item.id">
      <!-- 图标 -->
      <image class="avatar" src="" mode="aspectFill" />
      <!-- 详细信息 -->
      <view class="info">
        <view class="info-main">{{item.remark}}</view>
        <view class="info-description">积分+{{item.sum}}</view>
      </view>
      <!-- 按钮 -->
      <view v-if="!item.finish" class="to-finish-button">去完成</view>
    </view>
  </view>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import moment from '@/components/moment/moment.min.js'
export default {
  components: { 'nav-bar': NavBar },
  data: () => ({
    list: [],
    resData:{}
  }),
  methods: {
    async handleReq() {
      const res = await this.$api.getMemberScore();
      console.log(res.data.data);
      this.resData = haddleStr(res.data.data);
      let arr = [];
      res.data.data.data.map(item=>{
          arr.push(
            Object.assign(item,{finish:true})
          )
      })
      this.list = arr;
      function haddleStr(res){
        res.data[0].created_at = moment(res.data[0].created_at).format("M月DD日")
        // let end = moment().format("YYYY-MM-DD HH-mm-ss");
        // let start = res.data[0].created_at;
        // res.data[0].created_at = end.diff(start, 'hours');
        return res
      }
      console.log(res.data.data);
    },
  },
  onLoad() {
    this.handleReq();
  },

}
</script>

<style lang="scss" scoped>
// 顶部
.header{
  width: 100%;
  height: 2.1rem;
  background-color: #FB544F;
}

.card-container{
  width: 100%;
  height: .4rem;
}
// 卡片
.card{
  width: 3.43rem;
  height: 1.9rem;
  margin: 0 auto;
  border-radius: .1rem;
  background-color: #FFFFFF;
  box-shadow: 0 .03rem .12rem .02rem rgba(167, 167, 167, 0.1);
  transform: translateY(-1.5rem);
  @include flex(center, center, column);

  .detail{
    @include flex(center, center, column);

    .integral{
      @include font(.4rem, #000000);
    }
    .tag{
      width: .57rem;
      height: .15rem;
      line-height: .15rem;
      border-radius: .03rem;
      background-color: #FFB6B4;
      margin: .05rem 0 .08rem;
      @include font(.10rem, #FB544F, $align: center);
    }

    .description{
      @include font(.10rem, #999999);
    }
  }

  .handle-button{
    width: 1.16rem;
    height: .27rem;
    margin-top: .12rem;
    line-height: .27rem;
    background-color: #FB544F;
    border-radius: .05rem;
    @include font(.14rem, #FFFFFF, $align:center);
  }
}

// 列表
.image-cell{
  padding: .27rem 0rem;
  margin: 0 .16rem;
  border-bottom: solid 1px #E3E3E3;
  @include flex;

  .avatar{
    width: .4rem;
    height: .4rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: .16rem;
    background-color: #F0F4FE;
  }

  .info{
    flex: 1;
    @include flex(center, flex-start, column);

    &-main{
      @include font(.16rem, #333333, bold);
      margin-bottom: .11rem;
    }

    &-description{
      @include font(.12rem, #999999);
    }
  }

  .to-finish-button{
    width: .8rem;
    height: .28rem;
    line-height: .28rem;
    background-color: #FB544F;
    border-radius: .28rem;
    @include font(.14rem, #FFFFFF, $align: center);
    margin-left: .05rem;
  }
}
</style>