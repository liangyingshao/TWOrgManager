<template>
	<view class="act-console">
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="backText">返回</block>
			<block slot="content">活动详情</block>
		</cu-custom>
		<view class="text-xl text-center padding-xl text-bold">
			<view>活动名称</view>
			<!--
			 这个小标记可以用组件做，在index-depart-manager里也有这个东西，颜色：
			 进行中 用绿色，
			 未开始 用蓝色，
			 已结束 用红色。
			-->
			<view class="text-sm cu-tag bg-green margin-top-xs round">
				进行中
			</view>
		</view>
		<!-- 如果活动已经开始，则显示以下的二维码 -->
		<view class="qr-container margin-bottom-xl">
			<image class="qr-area" src="http://stgl.ricebird.cn/qr/RpE7w5-h?size=200"></image>
		</view>
		<!-- 如果活动如果申请流程还没有结束 -->
		<view class="qr-container margin-bottom-xl text-center hide">
			<image class="on-working" src="/static/none.png" mode="aspectFit"></image>
			<view class="text-xl margin-top-sm">活动正在审核中</view>
			<view class="text-sm margin-top-xs text-grey">当前步骤：团委审核</view>
		</view>
		<!-- 活动如果审批结束，但还没有开始，则显示这个 -->
		<view class="qr-container margin-bottom-xl padding-lr-xl hide">
			<button class="on-working btn bg-green">
				点击开始
			</button>
		</view>
		<view class="cu-list grid col-3 no-border">
			<view class="cu-item">
				<view class="cuIcon-infofill"></view>
				<text>活动详情</text>
			</view>
			<!-- 这里红点显示的是，是否有未审核的人。注意大于99则显示为 99+ 小于显示数字-->
			<view class="cu-item">
				<view class="cuIcon-friendfavor">
					<view class="cu-tag badge">
						<block>10</block>
					</view>
				</view>
				<text>报名情况</text>
			</view>
			<!-- 这里的红点显示的是签到人数 -->
			<view class="cu-item">
				<view class="cuIcon-selection">
					<view class="cu-tag badge">
						<block>99+</block>
					</view>
				</view>
				<text>签到情况</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {}
		}
	}
</script>

<style>
	.act-console {
		background: #fff;
		min-height: calc(100vh);
	}
	.qr-container {
		width: 100%;
	}
	
	.qr-area {
		width: 200px;
		height: 200px;
		margin: 0 auto;
		display: block;
	}
	
	.on-working {
		width: 100%;
	}
</style>
