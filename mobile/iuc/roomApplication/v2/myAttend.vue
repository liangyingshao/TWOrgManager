<template>
	<view>
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="backText">返回</block>
			<block slot="content">我的参与</block>
		</cu-custom>
		<transition-group class="cu-list menu" name="list">
			<template v-for="(item,index) in roomData">
        <activityApply :data="item"  :key="index"></activityApply>
      </template>
		</transition-group>
		<template v-if="roomData.length===0 && displayRoom">
			<view class="padding-tb text-center text-lg">
				<text class="text-bold text-gray">暂无数据</text>
			</view>
		</template>
	</view>
</template>

<script>
	const guidEmpty = "00000000-0000-0000-0000-000000000000";
	let app = require("@/config");
	let enums = require("../enumsv1.js");
	export default {
		onShow() {

		},
		onLoad(query) {
			this.getData(query.departId);
		},
		methods: {
			getData(departId) {
				uni.post("/api/workflow/MyAttend", {
					page: 1,
					pageSize: 10,
					departId: departId || guidEmpty
				}, msg => {
					this.roomData = msg.data;
				})
			},
			toExecute(item) {
				if (item.WorkflowType === "社团活动申请") {
					uni.navigateTo({
						url: `../../activity/activity?instanceId=${item.InstanceId}&stepId=${item.StepId}&detail=true`
					})
				} else if (item.WorkflowName === "按机位申请实验室") {
					uni.setStorage({
						key: 'jmpInfo',
						data: item,
						success: () => { //如果缓存成功则跳转
							uni.navigateTo({
								url: './seatFlowsCtrl'
							})
						}
					})
				}
			},
			/*// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			listTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			listTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},*/
			foldUp(e) {
				this[e] = !this[e];
			}
		},
		data() {
			return {
				workflow: enums.workflow,
				wColor: enums.workflowColor,
				icon: app.webInfo.avatar,
				page: 1,
				pageSize: 10,
				roomData: [],
				seatData: [],
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
				displayRoom: true,
				displaySeat: true
			}
		}
	}
</script>

<style>
	.cu-list>.cu-item {
		padding-top: 16rpx;
		padding-bottom: 6rpx;
		transition: all 1s;
	}

	.list-move {
		transition: all 1s;
	}

	.list-enter {
		opacity: 0;
		transform: translateY(-30px);
	}

	.list-leave-to {
		opacity: 0;
		transform: translateY(-30px);
	}

	.cu-list.menu>.cu-item {
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		padding: 0 18px;
		min-height: 60px;
		background-color: #fff;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
	}
</style>
