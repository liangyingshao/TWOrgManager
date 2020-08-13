<template>
    <card title="个人信息">
        <i-row>
            <i-col span="12">
                <i-form ref="user-form" label-position="top" :model="model" :rules="rules">
                    <i-row type="flex" justify="space-between">
                        <i-col span="11">
                            <i-form-item label="姓名" prop="RealName">
                                <i-input v-model="model.RealName" />
                            </i-form-item>
                        </i-col>
                        <i-col span="11">
                            <i-form-item label="学/工号" prop="Code">
                                <i-input :value="model.Code" />
                            </i-form-item>
                        </i-col>
                    </i-row>
                    <i-row type="flex" justify="space-between">
                        <i-col span="11">
                            <i-form-item label="学历" prop="Educational">
                                <i-input v-model="model.Educational" />
                            </i-form-item>
                        </i-col>
                        <i-col span="11">
                            <i-form-item label="学院" prop="College">
                                <i-input :value="model.College" />
                            </i-form-item>
                        </i-col>
                    </i-row>
                    <i-row type="flex" justify="space-between">
                        <i-col span="11">
                            <i-form-item label="入团时间" prop="JoinCCYLTime">
                                <template v-slot:label>
                                    入团时间&nbsp;<i-switch v-model="haveJoinCCYL"></i-switch>
                                </template>
                                <i-date-picker style="width: 100%;" :disabled="!haveJoinCCYL" v-model="model.JoinCCYLTime" />
                            </i-form-item>
                        </i-col>
                        <i-col span="11">
                            <i-form-item label="入党时间" prop="JoinCPCTime">
                                <template v-slot:label>
                                    入党时间&nbsp;<i-switch v-model="haveJoinCPC"></i-switch>
                                </template>
                                <i-date-picker style="width: 100%;" :disabled="!haveJoinCPC" v-model="model.JoinCPCTime" />
                            </i-form-item>
                        </i-col>
                    </i-row>
                    <i-row type="flex" justify="space-between">
                        <i-col span="11">
                            <i-form-item label="政治面貌" prop="PoliticalStatus">
                                <dic-select dic="政治面貌" v-model="model.PoliticalStatus"/>
                            </i-form-item>
                        </i-col>
                        <i-col span="11">
                            <i-form-item label="QQ" prop="QQ">
                                <i-input v-model="model.QQ" />
                            </i-form-item>
                        </i-col>
                    </i-row>
                    <i-row type="flex" justify="space-between">
                        <i-col span="11">
                            <i-form-item label="手机" prop="Mobile">
                                <i-input v-model="model.Mobile" />
                            </i-form-item>
                        </i-col>
                        <i-col span="11">
                            <i-form-item label="邮箱" prop="Email">
                                <i-input v-model="model.Email" />
                            </i-form-item>
                        </i-col>
                    </i-row>
                    <i-row type="flex" justify="space-between">
                        <i-col span="11">
                            <i-form-item label="民族" prop="BirthPlace">
                                <i-input v-model="model.BirthPlace" />
                            </i-form-item>
                        </i-col>
                        <i-col span="11">
                            <i-form-item label="生源地" prop="Source">
                                <i-input v-model="model.Source" />
                            </i-form-item>
                        </i-col>
                    </i-row>
                    <i-row type="flex" justify="space-between">
                        <i-col span="11">
                            <i-form-item label="所属部门" prop="BelongDepart">
                                <template slot="label">
                                <Tooltip placement="right" content="上级部门才有权限修改该字段">
                                    所属部门
                                    <i-icon type="md-information-circle" color="#2db7f5" />
                                </Tooltip>
                                </template>
                                <i-input disabled v-model="model.BelongDepart" />
                            </i-form-item>
                        </i-col>
                        <i-col span="11">
                            <i-form-item label="指导老师类别" prop="GuideTeacherType">
                                <template slot="label">
                                <Tooltip placement="right" content="上级部门才有权限修改该字段">
                                    指导老师类别
                                    <i-icon type="md-information-circle" color="#2db7f5" />
                                </Tooltip>
                                </template>
                                <i-input disabled v-model="model.GuideTeacherType" />
                            </i-form-item>
                        </i-col>
                    </i-row>
                    <i-row type="flex" justify="space-between">
                        <i-form-item label="头像" prop="avatar">
                            <i-row>
                            <i-col span="6">
                                <avatar-uploader
                                :width="128"
                                :height="128"
                                usage="imgAvatar"
                                single
                                relate-table="Users"
                                v-model="model.avatar"
                                />
                            </i-col>
                            </i-row>
                            <i-button type="success" style="margin-top:10px" @click="save" :loading="isloading">确认更新</i-button>
                        </i-form-item>
                    </i-row>
                </i-form>
            </i-col>
        </i-row>
    </card>
</template>
<script>
const regex = require("@/regex.js");
const app = require("@/config");
var _ = require("lodash");
const axios = require("axios");
let badDate = new Date("Mon Jan 01 1900 00:00:00 GMT+0805 (中国标准时间)");
export default {
  methods: {
        save () {
            this.isloading = true;
            let form = this.$refs["user-form"];
            let model = this.model;
            form.validate((err) => {
                if (!err) {
                return;
                }
                axios.post("/api/security/SaveUserProfile", model, (msg) => {
                this.isloading = false;
                if (!msg.success) {
                    this.$Message.error(msg.msg);
                } else {
                    this.$Message.success("修改成功");
                }
                });
            });
        },
        getUser () {
            axios.post("/api/security/GetUserById", {}, (msg) => {
                if (msg.success) {
                this.model = msg.user;
                this.model.avatar = app.userInfo.avatar;
                } else {
                this.$Message.error(msg.msg);
                }
            });
        }
    },
    data () {
        return {
            isloading: false,
            haveJoinCPC: false,
            haveJoinCCYL: false,
            model: {
                avatar: ""
            },
            orgInfo: {},
            rules: {
                Mobile: [
                    {
                        required: true,
                        message: "必须输入手机号",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        pattern: regex.mobile,
                        message: "手机格式不正确",
                        trigger: "blur"
                    },
                    _.debounce(function (rule, value, cb, source, options) {
                        axios.post(
                        "/api/security/MobileValidate",
                        { mobile: value },
                        (msg) => {
                            if (msg.success) {
                            cb();
                            } else {
                            cb(msg.remote);
                            }
                        }
                        );
                    }, 500)
                ],
                Email: [
                    {
                        required: true,
                        message: "必须输入电子邮箱",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        pattern: regex.email,
                        message: "电子邮箱格式不正确",
                        trigger: "blur"
                    },
                    _.debounce((rule, value, cb, source, options) => {
                        axios.post("/api/security/EmailValidate", { email: value }, msg => {
                            if (msg.success) {
                                cb();
                            } else {
                                cb(msg.remote);
                            }
                        });
                    }, 500)
                ],
                RealName: { required: true, message: "必须输入姓名", trigger: "blur" },
                avatar: { required: true, message: "必须上传图片", trigger: "blur" }
            }
        };
    },
    mounted () {
        app.title = "个人中心";
        this.getUser();
    },
    watch: {
        "model.JoinCPCTime" (value) {
            this.haveJoinCPC = !!value.toLocaleDateString && value.toLocaleDateString() !== badDate.toLocaleDateString();
        },
        "model.JoinCCYLTime" (value) {
            this.haveJoinCPC = !!value.toLocaleDateString && value.toLocaleDateString() !== badDate.toLocaleDateString();
        }
    }
};
</script>
<style lang="less">
</style>
