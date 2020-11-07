<template>
    <i-row>
        <i-table :columns="columns" :data="tableData" :loading="loading">
            <template slot="Action" slot-scope="{row}">
                <i-button @click="dealWorkflow(row)">执行</i-button>
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
                    maxWidth: 200,
                    key: "Owner"
                },
                {
                    title: "申请时间",
                    maxWidth: 200,
                    key: "ArriveOn"
                },
                {
                    title: "操作",
                    maxWidth: 200,
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
        app.title = "我的待办";
        this.getFlows();
    },
    methods: {
        getFlows (tpage, tpageSize) {
            let page = tpage || this.page;
            let pageSize = tpageSize || this.pageSize;
            this.loading = true;
            axios.post("/api/workflow/Pending", {page, pageSize}, msg => {
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
        dealWorkflow (row) {
            window.open(`${this.dic[row.WorkflowType]}?instanceId=${row.InstanceId}&stepId=${row.StepId}&detail=false`);
        }
    }
}
</script>
