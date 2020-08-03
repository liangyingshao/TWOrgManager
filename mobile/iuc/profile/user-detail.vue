<template>
	<view>
		<cu-custom bgColor="bg-white" isBack>
			<block slot="backText">返回</block>
			<block slot="content">用户信息</block>
		</cu-custom>
		<view class="cu-card no-card">
			<view class="cu-item shadow padding-lg">
				<view class="flex">
					<view class="cu-avatar radius xl" :style="'background-image:url(' + app.userInfo.avatar + ');'"></view>
					<view class="flex-sub padding-left-sm">
						<text class="text-xl text-bold">{{userInfo.RealName}}</text>
						<text class="text-lg text-gray block margin-top-xs">学号：{{userCode}}</text>
						<text class="text-lg text-gray block margin-top-xs">学院：{{userInfo.BelongDepart}}</text>
						<text class="text-lg text-gray block margin-top-xs">手机：{{userInfo.Mobile}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red lg" @click="delUser(ID)">删除成员</button>
		</view>
		<!-- 这个用户的基本信息，提一个组件出去。输入一个对象，然后全部显示就行了。这样以后也可以用 -->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 更多信息
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">邮箱</text>
				</view>
				<view class="action">
					<text class="text-sm">{{userInfo.Email}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">政治面貌</text>
				</view>
				<view class="action">
					<text class="text-sm">{{userInfo.PoliticalStatus}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">入团时间</text>
				</view>
				<view class="action">
					<text class="text-sm">{{userInfo.JoinCCYLTime.includes('1900') ? '未入团' : userInfo.JoinCCYLTime}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">入党时间</text>
				</view>
				<view class="action">
					<text class="text-sm">{{userInfo.JoinCPCTime.includes('1900') ? '未入党' : userInfo.JoinCCYLTime}}</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	let app = require("@/config")
	export default {
		data() {
			return {
				userInfo: {
					JoinCCYLTime: '',
					JoinCPCTime: ''
				},
				userCode: "",
				ID: "",
				State: 0,
				app
			}
		},
		methods: {
			delUser(ID) {
				uni.showModal({
					title: '删除成员',
					content: '确实要删除成员吗？',
					success: res => {
						if (res.confirm) {
							uni.post("/api/security/RemoveUserV2", {
								userId: ID,
								departId: app.defaultDepartId
							}, msg => {
								uni.showToast({
									title: msg.msg,
									icon: 'none'
								});
								if (msg.success) {
									uni.navigateBack({
										delta: 1
									});
								}
							});
						}
					}
				});
			}
		},
		onLoad(query) {
			this.userCode = query.userCode;
			this.ID = query.ID;
			uni.post("/api/security/GetUserByCode", {
				code: this.userCode
			}, msg => {
				if (msg.success) {
					this.userInfo = msg.user;
				} else {
					uni.showToast({
						title: msg.msg,
						icon: 'none'
					});
				}
			})
		}
	}
</script>

<style>
</style>
