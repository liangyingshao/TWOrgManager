<template>
	<view>
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">活动列表</block>
		</cu-custom>
		<view class="margin-top-sm">
			<act-sign-up></act-sign-up>
			<act-sign-up></act-sign-up>
			<act-sign-up></act-sign-up>
			<act-sign-up></act-sign-up>
			<act-sign-up></act-sign-up>
		</view>
	</view>
</template>

<script>
	import titleBar from '../index/title-bar.vue'
	import actSignUp from '../index/components/act-signUp.vue'
	export default {
		components: { titleBar, actSignUp},
		data() {
			return {
				firtstButtonText: "我的社团",
				searchText: "搜索活动",
				showTab: "applicate" // "my-orgs"
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
