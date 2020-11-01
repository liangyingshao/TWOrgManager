<template>
    <div id="activity-form">
        <div>
            <!-- <div class="paper" v-if="actID">
                <i-card>
                    <i-table stripe :columns="signCol" :data="signData">
                        <template slot="SignUpOn" slot-scope="{row}">
                            <p v-if="row.SignUpState === 999">没有报名</p>
                            <p v-else-if="row.SignUpState === 99">已取消报名</p>
                            <p v-else>{{row.SignUpOn}}</p>
                        </template>
                        <template slot="RealName" slot-scope="{row}">
                            <p>{{row.RealName}}</p>
                            <p>({{row.BelongDepart ? row.BelongDepart : '未填写学院'}})</p>
                        </template>
                        <template slot="SignInOn" slot-scope="{row}">
                            <p v-if="row.SignInState === 999">没有签到</p>
                            <p v-else-if="row.SignInState === 99">已取消签到</p>
                            <p v-else>{{row.SignInOn}}</p>
                        </template>
                        <template slot="Action" slot-scope="{row}">
                            <i-button v-show="row.SignUpState === 0" @click="signUp(row.ActivityId, 99, row.UserId)">踢出</i-button>
                            <Tag v-show="row.SignUpState === 99" size="large">已取消</Tag>
                        </template>
                    </i-table>
                </i-card>
            </div> -->
            <div class="paper">
                <div>
                    <div class="add1" style="width: 602px; margin: auto;" v-if="form.intstanceState === 3">
                        <img width="100" style="position: absolute; left: 0px; top: 0px;" :src="qrCodeUrl"/>
                    </div>
                    <i-row>
                        <i-col>
                            <p class="headline">社团活动申请表</p>
                            <div class="info-row">
                                <p>填表时间：{{form.data.CreatedTime}}</p>
                                <p>社团名称: {{form.data.DepartName}}</p>
                            </div>
                            <table border="1" class="table">
                                <tr>
                                    <td class="smallhang">活动名称</td>
                                    <td class="longhang wen-zi-ju-zhong" colspan="4">
                                        <p>{{form.data.ActivityName}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="smallhang">活动时间</td>
                                    <td colspan="4" width="200" class="longhang wen-zi-ju-zhong" style="letter-spacing: 2px;">
                                        <span>{{startDate}}</span>
                                        至
                                        <span>{{endDate}}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="smallhang">活动人数</td>
                                    <td colspan="2" width="200">
                                        <p>{{form.data.AttendanceFigures}}人</p>
                                    </td>
                                    <td class="smallhang">预算金额</td>
                                    <td colspan="2" width="200">
                                        <p>{{form.data.Budget}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="smallhang">活动地点</td>
                                    <td class="longhang wen-zi-ju-zhong" colspan="4">
                                        <p>{{form.data.Address}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="smallhang">负责人员</td>
                                    <td colspan="2">
                                        <p>{{form.data.Leader}}</p>
                                    </td>
                                    <td class="smallhang">联系方式</td>
                                    <td colspan="2">
                                        <p>{{form.data.Telephone}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="smallhang" rowspan="2">面向范围</td>
                                    <td class="longhang" colspan="4">
                                        <p>活动范围：<Icon type="ios-checkbox-outline" />{{form.data.FaceTo}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="longhang" colspan="4">
                                        <p>{{form.data.ActivityFaceToDescription}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="smallhang">活动类型</td>
                                    <!-- <td class="longhang" colspan="4" v-if="form.fieldAccess.ActivityType === 'w' && form.isMyStep">
                                        活动类型：
                                        <i-checkbox-group v-model="form.data.ActivityType">
                                            <i-checkbox label="普通活动" class="iview-type-size">普通活动</i-checkbox>
                                            <i-checkbox label="团支部活动" class="iview-type-size">团支部活动</i-checkbox>
                                            <i-checkbox label="党支部活动" class="iview-type-size">党支部活动</i-checkbox>
                                        </i-checkbox-group>
                                    </td> -->
                                    <td class="longhang" colspan="4">
                                        <p v-if="form.data.ActivityType">
                                            <template v-for="(item, index) in form.data.ActivityType">
                                                <Icon type="ios-checkbox-outline" :key="index"/>
                                                {{item}}
                                            </template>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="smallhang" rowspan="2">活动内容</td>
                                    <td class="longhang" colspan="4">
                                        {{files.length ? "活动策划、详细预算等：" : "该活动没有附件。"}}
                                        <i-upload action="/api/cms/UploadFile" v-if="files.length" :default-file-list="files" :show-upload-list="true"
                                        :before-upload="beforeUploadFile" :on-preview="previewFile" :on-remove="removeUpload" :on-success="uploadFileSuccess" disabled
                                        :data="{'usage': '附件', 'single': true, 'relateTable': 'ActivityApplication', 'id': instanceId, 'fileName': fileName}"
                                        >
                                            <!-- <i-button style="display: none" icon="ios-cloud-upload-outline" type="primary" disabled>上传文件</i-button> -->
                                        </i-upload>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="longhang" colspan="4">
                                        <p style="white-space: pre-wrap; text-align: justify;">{{form.data.Description}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="smallhang">封面图片</td>
                                    <td class="longhang" colspan="4">
                                        <div v-if="form.data.Avatar">
                                            <i-row>
                                                <img :src="form.data.Avatar" style="max-width: 100%;" />
                                            </i-row>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="smallhang">指导老师审核意见</td>
                                    <td class="longhang" colspan="4">
                                        <div v-show="form.fieldAccess.GuideTeacherIsPass === 'w' && form.isMyStep">
                                            是否通过：
                                            <i-radio disabled v-model="form.data.GuideTeacherIsPass" :true-value="true" :false-value="false" class="iview-type-size"> 是</i-radio>
                                            <i-radio disabled v-model="form.data.GuideTeacherIsPass" :true-value="false" :false-value="true" class="iview-type-size" >否</i-radio>
                                            <!-- <i-button type="primary" size="small" class="button-position" :disabled="form.fieldAccess.GuideTeacherOpinion === 'r' || !form.isMyStep" @click="submit">确认</i-button> -->
                                        </div>
                                        <p>{{form.data.GuideTeacherOpinion}}</p>
                                        <div class="wen-zi-ju-you">
                                            <p>审核人（签名）：
                                                <span>{{form.data.GuideTeacher}}</span>
                                            </p>
                                            <p>{{form.data.GuideTeacherTime}}</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-show="form.fieldAccess.AffiliatedDepartOpinion">
                                    <td class="smallhang">业务指导单位意见</td>
                                    <td class="longhang" colspan="4">
                                        <div v-show="form.fieldAccess.AffiliatedDepartIsPass === 'w' && form.isMyStep">
                                            是否通过：
                                            <i-radio disabled v-model="form.data.AffiliatedDepartIsPass" :true-value="true" :false-value="false" class="iview-type-size"> 是</i-radio>
                                            <i-radio disabled v-model="form.data.AffiliatedDepartIsPass" :true-value="false" :false-value="true" class="iview-type-size" >否</i-radio>
                                            <!-- <i-button type="primary" size="small" class="button-position" :disabled="form.fieldAccess.AffiliatedDepartOpinion === 'r' || !form.isMyStep" @click="submit">确认</i-button> -->
                                        </div>
                                        <p>{{form.data.AffiliatedDepartOpinion}}</p>
                                        <div class="wen-zi-ju-you">
                                            <p>审核人（签名）：
                                                <span>{{form.data.AffiliatedDepart}}</span>
                                            </p>
                                            <p>{{form.data.AffiliatedDepartTime}}</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-show="form.fieldAccess.SauOpinion">
                                    <td class="smallhang">学生社团管理部意见</td>
                                    <td class="longhang" colspan="4">
                                        <div v-show="form.fieldAccess.SauIsPass === 'w' && form.isMyStep">
                                            是否通过：
                                            <i-radio disabled v-model="form.data.SauIsPass" :true-value="true" :false-value="false" class="iview-type-size"> 是</i-radio>
                                            <i-radio disabled v-model="form.data.SauIsPass" :true-value="false" :false-value="true" class="iview-type-size" >否</i-radio>
                                            <!-- <i-button type="primary" size="small" class="button-position" :disabled="form.fieldAccess.SauOpinion === 'r' || !form.isMyStep" @click="submit">确认</i-button> -->
                                        </div>
                                        <i-input v-model="form.data.SauOpinion" type="textarea" class="opinionForm" :rows="3" placeholder="（审核意见）" v-if="form.fieldAccess.SauOpinion === 'w' && form.isMyStep"/>
                                        <p v-else>{{form.data.SauOpinion}}</p>
                                        <div class="wen-zi-ju-you">
                                            <p>审核人（签名）：
                                                <span>{{form.data.Sau}}</span>
                                            </p>
                                            <p>{{form.data.SauTime}}</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-show="form.fieldAccess.YlcOpinion">
                                    <td class="smallhang">校团委意见</td>
                                    <td class="longhang" colspan="4">
                                        <div v-show="form.fieldAccess.YlcIsPass === 'w' && form.isMyStep">
                                            是否通过：
                                            <i-radio disabled v-model="form.data.YlcIsPass" :true-value="true" :false-value="false" class="iview-type-size"> 是</i-radio>
                                            <i-radio disabled v-model="form.data.YlcIsPass" :true-value="false" :false-value="true" class="iview-type-size" >否</i-radio>
                                            <!-- <i-button type="primary" size="small" class="button-position" :disabled="form.fieldAccess.YlcOpinion === 'r' || !form.isMyStep" @click="submit">确认</i-button> -->
                                        </div>
                                        <p>{{form.data.YlcOpinion}}</p>
                                        <div class="wen-zi-ju-you">
                                            <p>审核人（签名）：
                                                <span>{{form.data.Ylc}}</span></p>
                                            <p>{{form.data.YlcTime}}</p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </i-col>
                    </i-row>
                </div>
                <div class="add2"></div>
                <div v-if="form.timelines.length > 0">
                    <p class="smallhang"/>
                    <p class="headline">流程执行步骤</p>
                    <i-timeline style="padding: 20px;">
                        <TimelineItem v-for="(item,index) in form.timelines" :key="index">
                            <i-row class="time">
                                <i-col>
                                    <p>{{item.Key}}</p>
                                </i-col>
                            </i-row>
                            <i-row v-for="(item,index) in item.steps" :key="index" class="content">
                                <Alert v-if="item.State !== 0 && item.State !== 1" show-icon :type="icons[item.State]">{{item.StepName}}于{{item.CreatedOn}}{{item.Time}}由{{item.ExecutorName}}{{stepInfo[item.State]}}</Alert>
                                <Alert v-else show-icon>{{item.StepName}}于{{item.CreatedOn}}{{item.Time}}由{{item.ExecutorName}}{{stepInfo[item.State]}}</Alert>
                            </i-row>
                        </TimelineItem>
                    </i-timeline>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let app = require("@/config");
const axios = require("axios");
const enums = require("@/config/enums");
export default {
    data () {
        return {
            app,
            actID: '',
            instanceId: '',
            stepId: '',
            files: [],
            avatar: [],
            avatarName: '',
            fileName: '',
            icons: [
                "",
                "",
                "success",
                "success",
                "error",
                "warning"
            ],
            signCol: [
                {
                    title: '报名者姓名',
                    slot: 'RealName'
                },
                {
                    title: '手机号',
                    key: "Monile"
                },
                {
                    title: '报名时间',
                    slot: 'SignUpOn'
                },
                {
                    title: '签到时间',
                    slot: 'SignInOn'
                },
                {
                    title: '操作',
                    maxWidth: 100,
                    slot: 'Action'
                }
            ],
            signData: [],
            executorList: [
                {
                value: "指导老师",
                label: "指导老师"
                },
                {
                value: "业务指导单位",
                label: "业务指导单位"
                },
                {
                value: "学生联合会",
                label: "学生联合会"
                },
                {
                value: "校团委",
                label: "校团委"
                }
            ],
            stepInfo: enums.stepInfo,
            form: {
                fieldAccess: {},
                data: {},
                submitBtns: [],
                shouldUpload: [],
                allSteps: [],
                isMyStep: false,
                timelines: [],
                intstanceState: '',
                currentStep: ''
            },
            upLoad: {},
            stateList: [
                {
                    value: "填写申请表",
                    label: "填写申请表"
                }, {
                    value: "指导老师审核",
                    label: "指导老师审核"
                }, {
                    value: '业务指导单位审核',
                    label: '业务指导单位审核'
                }, {
                    value: '学生社团管理部审核',
                    label: '学生社团管理部审核'
                }, {
                    value: '校团委审核',
                    label: '校团委审核'
                }, {
                    value: '完成',
                    label: '完成'
                }, {
                    value: '取消',
                    label: '取消'
                }
            ],
            userId: "",
            nextStep: ""
        }
    },
    methods: {
        signUp (ID, state, userID) {
            axios.post("/api/org/ChangeSignUpState", {actId: ID, state: state, userId: userID}, msg => {
                if (msg.success) {
                    this.$Message.success("踢出成功");
                    this.getSignUps();
                } else {
                    this.$Message.warning(msg.msg);
                }
            })
        },
        getSignUps () {
            axios.post("/api/org/GetSignUps", {actId: this.actID, page: 1, pageSize: 10}, msg => {
                if (msg.success) {
                    this.signData = msg.data;
                } else {
                    this.$Message.warning(msg.msg);
                }
            })
        },
        uploadAvatarSuccess (response, file, fileList) {
            if (response.success) {
                this.form.data.Avatar = response.download;
                this.getAvatar();
            } else {
                this.$Message.error(response.msg);
            }
        },
        uploadFileSuccess (response, file, fileList) {
            if (response.success) {
                this.getFiles();
            } else {
                this.$Message.error(response.msg);
            }
        },
        previewFile (file) {
            const { href } = this.$router.resolve({
                path: "/api/cms/Download",
                query: {
                    id: file.id || file.response.id
                }
            });
            window.open(href);
        },
        getAvatar () {
            axios.post("/api/cms/GetAttachments", {id: this.instanceId, relateTable: "ActivityApplication", usage: "avatar"}, msg => {
                if (msg.success) {
                    this.avatar = msg.data.map(e => {
                        return {
                            name: e.DisplayName,
                            id: e.ID
                        }
                    });
                    if (msg.data[0]) {
                        this.form.data.Avatar = msg.data[0].Download;
                    } else {
                        this.form.data.Avatar = '';
                    }
                }
            });
        },
        getFiles () {
            axios.post("/api/cms/GetAttachments", {id: this.instanceId, relateTable: "ActivityApplication", usage: "附件"}, msg => {
                if (msg.success) {
                    this.files = msg.data.map(e => {
                        return {
                            name: e.DisplayName,
                            id: e.ID
                        }
                    });
                }
            })
        },
        removeUpload (file, fileList) {
            if (this.form.fieldAccess.Description !== 'w' || !this.form.isMyStep) {
                this.$Message.warning('你没有权限删除附件');
                this.files.push(file);
                this.files.pop();
                return;
            }
            let THIS = this;
            this.$Modal.confirm({
                title: "确认删除文件",
                content: `您确定要删除名为<strong>&nbsp;${file.name || file.DisplayName}&nbsp;</strong>的文件吗？文件删除后不可恢复。`,
                onOk: () => {
                    axios.post("/api/cms/RemoveAttachment", {id: file.id || file.response.id}, msg => {
                        if (msg.success) {
                            this.$Message.success('删除文件成功');
                            this.getAvatar();
                            this.getFiles();
                        }
                    });
                },
                onCancel: () => {
                    THIS.files.push(file);
                    THIS.files.pop();
                }
            });
        },
        async beforeUploadFile (file) {
            this.fileName = file.name;
            await this.$nextTick();
            return true; // 直接上传文件
        },
        async beforeUploadAvatar (file) {
            this.avatarName = file.name;
            await this.$nextTick();
        },
        getFieldAccess () {
            axios.post("/api/workflow/LoadInstance", {instanceId: this.instanceId, stepId: this.stepId, detail: true}, msg => {
                if (msg.success) {
                    msg.data.GuideTeacherIsPass = Boolean(msg.data.GuideTeacherIsPass);
                    msg.data.AffiliatedDepartIsPass = Boolean(msg.data.AffiliatedDepartIsPass);
                    msg.data.SauIsPass = Boolean(msg.data.SauIsPass);
                    msg.data.YlcIsPass = Boolean(msg.data.YlcIsPass);

                    if (msg.data.ActivityType) {
                        msg.data.ActivityType = msg.data.ActivityType.split(',');
                    } else {
                        msg.data.ActivityType = [];
                    }
                    msg.data.Avatar = this.form.data.Avatar || msg.data.Avatar;

                    if (this.form.data.fieldAccess === 'w') {
                        let EndDate = new Date(msg.data.EndDate);
                        EndDate.setHours(EndDate.getHours() + 3);
                        msg.data.EndDate = EndDate;
                    }

                    this.form = msg;
                } else {
                    this.$Message.warning(msg.msg);
                }
            })
        },
        inStep (steps, state) {
            let s = state;
            return steps.indexOf(s) > -1;
        },
        dateFormat (fmt, d) {
            let date = new Date(d);
            let ret;
            const opt = {
                "Y+": date.getFullYear().toString(),
                "m+": (date.getMonth() + 1).toString(),
                "d+": date.getDate().toString(),
                "H+": date.getHours().toString(),
                "M+": date.getMinutes().toString(),
                "S+": date.getSeconds().toString()
                // 有其他格式化字符需求可以继续添加，必须转化成字符串
            };
            for (let k in opt) {
                ret = new RegExp("(" + k + ")").exec(fmt);
                if (ret) {
                    fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
                };
            };
            return fmt;
        },
        getData () {
            this.getFieldAccess();
            this.getFiles();
            this.getAvatar();
            if (this.actID) {
                this.getSignUps();
            }
        },
        preview (oper) {
            if (oper < 10) {
                let bdhtml = window.document.body.innerHTML; // 获取当前页的html代码
                let sprnstr = ""; // 设置打印开始区域
                let eprnstr = ""; // 设置打印结束区域
                let prnhtml = bdhtml.substring(bdhtml.indexOf(sprnstr) + 18); // 从开始代码向后取html
                prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr)); // 从结束代码向前取html
                window.document.body.innerHTML = prnhtml;
                window.print();
                window.document.body.innerHTML = bdhtml;
            } else {
                window.print();
            }
        }
    },
    mounted () {
        app.title = "打印社团活动申请表";
        this.instanceId = this.$route.query.instanceId;
        this.stepId = this.$route.query.stepId;
        this.actID = this.$route.query.actID === 'undefined' ? '' : this.$route.query.actID;
        this.getData();
    },
    computed: {
        startDate: {
            get: function () {
                return this.form.data.StartDate ? this.dateFormat("YYYY年mm月dd日", this.form.data.StartDate) : '';
            }
        },
        endDate: {
            get: function () {
                return this.form.data.EndDate ? this.dateFormat("YYYY年mm月dd日", this.form.data.EndDate) : '';
            }
        },
        canCancel: {
            get: function () {
                let generalCondition = this.form.currentStep !== '填写申请表' && this.form.currentStep !== '已完成' && this.form.currentStep !== '已取消';
                let hasPrivilege = app.checkPermission('Organization.RemoveActivity');
                let myOrg = false;
                return generalCondition && (hasPrivilege || myOrg);
            }
        },
        qrCodeUrl: {
            get: function () {
                let url = "http://xsst.xmu.edu.cn/manage/printactivityapplication";
                let encoding = encodeURIComponent(url);
                let finalUrl = `/url2qr?url=${encoding}&instanceId=${this.instanceId}&state=2`;
                return finalUrl;
            }
        }
    }
}
</script>

<style lang="less">
.date {
    margin-top: 16px;
    margin-left: 518px;
    font-size: 12px;
    font-family: 'FangSong';
}
.table {
    margin: 8px auto 15px auto;
    border-collapse: collapse;
    text-align: center;
    font-family: 'FangSong';
    font-size: 18.7px;
    line-height: 30px;
}
#activity-form {
    .opinionForm .ivu-input {
        border:1px solid #dcdee2;
    }
    .ivu-input {
        border:none
    }
    .time{
        font-weight: bold;
        color: #888;
        margin-bottom: 10px;
    }
    .content{
        padding-left: 5px;
    }
    .paper {
        width: 795px;
        margin: 18px auto;
        background-color: white;
        // border: solid 1px rgb(198, 198, 198);
        // box-shadow:1px 1px 10px -2px #333333;
    }
    .status-bar{
        width: 793px;
        background-color: white;
        border-bottom: dashed 1px rgb(198, 198, 198);
    }
    .drop-down-box{
        width:200px;
    }
    .add1 {
        height: 50px;
        position: relative;
    }
    .add2 {
        min-height: 50px;
    }
    .headline {
        margin-top: 9px;
        text-align: center;
        font-size: 24px;
        font-family: '';
    }
    .smallhang {
        width: 101px;
        height: 55px;
        padding: 0px 10px;
    }
    .longhang {
        width: 471px;
        height: 55px;
        padding: 10px 10px;
        text-align: left;
    }
    .wen-zi-ju-zhong{
        text-align: center;
    }
    .wen-zi-ju-you{
        text-align: right;
    }
    .input_box{
        min-height: 120px;
        text-align: left;
        font-family: 'FangSong';
    }
    .iview-type-size{
        font-size: 18.7px;
    }
    .button-position{
        float:right;
    }
    .info-row {
        display: flex;
        width: 602px;
        justify-content: space-between;
        margin: 24px auto 0px auto;
        font-size: 14px;
        font-family: 'FangSong';
    }
    .ivu-upload-select {
        display: none;
    }
}
</style>
