<template>
    <i-row>
        <i-row id="chart">
            <i-col span="15">
                <i-card>
                    <CellGroup>
                        <Cell style="border-bottom: 1px solid #e8eaec;padding-top:20px">
                            <i-row type="flex">
                                <i-col style="font-weight: bold;margin-bottom: 20px;font-size:18px">
                                    我的待办
                                    <Badge :count="message.length" v-if="message.length >0"></Badge>
                                </i-col>
                            </i-row>
                        </Cell>
                    </CellGroup>
                    <List v-if="messageNum>0">
                        <template>
                            <div v-for="(item,index) in message.slice(0,5)" :key="index">
                                <i-row style="padding:10px;border-bottom: 1px solid #e8eaec;">
                                    <i-col span="20" style="padding: 10px 0px 10px 10px;">
                                        <div>
                                            <Icon type="ios-checkmark-circle-outline" color="limegreen"/>
                                            {{item.WorkflowName}}
                                        </div>
                                        <div style="color: #aaaaaa;font-size:14px">
                                            <Icon type="md-information-circle" />
                                            {{item.Owner}}提交的流程
                                        </div>
                                        <div style="color: #aaaaaa;font-size:14px">
                                            <Icon type="md-shuffle" />
                                            工作流到达时间{{item.ArriveOn}}
                                        </div>
                                    </i-col>
                                    <i-col span="4" style="padding-top:20px;">
                                        <Button type="success" @click="dealWorkflow(item.InstanceId, item.StepId, item.WorkflowName)" v-if="item.StepName.length<=6">{{item.StepName}}</Button>
                                        <Button type="success" @click="dealWorkflow(item.InstanceId, item.StepId, item.WorkflowName)" v-else>详情</Button>
                                    </i-col>
                                </i-row>
                            </div>
                        </template>
                    </List>
                    <template v-else>
                        <i-row class="picture">所有工作已完成</i-row>
                    </template>
                </i-card>
                <i-card style="margin-top:10px">
                    <CellGroup>
                        <Cell>
                            <i-row type="flex">
                                <i-col style="font-weight: bold;margin-bottom: 20px;font-size:18px">
                                    社团活动
                                </i-col>
                            </i-row>
                        </Cell>
                    </CellGroup>
                    <i-row>
                        <i-table stripe :columns="activity" :data="activityData.slice(0,5)" :loading="tableLoading">
                            <template slot="Action" slot-scope="{row}">
                                <i-button @click="checkWorkflow(row.InstanceId, row.StepId, row.ID)">查看</i-button>
                            </template>
                        </i-table>
                    </i-row>
                </i-card>
            </i-col>
            <i-col span="8" style="margin-left:15px"
                v-if='app.checkPermission("Organization.DepartAdminUser") || app.checkPermission("Organization.UnitAdminUser")
                ||app.checkPermission("Organization.TwAdminUser") || app.checkPermission("Organization.TeacherAdmin") '>
                <i-card :padding="0" style="margin-bottom:10px">
                    <div :to="dashBoard.DepartType === 0 ? routers[1]:routers[0]" v-if="true" style="background-color:#ffffff">
                        <i-row type="flex" style="padding:30px">
                            <i-col span="4">
                                <Avatar size="large" :src="userInfo.avatar"/>
                            </i-col>
                            <i-col span="19">
                                <div>{{time}}好! {{userInfo.realName}}</div>
                                <a @click="navTo">{{data.Name}}的社团管理员</a>
                            </i-col>
                        </i-row>
                        <i-row type="flex" class="background-purple">
                            <i-col span="8">
                                <div style="padding-top:20px;">
                                    <i-row type="flex">
                                        <i-col span="22">
                                            <div style="font-size: 33px;text-align:center;" v-if="membersData.length>0">{{membersData.length}}</div>
                                            <div style="font-size: 33px;text-align:center;" v-else>0</div>
                                            <div style="margin-bottom:10px;font-size:12px;text-align:center;">成员数</div>
                                        </i-col>
                                        <i-col span="1">
                                            <div style="border-right: 1px solid #fff;height: 36px;margin-top: 10px;opacity: .2;"/>
                                        </i-col>
                                    </i-row>
                                </div>
                            </i-col>
                            <i-col span="8">
                                <div style="padding-top:20px;">
                                    <i-row type="flex">
                                        <i-col span="22">
                                            <div style="font-size: 33px;text-align:center;" v-if="activityData.length>0">{{activityData.length}}</div>
                                            <div style="font-size: 33px;text-align:center;" v-else>0</div>
                                            <div style="margin-bottom:10px;font-size:12px;text-align:center;">活动数</div>
                                        </i-col>
                                        <i-col span="1">
                                            <div style="border-right: 1px solid #fff;height: 36px;margin-top: 10px;opacity: .2;"/>
                                        </i-col>
                                    </i-row>
                                </div>
                            </i-col>
                            <i-col span="8">
                                <div style="padding-top:20px;">
                                    <i-row type="flex">
                                        <i-col span="22">
                                            <div style="font-size: 33px;text-align:center;" v-if="applicationsData.length>0">{{applicationsData.length}}</div>
                                            <div style="font-size: 33px;text-align:center;" v-else>0</div>
                                            <div style="margin-bottom:10px;font-size:12px;text-align:center;">申请数</div>
                                        </i-col>
                                    </i-row>
                                </div>
                            </i-col>
                        </i-row>
                    </div>
                </i-card>
                <i-row  v-for="(item,index) in entrForManager" :key="index">
                    <i-card class="layout-con" :to="item.routerTo">
                        <i-row type="flex">
                            <i-col span="4">
                                <div style="padding:10px">
                                    <Badge :count="entranceBadge[item.count]" v-if="item.title!='添加活动'">
                                        <i-avatar :icon="item.icon" />
                                    </Badge>
                                    <i-avatar :icon="item.icon" v-else/>
                                </div>
                            </i-col>
                            <i-col span="19">
                                <div style="padding-top:5px">{{item.title}}</div>
                                <div style="font-size:14px">{{item.descrip}}</div>
                            </i-col>
                        </i-row>
                    </i-card>
                </i-row>
            </i-col>
        </i-row>
    </i-row>
</template>

<script>
import axios from 'axios';
// const echarts = require("echarts");
const app = require("@/config");
let pic = require("@/assets/icon.png");
export default {
    data () {
        return {
            app,
            level: -1,
            pic: pic,
            messageNum: 0,
            data: [],
            activity: [
                {
                    title: '活动名称',
                    key: 'ActivityName'
                },
                {
                    title: '活动类型',
                    key: 'ActivityType'
                },
                {
                    title: '审核进度',
                    key: 'CurrentStep'
                },
                {
                    title: '负责人姓名',
                    key: 'Owner'
                },
                {
                    title: '活动开始时间',
                    key: 'StartDate'
                },
                {
                    title: '二维码',
                    key: 'ShortCode'
                },
                {
                    title: '操作',
                    slot: 'Action'
                }
            ],
            activityData: [],
            message: [
                {
                    WorkflowName: "软件竞赛报名流程申请",
                    StepName: "指导老师审核[强制执行]",
                    Owner: "宋润涵",
                    ArriveOn: "2020年7月1日"
                }
            ],
            time: "早上",
            dic: {
                "修改社团基本信息申请": "/manage/org/orgdetailform",
                "社团活动申请": "/manage/org/activityform"
            },
            dashBoard: {
                users: 0,
                teachers: [],
                children: 0,
                StrType: 0,
                DepartType: 0,
                BirthTime: "",
                Name: ""
            },
            userInfo: app.userInfo,
            routers: [
                {
                    name: "OrgDetail",
                    query: {
                        tabSelect: "basicInfo"
                    }
                },
                {
                    name: "Affiliated",
                    query: {
                        tabSelect: "member"
                    }
                }, {
                    name: "OrgDetail",
                    query: {
                        tabSelect: "member"
                    }
                }, {
                    name: "OrgDetail",
                    query: {
                        tabSelect: "subDept"
                    }
                }, {
                    name: "OrgDetail",
                    query: {
                        tabSelect: "tutor"
                    }
                }, {
                    name: "OrgDetail",
                    query: {
                        tabSelect: "manager"
                    }
                }, {
                    name: "OrgDetail",
                    query: {
                        tabSelect: "activity"
                    }
                }
            ],
            entrForManager: [
                {
                    title: "成员管理",
                    count: "membersData",
                    descrip: "管理本社团的所有成员，处理成员加入申请以及踢除成员",
                    routerTo: {
                        name: "OrgDetail",
                        query: {
                            tabSelect: "member"
                        }
                    },
                    icon: "md-person-add"
                },
                {
                    title: "添加活动",
                    descrip: "添加一个活动的申请，需要指导老师，业务指导单位，学生联合会及团委审核",
                    routerTo: {
                        name: "OrgDetail",
                        query: {
                            tabSelect: "activity"
                        }
                    },
                    icon: "logo-buffer"
                },
                {
                    title: "活动管理",
                    count: "activityData",
                    descrip: "管理本社团的所有活动，对已经通过审核的活动可以选择开始活动。也可以在本页面下载活动签到二维码",
                    routerTo: {
                        name: "Affiliated",
                        query: {
                            tabSelect: "activity"
                        }
                    },
                    icon: "md-information"
                },
                {
                    title: "我的待办",
                    count: "pendingData",
                    descrip: "等待我处理的工作",
                    routerTo: {
                        name: "MyPending",
                        query: {}
                    },
                    icon: "ios-add-circle"
                }
            ],
            page: 1,
            pageSize: 5,
            tableLoading: false,
            membersData: [],
            applicationsData: [],
            entranceBadge: {
                "membersData": 0,
                "activityData": 0,
                "pendingData": 0
            }
        };
    },
    mounted () {
        app.title = "主页";
        this.getDashBoard();
        this.judgeTime();
        this.getPending();
    },
    methods: {
        getDashBoard () {
            axios.post("/api/org/GetDashboard", {}, msg => {
                this.dashBoard = msg;
                axios.post("/api/security/GetOrgDetail", {}, msg => {
                    console.log(msg)
                    this.level = msg.level;
                    this.data = msg.data;
                    console.log(this.data)
                        // msg.charts.departType.forEach(element => {
                        //     element.name = element.name ? element.name : "未分类";
                        // });
                        // this.depart.series.data = msg.charts.departType;
                        // msg.charts.userType.forEach(element => {
                        //     element.name = element.name ? element.name : "未填写";
                        // });
                        // this.member.series.data = msg.charts.userType;
                        // let ele = document.getElementById("depart");
                        // let instance = echarts.init(ele);
                        // instance.setOption(this.depart);
                        // let ele3 = document.getElementById("member");
                        // let instance3 = echarts.init(ele3);
                        // instance3.setOption(this.member);
                        axios.post("/api/org/GetActByDepartId", {Id: msg.data.ID}, msg => {
                            this.activityData = msg.data;
                            this.entranceBadge["activityData"] = this.activityData.length;
                            // this.guage.series.data[0].value = msg.charts.departCount;
                            // this.guage.series.max = msg.charts.total;
                            // let ele2 = document.getElementById("guage");
                            // let instance2 = echarts.init(ele2);
                            // instance2.setOption(this.guage);
                        });
                        axios.post("/api/security/GetUsersByDepartId", {departId: msg.data.ID}, msg => {
                            this.membersData = msg.data;
                            this.entranceBadge["membersData"] = this.membersData.length
                        });
                        axios.post("/api/security/GetApplicationsByDeparts", {departId: msg.data.ID}, msg => {
                            this.applicationsData = msg.data;
                        })
                })
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
                this.entranceBadge["pendingData"] = this.messageNum;
            })
        },
        dealWorkflow (instanceId, stepId, WorkflowName) {
            window.open(`${this.dic[WorkflowName]}?instanceId=${instanceId}&stepId=${stepId}&detail=false`);
        },
        navTo (url) {
            this.$router.push({name: 'OrgDetail'});
        },
        checkWorkflow (instanceId, stepId, actId) {
            window.open(`/manage/org/signUpSituation?instanceId=${instanceId}&stepId=${stepId}&detail=true&actId=${actId}`);
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
    .background-grey
    {
        background-color: lightgrey;
    }
    .background-white
    {
        background-color: white;
    }
    .background-purple{
        color: #ffffff;
        background: #6882da;
    }
    #chart {
        padding: 24px;
        // text-align: center;
        #userInfo {
            margin: 0 24px;
            font-size: 24px;
        }
        .difference {
            font-size: 16px;
            color: #808695;
            .number {
                font-size: 16px;
            }
        }
        .item-name {
            font-size: 20px;
            color: #17233d;
        }
        .number {
            font-size: 36px;
            font-weight: bold;
        }
        #organization {
            width: 11%;
            text-align: center;
            margin: 15px 0;
            .number
            {
                color: #da5953;;
            }
        }
        #member {
            width: 11%;
            text-align: center;
            margin: 15px 0;
            .number
            {
                color: #d37b33;
            }
        }
        #activity {
            width: 11%;
            text-align: center;
            margin: 15px 0;
            .number
            {
                color: #53ac9a;
            }
        }
    }
    .welcome {
        font-size: 40px;
        color: #17233d;
        padding: 15px 0;
        font-weight: bold;
    }
    .tip {
        font-size: 18px;
        color: #808695;
    }
    .title {
        font-size: 28px;
        color: #17233d;
        padding: 15px 0px;
        margin-top: 10px;
        //text-align: center;
    }
    .padding {
        padding: 10px;
    }
    .margin {
        margin: 5px;
    }
    .layout-con {
        margin-bottom: 12px;
        color: #515a6e;
    }
    .picture {
        margin: 0px 0px 24px 0px;
        text-align: center;
        color: #808695;
        letter-spacing: 5px;
        font-size: 32px;
        border: #dcdee2 solid 3px;
        border-radius: 20px;
        height:300px;
        line-height: 300px;
    }
</style>
