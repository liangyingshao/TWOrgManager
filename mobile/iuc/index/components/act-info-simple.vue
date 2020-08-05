<template>
	<view class="cu-item" @click="toDetail(activity.ID)">
		<view class="content padding-tb-sm">
			<view>
				<template v-if="activity.isSigIn">
					<text class="cu-tag margin-right-sm round bg-olive">我已签到</text>
				</template>
				<template v-else-if="activity.isSignUp">
					<text class="cu-tag margin-right-sm round bg-olive">我已报名</text>
				</template>
				<template v-else>
					<text v-if="state === 2" class="cu-tag margin-right-sm round bg-blue">已结束</text>
					<text v-if="state === 1" class="cu-tag margin-right-sm round bg-blue">活动进行中</text>
					<text v-if="state === 0" class="cu-tag margin-right-sm round bg-blue">活动报名中</text>
				</template>
				{{activity.ActivityName}}</view>
			<view class="text-gray text-sm">
				{{activity.Description ? activity.Description : "暂无简介"}}
			</view>
		</view>
		<!--view class="action" v-if="app.checkPermission('Organization.Student') > -1">
			<view v-if="orgInfo.myDepart">已加入</view>
			<view v-else>
				<button class="cu-btn bg-orange shadow" @click="withdraw(orgInfo.app.ID)"
				v-if="orgInfo.app && orgInfo.app.State === 3">
					撤回
				</button>
				<button class="cu-btn bg-green shadow" @click="applicate(orgInfo.ID)" v-else>
					申请
				</button>
			</view>
		</view-->
	</view>
</template>

<script>
	export default {
		props: {
			activity: {
				type: Object
			}
		},
		mounted() {
			let startDate = new Date(this.activity.Start);
			let endDate = new Date(this.activity.End);
			if(new Date() > endDate){
				this.state = 2;
			} else if(new Date() > startDate){
				this.state = 1;
			} else {
				this.state = 0;
			}
		},
		methods:{
			toDetail (ID) {
				uni.navigateTo({
					url: `/iuc/activity/activity-detail?ID=${ID}`
				})
			}
		},
		data () {
			return {
				state: -1
			};
		}
	}
</script>

<style>
</style>
