<template>
	<view>
		<cu-custom isBack="" bgColor="bg-gradual-blue">
			<block slot="content">新增活动</block>
		</cu-custom>
		<scroll-view scroll-y>
			<form @submit="submit">
				<view class="cu-form-group">
					<view class="title">社团名称</view>
					<input name="DepartName" :value="io.data.DepartName" :disabled="io.fieldAccess.DepartName === 'r' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">活动名称</view>
					<input name="ActivityName" :value="io.data.ActivityName" :disabled="io.fieldAccess.ActivityName === 'r' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">活动时间</view>
					<input name="StartDate" :value="io.data.StartDate" :disabled="io.fieldAccess.StartDate === 'r' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">活动时间</view>
					<input name="EndDate" :value="io.data.EndDate" :disabled="io.fieldAccess.EndDate === 'r' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">活动人数</view>
					<input name="AttendanceFigures" :value="io.data.AttendanceFigures" :disabled="io.fieldAccess.AttendanceFigures === 'r' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">预算金额</view>
					<input name="Budget" :value="io.data.Budget" :disabled="io.fieldAccess.Budget === 'r' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">活动地点</view>
					<input name="Address" :value="io.data.Address" :disabled="io.fieldAccess.Address === 'r' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">负责人员</view>
					<input name="Leader" :value="io.data.Leader" :disabled="io.fieldAccess.Leader === 'r' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">联系方式</view>
					<input name="Telephone" :value="io.data.Telephone" :disabled="io.fieldAccess.Telephone === 'r' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">活动类型</view>
					<input name="ActivityType" :value="io.data.ActivityType" :disabled="io.fieldAccess.ActivityType === 'r' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">面向范围</view>
					<input name="FaceTo" :value="io.data.FaceTo" :disabled="io.fieldAccess.FaceTo === 'r' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">活动内容</view>
					<input name="Description" :value="io.data.Description" :disabled="io.fieldAccess.Description === 'r' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">指导老师审核意见</view>
					<input name="GuideTeacherIsPass" :value="io.data.GuideTeacherIsPass" :disabled="io.fieldAccess.GuideTeacherIsPass === 'r' || !io.GuideTeacherIsPass"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">指导老师审核意见</view>
					<input name="GuideTeacherOpinion" :value="io.data.GuideTeacherOpinion" :disabled="io.fieldAccess.GuideTeacherOpinion === 'r' || !io.GuideTeacherOpinion"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">指导老师</view>
					<input name="GuideTeacher" :value="io.data.GuideTeacher" :disabled="io.fieldAccess.GuideTeacher === 'r' || !io.GuideTeacher"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">审核时间</view>
					<input name="GuideTeacherTime" :value="io.data.GuideTeacherTime" :disabled="io.fieldAccess.GuideTeacherTime === 'r' || !io.GuideTeacherTime"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">业务指导单位审核意见</view>
					<input name="AffiliatedDepartIsPass" :value="io.data.AffiliatedDepartIsPass" :disabled="io.fieldAccess.AffiliatedDepartIsPass === 'r' || !io.AffiliatedDepartIsPass"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">业务指导单位审核意见</view>
					<input name="AffiliatedDepartOpinion" :value="io.data.AffiliatedDepartOpinion" :disabled="io.fieldAccess.AffiliatedDepartOpinion === 'r' || !io.AffiliatedDepartOpinion"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">审核人员</view>
					<input name="AffiliatedDepart" :value="io.data.AffiliatedDepart" :disabled="io.fieldAccess.AffiliatedDepart === 'r' || !io.AffiliatedDepart"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">业务指导单位审核时间</view>
					<input name="AffiliatedDepartTime" :value="io.data.AffiliatedDepartTime" :disabled="io.fieldAccess.AffiliatedDepartTime === 'r' || !io.AffiliatedDepartTime"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">学生社团管理部意见</view>
					<input name="SauIsPass" :value="io.data.SauIsPass" :disabled="io.fieldAccess.SauIsPass === 'r' || !io.SauIsPass"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">学生社团管理部意见</view>
					<input name="SauOpinion" :value="io.data.SauOpinion" :disabled="io.fieldAccess.SauOpinion === 'r' || !io.SauOpinion"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">审核人员</view>
					<input name="Sau" :value="io.data.Sau" :disabled="io.fieldAccess.Sau === 'r' || !io.Sau"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">学生社团管理部审核时间</view>
					<input name="SauTime" :value="io.data.SauTime" :disabled="io.fieldAccess.SauTime === 'r' || !io.SauTime"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">校团委审核意见</view>
					<input name="YlcIsPass" :value="io.data.YlcIsPass" :disabled="io.fieldAccess.YlcIsPass === 'r' || !io.YlcIsPass"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">校团委审核意见</view>
					<input name="YlcOpinion" :value="io.data.YlcOpinion" :disabled="io.fieldAccess.YlcOpinion === 'r' || !io.YlcOpinion"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">审核人员</view>
					<input name="Ylc" :value="io.data.Ylc" :disabled="io.fieldAccess.Ylc === 'r' || !io.Ylc"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">校团委审核时间</view>
					<input name="YlcTime" :value="io.data.YlcTime" :disabled="io.fieldAccess.YlcTime === 'r' || !io.YlcTime"></input>
				</view>
				<view class="flex flex-direction margin-tb" v-show="io.isMyStep">
					<button class="cu-btn bg-blue lg" form-type="submit">提交</button>
				</view>
			</form>
		</scroll-view>
	</view>
</template>

<script>
export default {
	onLoad(query) {
		this.instanceId = query.instanceId;
		this.stepId = query.stepId;
		this.detailMode = Boolean(query.detail);
		this.getFieldAccess();
	},
	data() {
		return{
			io: {
				data: {},
				fieldAccess: {}
			},
			instanceId: "",
			stepId: "",
			detailMode: true,
			upLoad: {
				
			}
		}
	},
	methods: {
		getFieldAccess () {
			uni.post("/api/workflow/LoadInstance", {instanceId: this.instanceId, stepId: this.stepId, detail: this.detailMode}, msg => {
				if (msg.success) {
					this.io = msg;
				} else {
					
				}
			});
		},
		submit(e) {
			this.io.data = e.detail.value;
			this.io.shouldUpload.forEach(value => {
				this.upLoad[value] = this.io[value] || this.io.data[value]
			});
			uni.post("/api/workflow/SubmitInstance", {...this.upLoad}, msg => {
				if (msg.success) {
					this.$Message.info("保存成功");
				} else {
					this.$Message.warning(msg.msg);
				}
			})
		}
	} 
}
</script>

<style>
</style>
