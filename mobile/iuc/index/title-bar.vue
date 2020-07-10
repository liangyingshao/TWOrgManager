<template>
	<view class="bar bg-blue search-bar" id="search-bar">
		<view class="cu-bar search">
			<view class="cu-avatar round" :style="{backgroundImage: `url(${avatar})`}"></view>
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<input @confirm="doSearch" v-model="searchText" :adjust-position="false" type="text" :placeholder="placeholder" confirm-type="search"></input>
			</view>
			<view class="action hide">
				<text>广州</text>
				<text class="cuIcon-triangledownfill"></text>
			</view>
		</view>
		<view class="actions bg-blue" :class="{ 'fixed': isFixed }">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	let app = require("@/config")
	export default {
		props: {
			placeholder: {
				type: String,
				default: "搜索社团、活动"
			}
		},
		methods: {
			handleScroll () {
			  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			  let offsetTop = this.offsetTop - 20;
			  this.isFixed = (scrollTop > offsetTop);
			},
			doSearch () {
				this.$emit("input", this.searchText);
			}
		},
		data () {
			return {
				avatar: app.userInfo.avatar,
				isFixed: false,
				offsetTop: 0,
				searchText: ""
			}
		},
		mounted () {
			this.$nextTick(function () {
				let info = uni.createSelectorQuery().select(".search-bar");
				info.boundingClientRect(rect => {
					rect = document.getElementById("search-bar").getClientRects()[0];
					this.offsetTop = rect.height;
				}).exec()
			})
			window.addEventListener('scroll', this.handleScroll);
		},
		destroyed () {
			window.removeEventListener('scroll', this.handleScroll);
		}
	}
</script>

<style lang="scss">
</style>
