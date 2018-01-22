<template>
    <div style="position:relation;">
        <gz-panel>
            <div slot="top">
                <Row style="padding-bottom:5px;">
                    <i-col class="gzform" span="6">
                        <label class="gzform-label">公司代码</label>
                        <SelectCompany class="gzform-control" v-model="searchData.companyID"></SelectCompany>
                        <!-- <i-input class="gzform-control" v-model="searchData.companyID"></i-input> -->
                    </i-col>
                    <i-col class="gzform" span="6">
                        <label class="gzform-label">年月</label>
                        <div class="gzform-control">
                            <i-col span="12">
                                <i-input v-model="searchData.year"></i-input>
                            </i-col>
                            <i-col span="12">
                                 <!-- <i-input v-model="searchData.month"></i-input> -->
                                <SelectMonth v-model="searchData.month"></SelectMonth>
                            </i-col>

                        </div>
                    </i-col>
                    <i-col class="gzform" style="margin-left:10px;"  span="6">
                        <RadioGroup v-model="searchData.dataType">
                            <Radio label="1">分数</Radio>
                            <Radio label="2">计次</Radio>
                        </RadioGroup>
                        <gz-button :ref="refNames.buttonRefresh" type="primary" icon="ios-search" @click="event_buttonSearchClick" text="查询" />
                    </i-col>
                </Row>
            </div>
            <div slot="main" class="main">
                <Table :ref="refNames.dataTable" size="small" :loading="isLoading" :columns="columns" :data="data" border></Table>
            </div>
              <!-- <div slot="bottom">
            <h1>bottom</h1>
            </div> -->
        </gz-panel>
    </div>
</template>
<style lang="less" scoped>
    .gzform {
        margin-top: 3px;
        .gzform-label {
            float: left;
            width: 80px;
            padding: 5px 12px 5px 0;
            text-align: right;
        }
        .gzform-control {
            display: block;
            margin-left: 80px;
            width: auto;
        }
    }
</style>
<script>
    import {
        requestOsapAbnormalData
    } from "../../../libs/request";

import {SelectMonth} from "../../../components/customer"

    import SelectCompany from "../../org/selectCompany"

    export default {
        name: "GMRpt01",
        components: {
            SelectCompany,
            SelectMonth
        },
        data() {
            return {
                data: [],
                columns: [{
                        title: "序号",
                        type: "index",
                        width: 50,
                        align: "center",
                        className: "table-cell-index"
                    },
                    {
                        title: "公司",
                        key: "companyName",
                        width: 100,
                        align: "center",
                        className: "clearPadding"
                    },
                    {
                        title: "部门",
                        key: "deptName",
                        width: 100,
                        align: "center",
                        className: "clearPadding"
                    },
                    {
                        title: "分数",
                        key: "score",
                        width: 50,
                        align: "center",
                        className: "clearPadding"
                    },
                    {
                        title: "1月",
                        key: "score1",
                        width: 50,
                        align: "center",
                        className: "clearPadding"
                    },
                    {
                        title: "2月",
                        key: "score2",
                        width: 50
                    },
                    {
                        title: "3月",
                        key: "score3",
                        width: 50,
                        align: "center",
                        className: "clearPadding"
                    },
                    {
                        title: "4月",
                        key: "score4",
                        width: 50,
                        align: "center",
                        className: "clearPadding"
                    },
                    {
                        title: "5月",
                        key: "score5",
                        width: 50,
                        align: "center",
                        className: "clearPadding"
                    },
                    {
                        title: "6月",
                        key: "score6",
                        width: 50,
                        align: "center",
                        className: "clearPadding"
                    },
                    {
                        title: "7月",
                        key: "score7",
                        width: 50,
                        align: "center",
                        className: "clearPadding"
                    },
                    {
                        title: "8月",
                        key: "score8",
                        width: 50,
                        align: "center",
                        className: "clearPadding"
                    },
                    {
                        title: "9月",
                        key: "score9",
                        width: 50,
                        align: "center",
                        className: "clearPadding"
                    },
                    {
                        title: "10月",
                        key: "score10",
                        width: 50,
                        align: "center",
                        className: "clearPadding"
                    },
                    {
                        title: "11月",
                        key: "score11",
                        width: 50,
                        align: "center",
                        className: "clearPadding"
                    },
                    {
                        title: "12月",
                        key: "score12",
                        width: 50,
                        align: "center",
                        className: "clearPadding"
                    }
                ],
                searchData: {
                    companyID: "",
                    year: new Date().getFullYear(),
                    month: 0,
                    dataType: 1
                },
                refNames: {
                    dataTable: "dataTable",
                    listDataPage: "listDataPage",
                    buttonRefresh: "buttonRefresh"
                },
                isLoading: false
            };
        },
        mounted() {},
        methods: {
            // 查询
            event_buttonSearchClick(component) {
                this.isLoading = true;
                requestOsapAbnormalData
                    .report_GM01_data(this, this.searchData.dataType,this.searchData.companyID, this.searchData.year)
                    .then(res => {
                        this.data = res.data;
                        component.loading = false;
                        this.isLoading = false;
                    })
                    .catch(err => {
                        this.data = [];
                        component.loading = false;
                        this.isLoading = false;
                    });
            }
        }
    };
</script>
