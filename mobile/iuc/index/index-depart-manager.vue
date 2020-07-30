<template>
	<view>
		<title-bar :placeholder="searchText" @input="doSearch">
			<view class="act-btn" @click="navTo('../orgmanagement/orgmanagement')">
				<text class="icon cuIcon-home"></text>
				<text>我的社团</text>
			</view>
			<!-- 此按钮效果同成员审核里的“所有申请” -->
			<view class="act-btn" @click="navTo('/iuc/index/index-all-application')">
				<text class="icon cuIcon-light"></text>
				<text>成员审核</text>
			</view>
			<!-- 此按钮效果同社团活动里的“所有活动” -->
			<view class="act-btn" @click="navTo('/iuc/index/index-all-activity')">
				<text class="icon cuIcon-activity"></text>
				<text>社团活动</text>
			</view>
			<view class="act-btn" @click="toProfile">
				<text class="icon cuIcon-profile"></text>
				<text>个人中心</text>
			</view>
		</title-bar>
		<!--
			这里做一个点击收起，这里的【所有申请】页也简单，把下面这个列表变成一个完整的页面就可以了。
			注，这个页面只显示“待审核”的，我这写的以通过的是给详细页面用的。
		-->
    <view class="cu-bar bg-white solid-bottom margin-top" v-if="inApplyingApp.length !== 0">
      <view class="action" @click="changeMemShow()">
        <text class="cuIcon-titles text-blue"></text>
        <text class="block position-relative">
          成员审核
          <view class='cu-tag bg-red margin-left-sm round'>{{inApplyingApp.length}}</view>
        </text>
      </view>
      <view class="action" @click="navTo('/iuc/index/index-all-application')">
        <view class="text-blue">[所有申请]</view>
      </view>
    </view>
    <view class="cu-list menu" v-for="(item,index) in inApplyingApp" :key="index" v-show="showMemberReview">
      <view class="cu-item">
        <view class="content padding-tb-sm" @click="audit(item.ID, item.Code)">
          <view>
            <text class="cuIcon-profilefill text-blue margin-right-xs"></text> {{item.RealName}}（{{item.Code}}）</view>
          <view class="text-gray text-sm">
            <text class="cuIcon-infofill margin-right-xs"></text> {{item.BelongDepart}}，电话：{{item.Mobile}}</view>
        </view>
        <view class="action">
          <button class="cu-btn bg-green shadow" @click="commitUser(item.ID)">
            通过
          </button>
        </view>
      </view>
    </view>
    <view class="cu-bar bg-white solid-bottom margin-top" v-if="onGoingAct.length !== 0">
      <view class="action" @click="changeActShow()">
        <text class="cuIcon-titles text-blue"></text>
        社团活动
        <view class='cu-tag bg-red margin-left-sm round'>{{onGoingAct.length}}</view>
      </view>
      <view class="action" @click="navTo('/iuc/index/index-all-activity')">
        <view class="text-blue">[所有活动]</view>
      </view>
		</view>
		<!-- 本列表只列出 进行中 的活动。 -->
		<view class="cu-card no-card article" v-for="(item,index) in allActivity" :key="'act'+index" v-show="showAct">
		<view class="cu-card no-card article" v-for="(item,index) in onGoingAct" :key="index + inApplyingApp.length" v-show="showAct">
			<!--
			 这个整个做一个组件，社团活动详细页面里不还可以再用一次，颜色：
			 进行中 用绿色，
			 未开始 用蓝色，
			 已结束 用红色。
			 同时，这个状态也可以做一个小组件，在activity-console里也要用到一次
			-->
			<view class="cu-item shadow" @click="toConsole(item.ID)">
				<view class="title">
					<view class="text-cut">
						<view class="cu-tag margin-right-sm round bg-red">进行中</view>
						{{item.ActivityName ? item.ActivityName : "暂无社团活动名称"}}
					</view>
				</view>
				<view class="content">
					<view class="desc">
						<view class="text-content">
							时间：{{item.StartDate}} ~ {{item.EndDate}}<Br></Br>
							地点：{{item.Address}}
						</view>
					</view>
				</view>
			</view>
			<!-- cu-item -->
		</view>
	</view>
</template>

<script>
  import titleBar from './title-bar.vue'
  let app = require("@/config");
  let departId = uni.getStorageSync("defaultDepartId");;
  export default {
    components: {
      titleBar
    },
    methods: {
      changeMemShow() {
        this.showMemberReview = !this.showMemberReview;
      },
      changeActShow() {
        this.showAct = !this.showAct;
      },
      doSearch(text) {
        // text 即是输入的文本
        this.allActivity = this.data.filter(e=>e.ActivityName.indexOf(text)!==-1);
      },
      toProfile() {
        uni.toProfile()
      },
      audit(ID, userCode) {
        uni.navigateTo({
          url: "/iuc/profile/user-audit?userCode=" + userCode + "&ID=" + ID
        });
      },
      toConsole(actId) {
        uni.navigateTo({
          url: "/iuc/activity/activity-console?ID=" + actId
        });
      },
      commitUser(ID) {
        uni.post("/api/security/AcceptApplicate", {
          appId: ID
        }, msg => {
          uni.showToast({
            title: msg.msg,
            icon: 'none'
          });
          this.getPageData();
        })
      },
      navTo(e) {
        uni.navigateTo({
          url: e
        })
      },
      getPageData() {
        uni.post("/api/security/GetApplicationsByDeparts", {
          departId
        }, msg => {
          if (msg.success) {
            this.inApplyingApp = [];
            for (let i = 0; i < msg.data.length; i++) {
              if (msg.data[i].State === 3) {
                this.inApplyingApp.push(msg.data[i]);
              }
            }
          }
        });
        uni.post("/api/org/GetActByDepartId", {
          id: departId
        }, msg => {
          if (msg.success) {
            this.allActivity = msg.data;
			this.data = this.allActivity;
          }
        });
      }
    },
    data() {
      return {
        showMemberReview: true,
        showAct: true,
        searchText: "",
        inApplyingApp: [],
		data: [],
        allActivity: [],
        startState: {
          0: "未开始",
          1: "进行中",
          2: "已结束"
        },
        stateColor: {
          0: "green",
          1: "blue",
          2: "red"
        }
        onGoingAct: []
      };
    },
    onLoad() {
      this.getPageData();
    },
    onShow() {
      this.getPageData();
    }
  }
</script>

<style lang="less">
	.cu-card.article>.cu-item .title {
		font-size: 30rpx;
		font-weight: 900;
		color: #333333;
		line-height: 100rpx;
		padding: 0 30upx;
	}
</style>
