<template>
  <view>

    <!-- header -->
    <view class="main">
      <view class="main-card">
        <view class="tip">#问题讨论#</view>
        <view class="title">说说观潮是按什么顺序描写的</view>
        <view class="content">你喜欢巴学园吗，你心里的巴学园是什么样子的呢，快来告诉我们吧。你喜欢巴学园吗，你心里的巴学园是什么样子的呢，快来告诉我们吧（具体话题内容）</view>
      </view>
    </view>

    <!-- headline -->
    <page-title style="padding-bottom:0">讨论区</page-title>

    <!-- comments -->
    <view class="comment-container">
      <comment v-for="(item, index) in commentList" :key="index" :record="item" />
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/HomeHeader'
import Comment from '@/components/Comment'
import NavBarMixin from '@/mixins/nav-bar'

export default {
  components: {
    PageTitle,
    Comment,
  },
  data: () => ({
    commentList: [
      {
        username: '189****9987',
        type: 'text',
        content: '请问主语后面什么情况动词需要加ing？',
        createAt: '2020-12-31',
        replyCount: 75,
        likeCount: 542,
        replyList: [
          { 
            username: 'Joe', 
            type: 'text', 
            content: '一般情况下有两种 一种是现在进行时b+动词ing的形式 例如i am making cakes. 第二种是介词后动词需要ing形式 例如he is'
          },
          {
            username: '以冬',
            replyUsername: 'Joe',
            type: 'voice',
            voiceSrc: '18'
          },
          ...new Array(56).fill({})
        ]
      },
      {
        username: '189****9987',
        type: 'voice',
        voiceSrc: '9',
        createAt: '2020-12-31',
        replyCount: 75,
        likeCount: 542,
        replyList: []
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
.main{
  width: 3.67rem;
  padding: .32rem .10rem .05rem .14rem;
  box-sizing: border-box;
  background-image: url('~@/static/speak-bg.png');
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;

  &-card{
    width: 100%;
    padding: .2rem .18rem .2rem .13rem;
    box-sizing: border-box;
    background-color: #4F599A;
    border-radius: .10rem;
    color: #fff;

    .tip{
      font-size: .15rem;
    }
    .title{
      font-size: .18rem;
      margin: .32rem 0 .23rem;
      font-weight: bold;
    }
    .content{
      font-size: .13rem;
      font-weight: 100;
    }
  }
}
.comment-container{
  padding-bottom: .3rem;
}
</style>
