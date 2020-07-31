<template>
	<view>
		<title-bar :placeholder="searchText" @input="doSearch">
			<view class="act-btn">
				<text class="icon cuIcon-home"></text>
				<text>我的单位</text>
			</view>
			<!-- 此按钮效果同成员审核里的“所有申请” -->
			<view class="act-btn" @click="navTo('/iuc/roomApplication/v2/myAttend')">
				<text class="icon cuIcon-light"></text>
				<text>审核历史</text>
			</view>
			<!-- 此按钮效果同社团活动里的“所有活动” -->
			<view class="act-btn" @click="navTo('manager-depart-choose')">
				<text class="icon cuIcon-activity"></text>
				<text>社团管理</text>
			</view>
			<view class="act-btn" @click="toProfile">
				<text class="icon cuIcon-profile"></text>
				<text>个人中心</text>
			</view>
		</title-bar>
		<view class="cu-bar bg-white solid-bottom margin-top" v-if="myPenging.length !== 0">
			<view class="action" @click="changeActReviewShow()">
				<text class="cuIcon-titles text-blue"></text>
				<text class="block position-relative">
					我的待办
					<view class='cu-tag bg-red margin-left-sm round'>{{myPenging.length}}</view>
				</text>
			</view>
			<view class="action" @click="navTo('/iuc/roomApplication/v2/myAttend')">
				<view class="text-blue">[审核历史]</view>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item" v-for="item in myPenging" :key="item.InstanceId">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-activityfill text-blue margin-right-xs"></text>{{item.WorkflowName}}</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text> {{item.Owner}}提交的{{item.WorkflowType}}</view>
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
		<!--view class="cu-bar bg-white solid-bottom margin-top" @click="changeActShow()">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text>
				社团活动
			</view>
		</view>
		<view class="cu-card no-card article" v-for="(item,index) in allActivity" :key="index" v-show="showAct">
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
		</view-->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action" @click="changeMemShow()">
				<text class="cuIcon-titles text-blue"></text>
				<text class="block position-relative">
					社团列表
				</text>
			</view>
			<view class="action" @click="navTo('/iuc/index/manager-depart-choose')">
				<view class="text-blue">[所有社团]</view>
			</view>
		</view>
		<view class="padding-lr bg-white solids-bottom" v-for="(item,index) in departs" :key="index" @click="toOrg(item.id)">
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-newsfill text-blue margin-right-xs"></text>{{item.name}}
					</view>
					<view class="text-gray text-sm text-cut margin-top-sm">
						<text class="cuIcon-wenzi margin-right-xs"></text>管理员：{{item.admin}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import titleBar from './title-bar.vue'
	let app = require("@/config");
	let departId = uni.getStorageSync("defaultDepartId");
	export default {
		components: {
			titleBar
		},
		methods: {
			changeMemShow() {
				this.showMemberReview = !this.showMemberReview;
				console.log(1);
			},
			changeActShow() {
				this.showAct = !this.showAct;
				console.log(2);
			},
			doSearch(text) {
				// text 即是输入的文本
				console.log(text);
			},
			toProfile() {
				uni.toProfile()
			},
			audit(ID, userCode) {
				uni.navigateTo({
					url: "/iuc/profile/user-audit?userCode=" + userCode + "&ID=" + ID
				});
			},
			toConsole(actId) {
				uni.navigateTo({
					url: "/iuc/activity/activity-console?ID=" + actId
				});
			},
			refuseUser(ID) {
				uni.post("/api/security/DenyApplicate", {
					appId: ID
				}, msg => {
					uni.showToast({
						title: msg.msg,
						icon: 'none'
					});
					window.refresh();
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
					window.refresh();
				})
			},
			navTo(e) {
				uni.navigateTo({
					url: e
				})
			},
			getPending() {
				uni.post("/api/workflow/pending", {}, msg => {
					if (msg.success) {
						this.myPenging = msg.data;
					}
				})
			},
			toOrg(id) {
				uni.navigateTo({
					url: './index-teacher?departId='+id
				})
			}
		},
		data() {
			return {
				showMemberReview: true,
				showAct: true,
				searchText: "",
				allAppNum: 0,
				inApplyingApp: [],
				allActivity: [],
				startState: {
					0: "未开始",
					1: "进行中",
					2: "已结束"
				},
				stateColor: {
					0: "green",
					1: "blue",
					2: "red"
				},
				departs: [],
				myPenging: []
			};
		},
		onLoad() {
			
		},
		onShow() {
			this.getPending();
			uni.post("/api/security/GetApplicationsByDeparts", {
				departId
			}, msg => {
				if (msg.success) {
					this.allAppNum = msg.data.length;
					for (let i = 0; i < msg.data.length; i++) {
						if (msg.data[i].State === 3) {
							this.inApplyingApp.push(msg.data[i]);
						}
					}
				}
			});
			uni.post("/api/security/GetDepartsByDepartId", {
				id: app.defaultDepartId
			}, msg => {
				if (msg.data.children)
				{
					this.departs = msg.data.children
				}
			});
			uni.post("/api/org/GetActByDepartId", {
				id: departId
			}, msg => {
				if (msg.success) {
					this.allActivity = msg.data;
				}
			});
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
