<template>
    <div/>
</template>

<script>
const app = require('@/config')
export default {
    mounted () {
        if (app.departType === 0) {
            this.$router.replace({name: 'Affiliated'});
        } else {
            this.$router.replace({name: 'OrgDetail'});
        }
    }
}
</script>

<style lang="less">
</style>
