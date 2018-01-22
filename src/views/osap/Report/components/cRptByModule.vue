<template>
        <div class="content" style="position: relation;">
        <gz-panel>
            <div slot="top">
                <Row style="padding-bottom:5px;">
                    <i-col class="gzform" span="6">
                        <label class="gzform-label">公司代码</label>
                        <SelectCompany class="gzform-control" v-model="searchData.companyID"></SelectCompany>
                    </i-col>
                    <i-col class="gzform" span="6">
                        <label class="gzform-label">部门代码</label>
                        <SelectDept class="gzform-control" :companyID="searchData.companyID" v-model="searchData.deptID"></SelectDept>
                    </i-col>
                    <i-col class="gzform" span="4">
                        <label class="gzform-label">年</label>
                        <i-input class="gzform-control" v-model="searchData.year"></i-input>
                    </i-col>
                    <i-col class="gzform" style="margin-left:10px;" span="5">
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
import { requestOsapAbnormalData } from "../../../../libs/request";
import echarts from "echarts";
import SelectCompany from "../../../org/selectCompany";
import SelectDept from "../../../org/selectDept";

export default {
  name: "rptByModule",
  components: {
    SelectCompany,
    SelectDept
  },
  data() {
    return {
      data: [],
      columns: [
        {
          title: "序号",
          type: "index",
          width: 50,
          align: "center",
          className: "table-cell-index"
        },
        {
          title: "模块",
          key: "moduleName",
          width: 200,
          align: "center",
          className: "clearPadding"
        },
        {
          title: "合计",
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
        deptID: "",
        year: new Date().getFullYear(),
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
      this.data=[];
      this.isLoading = true;
      var me = this;
      requestOsapAbnormalData
        .report_ByModule(
          this,
          this.searchData.dataType,
          this.searchData.year,
          0,
          this.searchData.companyID,
          this.searchData.deptID
        )
        .then(res => {
          me.data = res.data;
          component.loading = false;
          me.isLoading = false;
        })
        .catch(err => {
          me.data = [];
          component.loading = false;
          me.isLoading = false;
        });
    }
  }
};
</script>
