<template>
	<view class="act-console">
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="backText">返回</block>
			<block slot="content">活动详情</block>
		</cu-custom>
		<view class="text-xl text-center padding-xl text-bold">
			<view>{{actInfo.ActivityName ? actInfo.ActivityName : "暂无社团活动名称"}}</view>
			<!--
			 这个小标记可以用组件做，在index-depart-manager里也有这个东西，颜色：
			 进行中 用绿色，
			 未开始 用蓝色，
			 已结束 用红色。
			-->
			<template v-if="actInfo.ApplicateState !== 3">
				<view class='text-sm cu-tag bg-yellow margin-top-xs round'>审批中</view>
			</template>
			<template v-else>
				<view v-if="actInfo.StartState === 1" class="text-sm cu-tag margin-top-xs round bg-blue">
					{{startState[actInfo.StartState]}}:{{actInfo.isSignUping}}
				</view>
				<view v-else :class="'text-sm cu-tag margin-top-xs round bg-' + stateColor[actInfo.StartState]">{{startState[actInfo.StartState]}}</view>
			</template>
		</view>
		<!-- 如果活动如果申请流程还没有结束 -->
		<view class="qr-container margin-bottom-xl text-center hide" v-if="actInfo.ApplicateState !== 3">
			<image class="on-working" src="/static/none.png" mode="aspectFit"></image>
			<view class="text-xl margin-top-sm">活动正在审核中</view>
			<view class="text-sm margin-top-xs text-grey">当前步骤：{{actInfo.CurrentStep}}</view>
		</view>
		<!-- 如果活动已经开始，则显示以下的二维码,进行中 -->
		<view class="qr-container margin-bottom-xl" v-else-if="actInfo.StartState === 1">
			<image class="qr-area" :src="'http://stgl.ricebird.cn/qr/'+actInfo.ShortCode"></image>
		</view>
		<!-- 活动如果审批结束，但还没有开始，则显示这个 -->
		<view class="qr-container margin-bottom-xl padding-lr-xl" v-else-if="actInfo.StartState === 0">
			<button class="on-working btn bg-green" @click="setActStart(actInfo.ID)">
				点击开始
			</button>
		</view>
		<view class="margin-lr text-center">
			<view class="">活动时间：{{actInfo.StartDate}}~{{actInfo.EndDate}}</view>
			<view class="">活动地点：{{actInfo.Address ? actInfo.Address : '暂无地点'}}</view>
		</view>

		<view class="cu-list grid col-2 solid-top shadow " style="position:fixed;bottom: 0px;width: 100%;">
			<!-- 这里红点显示的是，是否有未审核的人。注意大于99则显示为 99+ 小于显示数字-->
			<view class="cu-item" @click="toSignUP()">
				<view class="cuIcon-friendfavor">
					<view class="cu-tag badge">
						<block>{{actInfo.needChecks>99 ? '99+' : actInfo.alreadeySignUps}}</block>
					</view>
				</view>
				<text>报名情况</text>
			</view>
			<!-- 这里的红点显示的是签到人数 -->
			<view class="cu-item" @click="toSignIn()">
				<view class="cuIcon-selection">
					<view class="cu-tag badge">
						<block>{{actInfo.alreadeySignIns>99 ? '99+' : actInfo.alreadeySignIns}}</block>
					</view>
				</view>
				<text>签到情况</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ID: "",
				actInfo: {

				},
				startState: {
					0: "未开始",
					1: "进行中",
					2: "已结束"
				},
				stateColor: {
					0: "green",
					1: "blue",
					2: "red"
				}
			}
		},
		onLoad(query) {
			this.ID = query.ID;
			this.getActInfo();
		},
		methods: {
			getActInfo(){
				uni.post("/api/org/GetApplicationDetail", {
					id: this.ID
				}, msg => {
					if (msg.success) {
						this.actInfo = msg.data;
						
						let startDate = new Date(msg.data.Start);
						let endDate = new Date(msg.data.End);
						if(new Date() > endDate){
							this.actInfo.isSignUping = "已结束";
						} else if(new Date() > startDate){
							this.actInfo.isSignUping = "活动阶段";
						} else {
							this.actInfo.isSignUping = "报名阶段";
						}
					} else {
						uni.showToast({
							title: msg.msg,
							icon: "none"
						})
					}
				});
			},
			toSignUP() {
				uni.navigateTo({
					url: "/iuc/activity/activity-signUp-list?ID=" + this.ID
				});
			},
			toSignIn() {
				uni.navigateTo({
					url: "/iuc/activity/activity-signIn-list?ID=" + this.ID
				});
			},
			setActStart(actId) {
				uni.post("/api/org/ChangeActivityState", {
					actId,
					state: 1
				}, msg => {
					if (msg.success) {
						this.getActInfo();
					} else {
						uni.showToast({
							title: msg.msg,
							icon: "none"
						})
					}
				});
			}
		}
	}
</script>

<style>
	.act-console {
		background: #fff;
		min-height: calc(100vh);
	}

	.qr-container {
		width: 100%;
	}

	.qr-area {
		width: 200px;
		height: 200px;
		margin: 0 auto;
		display: block;
	}

	.on-working {
		width: 100%;
	}

	.cu-list.menu>.cu-item {
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		padding: 0 18px;
		min-height: 60px;
		background-color: #fff;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.fixed-bottom {
		margin-bottom: 180rpx;
	}
</style>
