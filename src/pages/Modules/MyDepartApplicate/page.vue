<template>
    <i-table :columns="columns" :data="tableData" :loading="loading">
        <template v-slot:Description="data">
            <div v-if="data.row.Description === ''">暂无简介</div>
            <div v-else>{{row.Description}}</div>
        </template>
        <template v-slot:State="data">
            <div>{{stateDic[data.row.app.State]}}</div>
        </template>
    </i-table>
</template>
<script>
import axios from 'axios';
let app = require("@/config");
export default {
    data () {
        return {
            loading: false,
            tableData: [],
            stateDic: {
                0: "已通过",
                1: "被拒绝",
                2: "自行撤回",
                3: "申请中"
            },
            columns: [
                {
                    title: "社团名称",
                    key: "Name"
                },
                {
                    title: "所属学院",
                    key: "Parent"
                },
                {
                    title: "简介",
                    slot: "Description"
                },
                {
                    title: "申请状态",
                    slot: "State"
                }
            ]
        }
    },
    mounted () {
        app.title = "我的社团申请记录";
        this.getMyDepartApplicate();
    },
    methods: {
        getMyDepartApplicate () {
            this.loading = true;
            axios.post("/api/security/GetAllDeparts", {}, msg => {
                if (msg.success) {
                    this.tableData = msg.data.filter(e => e.app);
                } else {
                    this.$Message.warning(msg.msg);
                }
                this.loading = false;
            });
        }
    }
}
</script>
