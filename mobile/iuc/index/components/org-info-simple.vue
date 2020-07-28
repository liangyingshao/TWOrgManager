<template>
	<view class="cu-item">
		<view class="content padding-tb-sm">
			<view>
				<text class="cuIcon-profilefill text-blue margin-right-xs"></text>{{orgInfo.Name}}（业务指导单位）</view>
			<view class="text-gray text-sm">
				{{orgInfo.Description ? orgInfo.Description : "暂无简介"}}
			</view>
		</view>
		<view class="action" v-if="app.checkPermission('Organization.Student') > -1">
			<button class="cu-btn bg-orange shadow" @click="withdraw(orgInfo.app.ID)"
			v-if="orgInfo.app && orgInfo.app.State === 3">
				撤回
			</button>
			<button class="cu-btn bg-green shadow" @click="applicate(orgInfo.ID)" v-else>
				申请
			</button>
		</view>
	</view>
</template>

<script>
	let app = require("@/config")
	export default{
		props: {
			orgInfo: {
				type: Object
			}
		},
		methods: {
			applicate(departId) {
				uni.post("/api/security/ApplicateDepart", {departId}, msg => {
					if(msg.success){
						uni.showToast({
							title: "申请成功"
						});
						this.orgInfo.app = {
							ID: msg.appID,
							State: 3
						};
					}
				})
			},
			withdraw(appId) {
				uni.post("/api/security/WithDraw", {appId}, msg => {
					if(msg.success){
						uni.showToast({
							title: "撤回成功"
						});
						this.orgInfo.app = {};
					}
				})
			}
		},
		data() {
			return {
				app: app
			}
		}
	}
</script>

<style lang="scss">
</style>
