<template>
	<view>
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="backText">返回</block>
			<block slot="content">报名详情</block>
		</cu-custom>
		<view v-if="allSignUp.length">
			<view class="padding bg-white solids-bottom" v-for="(item,index) in allSignUp" :key="index">
				<view class="cu-item">
					<view class="content padding-tb-sm">
						<view>
							<text class="cuIcon-profilefill text-blue margin-right-xs"></text> {{item.RealName}}</view>
						<view class="text-gray text-sm">
							<text class="cuIcon-infofill margin-right-xs"></text>报名时间：{{item.SignUpOn}}</view>
					</view>
					<view class="action" v-if="item.SignUpState == 0">
						<text class="text-green">已报名</text>
					</view>
					<view class="action" v-else-if="item.SignUpState == 99 || item.SignUpState == 999">
						<text class="text-red">已取消</text>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="flex justify-center bg-white text-center">
			<view class="">
				<image class="none" src="../../static/none.png"></image>
				<view class="text-xxl padding-bottom-xl">暂时无人报名</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allSignUp: [],
				actId: ""
			}
		},
		methods: {
			onLoad(query) {
				this.actId = query.ID;
				uni.post("/api/org/GetSignUps", {
					actId: this.actId
				}, msg => {
					this.allSignUp = msg.data;
				})
			}
		}
	}
</script>

<style>
</style>
