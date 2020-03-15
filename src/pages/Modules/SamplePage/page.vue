<template>
    <i-card>
        <canvas id="e-charts">
        </canvas>
    </i-card>
</template>

<script>
// const echarts = require("echarts");
// const app = require("@/config");
export default {
    data () {
        return {
                        depart: {
               title: {
                    text: '社团类型',
                    left: '50%',
                    top: '80%',
                    textAlign: 'center',
                    textStyle: {
                        color: '#515A6E',
                        fontSize: '20',
                        fontWeight: 'normal'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}：{c}人（{d}%）'
                },
                series: {
                    type: 'pie',
                    radius: '35%',
                    center: ['50%', '50%'],
                    data: [],
                    label: {
                        position: 'outer',
                        fontSize: '15'
                    },
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
           },
            guage: {
                title: {
                    text: '本学院活动数',
                    left: '50%',
                    top: '80%',
                    textAlign: 'center',
                    textStyle: {
                        color: "#515A6E",
                        fontSize: '20',
                        fontWeight: 'normal'
                    }
                },
                series: {
                    type: 'gauge',
                    radius: '95%',
                    axisLine: {
                        lineStyle: {color: [[1, '#63869e']]}
                    },
                    itemStyle: {
                            color: '#91c7ae'
                    },
                    data: [{
                        value: 0
                    }],
                    max: 0,
                    title: {
                        fontSize: '15'
                    }
                }
            },
            member: {
                title: {
                    text: '社团成员',
                    left: '50%',
                    top: '80%',
                    textAlign: 'center',
                    textStyle: {
                        color: "#515A6E",
                        fontSize: '20',
                        fontWeight: 'normal'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}：{c}人（{d}%）'
                },
                series: {
                    type: 'pie',
                    radius: '35%',
                    center: ['50%', '50%'],
                    data: [],
                    label: {
                        position: 'outer',
                        fontSize: '15'
                    },
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
        };
    },
    mounted () {
    }
}
</script>

<style lang="less">
#e-charts {
    width: 200px;
    height: 200px;
}
</style>
