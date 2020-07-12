<template>
	<view class="card card-style">
		<view class="content">
			<view class="font-16 font-600" :style="{marginBottom: showDetail ? '30px' : '0px'}" @click="toggle()">
				<i class="mr-1" :class="{ 'cuIcon-unfold': showDetail, 'cuIcon-fold': !showDetail }" />
				成员审核 ({{model.length}})
			</view>
			<view v-for="(item, index) in model" :key="index" class="myclass" :class="{hide: !showDetail}">
				<view class="d-flex">
					<view class="text-center text-xxl">
						<text class="mr-3 fa cuIcon-peoplefill rounded-circle shadow-l bg-blue light" style="margin-top: 5px;width: 50px; height: 50px; line-height: 50px;"></text>
					</view>
					<view>
						<view class="h5 mt-1 mb-0">{{item.name}}（{{item.college}}）</view>
						<view class="p font-14 color-red2-dark" style="margin-top: 5px;">{{item.phone}}</view>
					</view>
					<view style="margin-left: auto;">
						<text class="next-slide-user badge bg-green1-dark mt-2 p-2 font-14">通过</text>
						<text class="next-slide-user badge bg-red2-dark mt-2 p-2 font-14 margin-left-xs">拒绝</text>
					</view>
				</view>
				<view class="divider mt-3"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props: {
			model: {
				type: Array,
				default () {
					return [
						{ name: "黄玺", college: "信息学院", phone: "13606924649" },
						{ name: "黄玺", college: "信息学院", phone: "13606924649" },
						{ name: "黄玺", college: "信息学院", phone: "13606924649" },
						{ name: "黄玺", college: "信息学院", phone: "13606924649" },
						{ name: "黄玺", college: "信息学院", phone: "13606924649" }
					];
				}
			}
		},
		methods: {
			toggle () {
				this.showDetail = !this.showDetail;
			}
		},
		data() {
			return {
				showDetail: false
			}
		}
	}
</script>

<style lang="scss">
.card-style {
	overflow: hidden;
	margin: 0px 16px 30px 16px;
	border-radius: 15px;
	border: none;
	box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1) !important;
}
.card {
	position: relative;
	display: flex;
	flex-direction: column;
	min-width: 0;
	background-color: #fff;
	background-clip: border-box;
}
.content {
	margin: 20px 15px 20px 15px;
}
.h3 {
	font-weight: 700;
	color: #1f1f1f;
	font-family: "Poppins", sans-serif;
	margin-bottom: 5px;
	letter-spacing: -0.4px;
	font-size: 20px;
	line-height: 24px;
}
.divider {
    height: 1px;
    display: block;
    background-color: rgba(0, 0, 0, 0.05);
    margin-bottom: 30px;
}
.mt-3 {
    margin-top: 1rem;
}
.d-flex {
	display: flex;
}
.mt-1{
    margin-top: 0.25rem;
}
.mb-0{
    margin-bottom: 0;
}
.h5 {
    font-size: 16px;
    line-height: 22px;
	font-weight: 700;
	color: #1f1f1f;
	font-family: "Poppins", sans-serif;
	letter-spacing: -0.4px;
}
.p {
	display: block;
	margin-block-start: 1em;
	margin-block-end: 1em;
	margin-inline-start: 0px;
	margin-inline-end: 0px;
	padding-bottom: 0px;
}
.mt-n1 {
    margin-top: -0.25rem;
}
.font-10 {
    font-size: 10px;
}
.color-red2-dark {
    color: #DA4453;
}
.bg-red2-dark {
    background-color: #DA4453;
    color: #FFFFFF;
}
.bg-green1-dark {
    background-color: #8CC152;
    color: #FFFFFF;
}
.content .p:last-child {
	margin-bottom: 0px;
}
.mr-3{
    margin-right: 1rem;
}
.font-8 {
    font-size: 8px;
}
.p-2 {
    padding: 0.5rem;
}
.mt-2, .my-2 {
    margin-top: 0.5rem;
}
.badge {
    display: inline-block;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.myclass:last-child .divider {
	display: none;
}
.rounded-circle {
    border-radius: 50%;
}
image {
    vertical-align: middle;
    border-style: none;
}
.shadow-l {
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.09);
}
.fa-user:before {
    content: "\f007";
}
.fa{
    font-weight: 900;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	display: inline-block;
	font-style: normal;
	font-variant: normal;
	text-rendering: auto;
}
</style>
