<template>
  <view class="video-list">
    <view
      :class="{'video-item': true, 'active': active === item.id}"
      v-for="item in list"
      :key="item.id"
      @click="$emit('change', item.id)">
      <!-- <image class="video-item-cover"  /> -->
      <view class="video-item-title">{{item.title}}</view>
    </view>
    <view style="width:.16rem;height:100%" />
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => ([])
    },
    active: {
      type: [String, Number],
      default: 1
    }
  }
}
</script>

<style lang="scss" scoped>
$height: .8rem;

.video-list{
  width: 100%;
  padding: 0 .16rem;
  box-sizing: border-box;
  height: $height;
  @include flex(flex-start, center);
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar{
    display: none;
  }
  
  .video-item{
    height: $height;
    padding: .05rem;
    box-sizing: border-box;
    margin-right: .16rem;
    border-radius: .04rem;
    background-color: #F5F5F5;

    .active{
      color: #FB5852;
    }

    &-cover{
      width: 1rem;
      height: .5rem;
      border-radius: .1rem;
      background-color: #C5C5C5;
      margin-bottom: .05rem;
    }

    &-title{
      width: 1rem;
      @include font(.12rem, #000000);
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
