<template>
	<view>
		<cu-custom bgColor="bg-white" isBack>
			<block slot="backText">返回</block>
			<block slot="content">加入社团审核</block>
		</cu-custom>
		<view class="cu-card no-card">
			<view class="cu-item shadow padding-lg">
				<view class="flex">
					<view class="cu-avatar radius xl" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);"></view>
					<view class="flex-sub padding-left-sm">
						<text class="text-xl text-bold">{{userInfo.RealName}}</text>
						<text class="text-lg text-gray block margin-top-xs">学号：{{userCode}}</text>
						<text class="text-lg text-gray block margin-top-xs">学院：{{userInfo.BelongDepart}}</text>
						<text class="text-lg text-gray block margin-top-xs">手机：{{userInfo.Mobile}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green lg" @click="commitUser(ID)">通过</button>
			<button class="cu-btn bg-red margin-tb-sm lg" @click="refuseUser(ID)">驳回</button>
		</view>
		<!-- 这个用户的基本信息，提一个组件出去。输入一个对象，然后全部显示就行了。这样以后也可以用 -->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 更多信息
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">入团时间</text>
				</view>
				<view class="action">
					<text class="text-sm">{{userInfo.JoinCCYLTime}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
  export default {
  	data() {
  		return {
        userInfo: {},
        userCode: "",
        ID: ""
  		}
  	},
  	methods: {
      refuseUser (ID) {
        uni.post("/api/security/DenyApplicate", {appId: ID}, msg => {
          uni.showToast({
             title: msg.msg,
             icon: 'none'
          });
          if (msg.success) {
            uni.navigateBack({
              delta: 1
            });
          }
        })
      },
      commitUser (ID) {
        uni.post("/api/security/AcceptApplicate", {appId: ID}, msg => {
          uni.showToast({
             title: msg.msg,
             icon: 'none'
          });
          if (msg.success) {
            uni.navigateBack({
              delta: 1
            });
          };
        })
      }
  	},
    onLoad(query) {
      this.userCode = query.userCode;
      this.ID = query.ID;
      console.log(query.userCode);
      console.log(query.ID);
      uni.post("/api/security/GetUserByCode", {code: this.userCode}, msg => {
        if (msg.success) {
          this.userInfo = msg.user;
        } else {
          uni.showToast({
          	 title: msg.msg,
          	 icon: 'none'
          });
        }
      })
    }
  }
</script>

<style>
</style>
