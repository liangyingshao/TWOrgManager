<template>
    <i-row>
        <i-col>
            <i-form :model="modalData.user" :rules="ruleForMem" ref="Form">
                <i-row type="flex" justify="space-between">
                    <i-col span="11">
                        <i-form-item label="姓名" prop="RealName">
                            <i-input v-model="modalData.user.RealName" />
                        </i-form-item>
                    </i-col>
                    <i-col span="11">
                        <i-form-item label="学号" prop="Code">
                            <i-input v-model="modalData.user.Code" />
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" justify="space-between">
                    <i-col span="11">
                        <i-form-item label="学历" prop="Educational">
                            <i-input v-model="modalData.user.Educational" />
                        </i-form-item>
                    </i-col>
                    <i-col span="11">
                        <i-form-item label="专业" prop="Specialty">
                            <i-input v-model="modalData.user.Specialty" />
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" justify="space-between">
                    <i-col span="11">
                        <i-form-item label="政治面貌" prop="PoliticalStatus">
                            <i-input v-model="modalData.user.PoliticalStatus" />
                        </i-form-item>
                    </i-col>
                    <i-col span="11">
                        <i-form-item label="入团时间" prop="JoinCCYLTime">
                            <i-checkbox v-model="haveJoinCCYL"></i-checkbox>
                            <i-date-picker :disabled="!haveJoinCCYL" v-model="modalData.user.JoinCCYLTime" />
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" justify="space-between">
                    <i-col span="11">
                        <i-form-item label="入党时间" prop="JoinCPCTime">
                            <i-checkbox v-model="haveJoinCPC"></i-checkbox>
                            <i-date-picker :disabled="!haveJoinCPC" v-model="modalData.user.JoinCPCTime" />
                        </i-form-item>
                    </i-col>
                    <i-col span="11">
                        <i-form-item label="邮箱" prop="Email">
                            <i-input v-model="modalData.user.Email" />
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" justify="space-between">
                    <i-col span="11">
                        <i-form-item label="电话" prop="Mobile">
                            <i-input v-model="modalData.user.Mobile" />
                        </i-form-item>
                    </i-col>
                    <i-col span="11">
                        <i-form-item label="QQ" prop="QQ">
                            <i-input v-model="modalData.user.QQ" />
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" justify="space-between">
                    <i-col span="11">
                        <i-form-item label="籍贯" prop="BirthPlace">
                            <i-input v-model="modalData.user.BirthPlace" />
                        </i-form-item>
                    </i-col>
                    <i-col span="11">
                        <i-form-item label="生源地" prop="Source">
                            <i-input v-model="modalData.user.Source" />
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-button @click="showLog = true" type="text" style="float:right; padding: 0;">查看修改记录</i-button>
            </i-form>
        </i-col>
        <i-drawer title="修改记录" v-model="showLog" scrollable width="20">
            <i-timeline class="timeline">
                <TimelineItem v-for="(item,index) in modalData.changeLogs.data" :key="index">
                    <i-row>
                        <i-col>
                            <p class="time">{{item.OperateOn}}</p>
                            <p class="content">{{item.Operator}}{{item.Abstract}}</p>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col class="detail">
                            <p v-for="(d,index) in item.Details" :key="index">
                                {{d}}
                            </p>
                        </i-col>
                    </i-row>
                </TimelineItem>
            </i-timeline>
        </i-drawer>
    </i-row>
</template>

<script>
    let _ = require("lodash");
    const axios = require("axios");
    const regex = require("@/regex.js");
    export default {
        props: {
            modalData: {
                type: Object,
                required: true
            }
        },
        watch: {
            "modalData.user.JoinCPCTime" (value) {
                this.haveJoinCPC = value !== "1900年1月1日";
            },
            "modalData.user.JoinCCYLTime" (value) {
                this.haveJoinCCYL = value !== "1900年1月1日";
            }
        },
        data () {
            let THIS = this;
            return {
                showLog: false,
                haveJoinCPC: false,
                haveJoinCCYL: false,
                ruleForMem: {
                    RealName: [
                        {
                            required: true,
                            message: "必须填写姓名",
                            trigger: "blur"
                        }
                    ],
                    Code: [
                        {
                            required: true,
                            message: "必须填写学号",
                            trigger: "blur"
                        }
                    ],
                    "Mobile": [
                        {type: "string", pattern: regex.mobile, message: "手机格式不正确", trigger: "blur"},
                        _.debounce(function (rule, value, cb) {
                            let userId = THIS.modalData.user.ID;
                            axios.post("/api/security/MobileValidate", { userId, mobile: value }, msg => {
                                if (msg.success) {
                                    cb();
                                } else {
                                    cb(msg.remote);
                                }
                            })
                        }, 500)
                    ]
                }
            }
        },
        methods: {
            resetFields () {
                this.$refs["Form"].resetFields();
            },
            submit (departId, callback) {
                let form = this.$refs["Form"];
                form.validate(res => {
                    if (!res) return;
                    axios.post("/api/security/SaveUserV2", {
                        ...this.modalData.user,
                        JoinCPCTime: this.haveJoinCPC ? this.modalData.user.JoinCPCTime : "1900-01-01",
                        JoinCCYLTime: this.haveJoinCCYL ? this.modalData.user.JoinCCYLTime : "1900-01-01",
                        departId,
                        position: this.modalData.position
                        }, msg => {
                        this.resetFields();
                        if (msg.success) {
                            callback();
                        } else {
                            this.$Message.warning(msg.msg);
                        }
                    });
                })
            }
        }
    }
</script>

<style lang="less">
.timeline{
    padding:0.8em 0px 0px 5px;
    .time{
        font-size: 14px;
        font-weight: bold;
    }
    .content{
        padding: 2px 0px 2px 5px;
    }
    .detail{
        padding-left: 5px;
        font-size: 0.8em;
        color: #808080;
        line-height: 1.5em;
    }
}
</style>
