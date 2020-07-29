<template>
	<view>
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="backText">返回</block>
			<block slot="content">签到详情</block>
		</cu-custom>
		<view v-if="allSignIn.length">
			<view class="padding bg-white solids-bottom" v-for="(item,index) in allSignIn" :key="index">
				<view class="cu-item">
					<view class="content padding-tb-sm">
						<view>
							<text class="cuIcon-profilefill text-blue margin-right-xs"></text> {{item.RealName}}</view>
						<view class="text-gray text-sm">
							<text class="cuIcon-infofill margin-right-xs"></text>签到时间：{{item.SignInOn}}</view>
					</view>
					<view class="action" v-if="item.SignInState == 0">
						<text class="text-green">已签到</text>
					</view>
					<view class="action" v-else-if="item.SignInState == 99|| item.SignInState == 999">
						<text class="text-red">未签到</text>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="flex justify-center bg-white text-center">
			<view>
				<image class="none" src="../../static/none.png"></image>
				<view class="text-xxl padding-bottom-xl">暂时无人签到</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allSignIn: [],
				actId: ""
			}
		},
		methods: {
			onLoad(query) {
				this.actId = query.ID;
				uni.post("/api/org/GetSignUps", {
					actId: this.actId
				}, msg => {
					this.allSignIn = msg.data;

				})
			}
		}
	}
</script>

<style>
</style>
