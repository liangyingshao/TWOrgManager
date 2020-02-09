<template>
    <div id="activity-form">
        <div>
            <div class="paper">
                <div>
                    <div class="status-bar">
                        <p class="smallhang"/>
                        <p class="headline">强制执行</p>
                        <table border="0">
                            <tr>
                                <td class="smallhang wen-zi-ju-you">执行人：</td>
                                <td colspan="2">
                                    <user-selector v-model="model1"/>
                                </td>
                                <td class="smallhang"></td>
                                <td class="smallhang wen-zi-ju-you">步骤：</td>
                                <td colspan="2">
                                    <i-select v-model="model2" class="drop-down-box">
                                        <i-option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</i-option>
                                    </i-select>
                                </td>
                            </tr>
                            <tr>
                                <td class="smallhang"></td>
                                <td colspan="2"></td>
                                <td class="smallhang"></td>
                                <td colspan="2">
                                    <i-button type="primary" size="small" class="button-position">确认</i-button>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="add1"></div>
                    <i-row>
                        <i-col>
                            <p class="headline">社团活动申请表</p>
                            <p class="date">填表时间：{{nowDate}}</p>
                            <table border="1">
                                <tr>
                                    <td class="smallhang">社团名称</td>
                                    <td class="longhang wen-zi-ju-zhong" colspan="4">
                                        <i-input  v-if="io.fieldAccess.DepartName === 'w' && io.isMyStep" v-model="io.data.DepartName"/>
                                        <p v-else>{{io.data.DepartName}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="smallhang">活动名称</td>
                                    <td class="longhang wen-zi-ju-zhong" colspan="4">
                                        <i-input  v-if="io.fieldAccess.ActivityName === 'w' && io.isMyStep" v-model="io.data.ActivityName"/>
                                        <p v-else>{{io.data.ActivityName}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="smallhang" style="height:76px;">活动时间</td>
                                    <td colspan="2" width="200" style="letter-spacing: 2px;">
                                        <i-date-picker type="date" format="yyyy年MM月dd日" v-if="io.fieldAccess.StartDate === 'w' && io.isMyStep" v-model="io.data.StartDate"/>
                                        <p v-else>{{io.data.StartDate}}</p>
                                        至
                                        <i-date-picker type="date" format="yyyy年MM月dd日" v-if="io.fieldAccess.EndDate === 'w' && io.isMyStep" v-model="io.data.EndDate"/>
                                        <p v-else>{{io.data.EndDate}}</p>
                                    </td>
                                    <td class="smallhang">活动人数</td>
                                    <td colspan="2" width="200">
                                        <i-input  v-if="io.fieldAccess.AttendanceFigures === 'w' && io.isMyStep" v-model="io.data.AttendanceFigures"/>
                                        <p v-else>{{io.data.AttendanceFigures}}人</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="smallhang">活动地点</td>
                                    <td class="longhang wen-zi-ju-zhong" colspan="4">
                                        <i-input type="textarea" v-if="io.fieldAccess.Address === 'w' && io.isMyStep" v-model="io.data.Address"/>
                                        <p v-else>{{io.data.Address}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="smallhang">负责人员</td>
                                    <td colspan="2">
                                        <i-input type="textarea" v-if="io.fieldAccess.Leader === 'w' && io.isMyStep" v-model="io.data.Leader"/>
                                        <p v-else>{{io.data.Leader}}</p>
                                    </td>
                                    <td class="smallhang">联系方式</td>
                                    <td colspan="2">
                                        <i-input type="textarea" v-if="io.fieldAccess.Telephone === 'w' && io.isMyStep" v-model="io.data.Telephone"/>
                                        <p v-else>{{io.data.Telephone}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="smallhang" rowspan="2">面向范围</td>
                                    <td class="longhang" colspan="4"  v-if="!io.data.ActivityType">活动类型：
                                        <i-radio-group v-model="io.data.ActivityType">
                                            <i-radio label="社团内部活动" class="iview-type-size" :disabled="io.fieldAccess.Description === 'r' || !io.isMyStep">社团内部活动</i-radio>
                                            <i-radio label="公开活动" class="iview-type-size" :disabled="io.fieldAccess.Description === 'r' || !io.isMyStep">公开活动</i-radio>
                                        </i-radio-group>
                                    </td>
                                    <td class="longhang" v-else colspan="4">
                                        <p>活动类型：<Icon type="ios-checkbox-outline" />{{io.data.ActivityType}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="longhang" colspan="4">
                                        <i-input type="textarea" class="opinionForm" v-model="io.data.FaceTo" :rows="3" v-if="io.fieldAccess.FaceTo === 'w' && io.isMyStep" placeholder="（如为公开活动可具体描写面向范围如：面向全体学生/面向校内外人员等，可给出示例填写）"/>
                                        <p v-else>{{io.data.FaceTo}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="smallhang" rowspan="2">活动内容</td>
                                    <td class="longhang" colspan="4" v-if="io.currentStep === '填写申请表'">
                                        <i-upload action="//jsonplaceholder.typicode.com/posts/">
                                            <i-button icon="ios-cloud-upload-outline" type="primary" :disabled="io.fieldAccess.Description === 'r' || !io.isMyStep">上传文件</i-button>
                                        </i-upload>
                                    </td>
                                    <td class="longhang" colspan="4" v-else>
                                        <p>无附件</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="longhang" colspan="4">
                                        <i-input type="textarea" class="opinionForm" :rows="3" placeholder="" v-if="io.fieldAccess.Description === 'w' && io.isMyStep" v-model="io.data.Description"/>
                                        <p v-else>{{io.data.Description}}</p>
                                    </td>
                                </tr>
                                <tr v-show="io.fieldAccess.GuideTeacherOpinion">
                                    <td class="smallhang">指导老师审核意见</td>
                                    <td class="longhang" colspan="4">
                                        <div v-show="io.fieldAccess.GuideTeacherIsPass">
                                            是否通过：
                                            <i-radio-group v-model="io.data.GuideTeacherIsPass">
                                                <i-radio label="true" class="iview-type-size" :disabled="io.fieldAccess.GuideTeacherOpinion === 'r' || !io.isMyStep"> 是</i-radio>
                                                <i-radio label="false" class="iview-type-size" :disabled="io.fieldAccess.GuideTeacherOpinion === 'r' || !io.isMyStep">否</i-radio>
                                            </i-radio-group>
                                            <i-button type="primary" size="small" class="button-position" :disabled="io.fieldAccess.GuideTeacherOpinion === 'r' || !io.isMyStep" @click="submit">确认</i-button>
                                        </div>
                                        <i-input type="textarea" class="opinionForm" :rows="3" placeholder="（审核意见）" v-model="io.data.GuideTeacherOpinion" v-if="io.fieldAccess.GuideTeacherOpinion === 'w' && io.isMyStep"/>
                                        <p v-else>{{io.data.GuideTeacherOpinion}}</p>
                                        <div class="wen-zi-ju-you">
                                            <p >审核人（签名）：<i-input v-model="io.data.GuideTeacher" v-if="io.fieldAccess.GuideTeacher === 'w' && io.isMyStep"/>
                                                <span v-else>{{io.data.GuideTeacher}}</span>
                                            </p>
                                            <i-date-picker type="date" format="yyyy年MM月dd日" placeholder="审核时间" v-model="io.data.GuideTeacherTime" v-if="io.fieldAccess.GuideTeacherTime === 'w' && io.isMyStep"/>
                                            <p v-else>{{io.data.GuideTeacherTime}}</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-show="io.fieldAccess.AffiliatedDepartOpinion">
                                    <td class="smallhang">挂靠单位意见</td>
                                    <td class="longhang" colspan="4">
                                        <div v-show="io.fieldAccess.AffiliatedDepartIsPass">
                                            是否通过：
                                            <i-radio-group v-model="io.data.AffiliatedDepartIsPass">
                                                <i-radio label="true" class="iview-type-size" :disabled="io.fieldAccess.AffiliatedDepartOpinion === 'r' || !io.isMyStep"> 是</i-radio>
                                                <i-radio label="false" class="iview-type-size" :disabled="io.fieldAccess.AffiliatedDepartOpinion === 'r' || !io.isMyStep">否</i-radio>
                                            </i-radio-group>
                                            <i-button type="primary" size="small" class="button-position" :disabled="io.fieldAccess.AffiliatedDepartOpinion === 'r' || !io.isMyStep" @click="submit">确认</i-button>
                                        </div>
                                        <i-input type="textarea" class="opinionForm" :rows="3" placeholder="（审核意见）" v-model="io.data.AffiliatedDepartOpinion" v-if="io.fieldAccess.AffiliatedDepartOpinion === 'w' && io.isMyStep"/>
                                        <p v-else>{{io.data.AffiliatedDepartOpinion}}</p>
                                        <div class="wen-zi-ju-you">
                                            <p>审核人（签名）：<i-input v-model="io.data.AffiliatedDepart" v-if="io.fieldAccess.AffiliatedDepart === 'w' && io.isMyStep"/>
                                                <span v-else>{{io.data.AffiliatedDepart}}</span>
                                            </p>
                                            <i-date-picker v-model="io.data.AffiliatedDepartTime" type="date" format="yyyy年MM月dd日" placeholder="审核时间" v-if="io.fieldAccess.AffiliatedDepartTime === 'w' && io.isMyStep"/>
                                            <p v-else>{{io.data.AffiliatedDepartTime}}</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-show="io.fieldAccess.SauOpinion">
                                    <td class="smallhang">学生社团联合会意见</td>
                                    <td class="longhang" colspan="4">
                                        <div v-show="io.fieldAccess.SauIsPass">
                                            是否通过：
                                            <i-radio-group v-model="io.data.SauIsPass">
                                                <i-radio label="true" class="iview-type-size" :disabled="io.fieldAccess.SauOpinion === 'r' || !io.isMyStep"> 是</i-radio>
                                                <i-radio label="false" class="iview-type-size" :disabled="io.fieldAccess.SauOpinion === 'r' || !io.isMyStep">否</i-radio>
                                            </i-radio-group>
                                            <i-button type="primary" size="small" class="button-position" :disabled="io.fieldAccess.SauOpinion === 'r' || !io.isMyStep" @click="submit">确认</i-button>
                                        </div>
                                        <i-input v-model="io.data.SauOpinion" type="textarea" class="opinionForm" :rows="3" placeholder="（审核意见）" v-if="io.fieldAccess.SauOpinion === 'w' && io.isMyStep"/>
                                        <p v-else>{{io.data.SauOpinion}}</p>
                                        <div class="wen-zi-ju-you">
                                            <p >审核人（签名）：<i-input v-model="io.data.Sau" v-if="io.fieldAccess.Sau === 'w' && io.isMyStep"/><span v-else>{{io.data.Sau}}</span>
                                            </p>
                                            <i-date-picker v-model="io.data.SauTime" type="date" format="yyyy年MM月dd日" placeholder="审核时间" v-if="io.fieldAccess.SauTime === 'w' && io.isMyStep"/>
                                            <p v-else>{{io.data.SauTime}}</p>
                                    </div>
                                    </td>
                                </tr>
                                <tr v-show="io.fieldAccess.YlcOpinion">
                                    <td class="smallhang">校团委意见</td>
                                    <td class="longhang" colspan="4">
                                    <div v-show="io.fieldAccess.YlcIsPass">
                                        是否通过：
                                        <i-radio-group v-model="io.data.YlcIsPass">
                                            <i-radio label="true" class="iview-type-size" :disabled="io.fieldAccess.YlcOpinion === 'r' || !io.isMyStep">是</i-radio>
                                            <i-radio label="false" class="iview-type-size" :disabled="io.fieldAccess.YlcOpinion === 'r' || !io.isMyStep">否</i-radio>
                                        </i-radio-group>
                                        <i-button type="primary" size="small" class="button-position" :disabled="io.fieldAccess.YlcOpinion === 'r' || !io.isMyStep" @click="submit">确认</i-button>
                                    </div>
                                    <i-input v-model="io.data.YlcOpinion" type="textarea" class="opinionForm" :rows="3" placeholder="（审核意见）" v-if="io.fieldAccess.YlcOpinion === 'w' && io.isMyStep"/>
                                    <p v-else>{{io.data.YlcOpinion}}</p>
                                    <div class="wen-zi-ju-you">
                                        <p >审核人（签名）：<i-input v-model="io.data.Ylc" v-if="io.fieldAccess.Ylc === 'w' && io.isMyStep"/><span v-else>{{io.data.Ylc}}</span></p>
                                        <i-date-picker v-model="io.data.YlcTime" type="date" format="yyyy年MM月dd日" placeholder="审核时间" v-if="io.fieldAccess.YlcTime === 'w' && io.isMyStep"/>
                                        <p v-else>{{io.data.YlcTime}}</p>
                                    </div>
                                    </td>
                                </tr>
                            </table>
                        </i-col>
                    </i-row>
                    <i-row class="add1 headline">
                        <i-button  v-show="io.currentStep==='填写申请表'" style="width: 200px;margin: 18px auto;" type="primary" @click="submit">提交申请</i-button>
                    </i-row>
                </div>
            </div>
            <div class="paper" v-if="io.timelines.length > 0">
                <p class="smallhang"/>
                <p class="headline">流程执行步骤</p>
                <i-timeline style="padding: 20px;">
                    <TimelineItem v-for="(item,index) in io.timelines" :key="index">
                        <i-row class="time">
                            <i-col>
                                <p>{{item.Key}}</p>
                            </i-col>
                        </i-row>
                        <i-row v-for="(item,index) in item.steps" :key="index" class="content">
                            <Alert v-if="item.State !== 0 && item.State !== 1" show-icon :type="icons[item.State - 1]">{{item.StepName}}于{{item.CreatedOn}}{{item.Time}}由{{item.ExecutorName}}{{stepInfo[item.State]}}</Alert>
                            <Alert v-else show-icon>{{item.StepName}}于{{item.CreatedOn}}{{item.Time}}由{{item.ExecutorName}}{{stepInfo[item.State]}}</Alert>
                        </i-row>
                    </TimelineItem>
                </i-timeline>
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
            icons: [
                "",
                "",
                "success",
                "success",
                "error",
                "warning"
            ],
            executorList: [
                {
                value: "指导老师",
                label: "指导老师"
                },
                {
                value: "挂靠单位",
                label: "挂靠单位"
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
            model1: "",
            stepInfo: enums.stepInfo,
            showPicker: false,
            stepId: "",
            instanceId: "",
            detailMode: true,
            nowDate: "",
            upLoad: [],
            io: {
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
            stateList: [
                {
                    value: "填写申请表",
                    label: "填写申请表"
                }, {
                    value: "指导老师审核",
                    label: "指导老师审核"
                }, {
                    value: '挂靠单位审核',
                    label: '挂靠单位审核'
                }, {
                    value: '学生联合会审核',
                    label: '学生联合会审核'
                }, {
                    value: '校团委审核',
                    label: '校团委审核'
                }
            ],
            model2: ""
        }
    },
    methods: {
        getFromPrepage () {
            this.instanceId = this.$route.query.instanceId;
            this.stepId = this.$route.query.stepId;
            this.detailMode = Boolean(this.$route.query.detail);
            this.getFieldAccess();
        },
        getFieldAccess () {
            axios.post("/api/workflow/LoadInstance", {instanceId: this.instanceId, stepId: this.stepId, detail: this.detailMode}, msg => {
                if (msg.success) {
                    this.io = msg;
                } else {
                    this.$Message.warning(msg.msg);
                }
            })
        },
        submit () {
            this.io.shouldUpload.forEach(value => {
                this.upLoad[value] = this.io[value] || this.io.data[value]
            });
            axios.post("/api/workflow/SubmitInstance", {...this.upLoad}, msg => {
                if (msg.success) {
                    this.$Message.info("保存成功");
                } else {
                     this.$Message.warning(msg.msg);
                }
            })
        },
        inStep (steps, state) {
            let s = state;
            return steps.indexOf(s) > -1;
        }
    },
    mounted () {
        app.title = "社团活动";
        this.getFromPrepage();
        const date = new Date();
        const year = date.getFullYear(); // 获取当前年份
        const month = date.getMonth() + 1; // 获取当前月份(0-11,0代表1月所以要加1);
        const day = date.getDate();
        this.nowDate = `${year}年${month}月${day}日`; // 显示在最上方的填写日期
    }
}
</script>

<style lang="less">
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
        border: solid 1px rgb(198, 198, 198);
        box-shadow:1px 1px 10px -2px #333333;
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
        height: 80px;
    }
    .headline {
        margin-top: 9px;
        text-align: center;
        font-size: 24px;
        font-family: '';
    }
    .date {
        margin-top: 16px;
        margin-left: 518px;
        font-size: 12px;
        font-family: 'FangSong';
    }
    table {
        margin: 15px auto;
        border-collapse: collapse;
        text-align: center;
        font-family: 'FangSong';
        font-size: 18.7px;
        line-height: 30px;
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
}
</style>
