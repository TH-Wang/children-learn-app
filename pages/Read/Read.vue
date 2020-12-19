<template>
  <view>
    <!-- navbar -->
    <nav-bar back-arrow :placeholder="false" :scrollHeight="scrollHeight">
      <template #right><nav-selector /></template>
    </nav-bar>

    <!-- header -->
    <view class="header">
      <view class="status-bar"/>
      <view class="sentence">多读书,到底怎样才能学会语文。</view>
      <view class="quote">-----叶圣陶</view>
    </view>

    <!-- tabs -->
    <tabs v-model="tabId" :tabs="tabs" style="margin-top:.24rem" />

    <!-- list -->
    <view class="book-list">
      <book v-for="item in bookList" :key="item.id" :record="item" />
    </view>
  </view>
</template>

<script>
import NavBar from '@/components/NavBar'
import NavSelector from '@/components/NavSelector'
import Tabs from '@/components/Tabs'
import Book from '@/components/Book'
import navBarMixin from '@/mixins/nav-bar'
import { bookList } from '@/pages/Index/data'

export default {
  mixins: [navBarMixin],
  components: {
    'nav-bar': NavBar,
    'nav-selector': NavSelector,
    'tabs': Tabs,
    'book': Book,
  },
  data: () => ({
    tabId: 1,
    tabs: { 1: '听写读物', 2: '听有声读物' },
    bookList
  })
}
</script>

<style lang="scss" scoped>
// 顶部背景
.header{
  width: 100%;
  height: 1.5rem;
  background-color: #E96359;
  background-image: url(@/static/read-bg.png);
  background-size: 90% 70%;
  background-position: center;
  background-repeat: no-repeat;
  border-bottom-left-radius: .1rem;
  border-bottom-right-radius: .1rem;
  padding: 1px .15rem;
  box-sizing: border-box;

  // 名言句子
  .sentence{
    margin-top: .48rem;
    @include font(.18rem, #FFFFFF, bold);
  }
  .quote{
    margin-top: .02rem;
    @include font(.16rem, #FFFFFF, $align:right);
  }
}

// 书籍列表容器
.book-list{
  margin: .2rem .16rem;
  display: grid;
  gap: .12rem .38rem;
  grid-template-columns: repeat(3, 1fr);
}
</style>