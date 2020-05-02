<template>
    <i-row>
        <i-row type="flex" align="middle" :style="bgImg" class="head">
            <i-col push="3">
                <i-row type="flex"><img :src="xmuWordImg" style="margin-right: 16px" />学生社团管理</i-row>
            </i-col>
        </i-row>
        <i-row>
            <i-col span="18" push="3">
                <i-row>
                    <i-col span="7">
                        <i-card>
                            <i-divider style="font-size:32px">用户登录</i-divider>
                            <i-row>
                                <i-form>
                                    <i-form-item>
                                        <i-input placeholder="用户名" prefix="ios-contact" />
                                    </i-form-item>
                                    <i-form-item>
                                        <i-input placeholder="密码"  prefix="ios-lock" type="password" password />
                                    </i-form-item>
                                </i-form>
                            </i-row>
                            <i-row>
                                <i-button type="primary">用厦大账号登录</i-button>
                                <i-button>直接登录</i-button>
                            </i-row>
                        </i-card>
                    </i-col>
                    <i-col span="16" push="1">
                        <i-carousel loop :height="300">
                            <CarouselItem v-for="data in data.carouselItems" :key="data.carouselItems">
                                <img :src="data.img" />
                            </CarouselItem>
                        </i-carousel>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="7">
                        <i-tabs>
                            <i-tab-pane label="最新活动">
                                <List item-layout="horizontal">
                                    <ListItem @click.native="toDetail(activity.routerObj)" v-for="activity in data.activities" :key="activity.title">
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
                    <i-col span="16" push="1">
                        <i-tabs>
                            <i-tab-pane label="学院新闻">
                                <i-row :gutter="16" class="news">
                                    <i-col span="2">
                                        <i-row class="date">25<hr/>20/24</i-row>
                                    </i-col>
                                    <i-col span="22">
                                        <i-row class="topic">
                                            <i-row>[外事]</i-row>
                                            <i-row>[学生交流]</i-row>
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
// const echarts = require("echarts");
// const app = require("@/config");
export default {
    data () {
        return {
            bgImg: {
                backgroundImage: 'url(' + require("@/assets/XMU.png") + ')'
            },
            xmuWordImg: require("@/assets/XMUWord.png"),
            data: {
                activities: [
                    {
                        title: "信息学院师生",
                        date: "2020-3-25",
                        routerObj: {
                            name: 'NewsDetail'
                        }
                    }
                ],
                news: [
                    {

                    }
                ],
                carouselItems: [
                    {img: require("@/assets/temp1.jpg")},
                    {img: require("@/assets/temp2.jpg")},
                    {img: require("@/assets/temp3.jpg")}
                ]
            }
        }
    },
    mounted () {
    },
    methods: {
        toDetail (routerObj) {
            this.$router.push(routerObj);
        }
    }
}
</script>

<style>
.head{
    background-repeat: no-repeat;
    background-position: 80% 0%;
    height: 250px;
    background-color: #122e66;
    margin-bottom: 24px;
    color: white;
    font-size: 64px;
    letter-spacing: 0.15em;
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
</style>
