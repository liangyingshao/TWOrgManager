<template>
	<view>
		<cu-custom isBack="/iuc/login/login" bgColor="bg-gradual-blue">
			<block slot="content">选择身份</block>
		</cu-custom>
		<view class="cu-list menu">
			<!-- 
				此处应该访问 /api/security/GetMyPositions 接口，文档见语雀 https://www.yuque.com/ricebird/cards/xhmn1d
				返回结果时，必定有一项是“普通成员”，这一项特殊处理一下。
				其它项，都显示为 {{departName}}({{position}})
				选择部门后，后续所有接口，实际 departId 的，都使用本步骤选择的ID。
				PC版需要一样处理。
			-->
			<view class="cu-item arrow" v-for="role in availableRoles" :key="role.departId">
				<view class="content" @click="choosePosition(role)">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">{{role.departName}}{{role.position}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let app = require("@/config");
	export default {
		data () {
			return {
				availableRoles: []
			}
		},
		onLoad() {
			this.getAvailablePositon();
		},
		methods: {
			choosePosition(role) {
				uni.chosePostion(role);
				uni.switchDashboard(role);
			},
			getAvailablePositon() {
				uni.post("/api/security/GetMyPositions", {}, msg => {
					if(msg.success){
						this.availableRoles = msg.data;
						if(this.availableRoles.length === 1) {
							this.choosePosition(this.availableRoles[0]);
						}
					}
				})
			}
		}
	}
</script>

<style>
</style>
