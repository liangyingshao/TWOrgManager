<template>
	<view>
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="backText">返回</block>
			<block slot="content">活动详细信息</block>
		</cu-custom>
		<view class="text-xl padding-sm act-title">这是活动的大标题</view>
		<view class="padding-left-sm padding-right-sm author-area">
			<view class="cu-avatar round md" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)"></view>
			<view class="desc-text padding-left-sm">
				<text class="author-name">测试社团</text>
				<text class="text-gray">2020年10月10日</text>
			</view>
		</view>
		<image class="topic-pic padding-sm" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg" mode="aspectFill"></image>
		<view class="act-desc padding-left-sm padding-right-sm">
			这里写上活动的详细描述，一般来说非常的长。
		</view>
		<!-- 
			星号用以显示报名状态，后面的按钮显示活动状态，需要有以下文字内容：
			1、活动还没有开始时，显示“立即报名”
			2、活动正在进行中时，显示灰色按钮“活动进行中”，灰色按钮就是把“bg-blue”换成"bg-grey"
			3、活动结束后，显示灰色按钮“活动已结束”
			--------------------
			1、在活动开始前，报名按钮可以点击。签到按钮显示“未开始”，点了提示“活动还未开始”
			2、活动进行中，报名按钮不再可以点击（点了提示“活动已经开始”），签到按钮点击视为签到
			3、活动结束后，所有按钮点了都提示“活动已经结束”
			
		-->
		<view class="cu-bar bg-white tabbar border shop foot">
			<view class="action">
				<view class="cuIcon-favorfill text-orange"></view>
				已报名
			</view>
			<view class="action">
				<view class="cuIcon-selection text-green"></view>
				未签到
			</view>
			<view class="bg-blue submit">立即报名</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less" scoped>
	.topic-pic {
		height: 400rpx;
		width: 100%;
	}
	.act-title {
		font-size: 50rpx;
	}
	.author-area {
		display: flex;
		.desc-text {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			text {
				display: block;
				
			}
			.author-name {
				font-weight: bold;
			}
		}
	}
	.act-desc {
		text-indent: 2em;
		font-size: 40rpx;
		
	}
</style>
