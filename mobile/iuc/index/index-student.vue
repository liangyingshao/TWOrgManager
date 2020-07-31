<template>
	<div>
		<view class="bg-blue">
			<view class="flex padding" @click="navTo('../profile/profile')">
				<view class="margin-right-lg">
					<image class="cu-avatar round xl center" :src="userInfo.avatar"/>
				</view>
				<view>
					<view class="">
						<text class="text-xxl block margin-bottom-xs">{{userInfo.realName}}</text>
						<text>学号：{{userInfo.userCode}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 我的社团
			</view>
			<view class="action" @click="navTo('../orgmanagement/orgList')">
				<view class="text-blue">[报名参加]</view>
			</view>
		</view>
		<view class="cu-card no-card">
			<!-- 下面这个VIEW是有社团的情况，如果只有一个就只显示一个 -->
			<view class="cu-item shadow flex" v-if="myOrgs.length">
				<view class="flex-sub padding-sm" v-for="org in myOrgs" :key="org.ID">
					<view class="cu-avatar round xl" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)"></view>
					<view class="margin-top-sm">{{org.Name}}</view>
				</view>
			</view>
			<!-- 这个VIEW是暂无社团的时候用的 -->
			<view class="cu-item shadow" v-else>
				<image class="none" src="/static/none.png"></image>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 活动列表
			</view>
			<view class="action" @click="navTo('../activity/activityList')">
				<view class="text-blue">[报名参加]</view>
			</view>
		</view>
		<view class="cu-card article no-card" v-if="activities.length" >
			<view class="cu-item solid-bottom" v-for="activity in activities" :key="activity.ID">
				<act-thumb :activity="activity"></act-thumb>
			</view>
		</view>
		<view class="bg-white" v-else>
			<image class="none" src="/static/none.png"></image>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 我参加的活动
			</view>
			<view class="action">
			</view>
		</view>
		<view class="cu-card article no-card" v-if="myActivities.length" :key="activity.ID">
			<view class="cu-item shadow"  v-for="activity in myActivities">
				<act-thumb :activity="activity"></act-thumb>
			</view>
		</view>
		<view class="bg-white" v-else>
			<image class="none" src="/static/none.png"></image>
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
			},
			getDashBoard () {
				uni.post("/api/org/StudentDashboard", {}, msg => {
					if(msg.success){
						this.myOrgs = msg.departs;
					}
				})
			},
			getActivities() {
				uni.post("/api/org/GetStartedApplications", {}, msg => {
					if(msg.success){
						this.activities = msg.data.slice(0, 3);
					}
				})
			},
			getMyActivities() {
				uni.post("/api/org/GetMyApplications", {}, msg => {
					if(msg.success){
						this.myActivities = msg.data;
					}
				})
			},
			navTo(url){
				uni.navigateTo({
					url
				})
			}
		},
		onLoad() {
			this.getDashBoard();
			this.getActivities();
			this.getMyActivities();
		},
		data () {
			// 1. 在可以申请加入社团的时候，第一个按钮显示：“查找社团”
			// 2. 如果用户已经加入了两个社团，显示：“我的社团”
			return {
				firtstButtonText: "我的社团",
				searchText: "搜索活动",
				showTab: "applicate", // "my-orgs"
				userInfo: app.userInfo,
				myOrgs: [],
				activities: [],
				myActivities: []
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
