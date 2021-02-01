<template>
	<view>
    <!-- navbar -->
    <nav-bar back-arrow :placeholder="false" :scrollHeight="scrollHeight">
      <template #right>
        <collection :active="isCollect" @change="handleCollectionChange" />
        <nav-selector />
      </template>
    </nav-bar>

    <!-- header -->
    <view class="header">
      <image :src="cover" lazy-load mode="aspectFill" />
    </view>
    <!-- <view class="header">
      <view class="status-bar"/>
      <view class="sentence">多读书,到底怎样才能学会语文。</view>
      <view class="quote">-----叶圣陶</view>
    </view> -->

    <!-- tabs -->
    <tab-selector v-model="chapter" popup-bottom=".5rem" :selections="chapterList" />

    <!-- list -->
    <view
      v-if="commonList.length === 0"
      @click="handleRetry">
      <van-empty :description="videosIsEmpty ? '暂无课程，点击刷新' : '该章节暂无课程'" />
    </view>
		<list-item
      v-else
      v-for="item in commonList"
      :listData="item||{}"
      :cover="cover"
      :key="item.id"
      @click="handleLink(item.id)"
    />

    <!-- footer -->
    <view class="footer" v-if="hasCourse && (!isLogin || !isBuy)">
      <view
        v-if="!isLogin"
        class="footer-button"
        @click="handleLinkLogin"
      >请登录后观看</view>
      <template v-else-if="!isBuy">
        <view class="price">￥{{course.charge}}</view>
        <view
          class="footer-button"
          @click="handleLinkOrder"
        >购买课程</view>
        <view
          class="footer-button vip-button"
          @click="handleLinkVip">会员免费看</view>
      </template>
    </view>
	</view>
</template>

<script>
import Image from '@/wxcomponents/vant/image/index.vue'
import Empty from '@/wxcomponents/vant/empty/index.vue'
import NavBar from '@/components/NavBar'
import NavSelector from '@/components/NavSelector'
import TabSelector from '@/components/TabSelector'
import commonListItem from '@/components/commonList';
import Collection from '@/components/Collection'
import navBarMixin from '@/mixins/nav-bar'
import specialCourse from '@/mixins/special-course'

export default {
  mixins: [navBarMixin, specialCourse],
  components:{
    listItem:commonListItem,
    NavBar,
    NavSelector,
    TabSelector,
    Collection,
    'van-empty': Empty,
    'van-image': Image
  }
}
</script>

<style lang="scss" scoped>
.header{
  height: 2rem;
  width: 100%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #FB5852;

  image{
    width: 100%;
    height: 100%;
  }
}
// 底部提示栏
.footer{
  @include flex(space-between, center);
  width: 100%;
  height: .65rem;
  padding: .1rem;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: #FFFFFF;
  border-top: solid 1px #F5F5F5;
  
  .price{
    @include font(.18rem, #FB5852, bold);
    margin-right: .2rem;
  }

  &-button{
    flex: 1;
    border-radius: .5rem;
    height: 100%;
    background-color: #FB5852;
    @include font(.14rem, #FFFFFF);
    @include flex(center, center);
  }
  
  .vip-button{
    margin-left: .1rem;
    background-color: #555;
    @include font(.14rem, #FFFFFF);
  }
}
</style>
