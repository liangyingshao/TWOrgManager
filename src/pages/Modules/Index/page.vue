<template>
    <i-row  :style="bgImg">
        <i-row type="flex" align="middle" class="head">
            <img :src="newBanner" style="height: 100px;" />
        </i-row>
        <i-row>
            <i-col span="14" push="16">
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
                            <i-row class="card-head">用户登录</i-row>
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
                                <i-button type="primary" @click="toXMUIds()" style="margin-bottom: 10px;width: 100%">用厦大账号登录</i-button>
                                <i-button @click="login" :loading='isloading' style="width: 100%">直接登录</i-button>
                            </i-row>
                        </i-card>
                    </i-col>
                </i-row>
            </i-col>
        </i-row>
        <i-row type="flex" class="foot">
            <i-col style="width: 100%;text-align: center;vertical-align: middle;line-height: 100px;">厦门大学学生社团管理系统</i-col>
        </i-row>
    </i-row>
</template>

<script>
const axios = require("axios");
let app = require("@/config");
const md5 = require("md5");
const bg = require("@/assets/bg.jpg");
export default {
    data () {
        return {
            app,
            bgImg: {
                backgroundImage: `url(${bg})`,
                "min-height": "100vh",
                "background-repeat": "no-repeat",
                "background-size": "100% 100%",
                "background-attachment": "fixed"
            },
            loginValue: {
                username: '',
                password: ''
            },
            isloading: false,
            xmuWordImg: require("@/assets/XMUWordBlue.png"),
            xmuLogoImg: require("@/assets/logoBlue.png"),
            newBanner: require("@/assets/newBanner.png")
        }
    },
    mounted () {
        app.title = "登录";
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
                            let path = this.$route.query.goto || app.dashboard
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
.card-head{
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin: 20px;
}
.single-row {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.foot{
    position:absolute;
    bottom:0;
    width:100%;
    background-repeat: no-repeat;
    height: 100px;
    background-color: white;
    font-size: 24px;
    letter-spacing: 0.05em;
}
.head{
    color: #122e66;
    background-repeat: no-repeat;
    background-position: 50% 0%;
    height: 100px;
    background-color: white;
    margin-bottom: 100px;
    font-size: 36px;
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
