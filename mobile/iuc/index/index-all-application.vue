<template>
	<view>
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="backText">返回</block>
			<block slot="content">所有申请</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text>
				<text class="block position-relative">
					成员审核
					<view class='cu-tag bg-red margin-left-sm round'>{{allApplication.length}}</view>
				</text>
			</view>
		</view>
		<view class="cu-list menu" v-for="(item,index) in allApplication" style="margin-top: 1px;" :key="index">
			<view class="cu-item">
				<view class="content padding-tb-sm" @click="audit(item.ID, item.Code, item.State)">
					<view>
						<text class="cuIcon-profilefill text-blue margin-right-xs"></text> {{item.RealName}}({{item.Code}})</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text> {{item.BelongDepart}}，电话：{{item.Mobile}}</view>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow" @click="commitUser(item.ID)">
						通过
					</button>
				</view>
			</view>
			<!--view v-else-if="item.State === 2" class="cu-item">
				<view class="content padding-tb-sm" @click="audit(item.ID, item.Code, item.State)">
					<view>
						<text class="cuIcon-profilefill text-blue margin-right-xs"></text> {{item.RealName}}({{item.Code}})</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text> {{item.BelongDepart}}，电话：{{item.Telephone}}</view>
				</view>
				<view class="action">
					<text class="text-blue">自行撤回</text>
				</view>
			</view>
			<view v-else-if="item.State === 0" class="cu-item">
				<view class="content padding-tb-sm" @click="audit(item.ID, item.Code, item.State)">
					<view>
						<text class="cuIcon-profilefill text-blue margin-right-xs"></text> {{item.RealName}}({{item.Code}})</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text> {{item.BelongDepart}}，电话：{{item.Telephone}}</view>
				</view>
				<view class="action">
					<text class="text-green">已通过</text>
				</view>
			</view>
			<view v-else-if="item.State === 1" class="cu-item">
				<view class="content padding-tb-sm" @click="audit(item.ID, item.Code, item.State)">
					<view>
						<text class="cuIcon-profilefill text-blue margin-right-xs"></text> {{item.RealName}}({{item.Code}})</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text> {{item.BelongDepart}}，电话：{{item.Telephone}}</view>
				</view>
				<view class="action">
					<text class="text-red">已驳回</text>
				</view>
			</view-->
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text>
				<text class="block position-relative">
					社团成员
					<view class='cu-tag bg-red margin-left-sm round'>{{members.length}}</view>
				</text>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item" v-for="(item, index) in members" :key="index">
				<view class="content padding-tb-sm" @click="toDetail(item.ID, item.Code)">
					<view>
						<text class="cuIcon-profilefill text-blue margin-right-xs"></text> {{item.RealName}}({{item.Code}})
					</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text> {{item.departName}}，电话：{{item.Mobile}}
					</view>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow" @click="toDetail(item.ID, item.Code)">
						详情
					</button>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	let app = require("@/config");
	export default {
		data() {
			return {
				allApplication: [],
				members: []
			}
		},
		methods: {
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
			audit(ID, userCode, State) {
				uni.navigateTo({
					url: "/iuc/profile/user-audit?userCode=" + userCode + "&ID=" + ID + "&State=" + State
				});
			},
			getPageData() {
				uni.post("/api/security/GetApplicationsByDeparts", {
					departId: app.defaultDepartId
				}, msg => {
					this.allApplication = msg.data.filter(e => e.State === 3);
				})
			},
			getMembers() {
				uni.post("/api/security/GetUsersByDepartId", {
					departId: app.defaultDepartId,
					pageSize: 100
				}, msg => {
					this.members = msg.data;
				})
			},
			toDetail(ID, userCode){
				uni.navigateTo({
					url: "/iuc/profile/user-detail?userCode=" + userCode + "&ID=" + ID
				})
			}
		},
		onLoad() {},
		onShow() {
			this.getPageData();
			this.getMembers();
		}
	}
</script>

<style>

</style>
