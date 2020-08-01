<template>
	<view>
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="backText">返回</block>
			<block slot="content">活动详细信息</block>
		</cu-custom>
		<view class="text-xl padding-sm act-title">{{activity.ActivityName}}</view>
		<view class="padding-left-sm padding-right-sm author-area">
			<view class="cu-avatar round md" :style="'background-image:url(' + app.userInfo.avatar + ');'"></view>
			<view class="desc-text padding-left-sm">
				<text class="author-name">{{activity.DepartName}}</text>
				<text class="text-gray">{{activity.StartDate}}</text>
			</view>
		</view>
		<image class="topic-pic padding-sm" src="../../static/xmuScene1.jpg" mode="aspectFill"></image>
		<view class="act-desc padding-left-sm padding-right-sm">
			{{activity.Description}}
		</view>
		<!-- 
			星号用以显示报名状态，后面的按钮显示活动状态，需要有以下文字内容：
			1、活动还没有开始时，显示“立即报名”
			2、活动正在进行中时，显示灰色按钮“活动进行中”，灰色按钮就是把“bg-blue”换成"bg-grey"
			3、活动结束后，显示灰色按钮“活动已结束”
			--------------------
			1、在活动开始前，报名按钮可以点击。签到按钮显示“未开始”，点了提示“活动还未开始”
			2、活动进行中，报名按钮不再可以点击（点了提示“活动已经开始”），签到按钮点击视为签到
			3、活动结束后，所有按钮点了都提示“活动已经结束”
			
		-->
		<!--活动未开始-->
		<view class="cu-bar bg-white tabbar border shop foot" v-if="activity.StartState === 0">
			<view class="action">
				<view v-if="signUpState.State === 0">
					<view class="cuIcon-favorfill text-orange"></view>
					已报名
				</view>
				<view v-else>
					<view class="cuIcon-favor text-orange"></view>
					未报名
				</view>
			</view>
			<view class="action">
				<view class="cuIcon-selection text-green"></view>
				未签到
			</view>
			<view class="bg-blue submit" v-if="signUpState.State !== 0" @click="signUp(0)">立即报名</view>
			<view class="bg-blue submit" v-else @click="signUp(99)">取消报名</view>
		</view>
		<!--活动进行中-->
		<view class="cu-bar bg-white tabbar border shop foot" v-else-if="activity.StartState === 1">
			<view class="action">
				<view v-if="signUpState.State === 0">
					<view class="cuIcon-favorfill text-orange"></view>
					已报名
				</view>
				<view v-else>
					<view class="cuIcon-favor text-orange"></view>
					未报名
				</view>
			</view>
			<view class="action">
				<view v-if="signInState.State === 0">
					<view class="cuIcon-selectionfill text-green"></view>
					已签到
				</view>
				<view v-else>
					<view class="cuIcon-selection text-green"></view>
					未签到
				</view>
			</view>
			<view class="bg-gray submit" v-if="signUpState.State !== 0">活动进行中</view>
			<view class="bg-blue submit" v-else-if="signInState.State === 0" @click="signIn(99)">取消签到</view>
			<view class="bg-blue submit" v-else @click="signIn(0)">立即签到</view>
		</view>
		<!--活动已结束-->
		<view class="cu-bar bg-white tabbar border shop foot" v-else-if="activity.StartState === 2">
			<view class="action">
				<view v-if="signUpState.State === 0">
					<view class="cuIcon-favorfill text-orange"></view>
					已报名
				</view>
				<view v-else>
					<view class="cuIcon-favor text-orange"></view>
					未报名
				</view>
			</view>
			<view class="action">
				<view v-if="signInState.State === 0">
					<view class="cuIcon-selectionfill text-green"></view>
					已签到
				</view>
				<view v-else>
					<view class="cuIcon-selection text-green"></view>
					未签到
				</view>
			</view>
			<view class="bg-gray submit">活动已经结束</view>
		</view>
	</view>
</template>

<script>
	const app = require("@/config");
	export default {
		methods: {
			getActivityDetail() {
				uni.post("/api/org/GetApplicationDetail", {
					id: this.activity.ID
				}, msg => {
					if (msg.success) {
						this.activity = msg.data;
						this.signInState = msg.signInState;
						this.signUpState = msg.signUpState;
						
						let startDate = new Date(msg.data.Start);
						let endDate = new Date(msg.data.End);
						if(new Date() > endDate){
							this.activity.StartState = 2;
						} else if(new Date() > startDate){
							this.activity.StartState = 1;
						} else {
							this.activity.StartState = 0;
						}
					}
				})
			},
			/* 报名 */
			signUp(state) {
				uni.post("/api/org/ChangeSignUpState", {
					actId: this.activity.ID,
					state
				}, msg => {
					if (msg.success) {
						uni.showToast({
							title: state === 0 ? "报名成功" : "取消成功"
						});
						this.getActivityDetail();
					} else {
						uni.showToast({
							title: msg.msg,
							icon: 'none'
						})
					}
				})
			},
			signIn(state) {
				uni.showToast({
					title: "请进行线下签到",
					icon: "none"
				});
				return
				uni.post("/api/org/ChangeSignInState", {
					actId: this.activity.ID,
					state
				}, msg => {
					if (msg.success) {
						uni.showToast({
							title: state === 0 ? "签到成功" : "取消成功"
						});
						this.getActivityDetail();
					} else {
						uni.showToast({
							title: msg.msg,
							icon: 'none'
						})
					}
				})
			}
		},
		onLoad(query) {
			this.activity.ID = query.ID;
			this.getActivityDetail();
		},
		data() {
			return {
				activity: {},
				signInState: {},
				signUpState: {},
				app
			}
		}
	}
</script>

<style lang="less" scoped>
	.topic-pic {
		height: 400rpx;
		width: 100%;
	}

	.act-title {
		font-size: 50rpx;
	}

	.author-area {
		display: flex;

		.desc-text {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			text {
				display: block;

			}

			.author-name {
				font-weight: bold;
			}
		}
	}

	.act-desc {
		text-indent: 2em;
		font-size: 40rpx;

	}
</style>
