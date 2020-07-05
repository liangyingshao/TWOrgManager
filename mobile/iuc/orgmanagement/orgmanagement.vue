<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">社团管理</block>
		</cu-custom>
		<scroll-view scroll-y>
			<view class="margin">
				<text class="text-xl">{{orgInfo.Name}}</text>
				<br>
				<text>指导老师：</text>
				<text v-for="(teacher, index) in teachers">{{teacher.RealName}}</text>
			</view>
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="index == TabCur?'text-green cur':''" v-for="(item, index) in tabTitle" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
				<view v-show="TabCur == 0" class="cu-list menu">
					<view v-for="(item, index) in tableData.member" :key="index" class="cu-item">
						<view class="content">
							<text class="cuIcon-btn text-green"></text>
							<text class="text-grey">{{item.RealName}}</text>
							<view v-if="item.isAdmin" class='cu-tag radius'>管理员</view>
						</view>
						<view class="action">
							<button class="cu-btn round bg-green shadow">
								<text class="">管理</text>
							</button>
							<button class="cu-btn round bg-red shadow margin-lr-xs">
								<text class="">删除</text>
							</button>
						</view>
					</view>
					<button class="margin">增加成员</button>
				</view>
				<view v-show="TabCur == 1" class="cu-list menu">
					<view v-for="(item, index) in tableData.activity" :key="index" class="cu-item">
						<view class="content">
							<text class="cuIcon-btn text-green"></text>
							<text class="text-grey">{{item.ActivityName}}</text>
						</view>
						<view class="action">
							<button class="cu-btn round bg-green shadow">
								<text class="">查看</text>
							</button>
						</view>
					</view>
					<button class="margin">创建活动</button>
				</view>
				<view v-show="TabCur == 2" class="cu-list menu">
					<view v-for="(item, index) in tableData.applicate" :key="index" class="cu-item">
						<view class="content">
							<text class="cuIcon-btn text-green"></text>
							<text class="text-grey">申请人：{{item.RealName}}</text>
						</view>
						<view class="action">
							<button class="cu-btn round bg-blue shadow">
								<text class="">通过</text>
							</button>
							<button class="cu-btn round bg-green shadow margin-lr-xs">
								<text class="">详情</text>
							</button>
						</view>
					</view>
				</view>
				<view v-show="TabCur == 3">
					<form>
						<view class="cu-form-group" v-for="(item, index) in orgInfo">
							<view class="title">{{index}}</view>
							<input name="index">{{item}}</input>
						</view>
					</form>
				</view>
			</scroll-view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
		<navTab :selection='0' />
	</view>
</template>

<script>
export default{
	onLoad(query) {
		uni.post("/api/security/GetOrgDetail", {id: query.departId ? query.departId : null}, msg => {
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
				"成员管理",
				"社团活动",
				"成员审核",
				"社团管理"
			],
			orgInfo: {},
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
			}
		};
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
		},
		getMembers(page, pageSize) {
			this.pager.member.page = page || this.pager.member.page;
			this.pager.member.pageSize = pageSize || this.pager.member.pageSize;
			uni.post("/api/security/GetUsersByDepartId", {departId: this.orgInfo.ID, name,
			page: this.pager.member.page, pageSize: this.pager.member.pageSize}, msg => {
				this.tableData.member = msg.data;
			});
		},
		getApplicates(page, pageSize) {
			this.pager.member.page = page || this.pager.member.page;
			this.pager.member.pageSize = pageSize || this.pager.member.pageSize;
			uni.post("/api/security/GetApplicationsByDeparts", {departId: this.orgInfo.ID, name,
			page: this.pager.applicate.page, pageSize: this.pager.applicate.pageSize}, msg => {
				this.tableData.applicate = msg.data;
			});
		},
		getActivities (page, pageSize) {
			this.pager.activity.page = page || this.pager.activity.page;
			this.pager.activity.pageSize = pageSize || this.pager.activity.pageSize;
			uni.post("/api/org/GetActByDepartId", {Id: this.orgInfo.ID,
			page: this.pager.activity.page, pageSize: this.pager.activity.pageSize}, msg => {
				this.tableData.activity = msg.data;
			});
		},
	}
}
</script>

<style>
</style>
