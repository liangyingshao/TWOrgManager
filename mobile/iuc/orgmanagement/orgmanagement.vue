<template>
	<view>
		<cu-custom isBack bgColor="bg-gradual-blue">
			<block slot="content">社团管理</block>
		</cu-custom>
		<scroll-view scroll-y>
			<view class="margin flex">
				<view class="cu-avatar lg" :style="`background-image: url(${app.userInfo.avatar});`"></view>
				<view class="margin-left">
					<text class="text-xl">{{orgInfo.Name}}</text>
					<br>
					<text>指导老师：</text>
					<text v-for="(teacher, index) in teachers" :key="index">{{teacher.RealName}}</text>
				</view>
			</view>
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<!--view class="cu-item" :class="index == TabCur?'text-green cur':''" v-for="(item, index) in tabTitle" :key="index"
				 @tap="tabSelect" :data-id="index">
					{{item}}
				</view-->
				<!--view class="cu-item" :class="index == TabCur?'text-green cur':''" v-for="(item, index) in tabTitle" :key="index"
				 @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
				<view v-show="TabCur == 0" class="cu-list menu">
					<view v-for="(item, index) in tableData.member" :key="index" class="cu-item" @click="getMemberDetail(item)">
						<view class="content">
							<text class="cuIcon-btn text-green"></text>
							<text class="text-grey">{{item.RealName}}</text>
							<view v-if="item.isAdmin" class='cu-tag radius'>管理员</view>
						</view>
						<view class="action">
							<button @click="delMember(item)" class="cu-btn round bg-red shadow margin-lr-xs">
								<text class="">删除</text>
							</button>
						</view>
					</view>
					<button disabled="" class="margin">增加成员</button>
				</view>
				<view v-show="TabCur == 1" class="cu-list menu">
					<view @click="toActivity(item)" v-for="(item, index) in tableData.activity" :key="index" class="cu-item">
						<view class="content">
							<text class="cuIcon-btn text-green"></text>
							<text class="text-grey">{{item.ActivityName || "暂无名称"}}</text>
						</view>
						<!--view class="action">
							<button class="cu-btn round bg-green shadow">
								<text class="">查看</text>
							</button>
						</view-->
					<!--/view>
					<button @click="addActivity" class="margin">创建活动</button>
				</view>
				<view v-show="TabCur == 2" class="cu-list menu">
					<view v-for="(item, index) in tableData.applicate" :key="index" class="cu-item">
						<view class="content">
							<text class="cuIcon-btn text-green"></text>
							<text class="text-grey">申请人：{{item.RealName}}</text>
						</view>
						<view class="action">
							<button @click="acceptApplication(item.ID)" class="cu-btn round bg-blue shadow">
								<text class="">通过</text>
							</button>
							<button @click="acceptApplication(item.ID)" class="cu-btn round bg-red shadow margin-lr-xs">
								<text class="">拒绝</text>
							</button>
						</view>
					</view>
				</view-->
				<view v-show="TabCur == 0">
					<form>
						<view class="cu-form-group">
							<view class="title">{{'社团类型'}}</view>
							<input disabled name="index">{{orgInfo.DepartType}}</input>
						</view>
						<view class="cu-form-group">
							<view class="title">{{'社团简介'}}</view>
							<input disabled name="index">{{orgInfo.Description}}</input>
						</view>
						<view class="cu-form-group">
							<view class="title">{{'社团创建时间'}}</view>
							<input disabled name="index">{{orgInfo.BirthTime}}</input>
						</view>
						<view class="cu-form-group">
							<view class="title">{{'章程设置时间'}}</view>
							<input disabled name="index">{{orgInfo.RuleCreatedOn.includes('1900年') ? '未建立' : orgInfo.LeagueBrachCreatedOn}}</input>
						</view>
						<view class="cu-form-group">
							<view class="title">{{'团支部创建时间'}}</view>
							<input disabled name="index">{{orgInfo.LeagueBrachCreatedOn.includes('1900年') ? '未建立' : orgInfo.LeagueBrachCreatedOn}}</input>
						</view>
						<view class="cu-form-group">
							<view class="title">{{'党支部类型'}}</view>
							<input disabled name="index">{{orgInfo.CPCBranchType}}</input>
						</view>
						<view class="cu-form-group">
							<view class="title">{{'党支部创建时间'}}</view>
							<input disabled name="index">{{orgInfo.CPCBranchCreatedOn.includes('1900年') ? '未建立' : orgInfo.LeagueBrachCreatedOn}}</input>
						</view>
						<view class="cu-form-group">
							<view class="title">{{'已经开通的社交媒体'}}</view>
							<input disabled name="index">{{orgInfo.SocialMedia}}</input>
						</view>
						<view class="cu-form-group">
							<view class="title">{{'社交媒体粉丝数'}}</view>
							<input disabled name="index">{{orgInfo.SocialMediaFans}}</input>
						</view>
						<view class="cu-form-group">
							<view class="title">{{'经费类型'}}</view>
							<input disabled name="index">{{orgInfo.FundsCategory}}</input>
						</view>
						<view class="cu-form-group">
							<view class="title">{{'经费来源'}}</view>
							<input disabled name="index">{{orgInfo.ChannelForFunds}}</input>
						</view>
						<view class="cu-form-group">
							<view class="title">{{'备注1'}}</view>
							<input disabled name="index">{{orgInfo.Memo}}</input>
						</view>
						<view class="cu-form-group">
							<view class="title">{{'备注2'}}</view>
							<input disabled name="index">{{orgInfo.Remark}}</input>
						</view>
					</form>
				</view>
			</scroll-view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
		<view class="cu-modal" :class="modalName === 'memberModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">成员详情</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{memberInfo.user}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = require("@/config");
	export default {
		onLoad(query) {
			uni.post("/api/security/GetOrgDetail", {
				id: query.departId || app.defaultDepartId
			}, msg => {
				if (msg.success) {
					this.orgInfo = msg.data;
					this.teachers = msg.teachers;
					this.users = msg.users;
					this.getMembers();
					this.getActivities();
					this.getApplicates();
				}
			});
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				tabTitle: [
					"社团管理"
				],
				orgInfo: {
					LeagueBrachCreatedOn: '1900年1月1日',
					CPCBranchCreatedOn: '1900年1月1日',
					RuleCreatedOn: '1900年1月1日',
				},
				teachers: {},
				users: {},
				pager: {
					member: {
						page: 1,
						pageSize: 20
					},
					applicate: {
						page: 1,
						pageSize: 20
					},
					activity: {
						page: 1,
						pageSize: 20
					}
				},
				tableData: {
					member: {},
					applicate: {},
					activity: {}
				},
				modalName: "",
				memberInfo: {},
				app
			};
		},
		methods: {
			hideModal() {
				this.modalName = "";
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			getMembers(page, pageSize) {
				this.pager.member.page = page || this.pager.member.page;
				this.pager.member.pageSize = pageSize || this.pager.member.pageSize;
				uni.post("/api/security/GetUsersByDepartId", {
					departId: this.orgInfo.ID,
					name,
					page: this.pager.member.page,
					pageSize: this.pager.member.pageSize
				}, msg => {
					this.tableData.member = msg.data;
				});
			},
			getApplicates(page, pageSize) {
				this.pager.member.page = page || this.pager.member.page;
				this.pager.member.pageSize = pageSize || this.pager.member.pageSize;
				uni.post("/api/security/GetApplicationsByDeparts", {
					departId: this.orgInfo.ID,
					name,
					page: this.pager.applicate.page,
					pageSize: this.pager.applicate.pageSize
				}, msg => {
					this.tableData.applicate = msg.data;
				});
			},
			getActivities(page, pageSize) {
				this.pager.activity.page = page || this.pager.activity.page;
				this.pager.activity.pageSize = pageSize || this.pager.activity.pageSize;
				uni.post("/api/org/GetActByDepartId", {
					Id: this.orgInfo.ID,
					page: this.pager.activity.page,
					pageSize: this.pager.activity.pageSize
				}, msg => {
					this.tableData.activity = msg.data;
				});
			},
			getMemberDetail(row) {
				uni.post("/api/security/GetUserById", {
					id: row.ID,
					departId: this.orgInfo.ID
				}, msg => {
					this.modalName = "memberModal";
					this.memberInfo = msg;
				});
			},
			acceptApplication(appId) {
				uni.post("/api/security/AcceptApplicate", {
					appId
				}, msg => {
					if (msg.success) {
						this.getApplicates();
					} else {

					}
				});
			},
			addActivity() {
				uni.post("/api/org/Applicate", {
					id: this.orgInfo.ID
				}, msg => {
					if (msg.success) {
						uni.navigateTo({
							url: "../activity/activity?instanceId=" + msg.instanceId + '&stepId=' + msg.stepId
						});
					} else {

					}
				})
			},
			rejectApplication(appId) {
				uni.xios.post("/api/security/DenyApplicate", {
					appId
				}, msg => {
					if (msg.success) {
						this.getApplicates();
					} else {

					}
				});
			},
			delMember(row) {
				uni.post("/api/security/RemoveUserV2", {
					userId: row.ID,
					departId: row.departId
				}, msg => {
					if (msg.success) {
						this.getMembers();
					} else {

					}
				});
			},
			toActivity(row) {
				uni.navigateTo({
					url: `../activity/activity?instanceId=${row.InstanceId}&stepId=${row.StepId}&detail=true`
				})
			}
		}
	}
</script>

<style>
	.content {
		margin: 0px;
	}
</style>
