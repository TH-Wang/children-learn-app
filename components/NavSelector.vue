<template>
  <view class="container">
    <view class="title" @click="visible = !visible">
      {{text}}
      <van-icon
        name="arrow-down"
        size=".14rem"
        style="margin-left:.02rem"
      />
    </view>

    <!-- 下拉菜单 -->
    <van-transition name="fade" :show="visible">
      <view class="dropmenu">
        <view
          :class="{'dropmenu-item': true, 'active': item.id === active}"
          v-for="item in menus"
          :key="item.id"
          @click="handleChange(item.id)">
          {{item.name}}
        </view>
      </view>
    </van-transition>
  </view>
</template>

<script>
import Icon from '@/wxcomponents/vant/icon/index.vue'
import Transition from '@/wxcomponents/vant/transition/index.vue'
import { mapState } from 'vuex'

export default {
  components: {
    'van-icon': Icon,
    'van-transition': Transition
  },
  data: () => ({
    visible: false
  }),
  computed: {
    ...mapState(['global']),
    active () {
      return parseInt(this.global.category)
    },
    menus () {
      return this.global.categories
    },
    text () {
      const activeMenu = this.menus.find(i => i.id === this.active)
      if (!activeMenu) return
      return activeMenu.name
    }
  },
  methods: {
    handleChange (id) {
      if (this.active === id) return
      this.$store.commit('setLocalStorage', { category: id })
      setTimeout(() => {
        this.visible = false
      }, 200)
    }
  }
}
</script>

<style lang="scss" scoped>
$radius: .04rem;

.container{
  position: relative;
}

.dropmenu{
  position: absolute;
  top: calc(100% + .1rem);
  // left: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: $radius;
  background-color: #FFFFFF;
  // overflow: hidden;

  &::before{
    content: ' ';
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    top: -.09rem;
    left: 50%;
    transform: translateX(-50%);
    border-width: .05rem;
    border-style: solid;
    border-color: transparent transparent #FFFFFF transparent;
  }

  .dropmenu-item:first-child{
    border-top-left-radius: $radius;
    border-top-right-radius: $radius;
  }

  .dropmenu-item:last-child{
    border-bottom-left-radius: $radius;
    border-bottom-right-radius: $radius;
  }

  &-item{
    width: .7rem;
    height: .35rem;
    line-height: .35rem;
    @include font(.14rem, #333, $align: center);

    &.active{
      background-color: rgba(251, 88, 82, .1);
      color: #FB5852;
      font-weight: bold;
    }
  }
}
</style>
