<template>
    <i-row>
        <i-row type="flex" justify="space-between" class="title-bar">
            <i-col>
                <i-row type="flex">
                    <i-col>
                        <i-avatar style="width: 140px;height: 140px;margin: 0px 16px" :src="app.webInfo.avatar"/>
                    </i-col>
                    <i-col>
                        <p class="welcome">厦门大学社团管理系统</p>
                        <p>{{time}}好，{{userInfo.realName}}</p>
                    </i-col>
                </i-row>
            </i-col>
            <i-col span="8">
                <i-row type="flex" justify="space-around">
                    <i-col span="11" >
                        <i-card>
                            <i-row style="height: 108px; font-size: 28px" type="flex" justify="center" align="middle" v-if="myDeparts[0]">
                                {{myDeparts[0].Name}}
                            </i-row>
                            <i-row style="height: 108px;" type="flex" justify="center" align="middle" v-else @click="showOrgs">
                                <Icon type="md-add-circle" :size="40"/>
                                <div>请在下方加入社团</div>
                            </i-row>
                        </i-card>
                    </i-col>
                    <i-col span="11">
                        <i-card>
                            <i-row style="height: 108px; font-size: 28px" type="flex" justify="center" align="middle" v-if="myDeparts[1]">
                                {{myDeparts[1].Name}}
                            </i-row>
                            <i-row style="height: 108px" type="flex" justify="center" align="middle" v-else @click="showOrgs">
                                <Icon type="md-add-circle" :size="40"/>
                                <div>请在下方加入社团</div>
                            </i-row>
                        </i-card>
                    </i-col>
                </i-row>
            </i-col>
        </i-row>
        <i-row type="flex" justify="space-between">
            <i-col span="15">
                <i-tabs>
                    <i-tab-pane class="browse-window" label="查找社团" name="name1" style="height: 600px">
                        <i-row style="margin-bottom: 16px">
                            <i-input search @on-search="searchOrg" placeholder="搜索社团名称，按下回车键开始搜索"></i-input>
                        </i-row>
                        <i-alert show-icon v-if="myDeparts.length >= 2">
                            根据限制，每人最多加入两个社团
                        </i-alert>
                        <i-row :gutter="16">
                            <i-col span="6" v-for="depart in allDeparts" :key="depart.ID" style="margin-bottom: 16px">
                                <i-card>
                                    <template slot="title">
                                        {{depart.Name}}
                                        <Icon type="ios-information-circle-outline"  @click="checkOrgDetail(depart.ID)"/>
                                    </template>
                                    <i-button :loading="depart.loading" @click="ApplicateOrg(depart)">我要报名</i-button>
                                </i-card>
                            </i-col>
                        </i-row>
                        <i-spin fix size="large" v-if="loadingOrg" />
                    </i-tab-pane>
                    <i-tab-pane label="查找活动" name="name2">
                        <i-card>
                            <i-table stripe :columns="tableActCol" :data="tableAct">
                                <template slot="Action" slot-scope="{row}">
                                    <i-button @click="signUp(row.ID, 0)" v-if="!row.isSignUp">报名</i-button>
                                    <i-button @click="signUp(row.ID, 99)" v-else>取消报名</i-button>
                                </template>
                            </i-table>
                        </i-card>
                    </i-tab-pane>
                </i-tabs>
            </i-col>
            <i-col span="8" offset="1">
                <i-collapse>
                    <i-panel name="1">
                        社团报名记录
                        <template slot="content">
                            <List>
                                <ListItem v-for="org in orgHistory" :key="org.ID">
                                    <ListItemMeta :title="org.Name" :description="enumDic[org.app.State]" />
                                    <template slot="action">
                                        <li v-if="org.app.State === 3">
                                            <i-button type="text" @click="withdrawApplication (org.app.ID)">撤回申请</i-button>
                                        </li>
                                        <!--li>
                                            <i-button type="text">更多</i-button>
                                        </li-->
                                    </template>
                                </ListItem>
                                <i-spin fix v-if="loadingOrg" />
                            </List>
                        </template>
                    </i-panel>
                    <i-panel name="2">
                        活动报名记录
                        <template slot="content">
                            <List>
                                <ListItem v-for="act in allSignAct" :key="act.ID">
                                    <ListItemMeta :title="act.ActivityName"/>
                                    <template slot="action">
                                        <li>
                                            <i-button type="text" @click="signUp(act.ID, 99)">取消报名</i-button>
                                        </li>
                                    </template>
                                </ListItem>
                                <i-spin fix v-if="loadingAct" />
                            </List>
                        </template>
                    </i-panel>
                </i-collapse>
            </i-col>
        </i-row>
        <i-modal v-model="showOrgDetail" :title="orgInfo.Name">
            <i-row>社团类型：{{orgInfo.DepartType}}</i-row>
            <i-row>社团描述：{{orgInfo.Description}}</i-row>
        </i-modal>
    </i-row>
</template>

<script>
import axios from 'axios';
const app = require("@/config");
export default {
    data () {
        return {
            app,
            time: "早上",
            userInfo: app.userInfo,
            myDeparts: [],
            allDeparts: [],
            allSignAct: [],
            allDepartsBK: [],
            orgHistory: [],
            enumDic: {
                0: "已通过",
                1: "被拒绝",
                2: "自行撤回",
                3: "申请中"
            },
            loadingOrg: true,
            loadingAct: true,
            showOrgDetail: false,
            orgInfo: {},
            tableAct: [],
            tableActCol: [
                {
                    title: '活动名称',
                    key: 'ActivityName'
                },
                {
                    title: '所属社团',
                    key: 'DepartName'
                },
                {
                    title: '活动描述',
                    key: 'Description'
                },
                {
                    title: '活动开始时间',
                    key: 'StartDate'
                },
                {
                    title: '活动结束时间',
                    key: 'EndDate'
                },
                {
                    title: '操作',
                    slot: 'Action'
                }
            ]
        };
    },
    mounted () {
        app.title = "社团管理";
        this.getDashBoard();
        this.getAllOrgs();
        this.judgeTime();
        this.getAllAct();
    },
    methods: {
        getDashBoard () {
            axios.post("/api/org/StudentDashboard", {}, msg => {
                this.myDeparts = msg.departs;
            });
        },
        getAllAct () {
            this.loadingAct = true;
            axios.post("/api/org/GetStartedApplications", {page: 1, pageSize: 10}, msg => {
                if (msg.success) {
                    this.tableAct = msg.data;
                    this.allSignAct = this.tableAct.filter(e => e.isSignUp);
                } else {
                    this.$Message.warning(msg.msg);
                }
                this.loadingAct = false;
            })
        },
        signUp (ID, state) {
            axios.post("/api/org/ChangeSignUpState", {actId: ID, state: state}, msg => {
                if (msg.success) {
                    this.$Message.success(msg.msg);
                    this.getAllAct();
                } else {
                    this.$Message.warning(msg.msg);
                }
            })
        },
        judgeTime () {
            let day2 = new Date();
            day2.setTime(day2.getTime());
            let s2 = day2.getHours();
            if (s2 < 6) this.time = "午夜";
            else if (s2 < 12) this.time = "上午";
            else if (s2 < 14) this.time = "中午";
            else if (s2 < 18) this.time = "下午";
            else if (s2 < 24) this.time = "晚上";
        },
        getAllOrgs () {
            this.loadingOrg = true;
            axios.post("/api/security/GetAllDeparts", {}, msg => {
                msg.data.map(e => e.loading = false);
                this.allDepartsBK = msg.data;
                this.allDeparts = this.allDepartsBK;
                this.orgHistory = this.allDeparts.filter(e => e.app);
                // .map(e => {
                //     e.State = e.app.State;
                //     e.AppID = e.app.ID;
                //     delete e.app;
                //     return e;
                // });
                this.loadingOrg = false;
            });
        },
        showOrgs () {

        },
        ApplicateOrg (depart) {
            depart.loading = true;
            axios.post("/api/security/ApplicateDepart", {departId: depart.ID}, msg => {
                depart.loading = false;
                if (msg.success) {
                    this.$Notice.info({title: "等待审核", desc: '您的申请已成功提交，正在等待社团管理员审核'});
                    this.getAllOrgs();
                } else {
                    this.$Notice.error({title: "申请失败", desc: msg.msg});
                }
            });
        },
        withdrawApplication (appId) {
            axios.post("/api/security/WithDraw", {appId}, msg => {
                if (msg.success) {
                    this.$Notice.success({title: "撤回成功"});
                    this.getAllOrgs();
                } else {
                    this.$Notice.error({title: "撤回失败", desc: msg.msg});
                }
            });
        },
        searchOrg (val) {
            this.allDeparts = this.allDepartsBK.filter(e => { return e.Name.indexOf(val) > -1 });
        },
        checkOrgDetail (id) {
            this.orgInfo.Name = "详细信息加载中，请稍候...";
            this.showOrgDetail = true;
            axios.post("/api/security/StudentGetOrgDetail", {id}, msg => {
                if (msg.success) {
                    this.orgInfo = msg.data;
                } else {
                    this.$Message.warning(msg.msg);
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .ivu-divider, .ivu-divider-vertical {
        margin: 0 8px;
        display: inline-block;
        height: 100%;
        width: 1px;
        vertical-align: middle;
        position: relative;
        top: -0.06em;
    }
    .title-bar
    {
        background-color: lightgrey;
        padding: 24px 0px;
        margin-bottom: 16px;
    }
    .welcome {
        font-size: 40px;
        color: #17233d;
        padding: 12px 0px;
        font-weight: bold;
    }
    .tip {
        font-size: 18px;
        color: #808695;
    }
    .browse-window {
        overflow-x: auto;
        overflow-y: auto;
    }
    .browse-window::-webkit-scrollbar {
        display: none;
    }
</style>
