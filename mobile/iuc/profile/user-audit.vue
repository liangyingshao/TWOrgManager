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
						<text class="text-xl text-bold">黄玺</text>
						<text class="text-lg text-gray block margin-top-xs">学号：2012231142</text>
						<text class="text-lg text-gray block margin-top-xs">学院：信息学院</text>
						<text class="text-lg text-gray block margin-top-xs">手机：13606924649</text>
					</view>
				</view>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green lg">通过</button>
			<button class="cu-btn bg-red margin-tb-sm lg">取消</button>
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
					<text class="text-sm">2010-7-22</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
</style>
