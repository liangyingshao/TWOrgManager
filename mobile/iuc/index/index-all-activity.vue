<template>
	<view>
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="backText">返回</block>
			<block slot="content">所有活动</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text>
				社团活动
				<view class='cu-tag bg-red margin-left-sm round'>{{allActivity.length}}</view>
			</view>
		</view>
		<view class="cu-card no-card article" v-for="(item,index) in allActivity" :key="index">
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
</template>

<script>
	const app = require("@/config");
	export default {
		data() {
			return {
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
				overrideId: ''
			}
		},
		methods: {
			toConsole(actId) {
				uni.navigateTo({
					url: "/iuc/activity/activity-console?ID=" + actId
				});
			},
			getPageData() {
				uni.post("/api/org/GetActByDepartId", {
					id: this.overrideId || app.defaultDepartId
				}, msg => {
					if (msg.success) {
						this.allActivity = msg.data;
					}
				});
			}
		},
		onLoad(query) {
			this.overrideId = query.departId;
		},
		onShow() {
			this.getPageData();
		}
	}
</script>

<style>

</style>
