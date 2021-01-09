<template>
  <view class="comment">
    <view class="comment-main">
      <view class="avatar"></view>
      <view class="header">
        <view class="header-name">{{record.username}}</view>
        <view class="header-content">
          <text v-if="record.type === 'text'">{{record.content}}</text>
          <voice v-else :src="record.voiceSrc" />
        </view>
        <view class="header-info">
          <text class="date">{{record.createAt}}</text>
          <view class="reply">
            <van-icon class="icon" name="comment-o" />{{record.replyCount}}
          </view>
          <view class="like">
            <van-icon class="icon" name="good-job-o"/>{{record.likeCount}}
          </view>
        </view>
      </view>
    </view>
    <view class="reply-container"  v-if="record.replyList.length">
      <view
        class="reply-item"
        v-for="(item, index) in record.replyList.slice(0, 2)"
        :key="index">
        <text class="reply-name">
          {{item.username}}<text v-if="item.replyUsername">回复{{item.replyUsername}}</text>：
        </text>
        <text v-if="item.type === 'text'">
          {{item.content}}
        </text>
        <voice v-else type="light" :src="item.voiceSrc" />
      </view>
      <view v-if="record.replyList.length > 2" class="link-more">
        查看全部{{record.replyList.length}}条回复
        <van-icon name="arrow" />
      </view>
    </view>
  </view>
</template>

<script>
import Icon from '@/wxcomponents/vant/icon/index.vue'
import Voice from './Voice'

export default {
  components: {
    'van-icon': Icon,
    Voice
  },
  props: {
    record: Object
  }
}
</script>

<style lang="scss" scoped>
.comment{
  margin: .24rem .16rem 0;

  &-main{
    @include flex(flex-start, flex-start);

    .avatar{
      width: .35rem;
      height: .35rem;
      border-radius: 50%;
      background-color: #FB5852;
      margin-right: .14rem;
    }
    .header{
      flex: 1;

      &-name{
        @include font(.15rem, #000, bold);
      }
      &-content{
        margin: .12rem 0;

        text{ @include font(.15rem, #666) }
      }
      &-info{
        @include font(.11rem, #000);
        @include flex(space-between, center);

        .date{ flex: 1 }
        .reply{ margin-right: .32rem }
        .icon{ 
          margin-right: .02rem;
          vertical-align: middle;
          font-size: .13rem;
        }
      }
    }
  }
}

.reply-container{
  background-color: #F5F6F7;
  border-radius: .10rem;
  padding: .10rem;
  margin-left: .49rem;
  margin-top: .23rem;

  .reply-item + .reply-item{
    margin-top: .1rem;
  }

  .reply-item{
    @include font(.14rem, #000, bold);

    .reply-name{
      text{
        color: #999;
        margin-left: 1px;
      }
    }
  }

  .link-more{
    @include font(.14rem, #3684AF);
    @include flex(flex-start, center);
    margin-top: .1rem;
  }
}
</style>
