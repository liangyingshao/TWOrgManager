<template>
	<view>
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="backText">返回</block>
			<block slot="content">活动列表</block>
		</cu-custom>
		<view class="">
			<view class="cu-list menu solid-bottom" v-for="activity in activities" style="margin-top: 0px;">
				<act-thumb-simple :activity="activity"></act-thumb-simple>
			</view>
		</view>
	</view>
</template>

<script>
	import titleBar from '../index/title-bar.vue'
	import actThumbSimple from '../index/components/act-info-simple.vue'
	export default {
		components: { titleBar, actThumbSimple},
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
				uni.post("/api/org/GetMyApplications", {}, msg => {
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
