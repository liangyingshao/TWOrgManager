<template>
    <i-row type="flex" justify="center">
        <i-col span="14">
            <org-detail-changer v-model="io"></org-detail-changer>
        </i-col>
    </i-row>
</template>

<script>
import orgDetailChanger from "../../../components/OrgDetail";
const axios = require("axios");
export default {
    components: {
        "org-detail-changer": orgDetailChanger
    },
    data () {
        return {
            io: {
                fieldAccess: {},
                data: {}
            },
            detailMode: false,
            upLoad: {}
        }
    },
    methods: {
        loadWorkflow () {
            axios.post("/api/workflow/LoadInstance", {instanceId: this.io.instanceId, stepId: this.io.stepId, detail: this.detailMode}, msg => {
                if (msg.success) {
                    msg.data.HaveCPCBranch = msg.data.HaveCPCBranch === "true";
                    msg.data.HaveLeagueBranch = msg.data.HaveLeagueBranch === "true";
                    this.io = msg;
                } else {
                    this.$Message.warning(msg.msg);
                }
            });
        }
    },
    created () {
        debugger;
        this.io.instanceId = this.$route.query.instanceId;
        this.io.stepId = this.$route.query.stepId;
        this.detailMode = this.$route.query.detail === "true";
    },
    mounted () {
        this.loadWorkflow();
    }
}
</script>

<style>

</style>
