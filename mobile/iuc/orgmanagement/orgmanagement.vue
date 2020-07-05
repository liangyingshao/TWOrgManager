<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">社团管理</block>
		</cu-custom>
		<scroll-view scroll-y>
			<view class="margin">
				<text class="text-xl">社团名称</text>
				<br>
				<text>其他信息</text>
			</view>
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="index == TabCur?'text-green cur':''" v-for="(item, index) in tabTitle" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
				<view v-show="TabCur == 0" class="cu-list menu">
					<view v-for="(item, index) in 10" :key="index" class="cu-item">
						<view class="content">
							<text class="cuIcon-btn text-green"></text>
							<text class="text-grey">成员{{index}}</text>
						</view>
						<view class="action">
							<button class="cu-btn round bg-green shadow">
								<text class="cuIcon-upload">管理</text>
							</button>
						</view>
					</view>
				</view>
				<view v-show="TabCur == 1" class="cu-list menu">
					<view v-for="(item, index) in 10" :key="index" class="cu-item">
						<view class="content">
							<text class="cuIcon-btn text-green"></text>
							<text class="text-grey">社团活动{{index}}</text>
						</view>
						<view class="action">
							<button class="cu-btn round bg-green shadow">
								<text class="cuIcon-upload">查看</text>
							</button>
						</view>
					</view>
				</view>
				<view v-show="TabCur == 2">
					3
				</view>
				<view v-show="TabCur == 3">
					4
				</view>
			</scroll-view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
		<navTab :selection='0' />
	</view>
</template>

<script>
	export default{
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				tabTitle: [
					"成员管理",
					"社团活动",
					"部门管理",
					"社团管理"
				]
			};
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			getOrgDetail(id) {
				uni.post("/api/security/GetOrgDetail", {id}, msg => {
					
				})
			}
		}
	}
</script>

<style>
</style>
