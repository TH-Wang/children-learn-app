<template>
  <view class="container">
    <view class="header">
			<detail-top theme="dark" :detail='detail'></detail-top>
		</view>
    <page-title description="明星教师领读，重点情节梳理，轻松掌握名著脉络">
      图书领读
      <template #suffix>
        <view class="gradual-button-blue">正在阅读78%</view>
      </template>
    </page-title>
		<!-- 列表内容 -->
		<read-content
      v-for="(item,index) in listItem"
      :key = 'index'
      :listItem='item'
      @click="handleLink"
    />
    <page-title description="课后问答互动，增强有效输入，培养独立思考能力">
      名言警句摘抄
      <template #suffix>
        <view class="gradual-button-red">去互动</view>
      </template>
    </page-title>
  </view>
</template>

<script>
import PageTitle from '@/components/HomeHeader'
import readContent from '@/components/playAudio.vue'
import detailTop from '@/components/detailTop.vue'
export default {
  components: {
    'page-title': PageTitle,
		'read-content':readContent,
		'detail-top':detailTop
  },
	data(){
		return{
			listItem:[{
				bookName:'窗外的小豆豆(1)',
				vedioTime:'765',//秒数
				studyTime:'669',
			}],
			detail:{
				type:2 , //1表示listen页面，2表示read页面
				name:'窗外的小豆豆',
				author:'(日) 黑色玫瑰',
				fanyi:'赵玉娇',
				content:'因为淘气被原来学校劝学，来到巴雪国，在小林校长的陪伴下长大',
				lingDu:'张琪',
				classImg:'',
				peopleImg:'',
			}
		}
  },
  methods: {
    handleLink () {
      uni.navigateTo({
        url: '/pages/ReadContent/ReadContent'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 顶部
.header{
  height: 1.6rem;
	// background-color: #1F2236;
}

// 渐变按钮
.gradual-button{
  padding: .04rem .12rem;
  border-radius: .30rem;
  letter-spacing: .8px;
  @include font(.14rem, #FFFFFF);

  &-blue{
    @extend .gradual-button;
    background: linear-gradient(98deg, #838FD8 0%, #4F599A 100%);
  }

  &-red{
    @extend .gradual-button;
    background: linear-gradient(98deg, #EB9885 0%, #E9645A 99%);
  }
}
</style>