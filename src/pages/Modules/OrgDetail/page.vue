<template>
    <i-row>
        <i-card :padding="100">
            <i-row type="flex" style="margin: -50px 0px 40px 0px" align="middle">
                <i-col span="3">
                    <i-avatar :src="app.webInfo.avatar" size="120"/>
                </i-col>
                <i-col span="21">
                    <i-row style="font-size:30px; margin-bottom:10px">{{orgInfo.Name ? orgInfo.Name : "正在加载中"}}</i-row>
                    <i-row>
                        <i-col span="3">成员人数：{{users}}</i-col>
                        <i-col span="3">指导老师：{{teachers.length}}</i-col>
                    </i-row>
                </i-col>
            </i-row>
            <i-tabs v-model="tabSelect">
                <i-tab-pane label="基本信息" name="basicInfo">
                    <i-row>
                        <i-spin fix size="large" v-show="tableLoading"></i-spin>
                        <i-col span="16">
                            <i-form :model="orgInfo" :rules="ruleForBasic" ref="form">
                                <i-row type="flex" justify="space-between">
                                    <i-col span="22">
                                        <i-form-item label="社团名称" span="8" prop="Name">
                                            <i-input v-model="orgInfo.Name"/>
                                        </i-form-item>
                                    </i-col>
                                </i-row>
                                <i-row type="flex">
                                    <i-col span="10">
                                        <i-form-item label="社团类型" prop="DepartType">
                                            <dic-select dic="社团类型" v-model="orgInfo.DepartType" />
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="10" offset="2">
                                        <i-form-item label="成立时间" prop="BirthTime">
                                            <i-date-picker type="date" v-model="orgInfo.BirthTime" format="yyyy年MM月dd日" />
                                        </i-form-item>
                                    </i-col>
                                </i-row>
                                <i-row type="flex">
                                    <i-col span="10">
                                        <i-form-item label="部门电话">
                                            <i-input v-model="orgInfo.Phone"/>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="10" offset="2">
                                        <i-form-item label="挂靠单位">
                                            <org-selector v-model="orgInfo.ParentId"/>
                                        </i-form-item>
                                    </i-col>
                                </i-row>
                                <i-row type="flex" v-if="level === 3">
                                    <i-col span="10">
                                        <i-form-item label="排序号">
                                            <i-input v-model="orgInfo.Sort"/>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="10" offset="2">
                                        <i-form-item label="部门类型">
                                            <i-select v-model="orgInfo.Type">
                                                <i-option :value="0" key="挂靠单位">挂靠单位</i-option>
                                                <i-option :value="1" key="社团">社团</i-option>
                                            </i-select>
                                        </i-form-item>
                                    </i-col>
                                </i-row>
                                <i-row type="flex">
                                    <i-col span="22">
                                        <i-form-item label="部门描述">
                                            <i-input type="textarea" v-model="orgInfo.Description"/>
                                        </i-form-item>
                                    </i-col>
                                </i-row>
                                <i-row type="flex">
                                    <i-col span="10">
                                        <i-form-item label="是否有社团章程">
                                            <i-checkbox v-model="orgInfo.HaveDepartRule"></i-checkbox>
                                            <i-date-picker :disabled="!orgInfo.HaveDepartRule" v-model="orgInfo.RuleCreatedOn"></i-date-picker>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="10" offset="2">
                                        <i-form-item label="是否成立团支部">
                                            <i-checkbox v-model="orgInfo.HaveLeagueBranch"></i-checkbox>
                                            <i-date-picker :disabled="!orgInfo.HaveLeagueBranch" v-model="orgInfo.LeagueBrachCreatedOn"></i-date-picker>
                                        </i-form-item>
                                    </i-col>
                                </i-row>
                                <i-row type="flex">
                                    <i-col span="10">
                                        <i-form-item label="是否有党支部">
                                            <i-checkbox v-model="orgInfo.HaveCPCBranch"></i-checkbox>
                                            <i-date-picker :disabled="!orgInfo.HaveCPCBranch" v-model="orgInfo.CPCBranchCreatedOn"></i-date-picker>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="10" offset="2">
                                        <i-form-item label="党支部类型">
                                            <dic-select dic="党支部类型" :disabled="!orgInfo.HaveCPCBranch" v-model="orgInfo.CPCBranchType"/>
                                        </i-form-item>
                                    </i-col>
                                </i-row>
                                <i-row type="flex">
                                    <i-col span="10">
                                        <i-form-item label="社交媒体">
                                            <i-input v-model="orgInfo.SocialMedia"/>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="10" offset="2">
                                        <i-form-item label="社交媒体粉丝数">
                                            <i-input v-model="orgInfo.SocialMediaFans"/>
                                        </i-form-item>
                                    </i-col>
                                </i-row>
                                <i-row type="flex">
                                    <i-col span="10">
                                        <i-form-item label="经费类型">
                                            <i-input v-model="orgInfo.FundsCategory"/>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="10" offset="2">
                                        <i-form-item label="经费来源">
                                            <i-input v-model="orgInfo.ChannelForFunds"/>
                                        </i-form-item>
                                    </i-col>
                                </i-row>
                                <i-row type="flex" v-if="level > 1">
                                    <i-col span="10">
                                        <i-form-item label="指导老师产生方式">
                                            <i-input v-model="orgInfo.GuideElectionBy"/>
                                        </i-form-item>
                                    </i-col>
                                    <i-col span="10" offset="2">
                                        <i-form-item label="指导老师有无激励">
                                            <i-input v-model="orgInfo.GuideBonus"/>
                                        </i-form-item>
                                    </i-col>
                                </i-row>
                                <i-row type="flex">
                                    <i-col span="22">
                                        <i-form-item label="备注1">
                                            <i-input type="textarea" v-model="orgInfo.Memo"/>
                                        </i-form-item>
                                        <i-form-item label="备注2">
                                            <i-input type="textarea" v-model="orgInfo.Remark"/>
                                        </i-form-item>
                                    </i-col>
                                </i-row>
                            </i-form>
                            <i-button type="primary" @click="saveOrgDetail()" :loading="isSaving">保存</i-button>
                        </i-col>
                        <i-col span="7" offset="1">
                            <i-timeline class="timeline i-scrollbar-hide">
                                <TimelineItem v-for="(item,index) in logs" :key="index">
                                    <i-row>
                                        <p class="time">{{item.OperateOn}} {{item.Operator}}</p>
                                        <p class="content">
                                            <i-row v-for="(d,index) in item.Details" :key="index">
                                                {{d}}
                                            </i-row>
                                        </p>
                                    </i-row>
                                </TimelineItem>
                            </i-timeline>
                        </i-col>
                    </i-row>
                </i-tab-pane>
                <i-tab-pane label="成员管理" name="member">
                    <i-card dis-hover>
                        <i-row type="flex" justify="space-between" align="middle" slot="title">
                            <i-col>
                                <i-row type="flex" align="middle" :gutter="16">
                                    <i-col>社团成员</i-col>
                                </i-row>
                            </i-col>
                            <i-col>
                                <i-row type="flex" :gutter="16">
                                    <i-col>
                                        <i-input prefix="ios-search" placeholder="搜索成员" v-model="keyword" @keyup.enter.native="getMemberTable()"/>
                                    </i-col>
                                    <i-col>
                                        <i-button type="primary" @click="addMember('member', '成员')">添加成员</i-button>
                                    </i-col>
                                </i-row>
                            </i-col>
                        </i-row>
                        <i-table stripe :columns="tableCol.member" :data="tableData.member" :loading="tableLoading">
                            <template slot="Action" slot-scope="{row}">
                                <i-button @click="modifyMember(row)" v-if="(level+orgInfo.Type>1)">修改</i-button>
                                <i-tooltip :disabled="!row.isAdmin" content="不能删除管理员" placement="top">
                                    <i-button :disabled="row.isAdmin" @click="delMember(row)" v-if="(2*orgInfo.Type+level>=3)">删除</i-button>
                                </i-tooltip>
                                <i-button v-if="(level === 3)&&(!row.isAdmin)" @click="setPositon(row.ID,'管理员')">设置管理员</i-button>
                                <i-poptip transfer v-model="visible" v-if="row.isAdmin">
                                    <i-button v-if="(level === 3)&&row.isAdmin">设置密码</i-button>
                                    <i-row slot="title">您正在更改社团管理员密码</i-row>
                                    <i-form  :model="password" slot="content" label-position="top" :rules="pwdRule">
                                        <i-form-item label="新密码" prop="password">
                                            <i-input v-model="password.password" size="small" type="password"/>
                                        </i-form-item>
                                        <i-form-item label="确认密码" prop="confirmPassword">
                                            <i-input v-model="password.confirmPassword" size="small" type="password"/>
                                        </i-form-item>
                                        <i-button type="primary" size="small" @click="setPassword(row)">确认</i-button>
                                        <i-button size="small" @click="cancelSet()">取消</i-button>
                                    </i-form>
                                </i-poptip>
                            </template>
                        </i-table>
                        <br/>
                        <i-page show-sizer show-total :total="pager.member.total" @on-change="getMemberTable($event, null)" @on-page-size-change="getMemberTable(null, $event)" />
                    </i-card>
                </i-tab-pane>
                <i-tab-pane :disabled="orgInfo.Type === 1" label="子部门" name="subDept">
                    <i-card dis-hover >
                        <i-row type="flex" justify="space-between" align="middle" slot="title">
                            <i-col>
                                <i-row type="flex" align="middle" :gutter="16">
                                    <i-col>子部门</i-col>
                                </i-row>
                            </i-col>
                            <i-col>
                                <i-row type="flex" :gutter="16">
                                    <i-col>
                                        <i-input prefix="ios-search" placeholder="搜索部门"/>
                                    </i-col>
                                    <i-col>
                                        <i-button type="primary" @click="addSubDepart">
                                            新建部门
                                        </i-button>
                                    </i-col>
                                </i-row>
                            </i-col>
                        </i-row>
                        <i-row>
                            <i-table row-key="id" stripe :columns="tableCol.subDept" :data="tableData.subDept" :loading="tableLoading">
                                <template slot="Action" slot-scope="{row}">
                                    <i-button @click="modifySubDepart(row)">管理</i-button>
                                    <i-button @click="delSubDepart(row)">删除</i-button>
                                </template>
                                <template slot="admin" slot-scope="{row}">
                                    {{row.admin}}
                                    <i-button shape="circle" v-if="row.admin === ''" @click="addMember('member', '管理员', row.id)">添加管理员</i-button>
                                </template>
                                <template slot="Type" slot-scope="{row}">
                                    {{row.Type === 0 ? "挂靠单位" : "社团"}}
                                </template>
                            </i-table>
                            <br/>
                            <i-page show-total :total="tableData.subDept.length" :page-size="10000"/>
                        </i-row>
                    </i-card>
                </i-tab-pane>
                <i-tab-pane :disabled="orgInfo.Type === 0" label="指导老师" name="tutor">
                    <i-card dis-hover>
                        <i-row type="flex" justify="space-between" align="middle" slot="title">
                            <i-col>
                                <i-row type="flex" align="middle" :gutter="16">
                                    <i-col>指导老师</i-col>
                                </i-row>
                            </i-col>
                            <i-col>
                                <i-row type="flex" :gutter="16">
                                    <i-col>
                                        <i-input prefix="ios-search" placeholder="搜索老师" v-model="keyword" @keyup.enter.native="getTutorTable()"/>
                                    </i-col>
                                    <i-col>
                                        <i-button type="primary" @click="addMember('tutor')">添加老师</i-button>
                                    </i-col>
                                </i-row>
                            </i-col>
                        </i-row>
                        <i-row>
                            <i-table stripe :columns="tableCol.tutor" :data="tableData.tutor" :loading="tableLoading">
                                <template slot="Action" slot-scope="{row}">
                                    <i-button @click="modifyTutor(row)">修改</i-button>
                                    <i-button @click="delTutor(row)">删除</i-button>
                                </template>
                            </i-table>
                            <br/>
                            <i-page show-sizer show-total :total="pager.tutor.total" @on-change="getTutorTable($event, null)" @on-page-size-change="getTutorTable(null, $event)" />
                        </i-row>
                    </i-card>
                </i-tab-pane>
                <i-tab-pane label="社团活动" name="activity">
                    <i-card dis-hover>
                        <i-row type="flex" justify="space-between" align="middle" slot="title">
                            <i-col>
                                <i-row type="flex" align="middle" :gutter="16">
                                    <i-col>社团活动</i-col>
                                    <i-col><i-badge :count="tableData.length"></i-badge></i-col>
                                </i-row>
                            </i-col>
                            <i-col>
                                <i-row type="flex" :gutter="16">
                                    <i-col>
                                        <i-button type="primary" @click="addActivity">添加活动</i-button>
                                    </i-col>
                                </i-row>
                            </i-col>
                        </i-row>
                        <i-row>
                            <i-table stripe :columns="tableCol.activity" :data="tableData.activity" :loading="tableLoading">
                                <template slot="Action" slot-scope="{row}">
                                    <i-button @click="checkWorkflow(row.InstanceId, row.StepId)">查看</i-button>
                                </template>
                            </i-table>
                            <br/>
                            <i-page show-sizer show-total :total="pager.activity.total" @on-change="getActivityTable($event, null)" @on-page-size-change="getActivityTable(null, $event)" />
                        </i-row>
                    </i-card>
                </i-tab-pane>
                <i-tab-pane label="操作日志" name="operation">
                    <i-table stripe :columns="tableCol.operation" :data="tableData.operation" :loading="tableLoading">
                    </i-table>
                    <br/>
                    <i-page show-sizer show-total :total="pager.operation.total" @on-change="getOptTable($event, null)" @on-page-size-change="getOptTable(null, $event)" />
                </i-tab-pane>
            </i-tabs>
        </i-card>
        <i-modal :z-index="10" v-model="modalShow" :title="component.title || '暂无'" @on-ok="submit()" @on-cancel="cancel()">
            <component :is="component.name" ref="Form" :modalData="recordData"></component>
        </i-modal>
    </i-row>
</template>

<script>
import memberForm from "./memberForm"
import tutorForm from "./tutorForm"
import subDeptForm from "./subDeptForm"
const app = require("@/config");
const tableCol = require("./tableCol");
const md5 = require("md5");
let _ = require("lodash");
const axios = require("axios");
export default {
    components: {
        "member-form": memberForm,
        "tutor-form": tutorForm,
        "subDept-form": subDeptForm
    },
    methods: {
        submit () {
            let form = this.$refs["Form"];
            form.submit(this.newDptId || this.orgInfo.ID, this.callbackFunc);
        },
        cancel () {
        },
        saveOrgDetail () {
            this.isSaving = true;
            let form = this.$refs["form"];
            form.validate(res => {
                if (!res) return;
                axios.post("/api/security/SaveDepartV2", this.orgInfo, msg => {
                    if (msg.success) {
                        this.$Message.success("部门信息保存成功");
                    } else {
                        this.$Message.warning(msg.msg);
                    }
                    form.resetFields();
                    this.isSaving = false;
                    this.getOrgDetail();
                });
            })
        },
        getOrgDetail () {
            this.tableLoading = true;
            axios.post("/api/security/GetOrgDetail", {id: this.orgInfo.ID}, msg => {
                if (msg.success) {
                    this.orgInfo = msg.data;
                    this.teachers = msg.teachers;
                    this.users = msg.users;
                    // 弥补接口错误
                    this.orgInfo.HaveLeagueBranch = this.orgInfo.HaveLeagueBranch === "true";
                    this.orgInfo.HaveCPCBranch = this.orgInfo.HaveCPCBranch === "true";
                    this.orgInfo.HaveDepartRule = Boolean(this.orgInfo.HaveDepartRule);
                    // 至此结束
                    this.level = msg.level;
                    this.logs = msg.changeLogs.data;
                } else {
                    this.$Message.warning(msg.msg);
                }
                this.tableLoading = false;
            })
        },
        getMemberTable (page, pageSize) {
            this.tableLoading = true;
            let name = this.keyword ? this.keyword : undefined;
            this.pager.member.page = page || this.pager.member.page;
            this.pager.member.pageSize = pageSize || this.pager.member.pageSize;
            axios.post("/api/security/GetUsersByDepartId", {departId: this.orgInfo.ID, name, page: this.pager.member.page, pageSize: this.pager.member.pageSize}, msg => {
                this.tableData.member = msg.data;
                this.pager.member.total = msg.totalRow;
                this.tableLoading = false;
            });
        },
        getTutorTable (page, pageSize) {
            this.tableLoading = true;
            let name = this.keyword ? this.keyword : undefined;
            this.pager.tutor.page = page || this.pager.tutor.page;
            this.pager.tutor.pageSize = pageSize || this.pager.tutor.pageSize;
            axios.post("/api/security/GetUsersByDepartId", {
                departId: this.orgInfo.ID,
                name,
                position: "指导老师",
                page: this.pager.tutor.page,
                pageSize: this.pager.tutor.pageSize
            }, msg => {
                this.tableData.tutor = msg.data;
                this.pager.tutor.total = msg.totalRow;
                this.tableLoading = false;
            });
        },
        getDeptTable (page, pageSize) {
            if (this.orgInfo.Type !== 0) return;
            this.tableLoading = true;
            axios.post("/api/security/GetDepartsByDepartId", {id: this.orgInfo.ID}, msg => {
                this.tableData.subDept = msg.data.children || [];
                this.tableLoading = false;
            });
        },
        getOptTable (page, pageSize) {
            this.tableLoading = true;
            this.pager.operation.page = page || this.pager.operation.page;
            this.pager.operation.pageSize = pageSize || this.pager.operation.pageSize;
            axios.post("/api/logs/GetLogsByDepartId", {departId: this.orgInfo.ID, page: this.pager.operation.page, pageSize: this.pager.operation.pageSize}, msg => {
                this.tableData.operation = msg.data;
                this.pager.operation.total = msg.totalRow;
                this.tableLoading = false;
            });
        },
        getActivityTable (page, pageSize) {
            this.tableLoading = true;
            this.pager.activity.page = page || this.pager.activity.page;
            this.pager.activity.pageSize = pageSize || this.pager.activity.pageSize;
            axios.post("/api/org/GetActByDepartId", {departId: this.orgInfo.ID, page: this.pager.activity.page, pageSize: this.pager.activity.pageSize}, msg => {
                this.tableData.activity = msg.data;
                this.pager.activity.total = msg.totalRow;
                this.tableLoading = false;
            });
        },
        addSubDepart () {
            this.recordData = {};
            this.component.name = "subDept-form";
            this.component.title = "新建部门";
            this.callbackFunc = this.modifySubDepart;
            this.modalShow = true;
        },
        addMember (who, position, departId) {
            this.component.name = who + "-form";
            let dic = {
                "tutor": "新建指导老师",
                "member": "新建成员",
                "admin": "新建管理员"
            }
            this.component.title = dic[who];
            this.newDptId = departId;
            this.recordData = {
                position,
                user: {},
                changeLogs: []
            };
            this.callbackFunc = who === "tutor" ? this.getTutorTable : this.getMemberTable;
            this.modalShow = true;
        },
        addActivity () {
            axios.post("/api/org/Applicate", {id: this.orgInfo.ID}, msg => {
                if (msg.success) {
                    window.open("/manage/org/activityform?instanceId=" + msg.instanceId + '&stepId=' + msg.stepId);
                } else {
                    this.$Message.warning(msg.msg);
                }
            })
        },
        delMember (row) {
            this.$Modal.confirm({
                title: "确认删除该成员？",
                onOk: () => {
                    axios.post("/api/security/RemoveUserV2", { userId: row.ID, departId: row.departId }, msg => {
                        if (msg.success) {
                            this.$Message.success("删除成功");
                        } else {
                            this.$Message.warning(msg.msg);
                        }
                        this.getMemberTable();
                    });
                }
            });
        },
        delTutor (row) {
            this.$Modal.confirm({
                title: "确认删除该指导老师？",
                onOk: () => {
                    axios.post("/api/security/RemoveUserV2", { userId: row.ID, departId: row.departId, position: "指导老师" }, msg => {
                        if (msg.success) {
                            this.$Message.success("删除成功");
                        } else {
                            this.$Message.warning(msg.msg);
                        }
                        this.getTutorTable();
                    });
                }
            });
        },
        delSubDepart (row) {
            this.$Modal.confirm({
                title: "确认删除该部门？",
                onOk: () => {
                    axios.post("/api/security/RemoveDepartV2", {id: row.id}, msg => {
                        if (msg.success) {
                            this.$Message.success("删除成功");
                        } else {
                            this.$Message.warning(msg.msg);
                        }
                    });
                    this.getDeptTable();
                }
            });
        },
        modifyMember (row) {
            axios.post("/api/security/GetUserById", {id: row.ID, departId: this.orgInfo.ID}, msg => {
                this.recordData.user = msg.user;
                this.recordData.changeLogs = msg.changeLogs;
                this.component.name = "member-form";
                this.component.title = "修改成员"
                this.modalShow = true;
                this.callbackFunc = this.getMemberTable;
            });
        },
        modifyTutor (row) {
            axios.post("/api/security/GetUserById", {id: row.ID, departId: this.orgInfo.ID}, msg => {
                this.recordData.user = msg.user;
                this.recordData.changeLogs = msg.changeLogs;
                this.component.name = "tutor-form";
                this.component.title = "修改指导老师"
                this.modalShow = true;
                this.callbackFunc = this.getTutorTable;
            });
        },
        modifySubDepart (row) {
            window.open("/manage/org/detail?id=" + row.id);
        },
        checkWorkflow (instanceId, stepId) {
            window.open(`/manage/org/activityform?instanceId=${instanceId}&stepId=${stepId}&detail=true`);
        },
        setPositon (userId, position) {
            axios.post("/api/security/SetPositionV2", {userId, departId: this.orgInfo.ID, position}, msg => {
                this.getMemberTable();
            })
        },
        setPassword (row) {
            axios.post("/api/security/SetPassword", {userId: row.ID, departId: this.orgInfo.ID, password: md5(this.password.password)}, msg => {
                this.getMemberTable();
                this.$Message.info('修改成功');
            })
            this.visible = false;
        },
        cancelSet () {
            this.visible = false;
        },
        setKeyword: _.debounce(function () {
                if (this.tabSelect === "member") {
                    this.getMemberTable();
                }
                if (this.tabSelect === "tutor") {
                    this.getTutorTable();
                }
        }, 500)
    },
    watch: {
        keyword (v) {
            this.setKeyword();
        },
        "orgInfo.Type" (value, oldValue) {
            if (value === oldValue || oldValue === undefined) return;
            this.$Modal.confirm({
                title: "确实要更改部门类型吗？",
                content: `将部门类型由<strong>${oldValue === 0 ? "挂靠单位" : "社团"}</strong>更改为
                    <strong>${value === 0 ? "挂靠单位" : "社团"}</strong>`,
                onOk: () => {
                    axios.post("/api/security/SwitchDepartType", {
                        id: this.orgInfo.ID,
                        cate: this.orgInfo.Type === 0 ? "挂靠单位" : "社团",
                        type: value
                    }, msg => {
                        this.getOrgDetail();
                    });
                },
                onCancel: () => {
                    this.orgInfo.Type = oldValue;
                }
            })
        }
    },
    mounted () {
        app.title = "社团管理";
        this.$Spin.show({
            render: (h) => {
                return h('div', [
                    h('Icon', {
                        'class': 'spin-icon-load',
                        props: {
                            type: 'ios-loading',
                            size: 18
                        }
                    }),
                    h('div', '正在获取部门详细信息，请稍候……')
                ])
            }
        });
        axios.post("/api/security/GetOrgDetail", {id: this.$route.query.id ? this.$route.query.id : null}, msg => {
            if (msg.success) {
                this.orgInfo = msg.data;
                this.teachers = msg.teachers;
                this.users = msg.users;
                // 弥补接口错误
                this.orgInfo.HaveLeagueBranch = this.orgInfo.HaveLeagueBranch === "true";
                this.orgInfo.HaveCPCBranch = this.orgInfo.HaveCPCBranch === "true";
                this.orgInfo.HaveDepartRule = Boolean(this.orgInfo.HaveDepartRule);
                // 至此结束
                this.level = msg.level;
                this.logs = msg.changeLogs.data;
                // 获取其他Tab页信息
                this.getMemberTable();
                this.getTutorTable();
                this.getDeptTable();
                this.getOptTable();
                this.getActivityTable();
            }
            this.$Spin.hide();
            this.tabSelect = this.$route.query.tabSelect || "basicInfo";
        });
    },
    data () {
        let THIS = this;
        return {
            app,
            tableCol,
            visible: false,
            logs: [],
            keyword: "",
            teachers: [],
            users: 0,
            tabSelect: "",
            isSaving: false,
            tableLoading: false,
            newDptId: "",
            component: {
                name: "",
                title: ""
            },
            recordData: {
                user: {},
                changeLogs: []
            },
            level: 0,
            orgInfo: {},
            tableData: {
                member: [],
                subDept: [],
                tutor: [],
                operation: []
            },
            ruleForBasic: {
                Name: [
                        {
                            required: true,
                            message: "必须填写社团名称",
                            trigger: "blur"
                        }
                    ],
                DepartType: [
                        {
                            required: true,
                            message: "必须填写社团类型",
                            trigger: "change"
                        }
                    ],
                BirthTime: [
                    {
                            required: true,
                            type: "date",
                            message: "必须填写成立时间",
                            trigger: "change"
                    }
                ]
            },
            pager: {
                member: {
                    total: 0,
                    page: 1,
                    pageSize: 10
                },
                tutor: {
                    total: 0,
                    page: 1,
                    pageSize: 10
                },
                activity: {
                    total: 0,
                    page: 1,
                    pageSize: 10
                },
                operation: {
                    total: 0,
                    page: 1,
                    pageSize: 10
                }
            },
            modalShow: false,
            password: {},
            pwdRule: {
                password: {
                    trigger: 'blur',
                    validator (rule, value, callback, source, options) {
                        (value && value.length >= 6 && value.length <= 16) ? callback() : callback(new Error('密码必须在6至16位之间'));
                    }
                },
                confirmPassword: {
                    trigger: 'blur',
                    validator (rule, value, callback, source, options) {
                        value === THIS.password.password ? callback() : callback(new Error('两次输入的密码不一致'));
                    }
                }
            },
            callbackFunc: () => {}
        };
    }
}
</script>

<style lang="less">
.ivu-form-item .ivu-date-picker{
    width: 100%;
}
.timeline{
    height: 100vh;
    padding-top: 10px;
    overflow: auto;
    .time{
        font-size: 14px;
        font-weight: bold;
    }
    .content{
        padding-left: 5px;
    }
}
.spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
.ivu-poptip-body-content {
    overflow: hidden;
}
</style>
