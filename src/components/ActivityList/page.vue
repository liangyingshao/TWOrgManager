<template>
    <i-card style="margin-top:10px" title="社团活动" :padding="24">
        <template v-slot:extra>
            <i-input search placeholder="搜索活动名称" @on-search="searchActivity" />
        </template>
        <i-row>
            <i-table stripe  :columns="tableColumns.activity" :data="activityData" :loading="tableLoading">
                <template slot="Action" slot-scope="{row}">
                    <i-button @click="checkWorkflow(row.InstanceId, row.StepId, row.ID)">查看</i-button>
                    <i-button type="primary" @click="iniateAct(row.ID, 1)" v-if="row.StartState === 0 && row.ApplicateState === 3">发起活动</i-button>
                    <i-button @click="iniateAct(row.ID, 0)" v-if="row.StartState === 1 && row.ApplicateState === 3">取消活动</i-button>
                </template>
                <template slot="QRCode" slot-scope="{row}">
                    <img v-if="row.ShortCode" :src="'/qr/' + row.ShortCode" />
                </template>
            </i-table>
            <Page :styles="{'margin-top': '16px'}" :total="pager.totalRow" show-sizer show-total :page-size="5"
                @on-change="getActivities($event)" @on-page-size-change="getActivities(null ,$event)" />
        </i-row>
    </i-card>
</template>

<script>
import axios from 'axios';
import tableColumns from '../../pages/Modules/ManageIndex/tableColumns';
export default {
    data () {
        return {
            tableLoading: false,
            tableColumns,
            activityData: [],
            pager: {
                page: 1,
                pageSize: 5,
                totalRow: 0
            },
            ID: ""
        }
    },
    mounted () {
        axios.post("/api/security/GetOrgDetail", {}, msg => {
            this.ID = msg.data.ID;
            this.getActivities();
        })
    },
    methods: {
        searchActivity (value) {
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
        },
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
                    this.getActivityTable();
                } else {
                    this.$Message.warning(msg.msg);
                }
            })
        },
        getActivities (targetPage, targetPageSize) {
            let page = targetPage || this.pager.page;
            let pageSize = targetPageSize || this.pager.pageSize;
            axios.post("/api/org/GetActByDepartId", {Id: this.ID, page, pageSize}, msg => {
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
                    this.pager.totalRow = msg.totalRow;
                    // this.entryForManager.activity.badge = msg.data.filter(e => e.ApplicateState === 3).length;
                }
            });
        }
    }
}
</script>

<style scoped>

</style>
