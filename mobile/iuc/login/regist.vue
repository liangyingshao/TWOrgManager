<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">用户注册</block>
		</cu-custom>
		<view class="margin-lr margin-tb">
			<form @submit="regist">
				<view class="cu-form-group">
					<view class="title">账户名</view>
					<input placeholder="请输入您的账户名" name="userName"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">密码</view>
					<input placeholder="请输入您的密码" name="password" password></input>
				</view>
				<view class="cu-form-group">
					<view class="title">确认密码</view>
					<input placeholder="再输一次相同的密码" name="confirmPwd" password></input>
				</view>
				<view class="cu-form-group">
					<view class="title">电话</view>
					<input placeholder="您的电话号码" name="telephone"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">邮箱</view>
					<input placeholder="您的电子邮箱" name="email"></input>
				</view>
				<view class="flex flex-direction margin-tb">
					<button class="cu-btn bg-blue lg" form-type="submit">注册</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				registModel: {}
			}
		},
		methods: {
			regist(e) {
				this.registModel = e.detail.value;
				if(this.registModel.password !== this.registModel.confirmPwd){
					uni.showToast({
					    title: '两次输入的密码不一致',
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
