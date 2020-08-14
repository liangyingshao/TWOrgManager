<template>
    <div />
</template>
<script>
const app = require("@/config");
export default {
    mounted () {
        if (app.checkPermission("Organization.UnitAdminUser") || app.checkPermission("Organization.XSLHH") || app.checkPermission("Organization.TwAdminUser")) {
            this.$router.push({name: 'OrgList'});
        } else if (app.checkPermission("Organization.DepartAdminUser")) {
            this.$router.push({name: 'OrgDetail'});
        }
    }
}
</script>
