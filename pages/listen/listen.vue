<template>
  <view>
    <!-- navbar -->
    <nav-bar back-arrow :placeholder="false" :scrollHeight="scrollHeight">
      <template #right><nav-selector /></template>
    </nav-bar>

    <!-- header -->
    <view class="header"></view>

    <!-- list -->
    <view class="book-list">
      <book
        v-for="item in bookList"
        :key="item.id"
        :record="item"
        @click="handleLink(item)"
      />
    </view>
  </view>
</template>

<script>
import NavBar from '@/components/NavBar'
import NavSelector from '@/components/NavSelector'
import Book from '@/components/Book'
import navBarMixin from '@/mixins/nav-bar'
import { bookList } from '@/pages/Index/data'

export default {
  mixins: [navBarMixin],
  components: {
    'nav-bar': NavBar,
    'nav-selector': NavSelector,
    'book': Book,
  },
  data: () => ({
    bookList
  }),
  methods: {
    handleLink (record) {
      uni.navigateTo({ url: '/pages/ReadDetail/ReadDetail' })
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  width: 100%;
  height: 1.5rem;
  background-color: #FB5852;
  border-bottom-left-radius: .1rem;
  border-bottom-right-radius: .1rem;
  padding: 1px .15rem;
  box-sizing: border-box;
}

// 书籍列表容器
.book-list{
  margin: .2rem .16rem;
  display: grid;
  gap: .12rem .38rem;
  grid-template-columns: repeat(3, 1fr);
}
</style>