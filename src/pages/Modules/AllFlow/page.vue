<template>
    <i-row>
        <i-tabs v-model="currentTab" @on-click="getFlows(null, null)">
            <i-tab-pane label="活动申请" name="社团活动申请">
                <i-table :columns="columns" :data="tableData" :loading="loading">、
                    <template slot="Action" slot-scope="{row}">
                        <i-button @click="checkWorkflow(row)">查看</i-button>
                    </template>
                </i-table>
                <i-page style="margin-top: 8px" :page-size="page.activity.pageSize" :total="page.activity.totalRow" show-total show-sizer @on-page-size-change="getFlows(null, $event)" @on-change="getFlows($event, null)"/>
            </i-tab-pane>
            <i-tab-pane label="修改社团信息申请" name="修改社团基本信息申请">
                <i-table :columns="columns" :data="tableData" :loading="loading">、
                    <template slot="Action" slot-scope="{row}">
                        <i-button @click="checkWorkflow(row)">查看</i-button>
                    </template>
                </i-table>
                <i-page style="margin-top: 8px" :page-size="page.information.pageSize" :total="page.information.totalRow" show-total show-sizer @on-page-size-change="getFlows(null, $event)" @on-change="getFlows($event, null)"/>
            </i-tab-pane>
        </i-tabs>
    </i-row>
</template>
<script>
import axios from 'axios';
let app = require("@/config");
export default {
    data () {
        return {
            loading: false,
            currentTab: "社团活动申请",
            tableData: [],
            page: {
                information: {
                    page: 1,
                    pageSize: 20,
                    totalRow: 0
                },
                activity: {
                    page: 1,
                    pageSize: 20,
                    totalRow: 0
                }
            },
            dic2: {
               '社团活动申请': 'activity',
               '修改社团基本信息申请': 'information'
            },
            columns: [
                {
                    title: "流程名称",
                    key: "WorkflowType"
                },
                {
                    title: "流程类别",
                    key: "WorkflowName"
                },
                {
                    title: "申请人",
                    key: "Owner"
                },
                {
                    title: "申请时间",
                    key: "ArriveOn"
                },
                {
                    title: "申请版本",
                    key: "Version"
                },
                {
                    title: "操作",
                    slot: "Action"
                }
            ],
            dic: {
                "修改社团基本信息申请": "/manage/org/orgdetailform",
                "社团活动申请": "/manage/org/activityform"
            }
        }
    },
    mounted () {
        app.title = "所有流程";
        this.getFlows();
    },
    methods: {
        getFlows (tpage, tpageSize) {
            let page = tpage || this.page[this.dic2[this.currentTab]].page;
            let pageSize = tpageSize || this.page[this.dic2[this.currentTab]].pageSize;
            this.loading = true;
            axios.post("/api/workflow/AllFlow", {name: this.currentTab, page, pageSize}, msg => {
                if (msg.success) {
                    this.page[this.dic2[this.currentTab]].totalRow = msg.totalRow;
                    this.page[this.dic2[this.currentTab]].page = msg.page;
                    this.page[this.dic2[this.currentTab]].pageSize = msg.pageSize;
                    this.tableData = msg.data;
                } else {
                    this.$Message.warning(msg.msg);
                }
                this.loading = false;
            });
        },
        checkWorkflow (row) {
            window.open(`${this.dic[row.WorkflowName]}?instanceId=${row.InstanceId}&stepId=${row.StepId}&detail=true`);
        }
    }
}
</script>
