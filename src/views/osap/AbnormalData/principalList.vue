<template>
    <div>
        <gz-panel>
            <div slot="top">
                <div class="tools">
                    <gz-button :ref="refNames.buttonRefresh" icon="refresh" @click="event_buttonRefreshClick" text="刷新" />
                </div>
            </div>
            <div slot="main" class="main">
                <gz-panel @onMainResize="onResizeHeight">
                    <div slot="main" class="main">
                        <Table :height="tableHeight" :ref="refNames.dataTable" size="small" :loading="isLoading" 
                        :columns="columns" :data="data" @on-row-dblclick="viewRow"
                             border></Table>
                    </div>
                    <div slot="bottom" style="padding: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="total" :pageSizeOpts="pageSizeOpts" :current="currentPage" :pageSize="pageSize"
                                size="small" placement="top" :ref="refNames.listDataPage" show-elevator show-sizer @on-change="event_pageChangePage"
                                @on-page-size-change="event_pageSizeChange"></Page>
                        </div>
                    </div>
                </gz-panel>
            </div>
        </gz-panel>
    </div>
</template>
<style lang="less" scoped>

</style>
<script>
import { requestOsapAbnormalData } from "../../../libs/request";

export default {
    name: "osap-abnormalsubmit-history",
  data() {
    return {
      data: [],
      total: 0,
      currentPage: 1,
      pageSize: 20,
      pageSizeOpts: [10, 20, 50, 100],
      columns: [
        {
          title: "序号",
          type: "index",
          width: 50,
          align: "center",
          className: "table-cell-index"
        },
        {
          title: "日期",
          key: "createTime"
        },
        {
          title: "模块",
          key: "moduleName"
        },
        {
          title: "监察代码",
          key: "monitorItemCode"
        },
        {
          title: "监察名称",
          key: "monitorItemDescription"
        },
        {
          title: "监察类型",
          key: "typeName"
        },
        {
          title: "扣分",
          key: "score"
        },
        {
          title: "问题描述",
          key: "monitorItemRemark"
        },
        {
          title: "姓名",
          key: "userName"
        },
        {
          title: "公司编码",
          key: "companyCode"
        },
        {
          title: "公司名称",
          key: "companyName"
        },
        {
          title: "部门编码",
          key: "deptCode"
        },
        {
          title: "部门名称",
          key: "deptName"
        }
      ],
      refNames: {
        dataTable: "dataTable",
        listDataPage: "listDataPage",
        buttonRefresh: "buttonRefresh"
      },
      isLoading: false,
      tableHeight: 400
    };
  },
  mounted() {
    this.$refs[this.refNames.buttonRefresh].handleClick();
  },
  methods: {
    // 刷新
    event_buttonRefreshClick(component) {
      this.isLoading = true;
      requestOsapAbnormalData
        .principalList(this, this.currentPage, this.pageSize)
        .then(res => {
          this.total = res.data.total;
          this.data = res.data.data;
          component.loading = false;
          this.isLoading = false;
        })
        .catch(err => {
          this.total = 0;
          this.data = [];
          component.loading = false;
          this.isLoading = false;
        });
    },
    onResizeHeight(width, height) {
      // debugger
      this.tableHeight = height;
    },
    event_pageChangePage(page) {
      this.currentPage = page;
      this.$refs[this.refNames.buttonRefresh].handleClick();
    },
    event_pageSizeChange(pageSize) {
      if (this.$utils.isNULL(pageSize)) return;
      this.pageSize = pageSize;
      this.$refs[this.refNames.buttonRefresh].handleClick();
    },
    viewRow(row,index) {
      this.$refs[this.refNames.dataTable].handleMouseOut(index);
      this.$router.push({ path: this.$utils.getPath("/osap/abnormal/view/" + row.rowID+"/"+row.userID) });
    }
  }
};
</script>
