<template>
	<view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text>
				<text class="block position-relative">
					成员审核
					<view class='cu-tag bg-red margin-left-sm round'>{{allApplication.length}}</view>
				</text>
			</view>
		</view>
    <view class="cu-list menu margin-top" v-for="(item,index) in allApplication" :key="index">
      <view v-if="item.State === 3" class="cu-item">
        <view class="content padding-tb-sm" @click="audit(item.ID, item.Code)">
          <view>
            <text class="cuIcon-profilefill text-blue margin-right-xs"></text> {{item.RealName}}({{item.Code}})</view>
          <view class="text-gray text-sm">
            <text class="cuIcon-infofill margin-right-xs"></text> {{item.BelongDepart}}，电话：{{item.Telephone}}</view>
        </view>
        <view class="action">
          <button class="cu-btn bg-green shadow" @click="commitUser(item.ID)">
            通过
          </button>
          <button class="cu-btn bg-green shadow margin-left-sm" @click="refuseUser(item.ID)">
            驳回
          </button>
        </view>
      </view>
      <view v-else-if="item.State === 2" class="cu-item">
        <view class="content padding-tb-sm" @click="audit(item.ID, item.Code)">
          <view>
            <text class="cuIcon-profilefill text-blue margin-right-xs"></text> {{item.RealName}}({{item.Code}})</view>
          <view class="text-gray text-sm">
            <text class="cuIcon-infofill margin-right-xs"></text> {{item.BelongDepart}}，电话：{{item.Telephone}}</view>
        </view>
        <view class="action">
          <text class="text-blue">自行撤回</text>
        </view>
      </view>
      <view v-else-if="item.State === 0" class="cu-item">
        <view class="content padding-tb-sm" @click="audit(item.ID, item.Code)">
          <view>
            <text class="cuIcon-profilefill text-blue margin-right-xs"></text> {{item.RealName}}({{item.Code}})</view>
          <view class="text-gray text-sm">
            <text class="cuIcon-infofill margin-right-xs"></text> {{item.BelongDepart}}，电话：{{item.Telephone}}</view>
        </view>
        <view class="action">
          <text class="text-green">已通过</text>
        </view>
      </view>
      <view v-else-if="item.State === 1" class="cu-item">
        <view class="content padding-tb-sm" @click="audit(item.ID, item.Code)">
          <view>
            <text class="cuIcon-profilefill text-blue margin-right-xs"></text> {{item.RealName}}({{item.Code}})</view>
          <view class="text-gray text-sm">
            <text class="cuIcon-infofill margin-right-xs"></text> {{item.BelongDepart}}，电话：{{item.Telephone}}</view>
        </view>
        <view class="action">
          <text class="text-red">已驳回</text>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
  let app = require("@/config");
  let departId = uni.getStorageSync("defaultDepartId");;
	export default {
		data() {
			return {
        allApplication: [
          {
              ID: "123456",
              RealName: "sly",
              CreateTime: "2020/7/27",
              State: 1,
              Code: "24320182203259",
              Telephone: "13606924649",
              BelongDepart: "信息学院"
          },
          {
              ID: "123456",
              RealName: "sly",
              CreateTime: "2020/7/27",
              State: 0,
              Code: "24320182203259",
              Telephone: "13606924649",
              BelongDepart: "信息学院"
          },
          {
              ID: "123456",
              RealName: "sly",
              CreateTime: "2020/7/27",
              State: 3,
              Code: "24320182203259",
              Telephone: "13606924649",
              BelongDepart: "信息学院"
          }
        ]
			}
		},
		methods: {
      refuseUser (ID) {
        uni.post("/api/security/DenyApplicate", {appId: ID}, msg => {
            uni.showToast({
            	 title: msg.msg,
            	 icon: 'none'
            });
          window.refresh();
        })
      },
      commitUser (ID) {
        uni.post("/api/security/AcceptApplicate", {appId: ID}, msg => {
            uni.showToast({
            	 title: msg.msg,
            	 icon: 'none'
            });
          window.refresh();
        })
      },
      audit(ID, userCode) {
        uni.navigateTo({
          url: "/iuc/profile/user-audit?userCode="+userCode+"&ID="+ID
        });
      }
		},
    onLoad() {
      uni.post("/api/security/GetApplicationsByDeparts", {
        departId
      }, msg => {
        this.allApplication = msg.data;
      })
    }
	}
</script>

<style>

</style>
