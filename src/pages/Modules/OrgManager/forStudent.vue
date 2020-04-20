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
                            <i-input search @on-search="searchOrg"></i-input>
                        </i-row>
                        <i-alert show-icon v-if="myDeparts.length >= 2">
                            根据限制，每人最多加入两个社团
                        </i-alert>
                        <i-row :gutter="16">
                            <i-col span="6" v-for="depart in allDeparts" :key="depart.ID" style="margin-bottom: 16px">
                                <i-card :title="depart.Name">
                                    <i-button :loading="depart.loading" @click="ApplicateOrg(depart)">我要报名</i-button>
                                </i-card>
                            </i-col>
                        </i-row>
                        <i-spin fix size="large" v-if="loadingOrg" />
                    </i-tab-pane>
                    <i-tab-pane label="查找活动" name="name2">这里是各种活动</i-tab-pane>
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
                                            <i-button type="text" @click="withdrawApplication (org.app.ID)">撤销申请</i-button>
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
                        <p slot="content"></p>
                    </i-panel>
                </i-collapse>
            </i-col>
        </i-row>
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
            allDepartsBK: [],
            orgHistory: [],
            enumDic: {
                0: "已通过",
                1: "被拒绝",
                2: "自行撤回",
                3: "申请中"
            },
            loadingOrg: true
        };
    },
    mounted () {
        app.title = "社团管理";
        this.getDashBoard();
        this.getAllOrgs();
        this.judgeTime();
    },
    methods: {
        getDashBoard () {
            axios.post("/api/org/StudentDashboard", {}, msg => {
                this.myDeparts = msg.departs;
            });
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
                    this.$Notice.success({title: msg.msg});
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
                } else {
                    this.$Notice.error({title: "撤回失败", desc: msg.msg});
                }
            });
        },
        searchOrg (val) {
            this.allDeparts = this.allDepartsBK.filter(e => { return e.Name.indexOf(val) > -1 });
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
