<template>
	<view>
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="backText">返回</block>
		</cu-custom>
		<view>
			<view class="cu-bar bg-white solids-bottom">
				<view class="action">
					<text class="cuIcon-titles text-blue"></text>
					<text class="block position-relative">
						报名详情
						<view class='cu-tag bg-red margin-left-sm round' v-if="allSignUp">{{allSignUp.length}}</view>
					</text>
				</view>
			</view>
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
		<view v-if="allSignUp&&allSignUp.length==0">
			暂无报名信息
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				allSignUp: [
					{
						RealName: "小宋",
						SignUpOn: "2020年7月1日",
						SignUpState: 0
					},
					{
						RealName: "小宋",
						SignUpOn: "2020年7月1日",
						SignUpState: 0
					},
					{
						RealName: "小宋",
						SignUpOn: "2020年7月1日",
						SignUpState: 0
					}
				],
				actId: ""
			}
		},
		methods:{
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
