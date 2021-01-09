<template>
  <view class="main">
    <!-- navbar -->
    <nav-bar back-arrow :placeholder="false" :scrollHeight="scrollHeight">
      <template #right><nav-selector /></template>
    </nav-bar>

    <!-- header -->
    <view class="header"></view>

    <!-- placeholder -->
    <view style="height:.24rem"></view>

    <!-- list -->
    <list-item
      v-for='(item,index) in classList'
      :listData="item||{}"
      :key='index'
      @click="handleLink"
    />
  </view>
</template>

<script>
import { commonList } from '@/pages/Index/data';
import classListItem from '@/components/commonList';
import NavBar from '@/components/NavBar'
import NavSelector from '@/components/NavSelector'
import navBarMixin from '@/mixins/nav-bar'

export default {
  mixins: [navBarMixin],
  components: {
    'nav-bar': NavBar,
    'nav-selector': NavSelector,
    'list-item': classListItem
  },
  data: () => ({
    tabId: 1,
    classList: commonList
  }),
  methods: {
    handleLink () {
      uni.navigateTo({
        url: '/pages/StudyDetail/StudyDetail'
      })
    }
  }
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
</style>