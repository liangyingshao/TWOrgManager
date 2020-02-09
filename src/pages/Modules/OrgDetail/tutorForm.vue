<template>
    <i-row>
        <i-col style="padding: 0px 10%">
            <i-form :model="modalData.user" ref="Form" :rules="ruleForMem">
                <i-form-item label="姓名" prop="RealName">
                    <i-input v-model="modalData.user.RealName" />
                </i-form-item>
                <i-form-item label="工号" prop="Code">
                    <i-input v-model="modalData.user.Code" />
                </i-form-item>
                <i-form-item label="手机" prop="Mobile">
                    <i-input v-model="modalData.user.Mobile" />
                </i-form-item>
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
        data () {
            let THIS = this;
            return {
                showLog: false,
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
                            message: "必须填写工号",
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
                let form = this.$refs["Form"];
                form.resetFields();
            },
            submit (departId, callback) {
                let form = this.$refs["Form"];
                form.validate(res => {
                    if (!res) return;
                    axios.post("/api/security/SaveUserV2", {...this.modalData.user, departId, position: "指导老师"}, msg => {
                        this.resetFields();
                        if (msg.success) {
                            callback();
                        } else {
                            this.$Message.warning(msg.msg);
                        }
                    })
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
