<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">用户登录</block>
		</cu-custom>
		<view class="margin-lr margin-tb">
			<view class="margin-bottom-xl text-center">
				<image src="../../static/社团管理信息系统.png" height="100%" mode="aspectFit"></image>
			</view>
			<form @submit="login()">
				<view class="cu-form-group">
					<view class="title">账号</view>
					<input placeholder="请输入您的账号" name="userName" v-model="loginModel.userName"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">密码</view>
					<input placeholder="请输入您的密码" name="password" password v-model="loginModel.password"></input>
				</view>
				<view class="flex flex-direction margin-tb">
					<button class="cu-btn bg-blue lg" form-type="submit">登录</button>
				</view>
			</form>
			<view class="flex margin-tb justify-center">
				<text @click="login('15102242660', '88888888')">学生</text>
				<text class="padding-lr-xs">|</text>
				<text @click="login('24320152356894', '123456')">社团</text>
				<text class="padding-lr-xs">|</text>
				<text @click="login('25648', '123456')">指导老师</text>
				<text class="padding-lr-xs">|</text>
				<text @click="login('13621345797', '88888888')">挂靠单位</text>
				<text class="padding-lr-xs">|</text>
				<text @click="login('15102246798', '123456')">学联会</text>
				<text class="padding-lr-xs">|</text>
				<text @click="login('admin', '88888888')">团委</text>
			</view>
		</view>
	</view>
</template>

<script>
	let app = require("@/config");
	let md5 = require("@/labs/md5.js");
	export default {
		data() {
			return {
				loginModel: {
					userName: "",
					password: ""
				},
				
			}
		},
		methods: {
			login(un, pwd) {
				let userName = (un || this.loginModel.userName);
				//let password = this.loginModel.password;
				let password = md5(pwd || this.loginModel.password);
				//let password = 'e10adc3949ba59abbe56e057f20f883e';
				if(!(userName && password)){
					uni.showToast({
					    title: '账户名和密码不能为空',
						icon: 'none'
					});
					return;
				}
				app.currentUserGuid = 0;
				uni.post("/api/security/Login", {method: 'password', username: userName, pwd: password, isRemember: false, isPwd: true},msg=>{
					if(msg.success){
						app.userInfo = msg.userInfo;
						app.currentUserGuid = msg.currentUserGuid;
						uni.setStorageSync("currentUserGuid", msg.currentUserGuid);
						let ps = msg.userInfo.permissons;
						let func = (p) => {
							return (ps && ps.indexOf(p)) >= 0;
						};
						uni.redirectTo({
							url: "./roleSelection"
						})
						app.checkPermission = func;
						// uni.switchDashboard(func);
					}
					else{
						uni.showToast({
							 title: msg.msg,
							 icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style>
</style>
