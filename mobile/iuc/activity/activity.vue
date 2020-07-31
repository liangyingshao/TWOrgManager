<template>
	<view>
		<cu-custom isBack="" bgColor="bg-gradual-blue">
			<block slot="content">编辑活动</block>
		</cu-custom>
		<scroll-view scroll-y>
			<form @submit="submit">
				<view class="cu-bar bg-white solids-bottom">
					<view class="action">
						<text class="cuIcon-title text-green"></text>
						<text class="text-xl text-bold">活动基本信息</text>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">社团名称</view>
					<input name="DepartName" v-model="io.data.DepartName" :disabled="io.fieldAccess.DepartName !== 'w' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">活动名称</view>
					<input name="ActivityName" v-model="io.data.ActivityName" :disabled="io.fieldAccess.ActivityName !== 'w' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">活动时间</view>
					<input name="StartDate" v-model="io.data.StartDate" :disabled="io.fieldAccess.StartDate !== 'w' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">活动时间</view>
					<input name="EndDate" v-model="io.data.EndDate" :disabled="io.fieldAccess.EndDate !== 'w' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">活动人数</view>
					<input name="AttendanceFigures" v-model="io.data.AttendanceFigures" :disabled="io.fieldAccess.AttendanceFigures !== 'w' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">预算金额</view>
					<input name="Budget" v-model="io.data.Budget" :disabled="io.fieldAccess.Budget !== 'w' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">活动地点</view>
					<input name="Address" v-model="io.data.Address" :disabled="io.fieldAccess.Address !== 'w' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">负责人员</view>
					<input name="Leader" v-model="io.data.Leader" :disabled="io.fieldAccess.Leader !== 'w' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">联系方式</view>
					<input name="Telephone" v-model="io.data.Telephone" :disabled="io.fieldAccess.Telephone !== 'w' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">活动类型</view>
					<input name="ActivityType" v-model="io.data.ActivityType" :disabled="io.fieldAccess.ActivityType !== 'w' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">面向范围</view>
					<input name="FaceTo" v-model="io.data.FaceTo" :disabled="io.fieldAccess.FaceTo !== 'w' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">活动内容</view>
					<input name="Description" v-model="io.data.Description" :disabled="io.fieldAccess.Description !== 'w' || !io.isMyStep"></input>
				</view>
				<view class="cu-bar bg-white solids-bottom margin-top-xs" v-if="io.fieldAccess.GuideTeacherOpinion">
					<view class="action">
						<text class="text-bold" :class="io.data.GuideTeacherIsPass ? 'cuIcon-check text-green' : 'cuIcon-close text-red'"></text>
						<text class="text-xl text-bold">指导老师审核</text>
					</view>
				</view>
				<view class="cu-form-group" v-if="io.fieldAccess.GuideTeacherIsPass">
					<view class="title">是否通过
					</view>
					<radio-group class="block" @change="RadioChange">
						<radio :disabled="!io.fieldAccess.GuideTeacherOpinion || io.fieldAccess.GuideTeacherOpinion === 'r' || !io.isMyStep"
						 class=' margin-right-xs' :class="io.data.GuideTeacherIsPass==='true'?'checked':''" :checked="io.data.GuideTeacherIsPass==='true'?true:false"
						 value='true'></radio>是
						<radio :disabled="!io.fieldAccess.GuideTeacherOpinion || io.fieldAccess.GuideTeacherOpinion === 'r' || !io.isMyStep"
						 class=' margin-left-sm margin-right-xs' :class="io.data.GuideTeacherIsPass==='false'?'checked':''" :checked="io.data.GuideTeacherIsPass==='false'?true:false"
						 value='false'></radio>否
					</radio-group>
				</view>
				<view class="cu-form-group" v-if="io.fieldAccess.GuideTeacherOpinion">
					<view class="title">审核意见</view>
					<input name="GuideTeacherOpinion" v-model="io.data.GuideTeacherOpinion" :disabled="io.fieldAccess.GuideTeacherOpinion !== 'w' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group" v-if="io.fieldAccess.GuideTeacherOpinion">
					<view class="title">教师姓名</view>
					<input name="GuideTeacher" v-model="io.data.GuideTeacher" :disabled="io.fieldAccess.GuideTeacher !== 'w' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group" v-if="io.fieldAccess.GuideTeacherOpinion">
					<view class="title">审核时间</view>
					<input name="GuideTeacherTime" v-model="io.data.GuideTeacherTime" :disabled="io.fieldAccess.GuideTeacherTime !== 'w' || !io.isMyStep"></input>
				</view>
				<view class="cu-bar bg-white solids-bottom margin-top-xs" v-if="io.fieldAccess.AffiliatedDepartOpinion">
					<view class="action">
						<text class="cuIcon-title text-"></text>
						<text class="text-xl text-bold">业务指导单位审核</text>
					</view>
				</view>
				<view class="cu-form-group" v-if="io.fieldAccess.AffiliatedDepartIsPass">
					<view class="title">是否通过
					</view>
					<radio-group class="block" @change="RadioChange">
						<radio :disabled="!io.fieldAccess.AffiliatedDepartOpinion || io.fieldAccess.AffiliatedDepartOpinion === 'r' || !io.isMyStep"
						 class=' margin-right-xs' :class="io.data.AffiliatedDepartIsPass==='true'?'checked':''" :checked="io.data.AffiliatedDepartIsPass==='true'?true:false"
						 value='true'></radio>是
						<radio :disabled="!io.fieldAccess.AffiliatedDepartOpinion || io.fieldAccess.AffiliatedDepartOpinion === 'r' || !io.isMyStep"
						 class=' margin-left-sm margin-right-xs' :class="io.data.AffiliatedDepartIsPass==='false'?'checked':''" :checked="io.data.AffiliatedDepartIsPass==='false'?true:false"
						 value='false'></radio>否
					</radio-group>
				</view>
				<view class="cu-form-group" v-if="io.fieldAccess.AffiliatedDepartOpinion">
					<view class="title">审核意见</view>
					<input name="AffiliatedDepartOpinion" v-model="io.data.AffiliatedDepartOpinion" :disabled="io.fieldAccess.AffiliatedDepartOpinion !== 'w' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group" v-if="io.fieldAccess.AffiliatedDepartOpinion">
					<view class="title">审核人员</view>
					<input name="AffiliatedDepart" v-model="io.data.AffiliatedDepart" :disabled="io.fieldAccess.AffiliatedDepart !== 'w' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group" v-if="io.fieldAccess.AffiliatedDepartOpinion">
					<view class="title">审核时间</view>
					<input name="AffiliatedDepartTime" v-model="io.data.AffiliatedDepartTime" :disabled="io.fieldAccess.AffiliatedDepartTime !== 'w' || !io.isMyStep"></input>
				</view>
				<view class="cu-bar bg-white solids-bottom margin-top-xs" v-if="io.fieldAccess.SauOpinion">
					<view class="action">
						<text class="cuIcon-title text-green"></text>
						<text class="text-xl text-bold">学生社团管理部审核</text>
					</view>
				</view>
				<view class="cu-form-group" v-if="io.fieldAccess.SauIsPass">
					<view class="title">是否通过
					</view>
					<radio-group class="block" @change="RadioChange">
						<radio :disabled="!io.fieldAccess.SauOpinion || io.fieldAccess.SauOpinion === 'r' || !io.isMyStep" class=' margin-right-xs'
						 :class="io.data.SauIsPass==='true'?'checked':''" :checked="io.data.SauIsPass==='true'?true:false" value='true'></radio>是
						<radio :disabled="!io.fieldAccess.SauOpinion || io.fieldAccess.SauOpinion === 'r' || !io.isMyStep" class=' margin-left-sm margin-right-xs'
						 :class="io.data.SauIsPass==='false'?'checked':''" :checked="io.data.SauIsPass==='false'?true:false" value='false'></radio>否
					</radio-group>
				</view>
				<view class="cu-form-group" v-if="io.fieldAccess.SauOpinion">
					<view class="title">审核意见</view>
					<input name="SauOpinion" v-model="io.data.SauOpinion" :disabled="io.fieldAccess.SauOpinion !== 'w' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group" v-if="io.fieldAccess.SauOpinion">
					<view class="title">审核人员</view>
					<input name="Sau" v-model="io.data.Sau" :disabled="io.fieldAccess.Sau !== 'w' || !io.isMyStep"></input>
				</view>
				<view class="cu-form-group" v-if="io.fieldAccess.SauOpinion">
					<view class="title">审核时间</view>
					<input name="SauTime" v-model="io.data.SauTime" :disabled="io.fieldAccess.SauTime !== 'w' || !io.isMyStep"></input>
				</view>
				<view class="cu-bar bg-white solids-bottom margin-top-xs" v-if="io.fieldAccess.YlcOpinion">
					<view class="action">
						<text class="cuIcon-title text-green"></text>
						<text class="text-xl text-bold">校团委审核</text>
					</view>
				</view>
				<view class="cu-form-group" v-if="io.fieldAccess.YlcIsPass">
					<view class="title">是否通过
					</view>
					<radio-group class="block" @change="RadioChange">
						<radio :disabled="!io.fieldAccess.YlcOpinion || io.fieldAccess.YlcOpinion === 'r' || !io.isMyStep" class=' margin-right-xs'
						 :class="io.data.YlcIsPass==='true'?'checked':''" :checked="io.data.AffiliatedDepartIsPass==='true'?true:false"
						 value='true'></radio>是
						<radio :disabled="!io.fieldAccess.YlcOpinion || io.fieldAccess.YlcOpinion === 'r' || !io.isMyStep" class=' margin-left-sm margin-right-xs'
						 :class="io.data.YlcIsPass==='false'?'checked':''" :checked="io.data.AffiliatedDepartIsPass==='false'?true:false"
						 value='false'></radio>否
					</radio-group>
				</view>
				<view class="cu-form-group" v-if="io.fieldAccess.YlcOpinion">
					<view class="title">审核意见</view>
					<input name="YlcOpinion" v-model="io.data.YlcOpinion" :disabled="io.fieldAccess.YlcOpinion !== 'w' || !io.YlcOpinion"></input>
				</view>
				<view class="cu-form-group" v-if="io.fieldAccess.YlcOpinion">
					<view class="title">审核人员</view>
					<input name="Ylc" v-model="io.data.Ylc" :disabled="io.fieldAccess.Ylc !== 'w' || !io.Ylc"></input>
				</view>
				<view class="cu-form-group" v-if="io.fieldAccess.YlcOpinion">
					<view class="title">审核时间</view>
					<input name="YlcTime" v-model="io.data.YlcTime" :disabled="io.fieldAccess.YlcTime !== 'w' || !io.YlcTime"></input>
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
			return {
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
			RadioChange(e) {
				if (this.io.fieldAccess.GuideTeacherIsPass === 'w') {
					this.io.data.GuideTeacherIsPass = e.detail.value;
					//console.log(this.io.data.GuideTeacherIsPass)
				} else if (this.io.fieldAccess.AffiliatedDepartIsPass === 'w') {
					this.io.data.AffiliatedDepartIsPass = e.detail.value;
					//console.log("2")
				} else if (this.io.data.SauIsPass === 'w') {
					this.io.data.SauIsPass = e.detail.value;
					//console.log("3")
				} else if (this.io.data.YlcIsPass === 'w') {
					this.io.data.YlcIsPass = e.detail.value;
					//console.log("4")
				}
			},
			getFieldAccess() {
				uni.post("/api/workflow/LoadInstance", {
					instanceId: this.instanceId,
					stepId: this.stepId,
					detail: this.detailMode
				}, msg => {
					if (msg.success) {
						this.io = msg;
					} else {

					}
				});
			},
			submit(e) {
				//this.io.data = e.detail.value;
				this.io.shouldUpload.forEach(value => {
					this.upLoad[value] = this.io[value] || this.io.data[value]
				});
				uni.post("/api/workflow/SubmitInstance", { ...this.upLoad
				}, msg => {
					if (msg.success) {
						uni.showToast({
							title: "保存成功"
						});
						uni.navigateBack({
							delta: 1
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: msg.msg
						})
					}
				})
			}
		}
	}
</script>

<style>
</style>
