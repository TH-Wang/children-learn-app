<template>
  <div class="container">
    <van-icon
      v-if="active"
      name="star"
      color="yellow"
      size=".18rem"
      @click="$emit('change', false)"
    />
    <van-icon
      v-else
      name="star-o"
      color="white"
      size=".18rem"
      @click="$emit('change', true)"
    />
  </div>
</template>

<script>
import Icon from '@/wxcomponents/vant/icon/index.vue'

export default {
  components: {
    'van-icon': Icon
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  display: inline-block;
  vertical-align: bottom;
  margin-right: .05rem;
  transform: translateY(.01rem);
}
</style>