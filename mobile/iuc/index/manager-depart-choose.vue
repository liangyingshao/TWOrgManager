<template>
	<view>
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="backText">返回</block>
			<block slot="content">社团列表</block>
		</cu-custom>
		<view class="padding bg-white solids-bottom" v-for="(item,index) in departs" :key="index" @click="toDetail(item.ID)">
			<view class="cu-item">
				<view class="content padding-tb-sm">
				  <view>
					<text class="cuIcon-newsfill text-blue margin-right-xs"></text>社团名称: {{item.Name}}</view>
					<view class="text-gray text-sm text-cut margin-top-sm" v-if="item.Description!==''">
						<text class="cuIcon-wenzi margin-right-xs"></text>社团简介：{{item.Description}}
					</view>
					<view class="margin-top-sm" v-if="item.Description==''">
						<text class="cuIcon-wenzi margin-right-xs"></text>暂无简介
					</view>
				</view>				
			  </view>
		 </view>
		</view>
	</view>
</template>

<script>
	let app = require("@/config");
	export default{
		data() {
			return{
				departs:[]
			}
		},
		onLoad() {
		  uni.post("/api/security/GetAllDeparts", {}, msg => {
			this.departs = msg.data;
		  })
		},
		methods: {
			toDetail(departId) {
				uni.chosePostion(departId);
				console.log(app.defaultDepartId);
				uni.navigateTo({
				  url: "/iuc/index/index-manager"
				});
			}
		}
	}
</script>

<style>
</style>

