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
                        <i-card style="height: 140px">
                            <i-row v-if="myOrg[0]">
                                社团社团社团
                            </i-row>
                            <i-row type="flex" justify="center" align="middle" v-else @click="showOrgs">
                                <Icon type="md-add-circle" :size="40"/>
                                <p>参加社团</p>
                            </i-row>
                        </i-card>
                    </i-col>
                    <i-col span="11">
                        <i-card style="height: 140px">
                            <i-row v-if="myOrg[1]">
                                社团社团社团
                            </i-row>
                            <i-row type="flex" justify="center" align="middle" v-else>
                                <Icon type="md-add-circle" />
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
                            <i-input search></i-input>
                        </i-row>
                        <i-row :gutter="16">
                            <i-col span="6" v-for="depart in allDeparts" :key="depart.ID" style="margin-bottom: 16px">
                                <i-card :title="depart.Name">
                                    <i-button @click="ApplicateOrg(depart.ID)">我要报名</i-button>
                                </i-card>
                            </i-col>
                        </i-row>
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
                                        <li>
                                            <i-button type="text" @click="withdrawApplication (org.app.ID)">撤销申请</i-button>
                                        </li>
                                        <li>
                                            <i-button type="text">更多</i-button>
                                        </li>
                                    </template>
                                </ListItem>
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
let app = require("@/config");
let pic = require("@/assets/icon.png");
export default {
    data () {
        return {
            app,
            level: -1,
            pic: pic,
            messageNum: 0,
            message: [],
            time: "早上",
            userInfo: app.userInfo,
            dashBoard: {},
            allDeparts: [],
            myOrg: [],
            orgHistory: [],
            enumDic: {
                1: "找不到该社团",
                2: "超过最大可加入社团的上限",
                3: "您是管理员，不能申请加入社团",
                4: "您已经申请过这个社团了",
                5: "申请成功"
            }
        };
    },
    mounted () {
        if (app.checkPermission("Organization.DepartAdminUser") ||
            app.checkPermission("Organization.UnitAdminUser") ||
            app.checkPermission("Organization.TwAdminUser")) this.$router.push({name: "AdminManage"});
        app.title = "社团管理";
        this.getDashBoard();
        this.getAllOrgs();
        this.judgeTime();
        this.getPending();
    },
    methods: {
        getDashBoard () {
            axios.post("/api/org/StudentDashboard", {}, msg => {
                this.dashBoard = msg.departs;
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
        getPending () {
            axios.post("/api/workflow/Pending", {}, msg => {
                this.messageNum = msg.totalRow;
                this.message = msg.data;
            })
        },
        getAllOrgs () {
            axios.post("/api/security/GetAllDeparts", {}, msg => {
                this.allDeparts = msg.data;
                this.orgHistory = this.allDeparts.filter(e => e.app);
                // .map(e => {
                //     e.State = e.app.State;
                //     e.AppID = e.app.ID;
                //     delete e.app;
                //     return e;
                // });
            });
        },
        showOrgs () {

        },
        ApplicateOrg (departId) {
            axios.post("/api/security/ApplicateDepart", {departId}, msg => {
                this.allDeparts = msg.data;
            });
        },
        withdrawApplication (appId) {
            axios.post("/api/security/WithDraw", {appId}, msg => {});
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
