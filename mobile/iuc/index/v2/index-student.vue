<template>
	<view>
		<title-bar :placeholder="searchText" @input="doSearch">
			<view class="act-btn" @click="navTo('../roomApplication/v2/myClub')">
				<text class="icon cuIcon-home"></text>
				<text v-html="firtstButtonText"></text>
			</view>
			<view class="act-btn" @click="toTab('applicate')">
				<text class="icon cuIcon-light"></text>
				<text>报名活动</text>
			</view>
			<view class="act-btn" @click="toTab('myactivity')">
				<text class="icon cuIcon-activity"></text>
				<text>我的活动</text>
			</view>
			<view class="act-btn" @click="toProfile()">
				<text class="icon cuIcon-profile"></text>
				<text>个人中心</text>
			</view>
		</title-bar>
		<!--这是正在进行的，我可以参加的活动-->
		<view v-if="showTab === 'applicate'" class="tab applicate">
			<act-sign-up></act-sign-up>
			<act-sign-up></act-sign-up>
			<act-sign-up></act-sign-up>
			<act-sign-up></act-sign-up>
			<act-sign-up></act-sign-up>
		</view>
		<view v-if="showTab === 'myactivity'" class="tab applicate">
			<act-sign-up detail></act-sign-up>
			<act-sign-up detail></act-sign-up>
			<act-sign-up detail></act-sign-up>
			<act-sign-up detail></act-sign-up>
			<act-sign-up detail></act-sign-up>
		</view>
	</view>
</template>

<script>
	import titleBar from './title-bar.vue'
	import orgInfo from './components/org-info.vue'
	import actSignUp from './components/act-signUp.vue'
	let app = require("@/config")
	export default {
		components: { titleBar, orgInfo, actSignUp },
		methods: {
			toTab (name) {
				document.body.scrollTop = 0;
				this.showTab = name;
				if (name === "my-orgs") {
					this.searchText = "搜索社团"
				} else {
					this.searchText = "搜索活动"
				}
			},
			doSearch (text) {
				// text 即是输入的文本
				console.log(text);
			},
			toProfile () {
				uni.toProfile()
			},
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			}
		},
		data () {
			// 1. 在可以申请加入社团的时候，第一个按钮显示：“查找社团”
			// 2. 如果用户已经加入了两个社团，显示：“我的社团”
			return {
				firtstButtonText: "我的社团",
				searchText: "搜索活动",
				showTab: "applicate" // "my-orgs"
			}
		}
	}
</script>

<style lang="scss">
	.tab {
		padding-top: 15px;
	}
</style>
