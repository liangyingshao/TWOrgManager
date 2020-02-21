<template>
    <div/>
</template>

<script>
const app = require('@/config')
export default {
    mounted () {
        if (app.departType === 0) {
            this.$router.push({name: 'Affiliated'});
        } else {
            this.$router.push({name: 'OrgDetail'});
        }
    }
}
</script>

<style lang="less">
</style>
