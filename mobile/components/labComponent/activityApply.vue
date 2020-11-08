<template>
  <view class="cu-item" @click="toExecute(data)">
    <view class="content padding-tb-sm margin-right-xs">
  		<view v-if="data.State === 3">
  			<text class="cuIcon-roundcheck text-green margin-right-xs"></text>{{data.WorkflowName}}
  		</view>
  		<view v-else-if="data.State === 4">
  			<text class="cuIcon-roundclose text-red margin-right-xs"></text>{{data.WorkflowName}}
  		</view>
  		<view v-else-if="data.State === 5">
  			<text class="cuIcon-warn text-red margin-right-xs"></text>{{data.WorkflowName}}
  		</view>
  		<view v-else>
  			<text class="cuIcon-activityfill text-blue margin-right-xs"></text>{{data.WorkflowName}}
  		</view>
  		<view class="text-gray text-sm">
  			<text class="cuIcon-infofill margin-right-xs"></text> {{data.Owner}}提交的{{data.WorkflowType}}
  		</view>
  		<view class="text-gray text-sm" v-if="data.State === 3">
  			<text class="cuIcon-repairfill margin-right-xs"></text> 工作流已完成/{{data.ArriveOn}}
  		</view>
  		<view class="text-gray text-sm" v-else-if="data.State === 4">
  			<text class="cuIcon-repairfill margin-right-xs"></text> 工作流已取消/{{data.ArriveOn}}
  		</view>
  		<view class="text-gray text-sm" v-else-if="data.State === 5">
  			<text class="cuIcon-repairfill margin-right-xs"></text> 工作流已结束/{{data.ArriveOn}}
  		</view>
  		<view class="text-gray text-sm" v-else>
  			<text class="cuIcon-repairfill margin-right-xs"></text> 当前步骤：{{data.StepName}} @{{data.ExecutorName}}/{{data.ArriveOn}}
  		</view>
  	</view>
  	<view class="action">
  		<button class="cu-btn bg-green shadow" @click="toExecute(data)">
  			详情
  		</button>
  	</view>
  </view>
</template>

<script>
  export default{
    data(){
      return {

      }
    },
    props:{
    	data:{
    		required: true
    	}
    },
    methods:{
    	toExecute(data) {
    		/*if (data.WorkflowType === "社团活动申请") {
    			uni.navigateTo({
    				url: `../../activity/activity?instanceId=${data.InstanceId}&stepId=${data.StepId}&detail=true`
    			})
    		} else if (data.WorkflowName === "按机位申请实验室") {
    			uni.setStorage({
    				key: 'jmpInfo',
    				data: data,
    				success: () => { //如果缓存成功则跳转
    					uni.navigateTo({
    						url: './seatFlowsCtrl'
    					})
    				}
    			})
    		}*/
			uni.navigateTo({
				url: `../../activity/activity?instanceId=${data.InstanceId}&stepId=${data.StepId}&detail=true`
			})
    	}
    }
  }
</script>

<style>
</style>
