<template>
  <view class="container">
    <view class="mask"
      :style="{transform: transformStyle}"
    />
    <view class="tabs">
      <view
        class="tabs-item"
        v-for="(value, key) in tabs"
        :key="key"
        :style="{color: tabColor(key)}"
        @click="$emit('change', parseInt(key))"
      >{{value}}</view>
    </view>
  </view>
</template>

<script>
export default {
  model: {
    prop: 'tabId',
    event: 'change'
  },
  props: {
    tabs: {
      type: Object,
      default: () => ({
        1: '类别1',
        2: '类别2',
        dog: '类别dog',
        cat: '类别cat'
      })
    },
    tabId: {
      type: Number,
      default: 1
    }
  },
  computed: {
    transformStyle () {
      return `translateX(${100 * (this.tabId - 1)}%)`
    }
  },
  methods: {
    tabColor (id) {
      const color = '#E96359'
      const activeColor = '#FFFFFF'
      return this.tabId == id ? activeColor : color
    },
  }
}
</script>

<style lang="scss" scoped>
$height: .35rem;

.container{
  margin: 0 .16rem;
  height: $height;
  border-radius: $height;
  background-color: #F9D8D6;
  position: relative;

  .mask{
    @include position;
    width: 50%;
    height: 100%;
    background-color: #FB5852;
    border-radius: $height;
    transition: all 0.3s;
  }

  .tabs{
    width: 100%;
    @include position;
    z-index: 2;
    color: #FFFFFF;
    @include flex;
    
    &-item{
      flex: 1;
      height: $height;
      line-height: $height;
      @include font(.16rem, #FFFFFF, $align:center);
      transition: all 0.2s;
    }
  }
}
</style>