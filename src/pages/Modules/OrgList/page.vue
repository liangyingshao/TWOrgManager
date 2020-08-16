<template>
    <i-row id="OrgList">
        <i-card style="margin: 20px 50px;" title="社团列表" :padding="24">
            <template v-slot:extra>
                <i-input search placeholder="搜索社团名" @on-search="searchOrganization" />
            </template>
            <i-row>
                <i-table :max-height="contentHeight" border stripe :columns="organizationCol" :data="organizationSearched" :loading="tableLoading">
                    <template slot="Action" slot-scope="{row}">
                        <i-button @click="viewOrg(row.id)">查看</i-button>
                    </template>
                </i-table>
            </i-row>
        </i-card>
    </i-row>
</template>

<script>
import axios from 'axios';
import tableColumns from '../ManageIndex/tableColumns';
const app = require("@/config");
export default {
    data () {
        return {
            app,
            contentHeight: 0,
            organizationSearched: [],
            organizationData: [],
            organizationCol: tableColumns.organization,
            tableLoading: false,
            orgInfo: {}
        }
    },
    methods: {
        getDashBoard () {
            this.tableLoading = true;
            axios.post("/api/security/GetAllAssociationsByDepartId", {departId: localStorage.getItem("defaultDepartId")}, msg => {
                if (msg.success) {
                    this.organizationData = msg.data;
                    this.organizationSearched = this.organizationData;
                    this.$nextTick(() => {
                        this.contentHeight = window.innerHeight * 0.8;
                    })
                }
                this.tableLoading = false;
            });
        },
        searchOrganization (value) {
            this.organizationSearched = this.organizationData.filter(e => e.name.indexOf(value) > -1);
        },
        viewOrg (id) {
            this.$router.push({
                name: 'OrgDetail',
                query: {
                    id
                }
            });
        }
    },
    mounted () {
        app.title = "社团列表";
        this.getDashBoard();
    }
}
</script>

<style scoped>

</style>
