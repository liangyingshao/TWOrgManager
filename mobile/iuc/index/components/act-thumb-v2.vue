<template>
	<view class="act-main" @click="toDetail()">
		<view class="title">
			<view class="text-cut">活动的正式名称，这里可以显示非常长的名字，不用处理截断</view>
		</view>
		<view class="content margin-bottom-sm">
			<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
			 mode="aspectFill"></image>
			<view class="desc">
				<view class="text-content"> 
					活动的简介！这里可能是一个非常非常长的简介，但是理论上这里的内容不应该超过2行。总高度是自动的。
				</view>
				<view>
					<view class="cu-tag sm round">2020年10月10日 20时20分</view>
				</view>
				<view>
					<view class="cu-tag sm round">厦门大学海韵园实验楼2-202</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			toDetail () {
				uni.navigateTo({
					url: "/iuc/activity/activity-detail"
				})
			}
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
