<template>
    <i-row>
        <i-table :columns="columns" :data="tableData" :loading="loading">
            <template slot="Action" slot-scope="{row}">
                <i-button @click="checkWorkflow(row)">查看</i-button>
            </template>
        </i-table>
        <i-page style="margin-top: 8px" :page-size="pageSize" :total="totalRow" show-total show-sizer @on-page-size-change="getFlows(null, $event)" @on-change="getFlows($event, null)"/>
    </i-row>
</template>
<script>
import axios from 'axios';
let app = require("@/config");
export default {
    data () {
        return {
            loading: false,
            tableData: [],
            page: 1,
            pageSize: 20,
            totalRow: 0,
            columns: [
                {
                    title: "流程名称",
                    key: "WorkflowName"
                },
                {
                    title: "流程类别",
                    key: "WorkflowType"
                },
                {
                    title: "申请人",
                    key: "Owner",
                    maxWidth: 200
                },
                {
                    title: "申请时间",
                    key: "ArriveOn",
                    maxWidth: 200
                },
                {
                    title: "操作",
                    slot: "Action",
                    maxWidth: 200
                }
            ],
            dic: {
                "修改社团基本信息申请": "/manage/org/orgdetailform",
                "社团活动申请": "/manage/org/activityform"
            }
        }
    },
    mounted () {
        app.title = "我的参与";
        this.getFlows();
    },
    methods: {
        getFlows (tpage, tpageSize) {
            let page = tpage || this.page;
            let pageSize = tpageSize || this.pageSize;
            this.loading = true;
            axios.post("/api/workflow/MyAttend", {name: "", page, pageSize}, msg => {
                if (msg.success) {
                    this.totalRow = msg.totalRow;
                    this.page = msg.page;
                    this.pageSize = msg.pageSize;
                    this.tableData = msg.data;
                } else {
                    this.$Message.warning(msg.msg);
                }
                this.loading = false;
            });
        },
        checkWorkflow (row) {
            window.open(`${this.dic[row.WorkflowType]}?instanceId=${row.InstanceId}&stepId=${row.StepId}&detail=true`);
        }
    }
}
</script>
