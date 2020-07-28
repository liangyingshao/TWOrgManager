<template>
	<view class="act-main" @click="toDetail(activity.ID)">
		<view class="title">
			<view class="text-cut">{{activity.ActivityName ? activity.ActivityName : "暂无标题"}}</view>
		</view>
		<view class="content margin-bottom-sm">
			<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
			 mode="aspectFill"></image>
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
		data () {
			return {};
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
