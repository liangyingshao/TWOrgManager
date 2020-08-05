<template>
	<view>
		<title-bar :placeholder="searchText" @input="doSearch">
			<view v-if="isTeacher" class="act-btn" @click="navTo('/iuc/orgmanagement/orgmanagement')">
				<text class="icon cuIcon-home"></text>
				<text>我的社团</text>
			</view>
			<!-- 此按钮效果同成员审核里的“所有申请” -->
			<view class="act-btn" @click="navTo('/iuc/index/index-all-application')">
				<text class="icon cuIcon-light"></text>
				<text>成员审核</text>
			</view>
			<!-- 此按钮效果同社团活动里的“所有活动” -->
			<view class="act-btn" @click="navTo('/iuc/index/index-all-activity')">
				<text class="icon cuIcon-activity"></text>
				<text>社团活动</text>
			</view>
			<view class="act-btn" @click="navTo('/iuc/profile/profile?role=departmanager')">
				<text class="icon cuIcon-profile"></text>
				<text>个人中心</text>
			</view>
		</title-bar>
		<!--
			这里做一个点击收起，这里的【所有申请】页也简单，把下面这个列表变成一个完整的页面就可以了。
			注，这个页面只显示“待审核”的，我这写的以通过的是给详细页面用的。
		-->
		<view class="cu-bar bg-white solid-bottom margin-top" v-if="inApplyingApp.length !== 0">
			<view class="action" @click="changeMemShow()">
				<text class="cuIcon-titles text-blue"></text>
				<text class="block position-relative">
					成员审核
					<view class='cu-tag bg-red margin-left-sm round'>{{inApplyingApp.length}}</view>
				</text>
			</view>
			<view class="action" @click="navTo('/iuc/index/index-all-application')">
				<view class="text-blue">[所有申请]</view>
			</view>
		</view>
		<view class="cu-list menu" v-for="(item,index) in inApplyingApp" :key="index" v-show="showMemberReview">
			<view class="cu-item">
				<view class="content padding-tb-sm" @click="audit(item.ID, item.Code, item.State)">
					<view>
						<text class="cuIcon-profilefill text-blue margin-right-xs"></text> {{item.RealName}}（{{item.Code}}）</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text> {{item.BelongDepart}}，电话：{{item.Mobile}}</view>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow" @click="commitUser(item.ID)">
						通过
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
		<view class="cu-card no-card article" v-for="(item,index) in onGoingAct" :key="index + inApplyingApp.length" v-show="showAct">
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
			audit(ID, userCode, State) {
				uni.navigateTo({
					url: "/iuc/profile/user-audit?userCode=" + userCode + "&ID=" + ID + "&State=" + State
				})
			},
			changeActReviewShow() {
				this.showActReview = !this.showActReview;
			},
			changeActShow() {
				this.showAct = !this.showAct;
			},
			getPending() {
				uni.post("/api/workflow/pending", {}, msg => {
					if (msg.success) {
						this.myPenging = msg.data;
					}
				})
			},
			commitUser(ID) {
				uni.post("/api/security/AcceptApplicate", {
					appId: ID
				}, msg => {
					uni.showToast({
						title: msg.msg,
						icon: 'none'
					});
					this.getPageData();
				})
			},
			getPageData() {
				uni.post("/api/security/GetApplicationsByDeparts", {
					departId: app.defaultDepartId
				}, msg => {
					if (msg.success) {
						this.inApplyingApp = [];
						for (let i = 0; i < msg.data.length; i++) {
							if (msg.data[i].State === 3) {
								this.inApplyingApp.push(msg.data[i]);
							}
						}
					}
				});
				uni.post("/api/org/GetActByDepartId", {
					id: app.defaultDepartId
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
			getActivities() {
				uni.post("/api/org/GetActByDepartId", {
					id: app.defaultDepartId
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
			getDashBoard() {
				uni.post("/api/workflow/pending", {}, msg => {
					if (msg.success) {
						this.myPenging = msg.data;
					}
				})
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
			navTo(e) {
				uni.navigateTo({
					url: e
				})
			}
		},
		data() {
			return {
				showMemberReview: true,
				showActReview: true,
				showAct: true,
				searchText: "搜索社团活动",
				myPenging: [],
				data: [],
				onGoingAct: [],
				inApplyingApp: []
			};
		},
		onLoad(query) {
			this.isTeacher = query.isTeacher || true
		},
		onShow() {
			this.getPending();
			this.getActivities();
			this.getPageData();
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
