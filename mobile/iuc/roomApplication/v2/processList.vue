<template>
	<view id="process-list">
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">流程列表</block>
		</cu-custom>
		<transition-group class="cu-card" name="list">
			<view class="cu-item bg-informatic-brown shadow"
			v-for="(item,index) in data" :key="index">
				<sticky :item="item" />
			</view>
		</transition-group>
		<template v-if="data.length===0">
			<view class="padding-tb text-center text-lg">
				<text class="text-bold text-gray">暂无数据</text>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				data: [
					{
						Owner: "宋润涵",
						ArriveOn: "2020年7月1日",
						WorkflowName: "社团活动申请"
					},
					{
						Owner: "宋润涵",
						ArriveOn: "2020年7月2日",
						WorkflowName: "社团活动申请"
					},
					{
						Owner: "宋润涵",
						ArriveOn: "2020年7月3日",
						WorkflowName: "社团活动申请"
					}
				]
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	.cu-card>.cu-item {
		transition: all 1s;
	}
	.list-move{
		transition: all 0.8s;
	}
	.list-enter{
		opacity: 0;
		transform: translateY(-30px);
	}
	.list-leave-to{
		opacity: 0;
		transform: translateY(-30px);
	}
</style>
