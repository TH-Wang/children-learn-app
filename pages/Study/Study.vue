<template>
  <view class="main">

    <!-- header -->
    <view class="header"></view>

    <!-- placeholder -->
    <view style="height:.24rem"></view>

    <!-- tabs -->
    <tabs v-model="tabId" />

    <!-- book list -->
    <div class="book-container">
      <book v-for="item in bookList" :key="item.id" :record="item" />
    </div>
  </view>
</template>

<script>
import Tabs from '@/components/Tabs'
import Book from '@/components/Book'

export default {
  components: {
    'tabs': Tabs,
    'book': Book
  },
  data: () => ({
    tabId: 1,
    bookList: [
      {id: 1, name: '吹牛大王历险记', teacher: '叶老师'},
      {id: 2, name: '吹牛大王历险记', teacher: '叶老师'},
      {id: 3, name: '吹牛大王历险记', teacher: '叶老师'},
      {id: 4, name: '吹牛大王历险记', teacher: '叶老师'},
      {id: 5, name: '吹牛大王历险记', teacher: '叶老师'},
      {id: 6, name: '吹牛大王历险记', teacher: '叶老师'},
      {id: 7, name: '吹牛大王历险记', teacher: '叶老师'},
      {id: 8, name: '吹牛大王历险记', teacher: '叶老师'},
      {id: 9, name: '吹牛大王历险记', teacher: '叶老师'}
    ]
  })
}
</script>

<style lang="scss" scoped>
.header{
  height: 1.5rem;
  width: 100%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #E96359;
}

// 书籍列表容器
.book-container{
  margin: .2rem .16rem;
  display: grid;
  gap: .12rem .38rem;
  grid-template-columns: repeat(3, 1fr);
}
</style>