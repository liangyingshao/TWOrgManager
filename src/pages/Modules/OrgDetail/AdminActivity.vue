<template>
    <i-row>
        <activity-list :overrideID="overrideID"></activity-list>
    </i-row>
</template>

<script>
import activityList from '@/components/ActivityList/page.vue';
let app = require("@/config");
export default {
    created () {
        if (app.checkPermission("Organization.TwAdminUser")) {
            this.overrideID = "0636b745-1e62-472a-9d47-eead853f13da";
        } else if (app.checkPermission("Organization.XSLHH")) {
            this.overrideID = "5dde2413-02d1-4ffd-9030-835afad93888";
        } else {
            this.overrideID = ""
        }
    },
    components: {
        'activity-list': activityList
    },
    data () {
        return {
            overrideID: "5dde2413-02d1-4ffd-9030-835afad93888"
        };
    }
}
</script>

<style>

</style>
