<template>
    <div id="activity-form">
        <div>
            <div class="paper">
                <div>
                    <div class="status-bar" v-if="isAdmin">
                        <p class="smallhang"/>
                        <p class="headline">强制执行</p>
                        <table border="0">
                            <tr>
                                <td class="smallhang wen-zi-ju-you">执行人：</td>
                                <td colspan="2">
                                    <user-selector v-model="userId"/>
                                </td>
                                <td class="smallhang"></td>
                                <td class="smallhang wen-zi-ju-you">步骤：</td>
                                <td colspan="2">
                                    <i-select v-model="nextStep" class="drop-down-box">
                                        <i-option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</i-option>
                                    </i-select>
                                </td>
                            </tr>
                            <tr>
                                <td class="smallhang"></td>
                                <td colspan="2"></td>
                                <td class="smallhang"></td>
                                <td colspan="2">
                                    <i-button type="primary" size="small" class="button-position" @click="gotoNextStep">确认</i-button>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="add1"></div>
                    <i-row>
                        <i-col>
                            <p class="headline">社团活动申请表</p>
                            <div class="info-row">
                                <p>填表时间：{{io.data.CreatedTime}}</p>
                                <p>社团名称: {{io.data.DepartName}}</p>
                            </div>
                            <table border="1">
                                <tr>
                                    <td class="smallhang">活动名称</td>
                                    <td class="longhang wen-zi-ju-zhong" colspan="4">
                                        <i-input  v-if="io.fieldAccess.ActivityName === 'w' && io.isMyStep" v-model="io.data.ActivityName"/>
                                        <p v-else>{{io.data.ActivityName}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="smallhang">活动时间</td>
                                    <td colspan="4" width="200" class="longhang wen-zi-ju-zhong" style="letter-spacing: 2px;">
                                        <i-date-picker type="datetime"  format="yyyy年MM月dd日 HH:mm" v-if="io.fieldAccess.StartDate === 'w' && io.isMyStep" v-model="io.data.StartDate"/>
                                        <span v-else>{{io.data.StartDate.substring(0, io.data.StartDate.length - 3)}}</span>
                                        至
                                        <i-date-picker type="datetime"  format="yyyy年MM月dd日 HH:mm" v-if="io.fieldAccess.EndDate === 'w' && io.isMyStep" v-model="io.data.EndDate"/>
                                         <span v-else>{{io.data.EndDate.substring(0, io.data.EndDate.length - 3)}}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="smallhang">活动人数</td>
                                    <td colspan="2" width="200">
                                        <i-input  v-if="io.fieldAccess.AttendanceFigures === 'w' && io.isMyStep" v-model="io.data.AttendanceFigures"/>
                                        <p v-else>{{io.data.AttendanceFigures}}人</p>
                                    </td>
                                    <td class="smallhang">预算金额</td>
                                    <td colspan="2" width="200">
                                        <i-input v-if="io.fieldAccess.AttendanceFigures === 'w' && io.isMyStep" v-model="io.data.Budget"/>
                                        <p v-else>{{io.data.Budget}}</p>
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
                                    <td class="longhang" colspan="4" v-if="io.fieldAccess.FaceTo === 'w' && io.isMyStep">
                                        活动范围：
                                        <i-radio-group v-model="io.data.FaceTo">
                                            <i-radio label="社团内部活动" class="iview-type-size">社团内部活动</i-radio>
                                            <i-radio label="公开活动" class="iview-type-size">公开活动</i-radio>
                                        </i-radio-group>
                                    </td>
                                    <td class="longhang" v-else colspan="4">
                                        <p>活动范围：<Icon type="ios-checkbox-outline" />{{io.data.FaceTo}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="longhang" colspan="4">
                                        <i-input type="textarea" class="opinionForm" v-model="io.data.ActivityFaceToDescription" :rows="3" v-if="io.fieldAccess.ActivityFaceToDescription === 'w' && io.isMyStep" placeholder="（如为公开活动可具体描写面向范围如：面向全体学生/面向校内外人员等，可给出示例填写）"/>
                                        <p v-else>{{io.data.ActivityFaceToDescription}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="smallhang">活动类型</td>
                                    <td class="longhang" colspan="4" v-if="io.fieldAccess.ActivityType === 'w' && io.isMyStep">
                                        活动类型：
                                        <i-checkbox-group v-model="io.data.ActivityType">
                                            <i-checkbox label="普通活动" class="iview-type-size">普通活动</i-checkbox>
                                            <i-checkbox label="团支部活动" class="iview-type-size">团支部活动</i-checkbox>
                                            <i-checkbox label="党支部活动" class="iview-type-size">党支部活动</i-checkbox>
                                        </i-checkbox-group>
                                    </td>
                                    <td class="longhang" v-else colspan="4">
                                        <p v-if="io.data.ActivityType">
                                            <template v-for="(item, index) in io.data.ActivityType">
                                                <Icon type="ios-checkbox-outline" :key="index"/>
                                                {{item}}
                                            </template>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="smallhang" rowspan="2">活动内容</td>
                                    <td class="longhang" colspan="4">
                                        <i-upload  v-if="io.fieldAccess.Description === 'w' && io.isMyStep" action="//jsonplaceholder.typicode.com/posts/" :before-upload="handleUpload">
                                            <i-button icon="ios-cloud-upload-outline" type="primary">上传文件</i-button>
                                            文件内容应包括活动策划、经费预算、经费来源等
                                        </i-upload>
                                        <div v-if="formData !== null">
                                            <i-row>
                                                <Button type="text" style="text-align: left;width: 300px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{formData.name}}</Button>
                                                <Button type="text" @click="uploadFile" :loading="loadingStatus">上传</Button>
                                                <Button type="text" @click="removeFormData"><Icon type="ios-close" /></Button>
                                            </i-row>
                                        </div>
                                        <div v-if="files.length > 0">
                                            <Divider v-if="formData !== null"/>
                                            <template v-for="(item, index) in files">
                                                <i-row :key="index">
                                                    <i-col span="3" v-if="index === 0">附件：</i-col>
                                                    <i-col span="3" v-else><div style="width: 100%;height: 1px"></div></i-col>
                                                    <i-col span="21">
                                                        <a style="display: inline-block;text-align: left;width: 300px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :href="'/api/cms/Download?id=' + item.ID" target="_blank">{{item.DisplayName}}</a>
                                                        <Button @click="removeFile(item)" type="text" v-if="io.currentStep==='填写申请表' && io.isMyStep"><Icon type="ios-close" /></Button>
                                                    </i-col>
                                                </i-row>
                                            </template>
                                        </div>
                                        <div v-else-if="io.fieldAccess.Description === 'r' || !io.isMyStep">无附件</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="longhang" colspan="4">
                                        <i-input type="textarea" class="opinionForm" :rows="3" placeholder="（此处填写活动的详细介绍，文本会直接显示在学生界面的活动简介中）"
                                        v-if="io.fieldAccess.Description === 'w' && io.isMyStep" v-model="io.data.Description"/>
                                        <p style="white-space: pre-wrap; text-align: justify;" v-else>{{io.data.Description}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="smallhang">封面图片</td>
                                    <td class="longhang" colspan="4">
                                        <i-upload v-if="io.fieldAccess.Avatar === 'w' && io.isMyStep" action="/api/cms/UploadFile" :default-file-list="avatar" :show-upload-list="false"
                                        :before-upload="beforeUploadAvatar" :on-preview="previewAvatar" :on-remove="removeUpload" :on-success="uploadAvatarSuccess"
                                        :data="{'usage': 'avatar', 'single': true, 'relateTable': 'ActivityApplication', 'id': this.io.data.ID, 'fileName': this.avatarName}"
                                        >
                                            <i-button icon="ios-cloud-upload-outline" type="primary">上传封面</i-button>
                                            <br>
                                            上传一张封面图片，推荐大小为 1080*540 。作为活动的封面图片。
                                        </i-upload>
                                        <div v-if="io.data.Avatar">
                                            <i-row>
                                                <img :src="io.data.Avatar" />
                                                <i-button type="error" v-if="io.fieldAccess.Avatar === 'w' && io.isMyStep" @click="removeUpload(avatar[0])">删除图片</i-button>
                                            </i-row>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-show="io.fieldAccess.GuideTeacherOpinion">
                                    <td class="smallhang">指导老师审核意见</td>
                                    <td class="longhang" colspan="4">
                                        <div v-show="io.fieldAccess.GuideTeacherIsPass === 'w' && io.isMyStep">
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
                                    <td class="smallhang">业务指导单位意见</td>
                                    <td class="longhang" colspan="4">
                                        <div v-show="io.fieldAccess.AffiliatedDepartIsPass === 'w' && io.isMyStep">
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
                                    <td class="smallhang">学生社团管理部意见</td>
                                    <td class="longhang" colspan="4">
                                        <div v-show="io.fieldAccess.SauIsPass === 'w' && io.isMyStep">
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
                                    <div v-show="io.fieldAccess.YlcIsPass === 'w' && io.isMyStep">
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
                        <i-button  v-show="io.currentStep==='填写申请表' && io.isMyStep" style="width: 200px;margin: 18px auto;" type="primary" @click="submit">提交申请</i-button>
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
                            <Alert v-if="item.State !== 0 && item.State !== 1" show-icon :type="icons[item.State]">{{item.StepName}}于{{item.CreatedOn}}{{item.Time}}由{{item.ExecutorName}}{{stepInfo[item.State]}}</Alert>
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
const table = "ActivityApplication";
const usage = "附件";
export default {
    data () {
        return {
            isAdmin: false,
            temp: null,
            loadingStatus: false,
            formData: null,
            files: [],
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
            showPicker: false,
            stepId: "",
            instanceId: "",
            detailMode: true,
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
                    value: '业务指导单位审核',
                    label: '业务指导单位审核'
                }, {
                    value: '学生社团管理部审核',
                    label: '学生社团管理部审核'
                }, {
                    value: '校团委审核',
                    label: '校团委审核'
                }
            ],
            userId: "",
            nextStep: "",
            avatarName: "",
            avatar: []
        }
    },
    methods: {
        getFiles () {
            axios.post("/api/cms/GetAttachments", {id: this.instanceId, relateTable: table, usage: usage}, msg => {
                if (msg.success) {
                    this.files = msg.data;
                }
            })
        },
        removeFile (file) {
            axios.post("/api/cms/RemoveAttachment", {id: file.ID}, msg => {
                if (msg.success) {
                    this.$Message.success('删除文件成功');
                    this.getFiles();
                }
            })
        },
        getAvatar () {
            axios.post("/api/cms/GetAttachments", {id: this.io.data.ID, relateTable: "ActivityApplication", usage: "avatar"}, msg => {
                if (msg.success) {
                    this.avatar = msg.data.map(e => {
                        return {
                            name: e.DisplayName,
                            id: e.ID
                        }
                    });
                    this.io.data.Avatar = msg.data[0] ? msg.data[0].Download : "";
                }
            });
        },
        removeUpload (file) {
            this.$Modal.confirm({
                title: '您确定要删除图片吗？',
                content: '图片删除后不可恢复。',
                onOk: () => {
                    axios.post("/api/cms/RemoveAttachment", {id: file.id || file.response.id}, msg => {
                        if (msg.success) {
                            this.$Message.success('删除文件成功');
                            this.getAvatar();
                        }
                    });
                }
            });
        },
        previewAvatar (file) {
            const { href } = this.$router.resolve({
                path: "/api/cms/Download",
                query: {
                    id: file.id || file.response.id
                }
            });
            window.open(href);
        },
        removeFormData () {
            this.formData = null;
        },
        handleUpload (file) {
            this.formData = file;
            return false;
        },
        uploadAvatarSuccess (response, file, fileList) {
            if (response.success) {
                this.io.data.Avatar = response.download;
                this.getAvatar();
            } else {
                this.$Message.error(response.msg);
            }
        },
        uploadFile () {
            let param = new FormData();
            param.append("file", this.formData);
            param.append("id", this.instanceId);
            param.append("relateTable", table);
            param.append("usage", usage);
            param.append("single", false);
            param.append("fileName", this.formData.name);
            this.temp = param.get("file");
            let config = {
                headers: {"Content-Type": "multipart/form-data"},
                onUploadProgress: e => {
                    let completeProgress = ((e.loaded / e.total * 100) | 0) + "%";
                    this.progress = completeProgress;
                }
            };
            this.loadingStatus = true;
            axios._post("/api/cms/UploadFile", param, config).then((res) => {
                this.loadingStatus = false;
                if (res.data.success) {
                    this.$Message.success('success');
                    this.formData = null;
                    this.getFiles();
                } else {
                    this.$Message.error(res.data.msg);
                }
            })
        },
        gotoNextStep () {
            axios.post("/api/workflow/GotoStep", {instanceId: this.instanceId, stepId: this.stepId, userId: this.userId, nextStep: this.nextStep}, msg => {
                if (msg.success) {
                    if (msg.success) {
                    this.io = msg;
                    this.$Message.success("强制执行步骤成功");
                } else {
                    this.$Message.warning(msg.msg);
                }
                }
            })
        },
        async beforeUploadAvatar (file) {
            this.avatarName = file.name;
            await this.$nextTick();
        },
        getFromPrepage () {
            this.instanceId = this.$route.query.instanceId;
            this.stepId = this.$route.query.stepId;
            this.detailMode = Boolean(this.$route.query.detail);
            this.getFieldAccess();
        },
        getFieldAccess () {
            axios.post("/api/workflow/LoadInstance", {instanceId: this.instanceId, stepId: this.stepId, detail: this.detailMode}, msg => {
                if (msg.success) {
                    this.getAvatar();
                    if (msg.data.GuideTeacherIsPass !== undefined) {
                        msg.data.GuideTeacherIsPass = msg.data.GuideTeacherIsPass === true ? 'true' : 'false';
                    }
                    if (msg.data.AffiliatedDepartIsPass !== undefined) {
                        msg.data.AffiliatedDepartIsPass = msg.data.AffiliatedDepartIsPass === true ? 'true' : 'false';
                    }
                    if (msg.data.SauIsPass !== undefined) {
                        msg.data.SauIsPass = msg.data.SauIsPass === true ? 'true' : 'false';
                    }
                    if (msg.data.YlcIsPass !== undefined) {
                        msg.data.YlcIsPass = msg.data.YlcIsPass === true ? 'true' : 'false';
                    }
                    if (msg.data.ActivityType) {
                        msg.data.ActivityType = msg.data.ActivityType.replace(/[[\]"]/g, "").replace(/,/g, "，");
                        msg.data.ActivityType = msg.data.ActivityType.split('，')
                    } else {
                        msg.data.ActivityType = [];
                    }
                    this.io = msg;
                } else {
                    this.$Message.warning(msg.msg);
                }
            });
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
                    fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                };
            };
            return fmt;
        },
        submit () {
            if (this.io.fieldAccess.StartDate === 'w' || this.io.isMyStep) {
                // let temp = this.io.data.StartDate.getMonth() + 1;
                // this.io.data.StartDate = this.io.data.StartDate.getFullYear() + '年' + temp + '月' + this.io.data.StartDate.getDate() + '日';
                // console.log(this.io.data.StartDate.getFullYear() + '年' + temp + '月' + this.io.data.StartDate.getDate() + '日');
                this.io.data.StartDate = this.dateFormat("YYYY-mm-dd HH:MM", this.io.data.StartDate);
            }
            if (this.io.fieldAccess.EndDate === 'w' || this.io.isMyStep) {
                // let temp = this.io.data.EndDate.getMonth() + 1;
                // this.io.data.EndDate = this.io.data.EndDate.getFullYear() + '年' + temp + '月' + this.io.data.EndDate.getDate() + '日';
                this.io.data.EndDate = this.dateFormat("YYYY-mm-dd HH:MM", this.io.data.EndDate);
            }
            // console.log(this.io.data.StartDate + " " + this.io.data.EndDate)
            if (this.io.fieldAccess.ActivityName === 'w' && this.io.isMyStep) {
                if (this.io.data.ActivityName === "") {
                    this.$Message.warning({
                        content: "必须填写活动名称"
                    })
                    return;
                }
            }
            this.io.shouldUpload.forEach(value => {
                this.upLoad[value] = this.io[value] || this.io.data[value]
            });
            axios.postStream("/api/workflow/SubmitInstance", {...this.upLoad}, msg => {
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
        this.getFiles();
        for (let index in app.userInfo.permissons) {
            if (app.userInfo.permissons[index] === "Workflow.ManageAllWorkflow") {
                this.isAdmin = true;
            }
        }
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
        min-height: 50px;
    }
    .headline {
        margin-top: 9px;
        text-align: center;
        font-size: 24px;
        font-family: '';
    }
    table {
        margin: 8px auto 15px auto;
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
    .info-row {
        display: flex;
        width: 602px;
        justify-content: space-between;
        margin: 24px auto 0px auto;
        font-size: 14px;
        font-family: 'FangSong';
    }
}
</style>
