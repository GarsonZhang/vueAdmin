<template>
    <div style="position:relation;">
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
                    <i-col class="gzform" span="6">
                        <label class="gzform-label">年月</label>
                        <div class="gzform-control">
                            <i-col span="12">
                                <i-input v-model="searchData.year"></i-input>
                            </i-col>
                            <i-col span="12">
                                <SelectMonth v-model="searchData.month"></SelectMonth>
                            </i-col>

                        </div>
                    </i-col>
                    <i-col class="gzform"  span="6">
                        <RadioGroup v-model="searchData.dataType">
                            <Radio label="1">分数</Radio>
                            <Radio label="2">计次</Radio>
                        </RadioGroup>
                        <gz-button :ref="refNames.buttonRefresh" type="primary" icon="ios-search" @click="event_buttonSearchClick" text="查询" />

                        <!-- <gz-button icon="ios-search" @click="event_buttonPrintClick" text="打印" /> -->

                         <Dropdown style="margin-left: 20px" @on-click="event_buttonExportClick">
                            <Button>
                                操作
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list" >
                                <DropdownItem name="print">打印</DropdownItem>
                                <DropdownItem name="pdf">pdf</DropdownItem>
                                <DropdownItem name="xls">excel 2003</DropdownItem>
                                <DropdownItem name="xlsx">excel 2007</DropdownItem>
                                <DropdownItem name="word">word</DropdownItem>
                                <DropdownItem name="png">png</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </i-col>
                </Row>
            </div>
            <div slot="main" class="main" style="overflow-y: auto;">
                <div class="fastReport"  v-html="dataHtml"></div>
                <gzPrint :ref="refNames.print"></gzPrint>
            </div>
              <!-- <div slot="bottom">
            <h1>bottom</h1>
            </div> -->
        </gz-panel>
    </div>
</template>
<style lang="less">

</style>

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

import { SelectMonth } from "../../../../components/customer";

import SelectCompany from "../../../org/selectCompany";
import SelectDept from "../../../org/selectDept";
import gzPrint from "../../../../components/controls/gzprint";

export default {
  name: "rptDeptMonitorItem",
  components: {
    SelectCompany,
    SelectDept,
    SelectMonth,
    gzPrint
  },
  data() {
    return {
      dataHtml: "",
      reportID: "",
      searchData: {
        companyID: "",
        deptID: "",
        year: new Date().getFullYear(),
        month: 0,
        dataType: 1
      },
      refNames: {
        dataTable: "dataTable",
        listDataPage: "listDataPage",
        buttonRefresh: "buttonRefresh",
        print: "print"
      },
      isLoading: false
    };
  },
  mounted() {},
  methods: {
    // 导出
    event_buttonExportClick(name) {
      if (name == "print") {
        this.$refs[this.refNames.print].print(this.reportID);
        component.loading = false;
      } else {
        var url =
          this.$utils.baseURLReport +
          "/" +
          this.reportID +
          "?format=" +
          name +
          "&inline=false";

        window.open(url);
      }
    },
    // 查询
    event_buttonSearchClick(component) {
      this.isLoading = true;
      requestOsapAbnormalData
        .report_ByDeptMonitorItem_html(
          this,
          this.searchData.dataType,
          this.searchData.year,
          this.searchData.month,
          this.searchData.companyID,
          this.searchData.deptID
        )
        .then(res => {
          // debugger
          this.reportID = res.data.reportID;
          this.dataHtml = res.data.reportBody;
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
