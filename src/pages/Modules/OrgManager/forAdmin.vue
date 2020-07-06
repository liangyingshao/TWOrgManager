<template>
    <i-row class="background-white">
        <i-row type="flex" id="chart" class="background-grey">
            <i-col><Avatar style="width: 140px;height: 140px;" :src="app.webInfo.avatar"/></i-col>
            <i-col id="userInfo">
                <p class="welcome">厦门大学社团管理系统</p>
                <p>{{time}}好，{{userInfo.realName}}</p>
            </i-col>
            <template v-if="level === 2 || level === 3">
                <i-col id="organization">
                    <i-row class="difference">较去年<span class="number">+{{chart.organization.allChildrenIncrease}}</span></i-row>
                    <i-row class="number">{{chart.organization.allChildrenCount}}</i-row>
                    <i-row class="item-name">社团数</i-row>
                </i-col>
                <i-col>
                    <i-divider type="vertical" />
                </i-col>
                <i-col id="member">
                    <i-row class="difference">较去年<span class="number">+{{chart.member.allMemberIncrease}}</span></i-row>
                    <i-row class="number">{{chart.member.allMemberCount}}</i-row>
                    <i-row class="item-name">成员数</i-row>
                </i-col>
                <i-col>
                    <i-divider type="vertical" />
                </i-col>
                <i-col id="activity">
                    <i-row class="difference">较去年<span class="number">+{{chart.activity.increase}}</span></i-row>
                    <i-row class="number">{{chart.activity.total}}</i-row>
                    <i-row class="item-name">活动数</i-row>
                </i-col>
            </template>
        </i-row>
        <i-row type="flex" style="padding: 20px 60px;" justify="space-between">
            <i-col span="14">
                <i-row type="flex">
                    <i-col v-if="message.length >0" style="font-weight: bold;margin-bottom: 20px">您当前有{{message.length}}条待办事项</i-col>
                </i-row>
                <List v-if="messageNum>0">
                    <template v-for="(item,index) in message" >
                        <ListItem :key="index">
                            <ListItemMeta :title="`${item.Owner}提交的${item.WorkflowName}流程已到达您的步骤`" :description="`到达时间:${item.ArriveOn}`"></ListItemMeta>
                            <template slot="action">
                                <li @click="dealWorkflow(item.InstanceId, item.StepId, item.WorkflowName)"><a>{{item.StepName}}</a></li>
                            </template>
                        </ListItem>
                    </template>
                </List>
                <template v-else>
                    <i-row class="picture">所有工作已完成</i-row>
                </template>
            </i-col>
            <i-col span="8" offset="2" style="padding: 24px;background-color: lightgrey;"
                v-if='app.checkPermission("Organization.DepartAdminUser") || app.checkPermission("Organization.UnitAdminUser")
                ||app.checkPermission("Organization.TwAdminUser") || app.checkPermission("Organization.TeacherAdmin") '>
                <i-card :to="dashBoard.DepartType === 0 ? routers[1]:routers[0]" v-if="true">
                    <template slot="title">
                        {{dashBoard.Name}}
                    </template>
                    <i-cell-group style="padding: 10px 0px">
                        <i-cell :title="`现有成员:${dashBoard.users}人`" :to="entrForStudent[0].routerTo"></i-cell>
                        <template v-if="dashBoard.DepartType===1">
                            <template v-if="dashBoard.teachers.length===0">
                                <i-cell title="指导老师:无" :to="routers[3]" />
                            </template>
                            <template v-else>
                                <i-cell :to="routers[3]">指导老师:{{dashBoard.teachers.length}}名</i-cell>
                                <i-cell v-for="(item,index) in dashBoard.teachers" :key="index" style="padding-left: 30px">{{item.RealName}}</i-cell>
                            </template>
                        </template>
                        <i-cell :title="`子部门:${dashBoard.children?dashBoard.children:'无'}`" v-else-if="dashBoard.DepartType===0" :to="routers[2]">
                        </i-cell>
                        <i-cell :title="`社团类型:${dashBoard.StrType}`" v-if="dashBoard.DepartType !== 0">
                        </i-cell>
                        <i-cell :title="`成立时间:${dashBoard.BirthTime}`" v-if="dashBoard.DepartType !== 0">
                        </i-cell>
                    </i-cell-group>
                </i-card>
                <i-row class="title" v-if="dashBoard.DepartType === 1||dashBoard.DepartType === 0">常用入口</i-row>
                <i-row type="flex" justify="space-between">
                    <template v-if="dashBoard.DepartType===1">
                        <i-col span="10"  v-for="(item,index) in entrForStudent" :key="index">
                            <i-card class="layout-con" :to="item.routerTo">
                                <i-avatar class="margin" :icon="item.icon" />{{item.title}}
                            </i-card>
                        </i-col>
                    </template>
                    <template v-else-if="dashBoard.DepartType===0">
                        <i-col span="11"  v-for="(item,index) in entrForTeacher" :key="index">
                            <i-card class="layout-con" :to="item.routerTo">
                                <i-avatar class="margin" :icon="item.icon" />{{item.title}}
                            </i-card>
                        </i-col>
                    </template>
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
            message: [],
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
            entrForStudent: [
                {
                    title: "添加成员",
                    routerTo: {
                        name: "OrgDetail",
                        query: {
                            tabSelect: "member"
                        }
                    },
                    icon: "md-person-add"
                },
                {
                    title: "申请活动",
                    routerTo: {
                        name: "OrgDetail",
                        query: {
                            tabSelect: "activity"
                        }
                    },
                    icon: "logo-buffer"
                },
                {
                    title: "基本信息",
                    routerTo: {
                        name: "OrgDetail",
                        query: {
                            tabSelect: "basicInfo"
                        }
                    },
                    icon: "md-information"
                },
                {
                    title: "我创建的",
                    routerTo: {
                        name: "MyFlow",
                        query: {}
                    },
                    icon: "ios-add-circle"
                },
                {
                    title: "我参与的",
                    routerTo: {
                        name: "MyAttend",
                        query: {}
                    },
                    icon: "ios-contacts"
                },
                {
                    title: "所有流程",
                    routerTo: {
                        name: "AllFlow",
                        query: {}
                    },
                    icon: "md-eye"
                }
            ],
            entrForTeacher: [
                {
                    title: "添加成员",
                    routerTo: {
                        name: "Affiliated",
                        query: {
                            tabSelect: "member"
                        }
                    },
                    icon: "md-person-add"
                },
                {
                    title: "添加社团",
                    routerTo: {
                        name: "Affiliated",
                        query: {
                            tabSelect: "subDept"
                        }
                    },
                    icon: "md-add"
                },
                {
                    title: "申请活动",
                    routerTo: {
                        name: "Affiliated",
                        query: {
                            tabSelect: "activity"
                        }
                    },
                    icon: "logo-buffer"
                },
                {
                    title: "我创建的",
                    routerTo: {
                        name: "MyFlow",
                        query: {}
                    },
                    icon: "ios-add-circle"
                },
                {
                    title: "我参与的",
                    routerTo: {
                        name: "MyAttend",
                        query: {}
                    },
                    icon: "ios-contacts"
                },
                {
                    title: "所有流程",
                    routerTo: {
                        name: "AllFlow",
                        query: {}
                    },
                    icon: "md-eye"
                }
            ],
            chart: {
                member: {},
                activity: {},
                organization: {}
            }
        };
    },
    mounted () {
        // if (checkPermission("Organization.Student")) this.$router.push()
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
                    this.level = msg.level;
                    if (this.level === 2 || this.level === 3) {
                        this.chart.organization = msg.charts.allChildren;
                        this.chart.member = msg.charts.allMember;
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
                            this.chart.activity = msg.charts;
                            // this.guage.series.data[0].value = msg.charts.departCount;
                            // this.guage.series.max = msg.charts.total;
                            // let ele2 = document.getElementById("guage");
                            // let instance2 = echarts.init(ele2);
                            // instance2.setOption(this.guage);
                        });
                    }
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
            })
        },
        dealWorkflow (instanceId, stepId, WorkflowName) {
            window.open(`${this.dic[WorkflowName]}?instanceId=${instanceId}&stepId=${stepId}&detail=false`);
        },
        navTo (url) {
            this.$router.push({name: 'OrgDetail'});
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
    #chart {
        padding: 24px;
        // text-align: center;
        #userInfo {
            margin: 0 24px;
            width: 47%;
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
        margin-bottom: 24px;
        text-align: center;
        color: #515a6e;
    }
    .picture {
        margin: 40px 0px 24px 0px;
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
