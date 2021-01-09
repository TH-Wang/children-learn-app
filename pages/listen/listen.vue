<template>
	<view>
    <!-- navbar -->
    <nav-bar back-arrow :placeholder="false" :scrollHeight="scrollHeight">
      <template #right><nav-selector /></template>
    </nav-bar>

    <!-- header -->
    <view class="header"></view>

    <!-- tabs -->
    <tabs v-model="tabId" :tabs="tabs" style="margin-top:.24rem" />

    <!-- list -->
		<list-item
      v-for='(item,index) in commonList'
      :listData="item||{}"
      :key='index'
      @click="handleLink"
    />
	</view>
</template>

<script>
import NavBar from '@/components/NavBar'
import NavSelector from '@/components/NavSelector'
import Tabs from '@/components/Tabs'
import commonListItem from '@/components/commonList';
import navBarMixin from '@/mixins/nav-bar'
import { commonList } from '@/pages/Index/data';

export default {
  mixins: [navBarMixin],
  data() {
    return {
      commonList,
      tabId: 1,
      tabs: { 1: '听写读物', 2: '听有声读物' },
    }
  },
  methods: {
    handleLink () {
      uni.navigateTo({
        url: '/pages/listenDetail/listenDetail'
      })
    }
  },
  components:{
    listItem:commonListItem,
    NavBar,
    NavSelector,
    Tabs
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
</style>
