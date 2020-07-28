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
					<input @confirm="Search" @blur="Search" :adjust-position="false" type="text" 
					placeholder="搜索社团名" confirm-type="search"></input>
				</view>
			</view>
		</view>
		<view >
			<view v-if="orgs.length" class="cu-list menu">
				<org-info v-for="org in orgs" :key="org.ID" :orgInfo="org"></org-info>
			</view>
			<view v-else class="flex justify-center text-center">
				<view>
					<image src="/static/none.png"></image>
					<view class="text-xxl">暂无社团</view>
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
				uni.post("/api/security/GetAllDeparts", {}, msg => {
					if (msg.success) {
						this.orgsOrigin = msg.data;
						this.orgs = this.orgsOrigin;
					}
				})
			},
			navBack(){
				uni.navigateBack({
					delta: 1
				})
			},
			Search(e){
				let keyword = e.detail.value;
				this.orgs = this.orgsOrigin.filter(e => e.Name.indexOf(keyword) > -1);
			}
		},
		data() {
			return {
				orgs: [],
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
