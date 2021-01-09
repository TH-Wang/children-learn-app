<template>
  <view class="container" v-if="selections.length !== 0">
    <scroll-view
      class="selection-container"
      scroll-x
      :show-scrollbar="false"
      :scroll-into-view="scrollId">
      <view
        :id="`select${item.id}`"
        :class="{
          'selection': true, 
          'active': item.id === active}"
        v-for="item in selections"
        :key="item.id"
        @click="handleChange(item.id)">
        {{item.title}}
      </view>
    </scroll-view>
    <view class="select-all" @click="visible = true">查看全部</view>

    <van-popup :show="visible" position="bottom" round @close="visible = false">
      <view class="popup-title">全部章节</view>
      <view class="popup-selection-container">
        <view
          :class="{
            'popup-selection': true, 
            'active': item.id === active}"
          v-for="item in selections"
          :key="item.id"
          @click="handleSelectPopup(item.id)"
        >{{item.title}}</view>
      </view>
    </van-popup>
  </view>
</template>

<script>
import Popup from '@/wxcomponents/vant/popup/index.vue'

export default {
  components: {
    'van-popup': Popup
  },
  model: {
    prop: 'active',
    event: 'change'
  },
  props: {
    active: Number,
    selections: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    visible: false,
    scrollId: null
  }),
  methods: {
    handleChange (id) {
      if (this.active === id) return
      this.$emit('change', id)
    },
    handleSelectPopup (id) {
      this.handleChange(id)
      this.scrollId = 'select' + id
      setTimeout(() => {
        this.visible = false
      }, 200)
    }
  }
}
</script>

<style lang="scss" scoped>
$color: #FB5852;

.container{
  margin: .16rem 0;
  padding-right: .16rem;
  box-sizing: border-box;
  @include flex(space-between, center);

  .selection-container{
    width: calc(100% - 1rem);
    flex: 1;
    white-space: nowrap;

    .selection{
      margin-left: .06rem;
      display: inline-block;
      padding: .02rem .08rem;
      font-size: .14rem;
      color: #666666;
      border-radius: .2rem;

      &:first-child{
        margin-left: .16rem;
      }

      &.active{
        color: #FFFFFF;
        background-color: $color;
      }
    }
  }

  .select-all{
    margin-left: .15rem;
    flex-shrink: 0;
    @include font(.14rem, $color, $align: right);
  }

  .popup-title{
    height: .5rem;
    line-height: .5rem;
    width: 100%;
    @include font(.16rem, #333, $align: center);
  }

  .popup-selection-container{
    padding-bottom: .2rem;
    margin: .2rem .3rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: .15rem .3rem;

    .popup-selection{
      height: .3rem;
      line-height: .3rem;
      border-radius: .05rem;
      @include font(.14rem, #666, $align: center);

      &.active{
        background-color: $color;
        color: #fff;
      }
    }
  }
}
</style>
