<template>
	<view>
		<title-bar :placeholder="searchText" @input="doSearch">
			<view class="act-btn">
				<text class="icon cuIcon-home"></text>
				<text>我的社团</text>
			</view>
			<!-- 此按钮效果同成员审核里的“所有申请” -->
			<view class="act-btn">
				<text class="icon cuIcon-light"></text>
				<text>我的待办</text>
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
			<view class="action" @click="changeMemShow()">
				<text class="cuIcon-titles text-blue"></text>
				<text class="block position-relative">
					活动审核
					<view class='cu-tag bg-red margin-left-sm round'>{{myPenging.length}}</view>
				</text>
			</view>
			<view class="action" @click="navTo('/iuc/index/index-all-application')">
				<view class="text-blue">[所有申请]</view>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item" v-for="item in myPenging" :key="item.InstanceId">
				<view class="content padding-tb-sm" @click="audit(item.ID, item.Code)">
					<view>
						<text class="cuIcon-activityfill text-blue margin-right-xs"></text>{{item.WorkflowName}}</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text> {{item.Owner}}提交的{{item.WorkflowType}}</view>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow"
					@click="navTo(`../activity/activity?instanceId=${item.InstanceId}&stepId=${item.StepId}`)">
						详情
					</button>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top" @click="changeActShow()">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text>
				社团活动
			</view>
			<!--view class="action">
		      <view class="text-blue">[所有活动]</view>
		    </view-->
		</view>
		<view class="cu-card no-card article" v-for="item in allActivity" :key="item.ID">
			<view class="cu-item shadow" @click="toConsole(item.ID)">
				<view class="title">
					<view class="text-cut">
						<template v-if="item.ApplicateState !== 3">
							<view class='cu-tag bg-yellow margin-right-sm round'>审批中</view>
						</template>
						<template v-else>
							<view :class="'cu-tag margin-right-sm round bg-' + stateColor[item.StartState]">{{startState[item.StartState]}}</view>
						</template>
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
	</view>
</template>

<script>
	import titleBar from './title-bar.vue'
	let app = require("@/config");
	let departId = uni.getStorageSync("defaultDepartId");;
	export default {
		components: {
			titleBar
		},
		methods: {
			getPending() {
				uni.post("/api/workflow/pending", {}, msg => {
					if (msg.success) {
						this.myPenging = msg.data;
					}
				})
			},
			getActivities() {
				uni.post("/api/org/GetActByDepartId", {
					id: departId
				}, msg => {
					if (msg.success) {
						this.allActivity = msg.data;
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
			doSearch(text) {
				// text 即是输入的文本
				console.log(text);
			},
			toProfile() {
				uni.toProfile()
			},
			navTo(e) {
				uni.navigateTo({
					url: e
				})
			}
		},
		data() {
			return {
				searchText: "",
				myPenging: [],
				allActivity: []
			};
		},
		onLoad() {
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
