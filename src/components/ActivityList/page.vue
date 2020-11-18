<template>
    <i-card style="margin-top:10px" title="社团活动" :padding="24">
        <template v-slot:extra>
            <i-row type="flex" :gutter="16">
                <i-col>
                    <i-button type="primary" @click="addActivity">申请新活动</i-button>
                </i-col>
                <i-col>
                    <i-input search placeholder="搜索活动名称或编号" v-model="activityName" @on-search="getActivities()" />
                </i-col>
            </i-row>
        </template>
        <i-row>
            <i-table stripe :columns="tableColumns.activity" @on-filter-change="onFilterChange" :data="activityData" :loading="tableLoading">
                <template slot="Action" slot-scope="{row}">
                    <a class="a-button" @click="checkWorkflow(row.InstanceId, row.StepId, row.ID)">[查看]</a>
                    <a class="a-button" @click="iniateAct(row.ID, 1)" v-if="row.StartState === 0 && row.ApplicateState === 3">[发起活动]</a>
                    <a class="a-button" @click="iniateAct(row.ID, 0)" v-if="row.StartState === 1 && row.ApplicateState === 3">[取消活动]</a>
                    <a class="a-button" v-if="canDelete(row)" type="error" @click="cancel(row)">[删除项目]</a>
                </template>
                <template slot="QRCode" slot-scope="{row}">
                    <img width="80" v-if="row.ShortCode" :src="'/qr/' + row.ShortCode" />
                </template>
            </i-table>
            <Page :styles="{'margin-top': '16px'}" :total="pager.totalRow" show-sizer show-total :page-size="10"
                @on-change="getActivities($event, null)" @on-page-size-change="getActivities(null ,$event)" />
        </i-row>
    </i-card>
</template>

<script>
import axios from 'axios';
import tableColumns from '../../pages/Modules/ManageIndex/tableColumns';
const app = require("@/config");
export default {
    props: {
        overrideID: {
            type: String
        }
    },
    data () {
        return {
            activityName: '',
            tableLoading: false,
            tableColumns,
            activityData: [],
            pager: {
                page: 1,
                pageSize: 10,
                totalRow: 0
            },
            ID: "",
            step: "",
            type: ""
        }
    },
    mounted () {
        if (this.overrideID) {
            this.ID = this.overrideID;
            this.getActivities();
        } else {
            axios.post("/api/security/GetOrgDetail", {}, msg => {
                this.ID = msg.data.ID;
                this.getActivities();
            })
        }
    },
    methods: {
        onFilterChange (e) {
            debugger
            if (e.key === "CurrentStep") {
                this.step = e._filterChecked[0];
            } else if (e.key === "ActivityType") {
                this.type = e._filterChecked[0];
            }
            this.getActivities();
        },
        addActivity () {
            axios.post("/api/org/Applicate", {id: this.ID}, msg => {
                if (msg.success) {
                   window.open("/manage/org/activityform?instanceId=" + msg.instanceId + '&stepId=' + msg.stepId);
                } else {
                    this.$Message.warning(msg.msg);
                }
            })
        },
        /* searchActivity (value) {
            if (!value) {
                this.getActivities();
                return;
            }
            let page = this.pager.page;
            let pageSize = this.pager.totalRow;
            axios.post("/api/org/GetActByDepartId", {Id: this.ID, page, pageSize, name: value}, msg => {
                if (msg.success) {
                    for (let i = 0; i < msg.data.length; i++) {
                        if (msg.data[i].ActivityType !== "") {
                            msg.data[i].ActivityType = msg.data[i].ActivityType.replace(/[[\]"]/g, "").replace(/,/g, "，");
                            let reg1 = new RegExp('[r|n| ]', "g");
                            msg.data[i].ActivityType = msg.data[i].ActivityType.replace(reg1, '');
                            let reg2 = new RegExp(/\\/g, "g");
                            msg.data[i].ActivityType = msg.data[i].ActivityType.replace(reg2, '');
                        } else {
                            msg.data[i].ActivityType = "";
                        }
                    }
                    this.activityData = msg.data;
                    // this.pager.totalRow = msg.totalRow;
                    // this.activitySearched = this.activityData.filter(e => e.ActivityName.indexOf(value) > -1);
                }
            });
        }, */
        checkWorkflow (instanceId, stepId, actId) {
            window.open(`/manage/org/signUpSituation?instanceId=${instanceId}&stepId=${stepId}&detail=true&actId=${actId}`);
        },
        iniateAct (ID, state, index) {
            axios.post("/api/org/ChangeActivityState", {actId: ID, state: state}, msg => {
                if (msg.success) {
                    if (state === 1) {
                        this.$Message.success("活动发起成功");
                    } else if (state === 0) {
                        this.$Message.success("活动已取消");
                    }
                    this.getActivities();
                } else {
                    this.$Message.warning(msg.msg);
                }
            })
        },
        getActivities (targetPage, targetPageSize) {
            let page = targetPage || this.pager.page;
            let pageSize = targetPageSize || this.pager.pageSize;
            this.tableLoading = true;
            axios.post("/api/org/GetActByDepartId", {Id: this.ID, page, pageSize, name: this.activityName, type: this.type, step: this.step}, msg => {
                this.tableLoading = false;
                if (msg.success) {
                    this.activityData = msg.data;
                    this.pager.totalRow = msg.totalRow;
                    // this.entryForManager.activity.badge = msg.data.filter(e => e.ApplicateState === 3).length;
                }
            });
        },
        canDelete (row) {
            let isOrgManager = (row.CurrentStep === '填写申请表' || row.CurrentStep === '指导老师审核') && localStorage.getItem("role") === "管理员";
            let hasPrivilege = app.checkPermission('Organization.RemoveActivity');
            return isOrgManager || hasPrivilege;
        },
        cancel (row) {
            this.$Modal.confirm({
                title: "确认删除",
                content: "确实要删除申请吗？此操作不可恢复。",
                onOk: () => {
                    axios.post("/api/org/RemoveActivity", {id: row.ID}, msg => {
                        if (msg.success) {
                            this.$Message.success("删除成功");
                            this.getActivities();
                        } else {
                            this.$Message.error(msg.msg);
                        }
                    });
                }
            })
        }
    }
}
</script>

<style scoped>
.a-button{
    color: dodgerblue;
    cursor: pointer;
    margin-right: 10px;
}
</style>
