<template>
	<view>
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="backText">返回</block>
			<block slot="content">社团列表(废弃)</block>
		</cu-custom>
		<view class="padding-lr bg-white solids-bottom" v-for="(item,index) in departs" :key="index" @click="toDetail(item.id)">
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-newsfill text-blue margin-right-xs"></text>社团名称: {{item.name}}</view>
					<view class="text-gray text-sm text-cut margin-top-sm">
						<text class="cuIcon-wenzi margin-right-xs"></text>管理员：{{item.admin}}
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
				departs: []
			}
		},
		onLoad() {
			uni.post("/api/security/GetDepartsByDepartId", {
				id: app.defaultDepartId
			}, msg => {
				this.departs = msg.data.children
			});
		},
		methods: {
			toDetail(departId) {
				uni.navigateTo({
					url: "/iuc/index/index-teacher?departId=" + departId
				});
			}
		}
	}
</script>

<style>
</style>
