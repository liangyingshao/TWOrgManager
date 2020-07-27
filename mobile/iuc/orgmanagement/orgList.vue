<template>
	<view>
		<cu-custom isBack bgColor="bg-gradual-blue">
			<block slot="content">社团列表</block>
		</cu-custom>
		<view class="cu-list menu">
			<org-info v-for="org in orgs" :key="org.ID" :orgInfo="org"></org-info>
		</view>
	</view>
</template>

<script>
	import orgInfo from '../index/components/org-info-simple.vue'
	export default {
		components: {
			orgInfo
		},
		methods: {
			getAllOrg() {
				uni.post("/api/security/GetAllDeparts", {}, msg => {
					if (msg.success) {
						this.orgs = msg.data;
					}
				})
			}
		},
		data() {
			return {
				orgs: []
			}
		},
		onLoad() {
			this.getAllOrg();
		}
	}
</script>

<style>
</style>
