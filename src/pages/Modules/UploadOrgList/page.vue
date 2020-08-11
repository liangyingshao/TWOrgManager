<template>
    <i-row>
        <i-card title="上传文件" style="margin-top: 24px">
            <i-row type="flex" justify="space-between">
                <i-col span="17">
                    <i-row type="flex" :gutter="24">
                        <i-col span="3">
                            <Upload action="//jsonplaceholder.typicode.com/posts/" accept=".xls,.xlsx" :before-upload="readFile">
                                <Button>导入文件</Button>
                            </Upload>
                        </i-col>
                        <i-col span="5">
                            <Progress v-if="showProgress" :percent="readPercent">
                                <span>已导入</span>
                            </Progress>
                        </i-col>
                    </i-row>
                    <i-divider size="small" style="margin: 8px 0px;" />
                    <i-row v-if="file.size">
                        <span>文件名：{{file.name}}</span>
                        <span style="margin-left: 16px;">文件大小：{{file.size}}KB</span>
                        <span style="margin-left: 16px;">修改日期：{{new Date(file.lastModifiedDate).toLocaleString()}}</span>
                        <br>
                        <Button style="margin-top: 5px;" type="primary">上传社团信息</Button>
                    </i-row>
                </i-col>
                <i-col span="5" offset="2">
                    <Steps :current="currentStep" direction="vertical">
                        <Step title="导入Excel" content="选择本地Excel文件，也可以[下载模板]"></Step>
                        <Step title="上传社团信息" content="将社团信息上传至服务器，需要花费一些时间"></Step>
                    </Steps>
                </i-col>
            </i-row>
        </i-card>
        <i-card style="margin-top: 16px" title="文件内容">
            <i-table :columns="tableTitle" :data="tableData"></i-table>
        </i-card>
    </i-row>
</template>

<script>
import excel from '@/../libs/excel'
export default {
    data () {
        return {
            file: {},
            progressPercent: 0,
            tableData: [],
            tableTitle: [],
            readPercent: 0,
            showProgress: false,
            currentStep: 0
        }
    },
    methods: {
        readFile (file) {
            console.log(file)
            this.file = file;
            this.readExcel(file);
            return false;
        },
        // 读取文件
        readExcel (file) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadstart = e => {
                /* this.uploadLoading = true
                this.tableLoading = true */
                this.showProgress = true;
            }
            reader.onprogress = e => {
                this.readPercent = Math.round(e.loaded / e.total * 100);
            }
            reader.onerror = e => {
                this.$Message.error('文件读取出错');
            }
            reader.onload = e => {
                const data = e.target.result;
                const { header, results } = excel.read(data, 'array');
                console.log(header, results);
                const tableTitle = header.map(item => { return { title: item, key: item } });
                this.tableData = results;
                this.tableTitle = tableTitle;
                this.uploadLoading = false;
                ++this.currentStep;
                // this.tableLoading = false
                // this.showRemoveFile = true
            }
        }
    }
};
</script>

<style>
</style>
