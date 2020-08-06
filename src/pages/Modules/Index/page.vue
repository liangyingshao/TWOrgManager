<template>
    <i-row  :style="bgImg">
        <i-row type="flex" align="middle" class="head">
            <img :src="newBanner" style="height: 100px;"/>
        </i-row>
        <i-row>
            <i-col span="14" push="16">
                <i-row type="flex" :gutter="24">
                    <i-col span="9">
                        <i-card v-if="app.userInfo.isLogined">
                            <i-divider style="font-size:32px">登录信息</i-divider>
                            <i-row style="margin: auto 24px">
                                <CellGroup>
                                    <Cell title="学生主页" to=""></Cell>
                                    <Cell title="社团主页" to="/manage/depart"></Cell>
                                    <Cell title="指导老师主页" to=""></Cell>
                                    <Cell title="业务指导主页" to=""></Cell>
                                    <Cell title="社团管理部主页" to=""></Cell>
                                    <Cell title="团委主页" to=""></Cell>
                                </CellGroup>
                            </i-row>
                            <i-row style="margin: 12px 24px 24px">
                                <i-button @click="toOrgManage()" type="primary">进入系统</i-button>
                                <i-button style="float:right" @click="logout()" :loading='isloading'>注销</i-button>
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
                                        <i-input placeholder="密码" @on-enter="login()" prefix="ios-lock" type="password" password v-model="loginValue.password"/>
                                    </i-form-item>
                                </i-form>
                            </i-row>
                            <i-row style="margin: 0px 24px 40px 24px">
                                <Dropdown style="width:100%">
                                    <i-button type="primary" style="margin-bottom: 10px;width: 100%">用厦大账号登录
                                        <Icon type="ios-arrow-down"/>
                                    </i-button>
                                    <DropdownMenu slot="list">
                                        <DropdownItem @click.native="login('15102242660', '88888888')">学生</DropdownItem>
                                        <DropdownItem @click.native="login('24320152356894', '123456')">社团</DropdownItem>
                                        <DropdownItem @click.native="login('25648', '123456')">指导老师</DropdownItem>
                                        <DropdownItem @click.native="login('13621345797', '88888888')">业务指导</DropdownItem>
                                        <DropdownItem @click.native="login('15102246798', '123456')">社团管理部</DropdownItem>
                                        <DropdownItem @click.native="login('admin', '88888888')">团委</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <i-button @click="login()" :loading='isloading' style="width: 100%">直接登录</i-button>
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
                "background-attachment": "fixed",
                "overflow": "auto",
                "overflow-x": "hidden"
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
        login (un, pwd) {
            this.isloading = true;
            let userName = (un || this.loginValue.username);
            let password = (pwd || this.loginValue.password);
            axios.post("/api/security/Login", { method: 'password', username: userName, pwd: md5(password), isRemember: false, isPwd: true }, msg => {
                this.isloading = false;
                if (msg.success) {
                    app.userInfo = msg.userInfo;
                    app.currentUserGuid = msg.currentUserGuid;
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
