<template>
	<view>
		<title-bar :placeholder="searchText" @input="doSearch">
			<view class="act-btn" @click="navTo('../orgmanagement/orgmanagement')">
				<text class="icon cuIcon-home"></text>
				<text >我的社团</text>
			</view>
			<!-- 此按钮效果同成员审核里的“所有申请” -->
			<view class="act-btn">
				<text class="icon cuIcon-light"></text>
				<text>成员审核</text>
			</view>
			<!-- 此按钮效果同社团活动里的“所有活动” -->
			<view class="act-btn">
				<text class="icon cuIcon-activity"></text>
				<text>社团活动</text>
			</view>
			<view class="act-btn" @click="toProfile">
				<text class="icon cuIcon-profile"></text>
				<text>个人中心</text>
			</view>
		</title-bar>
		<!-- 
			这里做一个点击收起，这里的【所有申请】页也简单，把下面这个列表变成一个完整的页面就可以了。
			注，这个页面只显示“待审核”的，我这写的以通过的是给详细页面用的。
		-->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text>
				<text class="block position-relative">
					成员审核
					<view class='cu-tag bg-red margin-left-sm round'>9</view>
				</text>
			</view>
			<view class="action">
				<view class="text-blue">[所有申请]</view>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content padding-tb-sm" @click="audit('userId')">
					<view>
						<text class="cuIcon-profilefill text-blue margin-right-xs"></text> 黄玺（2012231142）</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text> 信息学院，电话：13606924649</view>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow" @click="commitUser()">
						通过
					</button>
				</view>
			</view>
			<view class="cu-item">
				<view class="content padding-tb-sm" @click="audit('userId')">
					<view>
						<text class="cuIcon-profilefill text-blue margin-right-xs"></text> 黄玺（2012231142）</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text> 信息学院，电话：13606924649</view>
				</view>
				<view class="action">
					<text class="text-green">已通过</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content padding-tb-sm" @click="audit('userId')">
					<view>
						<text class="cuIcon-profilefill text-blue margin-right-xs"></text> 黄玺（2012231142）</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text> 信息学院，电话：13606924649</view>
				</view>
				<view class="action">
					<text class="text-red">已驳回</text>
				</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text>
				社团活动
			</view>
			<view class="action">
				<view class="text-blue">[所有活动]</view>
			</view>
		</view>
		<!-- 本列表只列出 进行中 的活动。 -->
		<view class="cu-card no-card article">
			<!--
			 这个整个做一个组件，社团活动详细页面里不还可以再用一次，颜色：
			 进行中 用绿色，
			 未开始 用蓝色，
			 已结束 用红色。
			 同时，这个状态也可以做一个小组件，在activity-console里也要用到一次
			-->
			<view class="cu-item shadow" @click="toConsole()">
				<view class="title">
					<view class="text-cut">
						<view class='cu-tag bg-red margin-right-sm round'>进行中</view>
						活动名称
					</view>
				</view>
				<view class="content">
					<view class="desc">
						<view class="text-content">
							时间：2020-7-20 8时 ~ 2020-7-10 10时<Br></Br>
							地点：信息学院实验楼202
						</view>
					</view>
				</view>
				<view class="actions">
					<view class="act-btn">
						<text class="icon">20</text>
						<text>待审核</text>
					</view>
					<view class="act-btn">
						<text class="icon">20</text>
						<text>已报名</text>
					</view>
					<view class="act-btn">
						<text class="icon">20</text>
						<text>已签到</text>
					</view>
				</view>
			</view>
			<!-- cu-item -->
		</view>
	</view>
</template>

<script>
	import titleBar from './title-bar.vue'
	let app = require("@/config")
	export default {
		components: { titleBar },
		methods: {
			doSearch (text) {
				// text 即是输入的文本
				console.log(text);
			},
			toProfile () {
				 uni.toProfile()
			},
			commitUser () {
				
			},
			audit (userId) {
				uni.navigateTo({
					url: "/iuc/profile/user-audit"
				});
			},
			toConsole (actId) {
				uni.navigateTo({
					url: "/iuc/activity/activity-console"
				});
			}
		},
		data () {
			return {
				searchText: ""
			};
		}
	}
</script>

<style lang="less">
	.cu-card.article>.cu-item .title {
		font-size: 30rpx;
		font-weight: 900;
		color: #333333;
		line-height: 100rpx;
		padding: 0 30upx;
	}
</style>
