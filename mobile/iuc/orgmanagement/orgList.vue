<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed bg-blue search" :style="{height:CustomBar + 'px'}">
				<view class="action" @click="navBack">
					<text class="cuIcon-back"></text>
					<text>返回</text>
				</view>
				<view class="search-form radius">
					<text class="cuIcon-search"></text>
					<input @confirm="Search" @blur="Search" :adjust-position="false" type="text" placeholder="搜索社团名" confirm-type="search"></input>
				</view>
			</view>
		</view>
		<view>
			<view v-if="orgs.length" class="cu-list menu-avatar">
				<org-info v-for="org in orgs" :key="org.ID" :orgInfo="org"></org-info>
			</view>
			<view v-else class="flex justify-center text-center">
				<view>
					<image src="/static/none.png"></image>
					<view class="text-xxl">{{orgText}}</view>
				</view>
			</view>
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
				this.orgText = "社团列表加载中";
				uni.post("/api/security/GetAllDeparts", {}, msg => {
					if (msg.success) {
						this.orgsOrigin = msg.data.filter(e => e.Type === 1);
						// this.orgsOrigin.sort(function(a, b) {
						// 	if (a.myDeparts && !b.myDeparts) {
						// 		return -1;
						// 	} else if (!a.myDeparts && b.myDeparts) {
						// 		return 1;
						// 	} else {
						// 		return 0;
						// 	}
						// })
						if (!this.orgsOrigin.length) {
							this.orgText = "找不到社团";
						}
						this.orgs = this.orgsOrigin;
					}
				})
			},
			navBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			Search(e) {
				let keyword = e.detail.value;
				this.orgs = this.orgsOrigin.filter(e => e.Name.indexOf(keyword) > -1);
				if (!this.orgs.length) {
					this.orgText = "找不到社团";
				}
			}
		},
		data() {
			return {
				orgs: [],
				orgText: "找不到社团",
				orgsOrigin: []
			}
		},
		onLoad() {
			this.getAllOrg();
		}
	}
</script>

<style>
</style>
