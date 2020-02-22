<template>
    <i-card :padding="50">
        <i-row type="flex" justify="center">
            <i-col span="16">
                <i-row>
                    <div class="welcome">{{time}}好，{{userInfo.realName}}</div>
                </i-row>
                <i-row type="flex">
                    <i-col v-if="message.length >0" style="font-weight: bold;margin-bottom: 20px">您当前有{{message.length}}条待办事项</i-col>
                    <i-col style="font-weight: bold;margin-bottom:30px;color: gray" v-else>待办已经全部完成</i-col>
                </i-row>
                <i-row v-if="!isTeacehr" justify="space-between">
                    <i-col span="8">
                        <div id="depart" style="width:300px;height:200px"/>
                    </i-col>
                    <i-col span="7" offset="1" style="text-align: center">
                        <div id="guage" style="width:200px;height:200px"/>
                    </i-col>
                    <i-col span="8">
                        <div id="member" style="width:300px;height:200px"/>
                    </i-col>
                </i-row>
                <List v-if="messageNum>0">
                    <template v-for="(item,index) in message" >
                        <ListItem :key="index">
                            <ListItemMeta :title="`${item.Owner}提交的${item.WorkflowName}流程已到达您的步骤`" :description="`到达时间:${item.ArriveOn}`"></ListItemMeta>
                            <template slot="action">
                                <li @click="dealWorkflow(item.InstanceId, item.StepId)"><a>{{item.StepName}}</a></li>
                            </template>
                        </ListItem>
                    </template>
                </List>
                <template v-else>
                    <i-row style="margin-top: 40px" class="layout-con"><img :src="pic" /></i-row>
                </template>
            </i-col>
            <i-col span="7" offset="1" style="padding-top: 20px">
                <i-card :padding="0" :to="dashBoard.DepartType === 0 ? routers[1]:routers[0]" v-if="dashBoard.Name">
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
    </i-card>
</template>

<script>
import axios from 'axios';
const echarts = require("echarts");
let app = require("@/config");
let pic = require("@/assets/icon.png");
export default {
    data () {
        return {
            pic: pic,
            messageNum: 0,
            message: [],
            time: "早上",
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
            depart: {
               title: {
                    text: '社团类型',
                    left: '50%',
                    top: '80%',
                    textAlign: 'center',
                    textStyle: {
                        color: '#515A6E',
                        fontSize: '20',
                        fontWeight: 'normal'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}：{c}人（{d}%）'
                },
                series: {
                    type: 'pie',
                    radius: '35%',
                    center: ['50%', '50%'],
                    data: [],
                    label: {
                        position: 'outer',
                        fontSize: '15'
                    },
                    left: 0,
                    right: '0',
                    top: 0,
                    bottom: 0
                }
           },
            guage: {
                title: {
                    text: '本学院活动数',
                    left: '50%',
                    top: '80%',
                    textAlign: 'center',
                    textStyle: {
                        color: "#515A6E",
                        fontSize: '20',
                        fontWeight: 'normal'
                    }
                },
                series: {
                    type: 'gauge',
                    radius: '95%',
                    axisLine: {
                        lineStyle: {color: [[1, '#63869e']]}
                    },
                    itemStyle: {
                            color: '#91c7ae'
                    },
                    data: [{
                        value: 0
                    }],
                    max: 0,
                    title: {
                        fontSize: '15'
                    }
                }
            },
            member: {
                title: {
                    text: '社团成员',
                    left: '50%',
                    top: '80%',
                    textAlign: 'center',
                    textStyle: {
                        color: "#515A6E",
                        fontSize: '20',
                        fontWeight: 'normal'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}：{c}人（{d}%）'
                },
                series: {
                    type: 'pie',
                    radius: '35%',
                    center: ['50%', '50%'],
                    data: [],
                    label: {
                        position: 'outer',
                        fontSize: '15'
                    },
                    left: 0,
                    right: '0',
                    top: 0,
                    bottom: 0
                }
            },
            isTeacehr: true
        };
    },
    mounted () {
        app.title = "社团管理";
        this.getDashBoard();
        this.judgeTime();
        this.getPending();
    },
    methods: {
        getDashBoard () {
            axios.post("/api/org/GetDashboard", {}, msg => {
                this.dashBoard = msg;
                app.departType = msg.DepartType;
                if (msg.success) {
                    this.isTeacehr = false;
                    axios.post("/api/security/GetOrgDetail", {}, msg => {
                        if (msg.success) {
                            msg.charts.departType.forEach(element => {
                                element.name = element.name ? element.name : "未分类";
                            });
                            this.depart.series.data = msg.charts.departType;
                            msg.charts.userType.forEach(element => {
                                element.name = element.name ? element.name : "未填写";
                            });
                            this.member.series.data = msg.charts.userType;
                            let ele = document.getElementById("depart");
                            let instance = echarts.init(ele);
                            instance.setOption(this.depart);
                            let ele3 = document.getElementById("member");
                            let instance3 = echarts.init(ele3);
                            instance3.setOption(this.member);
                        }
                    })
                    axios.post("/api/org/GetActByDepartId", {}, msg => {
                        this.guage.series.data[0].value = msg.charts.departCount;
                        this.guage.series.max = msg.charts.total;
                        let ele2 = document.getElementById("guage");
                        let instance2 = echarts.init(ele2);
                        instance2.setOption(this.guage);
                    });
                }
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
        dealWorkflow (instanceId, stepId) {
            window.open("/manage/org/activityform?instanceId=" + instanceId + '&stepId=' + stepId);
        },
        navTo (url) {
            this.$router.push({name: 'OrgDetail'});
        }
    }
}
</script>

<style lang="less">
    .ivu-card-body {
        padding: 10px;
    }
    .ivu-card-head {
        border-bottom: 1px solid #e8eaec;
        padding: 14px 16px;
        line-height: 1;
        text-align: center;
    }
    .welcome {
        font-size: 48px;
        color: #17233d;
        padding: 10px 0;
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
        text-align: center;
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
</style>
