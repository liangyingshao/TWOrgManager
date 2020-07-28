<template>
	<view>
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="backText">返回</block>
			<block slot="content">活动列表</block>
		</cu-custom>
		<view class="">
			<view class="cu-card article no-card" v-for="activity in activities">
				<view class="cu-item solid-bottom">
					<act-thumb :activity="activity"></act-thumb>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import titleBar from '../index/title-bar.vue'
	import actThumb from '../index/components/act-thumb-v2.vue'
	export default {
		components: { titleBar, actThumb},
		data() {
			return {
				activities: []
			}
		},
		onLoad() {
			this.getAllActivities()
		},
		methods: {
			getAllActivities(){
				uni.post("/api/org/GetStartedApplications", {}, msg => {
					if(msg.success){
						this.activities = msg.data;
					}
				})
			}
		}
	}
</script>

<style>

</style>
