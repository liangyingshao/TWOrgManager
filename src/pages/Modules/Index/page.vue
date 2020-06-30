<template>
    <i-row>
        <i-row type="flex" align="middle" :style="bgImg" class="head">
            <i-col push="5">
                <!-- <i-row type="flex"><img :src="xmuWordImg" style="margin-right: 16px" />学生社团管理</i-row> -->
            </i-col>
        </i-row>
        <i-row>
            <i-col span="14" push="5">
                <i-row type="flex" :gutter="24">
                    <i-col span="9">
                        <i-card v-if="app.userInfo.isLogined">
                            <i-divider style="font-size:32px">登录信息</i-divider>
                            <i-row style="margin: auto 24px">
                                姓名：{{app.userInfo.realName}}<br/>
                                您的身份：{{app.userInfo.permissons.includes('Organization.Student')?"学生":""}}
                                {{app.userInfo.permissons.includes('Organization.Organization.TeacherAdmin')?"指导老师":""}}
                                {{app.userInfo.permissons.includes('Organization.TwAdminUser')?"校团委管理员":""}}
                                {{app.userInfo.permissons.includes('Organization.DepartAdminUser')?"社团管理员":""}}
                                {{app.userInfo.permissons.includes('Organization.UnitAdminUser')?"业务指导单位管理员":""}}
                                {{app.userInfo.permissons.includes('Organization.XSLHH')?"学生社团联合会":""}}<br/>
                                登录IP：{{app.userInfo.region.ip}}<br/>
                                登录地点：{{app.userInfo.region.province}}&nbsp;{{app.userInfo.region.city}}
                            </i-row>
                            <i-row style="margin: 12px 24px 24px">
                                <i-button @click="toOrgManage()" type="primary">进入系统</i-button>
                                <i-button @click="logout()" :loading='isloading'>注销</i-button>
                            </i-row>
                        </i-card>
                        <i-card v-else>
                            <i-divider style="font-size:32px">用户登录</i-divider>
                            <i-row style="margin: auto 24px">
                                <i-form>
                                    <i-form-item>
                                        <i-input placeholder="用户名" prefix="ios-contact" v-model="loginValue.username"/>
                                    </i-form-item>
                                    <i-form-item>
                                        <i-input placeholder="密码" @on-enter="login" prefix="ios-lock" type="password" password v-model="loginValue.password"/>
                                    </i-form-item>
                                </i-form>
                            </i-row>
                            <i-row style="margin: 0px 24px 40px 24px">
                                <i-button type="primary" @click="toXMUIds()">用厦大账号登录</i-button>
                                <i-button @click="login" :loading='isloading'>直接登录</i-button>
                            </i-row>
                        </i-card>
                    </i-col>
                    <i-col span="15">
                        <i-carousel loop :height='300'>
                            <CarouselItem v-for="data in data.carouselItems" :key="data.carouselItems">
                                <img :src="data.img" />
                            </CarouselItem>
                        </i-carousel>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="24" style="margin-top: 16px">
                    <i-col span="9">
                        <i-tabs class="latest-activities">
                            <i-tab-pane :label="activityLable" class="latest-activities" style="cursor:default">
                                <List item-layout="horizontal">
                                    <ListItem class="list-item" @click.native="toDetail(activity.routerObj)" v-for="activity in data.activities" :key="activity.title">
                                        <ListItemMeta>
                                            <template slot="title">{{activity.title}}</template>
                                        </ListItemMeta>
                                        <template slot="action">
                                            <li>
                                                <i-icon type="md-calendar" />&nbsp;{{activity.date}}
                                            </li>
                                        </template>
                                    </ListItem>
                                </List>
                            </i-tab-pane>
                        </i-tabs>
                    </i-col>
                    <i-col span="15">
                        <i-tabs>
                            <i-tab-pane :label="newsLable">
                                <i-row @click.native="toDetail(item.routerObj)" :gutter="16" class="news" v-for="(item, index) in data.news" :key="index">
                                    <i-col span="3">
                                        <i-row class="date">{{item.date.day}}<hr/>{{item.date.year}}/{{item.date.month}}</i-row>
                                    </i-col>
                                    <i-col span="21">
                                        <i-row class="topic">
                                            <i-row style="color: #122e66;font-weight: bold">【{{item.content.type}}】</i-row>
                                            <i-row class="single-row">{{item.content.abs ? '【' + item.content.abs + '】' : ''}}
                                                {{item.content.desc}}</i-row>
                                        </i-row>
                                    </i-col>
                                </i-row>
                            </i-tab-pane>
                        </i-tabs>
                    </i-col>
                </i-row>
            </i-col>
        </i-row>
    </i-row>
</template>

<script>
const axios = require("axios");
let app = require("@/config");
const md5 = require("md5");
const banner = require("@/assets/banner.png")
export default {
    data () {
        return {
            app,
            bgImg: {
                backgroundImage: `url(${banner})`
            },
            loginValue: {
                username: '',
                password: ''
            },
            isloading: false,
            xmuWordImg: require("@/assets/XMUWord.png"),
            data: {
                activities: [
                    {
                        title: "信息学院师生",
                        date: "2020-3-25",
                        routerObj: {
                            name: 'NewsDetail'
                        }
                    },
                    {
                        title: "战疫情 筑防线 献爱心",
                        date: "2020-3-26",
                        routerObj: {
                            name: 'NewsDetail'
                        }
                    },
                    {
                        title: "就业战役 信息同行",
                        date: "2020-3-28",
                        routerObj: {
                            name: 'NewsDetail'
                        }
                    },
                    {
                        title: "国际人工智能大会",
                        date: "2020-3-29",
                        routerObj: {
                            name: 'NewsDetail'
                        }
                    }
                ],
                news: [
                    {
                        date: {
                            year: '20',
                            month: "04",
                            day: '25'
                        },
                        content:
                        {
                            abs: "学生交流",
                            type: "外事",
                            desc: "关于北美地区2020-2021学年校际交流项目的通知"
                        },
                        routerObj: {
                            name: 'NewsDetail'
                        }
                    },
                    {
                        date: {
                            year: '20',
                            month: "04",
                            day: '25'
                        },
                        content:
                        {
                            abs: "学生交流",
                            type: "外事",
                            desc: "关于北美地区2020-2021学年英国纽卡斯尔大学校际交流项目的选拔通知"
                        },
                        routerObj: {
                            name: 'NewsDetail'
                        }
                    },
                    {
                        date: {
                            year: '20',
                            month: "04",
                            day: '25'
                        },
                        content:
                        {
                            type: "研究生",
                            desc: "关于信息学院国家建设高水平大学公派研究生项目攻读博士学位研究生增补……通知"
                        },
                        routerObj: {
                            name: 'NewsDetail'
                        }
                    }
                ],
                carouselItems: [
                    {img: require("@/assets/temp1.jpg")},
                    {img: require("@/assets/temp2.jpg")},
                    {img: require("@/assets/temp3.jpg")}
                ]
            },
            activityLable: (h) => {
                return h('div', {
                    style: {
                        color: '#2d8cf0'
                    }
                }, [
                    h('Icon', {
                        props: {
                            type: 'md-paper',
                            size: 18
                        }
                    }, []),
                    h('span', {
                        style: {
                            fontSize: '18px'
                        }
                    }, '最新活动')
                ])
            },
            newsLable: (h) => {
                return h('div', [
                    h('Icon', {
                        props: {
                            type: 'md-megaphone',
                            size: 18
                        }
                    }, []),
                    h('span', {
                        style: {
                            fontSize: '18px'
                        }
                    }, '学院新闻', {
                        style: {color: '#2d8cf0'}
                    })
                ])
            }
        }
    },
    mounted () {
    },
    methods: {
        toDetail (routerObj) {
            this.$router.push(routerObj);
        },
        toXMUIds () {
            this.$Notice.warning({title: '功能正在开发', desc: '将会跳转至厦大统一身份验证'});
        },
        toOrgManage () {
            this.$router.push({name: "OrgManage"});
        },
        logout () {
            this.isloading = true;
            axios.post("/api/security/logout", {currentUserGuid: app.currentUserGuid}, msg => {
                this.isloading = false;
                if (msg.success === true) {
                    app.userInfo.isLogined = false;
                } else {
                    this.$Message.warning("注销失败");
                }
            })
        },
        login () {
            this.isloading = true;
            let userName = this.loginValue.username;
            let password = this.loginValue.password;
            axios.post("/api/security/Login", { method: 'password', username: userName, pwd: md5(password), isRemember: false, isPwd: true }, msg => {
                this.isloading = false;
                if (msg.success) {
                    app.userInfo = msg.userInfo;
                    let ps = app.userInfo.permissons;
                    app.checkPermission = (p) => {
                        return ps && ps.indexOf(p) >= 0;
                    }
                    this.$nextTick(() => {
                        if (msg.success) {
                            let path = this.$route.query.goto || app.dashboard;
                            path = path === "/" ? app.dashboard : path;
                            if (path !== app.dashboard) this.$router.push(path);
                        } else {
                            this.$Message.warning(msg.msg);
                        }
                    });
                } else {
                    this.$Message.warning(msg.msg);
                }
            })
        }
    }
}
</script>

<style scoped>
.single-row {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.head{
    background-repeat: no-repeat;
    background-position: 50% 0%;
    height: 250px;
    background-color: #122e66;
    margin-bottom: 24px;
    color: white;
    font-size: 64px;
    letter-spacing: 0.15em;
}
.news {
    margin-bottom: 10px;
    cursor: pointer;
}
.news .date{
    color: white;
    background-color: #122e66;
    padding: 8px;
    text-align: center;
}
.news .topic{
    border: darkgray 1px solid;
    padding: 8px;
}
.list-item {
    cursor: pointer;
}
.ivu-tabs-nav {
    cursor: default;
}
</style>
