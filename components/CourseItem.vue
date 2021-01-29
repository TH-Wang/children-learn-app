<template>
	<view class="course-item-comp" @click="goShow">
		<view class="course-thumb">
			<image class="course-cover" :src="record.thumb"></image>
		</view>
		<view class="course-info">
			<view class="course-title">
				{{record.title}}
			</view>
			<view class="course-stat">
				<view class="usercount">
					<van-icon name="friends-o" />
					<text class="value">{{record.user_count}}</text>
				</view>
				<view class="category">
					<van-icon name="send-gift-o" />
					<text class="value">{{record.category.name}}</text>
				</view>
			</view>
			<view class="course-charge">
        <text class="text free" v-if="record.charge === 0">免费</text>
        <text class="text" v-else>￥{{record.charge}}</text>
			</view>
		</view>
	</view>
</template>

<script>
  import Icon from '@/wxcomponents/vant/icon/index.vue'
	import courseType from '@/utils/courseType';
	export default {
    components: {
      'van-icon': Icon
    },
    // props: ['cid', 'title', 'category', 'thumb', 'charge', 'shortDescription', 'vipCanView', 'viewTimes', 'joinUserTimes'],
    props: {
      record: {
        type: Object,
        default: () => ({})
      }
    },
		data() {
			return {}
		},
		computed: {
			// isWechatMini() {
			// 	return utils.isIosWechatMini()
			// }
		},
		methods: {
			goShow() {
        const { id, title } = this.record
        // const url = courseType(id, title)
        const url = '/pages/Course/Course'
				uni.navigateTo({url: `${url}?id=${id}`})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.course-item-comp {
    margin: .20rem .15rem;
    padding: .10rem;
    box-sizing: border-box;
		height: auto;
		display: flex;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: .04rem;

		.course-thumb {
			width: 1rem;
			height: .8rem;
			margin-right: .15rem;
		}

    .course-cover{
      width: 1rem;
      height: .8rem;
      border-radius: .04rem;
    }

		.course-info {
			flex: 1;

			.course-title {
				width: 100%;
				height: auto;
				float: left;
				box-sizing: border-box;
				font-size: .15rem;
				font-weight: 600;
				color: rgba(51, 51, 51, 1);
				line-height: .17rem;
				padding-top: .05rem;
				margin-bottom: .10rem;
				word-break: break-all;
			}

			.course-stat {
				width: 100%;
				height: auto;
				float: left;
				font-size: .10rem;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				line-height: 1;
				margin-bottom: .10rem;

				.usercount,
				.category {
					display: inline-flex;
          align-items: center;
          font-size: .13rem;
				}

				.usercount {
					margin-right: .10rem;

          .value{
            flex: 1;
            @include ellipsis;
          }
				}

				.value {
					margin-left: .03rem;
				}
			}

			.course-charge {
				width: 100%;
				height: auto;
				float: left;
				text-align: right;

				.text {
					display: inline-block;
					width: auto;
					height: auto;
					background-color: rgba(0, 0, 0, 0.04);
					border-radius: .11rem;
					padding: .03rem .10rem;
					font-size: .12rem;
					font-weight: 400;
					color: rgba(255, 77, 79, 1);
					line-height: .12rem;
				}
			}
		}
	}
</style>
