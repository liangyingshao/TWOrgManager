<template>
    <div/>
</template>
<script>
const app = require("@/config");
export default {
    mounted () {
        if (app.checkPermission("Organization.DepartAdminUser") ||
            app.checkPermission("Organization.UnitAdminUser") ||
            app.checkPermission("Organization.TeacherAdmin") ||
            app.checkPermission("Organization.XSLHH") ||
            app.checkPermission("Organization.TwAdminUser")) this.$router.push({name: "AdminManage"});
        else this.$router.push({name: "StuManage"});
    }
}
</script>
