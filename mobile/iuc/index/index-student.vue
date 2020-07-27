<template>
	<div>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 我的社团
			</view>
			<view class="action">
				<view class="text-blue">[报名参加]</view>
			</view>
		</view>
		<view class="cu-card no-card">
			<!-- 这个VIEW是暂无社团的时候用的 -->
			<!-- <view class="cu-item shadow">
				<image class="none" src="/static/none.png"></image>
			</view> -->
			<!-- 下面这个VIEW是有社团的情况，如果只有一个就只显示一个 -->
			<view class="cu-item shadow flex">
				<view class="flex-sub padding-sm">
					<view class="cu-avatar round xl" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)"></view>
					<view class="margin-top-sm">我的社团1</view>
				</view>
				<view class="flex-sub padding-sm">
					<view class="cu-avatar round xl" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)"></view>
					<view class="margin-top-sm">我的社团2</view>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 活动列表
			</view>
			<view class="action">
				<view class="text-blue">[报名参加]</view>
			</view>
		</view>
		<view class="cu-card article no-card">
			<view class="cu-item shadow">
				<act-thumb></act-thumb>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 我参加的活动
			</view>
			<view class="action">
			</view>
		</view>
		<view class="cu-card article no-card">
			<view class="cu-item shadow">
				<act-thumb></act-thumb>
				<act-thumb></act-thumb>
			</view>
		</view>
	</div>
</template>

<script>
	import titleBar from './title-bar.vue'
	import actThumb from './components/act-thumb-v2.vue'
	let app = require("@/config")
	export default {
		components: { titleBar, actThumb },
		methods: {
			doSearch (text) {
				// text 即是输入的文本
				console.log(text);
			}
		},
		data () {
			// 1. 在可以申请加入社团的时候，第一个按钮显示：“查找社团”
			// 2. 如果用户已经加入了两个社团，显示：“我的社团”
			return {
				firtstButtonText: "我的社团",
				searchText: "搜索活动",
				showTab: "applicate" // "my-orgs"
			}
		}
	}
</script>

<style lang="less">
	.none {
		width: 100%;
	}
	.flex {
		display: flex !important;
	}
	.flex-sub {
		text-align: center;
		margin: 0 auto;
	}
</style>
