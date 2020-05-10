<template>
  <card title="个人信息">
    <i-row>
      <i-col span="8">
        <i-form ref="user-form" label-position="top" :model="model" :rules="rules">
          <i-form-item label="姓名" prop="RealName">
            <i-input  v-model="model.RealName" />
          </i-form-item>
          <i-form-item prop="Code">
            <template slot="label">
              <Tooltip placement="right" content="上级部门才有权限修改该字段">
                学/工号<i-icon type="md-information-circle" color="#2db7f5" />
              </Tooltip>
            </template>
            <i-input  disabled :value="model.Code" />
          </i-form-item>
          <i-form-item label="手机" prop="Mobile">
            <i-input  v-model="model.Mobile" />
          </i-form-item>
          <i-form-item label="邮箱" prop="Email">
            <i-input  v-model="model.Email" />
          </i-form-item>
          <i-form-item prop="PoliticalStatus">
            <template slot="label">
              <Tooltip placement="right" content="上级部门才有权限修改该字段">
                政治面貌<i-icon type="md-information-circle" color="#2db7f5" />
              </Tooltip>
            </template>
            <i-input disabled v-model="model.PoliticalStatus"/>
          </i-form-item>
          <i-form-item label="所属部门" prop="BelongDepart">
            <template slot="label">
              <Tooltip placement="right" content="上级部门才有权限修改该字段">
                所属部门<i-icon type="md-information-circle" color="#2db7f5" />
              </Tooltip>
            </template>
            <i-input  disabled v-model="model.BelongDepart"/>
          </i-form-item>
          <i-form-item label="指导老师类别" prop="GuideTeacherType">
            <template slot="label">
              <Tooltip placement="right" content="上级部门才有权限修改该字段">
                指导老师类别<i-icon type="md-information-circle" color="#2db7f5" />
              </Tooltip>
            </template>
            <i-input disabled v-model="model.GuideTeacherType"/>
          </i-form-item>
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
export default {
  methods: {
    save () {
      this.isloading = true;
      let form = this.$refs["user-form"];
      let model = this.model;
      form.validate(err => {
        if (!err) {
          return;
        }
        axios.post("/api/security/SaveUserProfile", model, msg => {
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
        axios.post("/api/security/GetUserById", {}, msg => {
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
      model: {
        avatar: ""
      },
      orgInfo: {},
      rules: {
        "Mobile": [
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
              msg => {
                if (msg.success) {
                  cb();
                } else {
                  cb(msg.remote);
                }
              }
            );
          }, 500)
        ],
        "Email": [
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
            axios.post(
              "/api/security/EmailValidate",
              { email: value },
              msg => {
                if (msg.success) {
                  cb();
                } else {
                  cb(msg.remote);
                }
              }
            );
          }, 500)
        ],
        "RealName": { required: true, message: "必须输入姓名", trigger: "blur" },
        "avatar": { required: true, message: "必须上传图片", trigger: "blur" }
      }
    };
  },
  mounted () {
    this.getUser();
  }
};
</script>
<style lang="less">
</style>
