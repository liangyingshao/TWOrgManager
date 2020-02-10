<template>
    <i-card :padding="50">
        <i-row type="flex" justify="center">
            <i-col span="13">
                <i-row>
                    <div class="welcome">{{time}}好，{{userInfo.realName}}</div>
                </i-row>
                <List v-if="messageNum>0" :header="`您有${messageNum}条待办事项`">
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
                    <i-row class="tip">您目前没有待办事项</i-row>
                    <i-row class="layout-con"><img :src="pic" /></i-row>
                </template>
                <i-row class="title">常用入口</i-row>
                <i-row type="flex" justify="space-between">
                    <template v-if="dashBoard.DepartType===1">
                        <i-col span="7"  v-for="(item,index) in entrForStudent" :key="index">
                            <i-card class="layout-con" :to="item.routerTo">
                                <i-avatar class="margin" :icon="item.icon" />{{item.title}}
                            </i-card>
                        </i-col>
                    </template>
                    <template v-else-if="dashBoard.DepartType===0">
                        <i-col span="7"  v-for="(item,index) in entrForStudent" :key="index">
                            <i-card class="layout-con" :to="item.routerTo">
                                <i-avatar class="margin" :icon="item.icon" />{{item.title}}
                            </i-card>
                        </i-col>
                    </template>
                </i-row>
            </i-col>
            <i-col span="5" offset="2">
                <i-card :padding="0" :to="routers[0]" v-if="dashBoard.Name">
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
                        <i-cell :title="`社团类型:${dashBoard.StrType}`">
                        </i-cell>
                        <i-cell :title="`成立时间:${dashBoard.BirthTime}`">
                        </i-cell>
                    </i-cell-group>
                </i-card>
            </i-col>
        </i-row>
    </i-card>
</template>

<script>
import axios from 'axios';
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
                        name: "OrgDetail",
                        query: {
                            tabSelect: "member"
                        }
                    },
                    icon: "md-person-add"
                },
                {
                    title: "添加社团",
                    routerTo: {
                        name: "OrgDetail",
                        query: {
                            tabSelect: "subDept"
                        }
                    },
                    icon: "md-add"
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
                    title: "我创建的",
                    routerTo: {
                        name: "MyFlow",
                        query: {}
                    },
                    icon: "md-information"
                },
                {
                    title: "我参与的",
                    routerTo: {
                        name: "MyAttend",
                        query: {}
                    },
                    icon: "md-information"
                },
                {
                    title: "所有流程",
                    routerTo: {
                        name: "AllFlow",
                        query: {}
                    },
                    icon: "md-information"
                }
            ]
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
                console.log(this.dashBoard["teachers"]);
                app.departType = msg.DepartType;
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
    .welcome {
        font-size: 32px;
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
        padding: 10px 0px;
        margin-top: 10px;
    }
    .padding {
        padding: 10px;
    }
    .margin {
        margin: 10px;
    }
    .layout-con {
        margin-bottom: 24px;
        text-align: center;
        color: #515a6e;
    }
</style>
