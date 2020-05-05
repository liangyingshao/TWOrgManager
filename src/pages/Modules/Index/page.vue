<template>
    <i-row>
        <i-row type="flex" align="middle" :style="bgImg" class="head">
            <i-col push="3">
                <i-row type="flex"><img :src="xmuWordImg" style="margin-right: 16px" />学生社团管理</i-row>
            </i-col>
        </i-row>
        <i-row>
            <i-col span="14" push="5">
                <i-row>
                    <i-col span="9">
                        <i-card>
                            <i-divider style="font-size:32px">用户登录</i-divider>
                            <i-row style="margin: auto 24px">
                                <i-form>
                                    <i-form-item>
                                        <i-input placeholder="用户名" prefix="ios-contact" />
                                    </i-form-item>
                                    <i-form-item>
                                        <i-input placeholder="密码"  prefix="ios-lock" type="password" password />
                                    </i-form-item>
                                </i-form>
                            </i-row>
                            <i-row style="margin: 0px 24px 40px 24px">
                                <i-button type="primary">用厦大账号登录</i-button>
                                <i-button>直接登录</i-button>
                            </i-row>
                        </i-card>
                    </i-col>
                    <i-col span="14" push="1">
                        <i-carousel loop :height="300">
                            <CarouselItem v-for="data in data.carouselItems" :key="data.carouselItems">
                                <img :src="data.img" />
                            </CarouselItem>
                        </i-carousel>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="9">
                        <i-tabs>
                            <i-tab-pane label="最新活动" icon="md-paper">
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
                    <i-col span="14" push="1">
                        <i-tabs>
                            <i-tab-pane label="学院新闻" icon="md-megaphone">
                                <i-row :gutter="16" class="news" v-for="(item, index) in data.news" :key=index>
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
                        }
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
.single-row {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
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
.news {
    margin-bottom: 10px;
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
