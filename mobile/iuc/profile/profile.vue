<template>
	<view>
		<view class="head border" :style="{'background-image': 'url('+userInfo.Avatar+')'}"></view>
		<view class="info-bar">
			<view class="cf text-xxl">
				<navigator class="fr cuIcon-settings text-white justify-end padding-lr padding-top" url="userInfo"></navigator>
			</view>
			<view class="flex justify-center">
				<view class="basis-xs"></view>
				<view class="basis-xs margin">
					<image class="cu-avatar round xl center" v-bind:src="userInfo.Avatar" v-on:click="navToInfor()" />
				</view>
				<view class="basis-lg margin">
					<view class="text-white">
						<text class="text-xxl block margin-bottom-xs">{{userInfo.RealName}}</text>
						<text>电话：{{userInfo.Mobile}}</text>
					</view>
				</view>
			</view>
		</view>
		<!--view class="cu-list grid no-border col-4 margin margin-lr-xl navs-bar shadow">
			<view class="cu-item" v-for="(item,index) in navs" :key="index" @click="navTo(item.url)">
				<view :class="'cuIcon-'+item.cuIcon" class="text-blue "></view>
				<text class="text-blue text-bold ">{{item.name}}</text>
			</view>
		</view-->
		<view class="cu-list menu">
			<view class="arrow cu-item" @click="navTo('../index/index')">
				<view class="font-15 margin-lr">
					<text class="text-blue cuIcon-pick margin-right-sm"></text>
					<text class="text-blue text-bold">回到主页</text>
				</view>
			</view>
			<view class="arrow cu-item" v-if="availableRoles.length > 1" @click="navTo('../login/roleSelection')">
				<view class="font-15 margin-lr">
					<text class="text-blue cuIcon-pick margin-right-sm"></text>
					<text class="text-blue text-bold">切换角色</text>
				</view>
			</view>
			<view class="arrow cu-item" v-if="userRole === 'departmanager'" @click="navTo('/iuc/profile/memberReviewHistory')">
				<view class="font-15 margin-lr">
					<text class="text-blue cuIcon-pick margin-right-sm"></text>
					<text class="text-blue text-bold">成员审核历史</text>
				</view>
			</view>
			<view class="arrow cu-item" @click="navTo('../login/login')">
				<view class="font-15 margin-lr">
					<text class="text-blue cuIcon-exit margin-right-sm"></text>
					<text class="text-blue text-bold">登出</text>
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
				userInfo: {},
				realName: "",
				avatar: "",
				navs: [{
					name: "社团管理",
					url: "../roomApplication/v2/todoList",
					cuIcon: "profilefill"
				}, {
					name: "社团信息",
					url: "../roomApplication/v2/myAttend",
					cuIcon: "newshotfill"
				}, {
					name: "活动申请",
					url: "../roomView/labList?type=-1",
					cuIcon: "formfill"
				}, {
					name: "回到主页",
					url: "../index/index",
					cuIcon: "card"
				}],
				availableRoles: []
			}
		},
		onLoad(query) {
			this.userRole = query.role;
			this.getAvailablePositon();
		},
		onShow() {
			this.GetInfo();
		},
		methods: {
			GetInfo() {
				uni.post("/uc/GetUserInfo", {}, msg => {
					if (msg.success) {
						this.userInfo = msg.data;
					}
				})
			},
			getAvailablePositon() {
				uni.post("/api/security/GetMyPositions", {}, msg => {
					if (msg.success) {
						this.availableRoles = msg.data;
					}
				})
			},
			navToInfor() {
				uni.navigateTo({
					url: '../userInfo/userInfo',
				})
			},
			navTo(e) {
				if (e === "../login/login") {
					uni.showModal({
						title: "确认", // 标题
						content: "确认登出？", // 内容
						success: function(res) {
							if (res.confirm) {
								// console.log(uni.getStorageSync("currentUserGuid") + "?");
								// uni.removeStorageSync('currentUserGuid');
								uni.clearStorage();
								uni.post("/api/security/logout", {
									currentUserGuid: app.currentUserGuid
								}, msg => {
									if (msg.success === true) {
										app.userInfo.isLogined = false;
										uni.showMessage("登出成功");
									} else {
										uni.showMessage("登出失败");
									}
									uni.navigateTo({
										url: e
									})
								})
							} else if (res.cancel) {
								// console.log('用户点击取消');
							}
						}
					});
				} else if (e === "../index/index") {
					uni.switchDashboard(app.checkPermission);
				} else {
					uni.navigateTo({
						url: e
					})
				}
			}
		},
	}
</script>

<style lang="less">
	.head {
		height: 360rpx;
		width: 100%;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		filter: blur(8px);
		position: fixed;
		z-index: -1;
	}

	.info-bar {
		height: 360rpx;
	}

	.navs-bar {
		margin-top: -70rpx;
		border-radius: 28rpx;
		box-shadow: 3px 3px 4px rgba(00, 129, 255, 0.3);
		;
		padding: 10px 20px;
	}

	.cu-list.menu>.cu-item.arrow:before {
		right: 40px;
	}
</style>
