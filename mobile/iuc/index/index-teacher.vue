<template>
	<view>
		<title-bar :placeholder="searchText" @input="doSearch">
			<view v-if="overRideId" class="act-btn" @click="navTo('./index-manager')">
				<text class="icon cuIcon-home"></text>
				<text>我的单位</text>
			</view>
			<view v-else class="act-btn">
				<text class="icon cuIcon-home"></text>
				<text>我的社团</text>
			</view>
			<!-- 此按钮效果同成员审核里的“所有申请” -->
			<view class="act-btn" @click="navTo('/iuc/roomApplication/v2/myAttend')">
				<text class="icon cuIcon-light"></text>
				<text>审核历史</text>
			</view>
			<!-- 此按钮效果同社团活动里的“所有活动” -->
			<view class="act-btn" @click="navTo('/iuc/index/index-all-activity')">
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
		<view class="cu-bar bg-white solid-bottom margin-top" v-if="myPenging.length">
			<view class="action" @click="changeActReviewShow()">
				<text class="cuIcon-titles text-blue"></text>
				<text class="block position-relative">
					活动审核
					<view class='cu-tag bg-red margin-left-sm round'>{{myPenging.length}}</view>
				</text>
			</view>
			<view class="action" @click="navTo('/iuc/roomApplication/v2/myAttend')">
				<view class="text-blue">[审核历史]</view>
			</view>
		</view>
		<view class="cu-list menu" v-show="showActReview">
			<view class="cu-item" v-for="item in myPenging" :key="item.InstanceId">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-activityfill text-blue margin-right-xs"></text>{{item.WorkflowName}}</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text> {{item.Owner}}提交的{{item.WorkflowType}}
					</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-repairfill margin-right-xs"></text> 当前步骤：{{item.StepName}} @{{item.ExecutorName}}/{{item.ArriveOn}}
					</view>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow" @click="navTo(`../activity/activity?instanceId=${item.InstanceId}&stepId=${item.StepId}`)">
						详情
					</button>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action" @click="changeActShow()">
				<text class="cuIcon-titles text-blue"></text>
				社团活动
				<view class='cu-tag bg-red margin-left-sm round'>{{onGoingAct.length}}</view>
			</view>
			<view class="action" @click="navTo('/iuc/index/index-all-activity')">
				<view class="text-blue">[所有活动]</view>
			</view>
		</view>
		<view class="flex justify-center text-center" v-if="onGoingAct.length === 0">
			<view>
				<image src="/static/none.png"></image>
				<view class="text-xl">暂无进行中的活动</view>
			</view>
		</view>
		<view class="cu-card no-card article" v-for="(item,index) in onGoingAct" :key="index">
			<view class="cu-item shadow" @click="toConsole(item.ID)">
				<view class="title">
					<view class="text-cut">
						<view v-if="item.StartState === 1" class="cu-tag margin-right-sm round bg-blue">进行中</view>
						<view v-else-if="item.StartState === 0" class="cu-tag margin-right-sm round bg-green">未开始</view>
						{{item.ActivityName ? item.ActivityName : "暂无社团活动名称"}}
					</view>
				</view>
				<view class="content">
					<view class="desc">
						<view class="text-content">
							时间：{{item.StartDate}} ~ {{item.EndDate}}<Br></Br>
							地点：{{item.Address}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import titleBar from './title-bar.vue'
	let app = require("@/config");
	export default {
		components: {
			titleBar
		},
		methods: {
			changeActReviewShow() {
				this.showActReview = !this.showActReview;
			},
			changeActShow() {
				this.showAct = !this.showAct;
			},
			getPending() {
				uni.post("/api/workflow/pending", {
					departId: this.overRideId || app.defaultDepartId
				}, msg => {
					if (msg.success) {
						this.myPenging = msg.data;
					}
				})
			},
			getActivities() {
				uni.post("/api/org/GetActByDepartId", {
					id: this.overRideId || app.defaultDepartId
				}, msg => {
					if (msg.success) {
						this.onGoingAct = [];
						for (let i = 0; i < msg.data.length; i++) {
							if (msg.data[i].ApplicateState === 3) {
								this.onGoingAct.push(msg.data[i]);
							}
						}
						this.data = this.onGoingAct;
					}
				});
			},
			toConsole(actId) {
				uni.navigateTo({
					url: "/iuc/activity/activity-console?ID=" + actId
				});
			},
			doSearch(text) {
				// text 即是输入的文本
				this.onGoingAct = this.data.filter(e => e.ActivityName.indexOf(text) !== -1);
			},
			toProfile() {
				uni.toProfile()
			},
			navTo(e) {
				uni.navigateTo({
					url: this.overRideId ? e + ('?departId=' + this.overRideId) : e
				})
			}
		},
		data() {
			return {
				showActReview: true,
				showAct: true,
				searchText: "搜索社团活动",
				myPenging: [],
				data: [],
				onGoingAct: [],
				overRideId: "" //社团管理员也会使用这个页面
			};
		},
		onLoad(query) {
			this.overRideId = query.departId;
		},
		onShow() {
			this.getPending();
			this.getActivities();
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
