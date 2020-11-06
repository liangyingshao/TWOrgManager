<template>
    <i-row>
        <i-form>
            <i-form-item label="报表时间段">
                <i-date-picker @on-change="handleDate" v-model="defaultDate" type="daterange" placeholder="请选择报表起止时间"/>
            </i-form-item>
        </i-form>
        <i-row>
            <i-col span="10">
                <i-card style="margin-bottom: 8px" align="middle" :to="`/api/org/ExportFullInfo?departId=${departId}`" target="_blank">
                    <i-row type="flex" :gutter="24">
                        <i-col>
                            <Icon :size="48" type="md-list" color="rgb(105, 192, 255)"/>
                        </i-col>
                        <i-col>
                            <div style="color: #515a6e;">社团整体信息表</div>
                        </i-col>
                    </i-row>
                </i-card>
                <i-card style="margin-bottom: 8px" :disabled="!hasDate" :to="`/api/org/ExportMemberFullInfo?departId=${departId}&start=${dateRange[0]}&end=${dateRange[1]}`" target="_blank">
                    <i-row type="flex" :gutter="24">
                        <i-col>
                            <Icon :size="48" type="md-people" color="rgb(255, 156, 110)"/>
                        </i-col>
                        <i-col>
                            <div style="color: #515a6e;">社团成员完整信息表</div>
                        </i-col>
                    </i-row>
                </i-card>
                <i-card style="margin-bottom: 8px" :disabled="!hasDate" :to="`/api/org/ExportMemberSimpleInfo?departId=${departId}&start=${dateRange[0]}&end=${dateRange[1]}`" target="_blank">
                    <i-row type="flex" :gutter="24">
                        <i-col>
                            <Icon :size="48" type="md-contact" color="rgb(92, 219, 211)"/>
                        </i-col>
                        <i-col>
                            <div style="color: #515a6e;">社团成员基本信息表</div>
                        </i-col>
                    </i-row>
                </i-card>
                <i-card style="margin-bottom: 8px" :disabled="!hasDate" :to="`/api/org/ExportActFullInfo?departId=${departId}&start=${dateRange[0]}&end=${dateRange[1]}`" target="_blank">
                    <i-row type="flex" :gutter="24">
                        <i-col>
                            <Icon :size="48" type="md-flag" color="rgb(149, 222, 100)"/>
                        </i-col>
                        <i-col>
                            <div style="color: #515a6e;">社团活动信息表</div>
                        </i-col>
                    </i-row>
                </i-card>
            </i-col>
        </i-row>
    </i-row>
</template>

<script>
export default {
    created () {
        this.setDefaultDate();
        this.departId = localStorage.getItem('defaultDepartId');
    },
    data () {
        return {
            defaultDate: [],
            dateRange: [],
            departId: '',
            hasDate: false
        }
    },
    methods: {
        handleDate (value) {
            this.hasDate = !!value[0];
            this.dateRange = value;
        },
        setDefaultDate () {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;

            if (month + 1 < 3) {
                this.defaultDate[0] = `${year - 1}-7-1`;
                this.defaultDate[1] = `${year - 1}-12-31`;
            } else if (month + 1 < 9) {
                this.defaultDate[0] = `${year}-1-1`;
                this.defaultDate[1] = `${year}-6-30`;
            } else {
                this.defaultDate[0] = `${year}-7-1`;
                this.defaultDate[1] = `${year}-12-31`;
            }

            this.handleDate(this.defaultDate);
        }
    }
}
</script>

<style>

</style>
