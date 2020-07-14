<template>
	<view id="lab-apply-list">
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">我的社团</block>
		</cu-custom>
		<transition-group class="cu-card" name="list">
			<view class="cu-item bg-informatic-brown shadow"
			v-for="(item,index) in data" :key="index" v-if="isStudent" @click="toExecute(item)">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg">{{item.Name.substr(0,1)}}</view>
						<view class="content flex-sub">
							<view class="text-black text-lg">
								<view class="text-cut text-xl">{{item.Name}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-item bg-informatic-brown shadow" v-if="!isStudent" key="">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg">{{dashBoard.Name.substr(0,1)}}</view>
						<view class="content flex-sub">
							<view class="text-black text-lg">
								<view class="text-cut text-xl">{{dashBoard.Name}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</transition-group>
		<template v-if="data.length===0&&isStudent">
			<view class="padding-tb text-center text-lg">
				<text class="text-bold text-gray">暂无数据</text>
			</view>
		</template>
		<template v-if="dashBoard.Name==''&&!isStudent">
			<view class="padding-tb text-center text-lg">
				<text class="text-bold text-gray">暂无数据</text>
			</view>
		</template>
	</view>
</template>

<script>
	const app = require("@/config");
	export default{
		onShow() {
			this.getDashBoard();
		},
		data() {
			return {
				data:[],
				isStudent: false,
				dashBoard: {
					users: 0,
					teachers: [],
					children: 0,
					StrType: 0,
					DepartType: 0,
					BirthTime: "",
					Name: ""
				}
			}
		},
		methods:{
			getDashBoard() {
				let permissions = app.userInfo.permissons;
				if(permissions.indexOf("Organization.DepartAdminUser")>-1
				||permissions.indexOf("Organization.UnitAdminUser")>-1
				||permissions.indexOf("Organization.TeacherAdmin")>-1
				||permissions.indexOf("Organization.XSLHH")>-1
				||permissions.indexOf("Organization.TwAdminUser")>-1){
					uni.post("/api/org/GetDashboard",{},msg=>{
						if(msg.success){
							this.dashBoard = msg;
						}
						else{
							uni.showToast({
								 title: msg.msg
							})
						}
					})
				}else{
					uni.post("/api/org/StudentDashboard",{},msg=>{
						if(msg.success){
							this.data = msg.departs;
							this.isStudent = true;
						}
						else{
							uni.showToast({
								 title: msg.msg
							})
						}
					})
				}
			}
		}
	}
</script>

<style>
.content{
	margin: 0px
}
</style>
