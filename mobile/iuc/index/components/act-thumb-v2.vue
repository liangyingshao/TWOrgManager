<template>
	<view class="act-main" @click="toDetail(activity.ID)">
		<view class="title">
			<template v-if="activity.isSigIn">
				<text class="cu-tag margin-right-sm round bg-olive">我已签到</text>
			</template>
			<template v-else-if="activity.isSignUp">
				<text class="cu-tag margin-right-sm round bg-olive">我已报名</text>
			</template>
			<template v-else>
				<text v-if="state === 2" class="cu-tag margin-right-sm round bg-blue">已结束</text>
				<text v-if="state === 1" class="cu-tag margin-right-sm round bg-blue">活动签到中</text>
				<text v-if="state === 0" class="cu-tag margin-right-sm round bg-blue">活动报名中</text>
			</template>
			<text class="text-cut">{{activity.ActivityName ? activity.ActivityName : "暂无标题"}}</text>
		</view>
		<view class="content margin-bottom-sm">
			<image src="/static/xmuScene1.jpg" mode="aspectFill"></image>
			<view class="desc">
				<view class="text-content"> 
					{{activity.Description ? activity.Description : "暂无简介"}}
				</view>
				<view>
					<view class="cu-tag sm round">{{activity.StartDate}}</view>
				</view>
				<view>
					<view class="cu-tag sm round">{{activity.Address ? activity.Address : "暂无地址"}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			toDetail (ID) {
				uni.navigateTo({
					url: `/iuc/activity/activity-detail?ID=${ID}`
				})
			}
		},
		props:{
			activity: Object
		},
		mounted() {
			let startDate = new Date(this.activity.Start);
			let endDate = new Date(this.activity.End);
			if(new Date() > endDate){
				this.state = 2;
			} else if(new Date() > startDate){
				this.state = 1;
			} else {
				this.state = 0;
			}
		},
		data () {
			return {
				state: -1
			};
		}
	}
</script>

<style lang="less" scoped>
	.act-main {
		width: 100%;
		display: block;
		.title {
			width: 100%;
		}
		
		.content {
		    display: flex;
		    padding: 0 15px;
		}
		
		image {
			width: 120px;
			height: 6.4em;
			margin-right: 10px;
			border-radius: 3px;
		}
		.desc {
			flex: 1;
		}
		.text-content {
			height: auto !important;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
	}
</style>
