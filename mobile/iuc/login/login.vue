<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">用户登录</block>
		</cu-custom>
		<view class="margin-lr margin-tb">
			<view class="margin-bottom-xl text-center">
				<image src="../../static/社团图标.png" style="width: 200px; height: 200px;" mode="aspectFit"></image>
			</view>
			<form @submit="login">
				<view class="cu-form-group">
					<view class="title">账号</view>
					<input placeholder="请输入您的账号" name="userName"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">密码</view>
					<input placeholder="请输入您的密码" name="password" password></input>
				</view>
				<view class="flex flex-direction margin-tb">
					<button class="cu-btn bg-blue lg" form-type="submit">登录</button>
				</view>
			</form>
			<view class="flex margin-tb justify-center">
				<navigator url="../login/regist">注册账号</navigator>
				<text class="padding-lr-xs">|</text>
				<navigator url="../login/pwd">忘记密码</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginModel: {}
			}
		},
		methods: {
			login(e) {
				this.loginModel = e.detail.value;
				if(!(this.loginModel.userName && this.loginModel.password)){
					uni.showToast({
					    title: '账户名和密码不能为空',
						icon: 'none'
					});
					return;
				}
				uni.request({
					url: "",
					method: "POST",
					success: res => {
						
					},
					fail: err => {
						
					}
				});
			}
		}
	}
</script>

<style>
</style>
