<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">个人信息</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">头像</view>
				<view class="cu-avatar radius bg-gray">
					<image></image>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">姓名</view>
				<input v-model="userInfo.RealName" placeholder="请输入姓名" name="input" class="text-right"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">民族</view>
				<input v-model="userInfo.BirthPlace" placeholder="请输入民族" name="input" class="text-right"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<picker @change="PickerChange($event, 'Gender')" :value="genIndex" :range="gender">
					<view class="picker">
						{{userInfo.Gender === '' ? gender[0] : userInfo.Gender}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">籍贯</view>
				<input v-model="userInfo.Source" placeholder="请输入籍贯" name="input" class="text-right"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">学历</view>
				<picker @change="PickerChange($event, 'Educational')" :value="eduIndex" :range="dic['学历']">
					<view class="picker">
						{{userInfo.Educational === '' ? dic['学历'][0] : userInfo.Educational}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">学/工号</view>
				<input :disabled="true" v-model="userInfo.Code" name="input" class="text-right"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">所属校区</view>
				<picker @change="PickerChange($event, 'Campus')" :value="campIndex" :range="dic['校区']">
					<view class="picker">
						{{userInfo.Campus === '' ? dic["校区"][0]:userInfo.Campus}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">学院</view>
				<picker @change="PickerChange($event, 'Depart')" :value="belongIndex" :range="dic['学院']">
					<view class="picker">
						{{userInfo.BelongDepart === '' ? dic["学院"][0]:userInfo.BelongDepart}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">手机</view>
				<input placeholder="请输入手机号" v-model="userInfo.Mobile" name="input" class="text-right"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">邮箱</view>
				<input placeholder="请输入邮箱" v-model="userInfo.Email" name="input" class="text-right"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">QQ</view>
				<input placeholder="请输入QQ" v-model="userInfo.QQ" name="input" class="text-right"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">入团时间</view>
				<picker mode="date" :value="userInfo.JoinCCYLTime" start="1900-01-01" end="2500-09-01" @change="DateChange($event, 'JoinCCYLTime')">
					<view class="picker">
						{{userInfo.JoinCCYLTime}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">入党时间</view>
				<picker mode="date" :value="userInfo.JoinCPCTime" start="1900-01-01" end="2500-09-01" @change="DateChange($event, 'JoinCPCTime')">
					<view class="picker">
						{{userInfo.JoinCPCTime}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">政治面貌</view>
				<picker @change="PickerChange($event, 'Political')" :value="poliIndex" :range="dic['政治面貌']">
					<view class="picker">
						{{userInfo.PoliticalStatus === '' ? dic["政治面貌"][0]:userInfo.PoliticalStatus}}
					</view>
				</picker>
			</view>
		</form>
		<button class="margin-top bg-blue lg margin-lr" form-type="submit" @click="save()">确认更新</button>
	</view>
</template>

<script>
	export default{
		onShow() {
			this.GetUserInfo();
			this.GetDataDictionary();
		},
		data() {
			return{
				userInfo: {},
				dic: [],
				campIndex: -1,
				genIndex: -1,
				eduIndex: -1,
				belongIndex: -1,
				souIndex: -1,
				poliIndex: -1,
				gender: ["男", "女"]
			}
		},
		methods: {
			PickerChange(e, option){
				if(option === 'Political'){
					this.userInfo.PoliticalStatus = this.dic['政治面貌'][e.detail.value];
					this.poliIndex = e.detail.value;
				}
				else if(option === 'Campus') {
					this.userInfo.Campus = this.dic["校区"][e.detail.value];
					this.campIndex = e.detail.value;
				}
				else if(option === 'Educational'){
					this.userInfo.Educational = this.dic['学历'][e.detail.value];
					this.eduIndex = e.detail.value;
				}
				else if(option === 'Depart') {
					this.userInfo.BelongDepart = this.dic['学院'][e.detail.value];
					this.belongIndex = e.detail.value;
				}
				else if(option === 'gender') {
					this.userInfo.Gender = this.gender[e.detail.value];
					this.genIndex = e.detail.value;
				}
			},
			GetUserInfo() {
				uni.post("/api/security/GetUserById", {}, msg=>{
					if (msg.success) {
						this.userInfo = msg.user;
					}
				})
			},
			GetDataDictionary() {
				uni.post("/api/config/GetDataDictionary", {}, msg=>{
					if (msg.success) {
						var x = {};
						let t = msg.Dictionary;
						for(let obj in t) {
							var temp = [];
							for(let i  in t[obj])
							{
								temp.push(i);
							}
							x[obj] = temp;
						}
						this.dic = x;
					}
				})
			},
			DateChange(e, time) {
				// console.log(data)
				if(time === "JoinCCYLTime") {
					this.userInfo.JoinCCYLTime = this.changeDateForm(e.detail.value)
				}
				else if(time === "JoinCPCTime") {
					this.userInfo.JoinCPCTime = this.changeDateForm(e.detail.value)
				}
			},
			changeDateForm(data) {
				let str = data.split('-')
				let month = ""
				let day = "";
				if(str.length==1) {
					month = "01"
					day = "01"
				}
				if(str.length==2) {
					day = "01"
					month = str[1]
				}
				if(str.length==3) {
					month = str[1]
					day = str[2]
				}
				return str[0] + "年" +month + "月" + day + "日"
			},
			formValidate() {
				let errors = [];
				if(this.userInfo.RealName === "") {
					errors.push("必须填写姓名");
				}
				if (this.userInfo.Mobile !== undefined) {
					var pat = new RegExp('^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$');
					if (pat.test(this.userInfo.Mobile) === false)
						errors.push("请输入正确的电话号码");
				}
				if (this.userInfo.Email !== undefined) {
					var pat = new RegExp('^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+');
					if (pat.test(this.userInfo.Email) === false)
						errors.push("请输入正确的邮箱");
				}
				return errors;
			},
			save() {
				let model = this.userInfo;
				let errors = this.formValidate();
				if (errors.length > 0) {
					uni.showMessage(errors[0]);
				} else{
					uni.post("/api/security/SaveUserV2", {
						...model,}, (msg) => {
						if (!msg.success) {
							uni.showMessage(msg.msg);
						} else {
							uni.showMessage("修改成功");
						}
					});
				}
			},
		}
	}
</script>

<style>
</style>
