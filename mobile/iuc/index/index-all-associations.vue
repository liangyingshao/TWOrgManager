<template>
	<view>
		<cu-custom bgColor="bg-blue" isBack>
			<block slot="backText">返回</block>
			<block slot="content">社团列表</block>
		</cu-custom>
    <view class="bg-white cu-bar search">
      <view class="search-form radius">
      	<text class="cuIcon-search"></text>
        <input @confirm="doSearch(text)" v-model="text"
        :adjust-position="false" type="text" :placeholder="searchText"
        confirm-type="search"></input>
      </view>
    </view>
		<view class="padding-lr bg-white solids-bottom" v-for="(item,index) in departs" :key="index" @click="toDetail(item.id)">
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-newsfill text-blue margin-right-xs"></text>[{{item.parent}}] {{item.name}}</view>
					<view class="text-gray text-sm text-cut margin-top-sm">
						<text class="cuIcon-wenzi margin-right-xs"></text>管理员：{{item.admin}}
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	let app = require("@/config");
	export default {
		data() {
			return {
				departs: [],
				searchText: "搜索社团名称",
        text: "",
        data: []
			}
		},
		onLoad() {
			uni.post("/api/security/GetAllAssociationsByDepartId", {
				departId: app.defaultDepartId
			}, msg => {
        this.data = msg.data;
				this.departs = msg.data;
			});
		},
		methods: {
			toDetail(departId) {
				uni.navigateTo({
					url: "/iuc/index/index-teacher?departId=" + departId
				});
			},
      doSearch(text) {
      	// text 即是输入的文本
      	if (text === "") {
          this.departs = this.data;
        } else {
          this.departs = this.data.filter(e=>e.name.indexOf(text)!==-1);
        }

      }
		}
	}
</script>

<style>
</style>
