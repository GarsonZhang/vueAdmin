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
                <!--创建一个echarts的容器-->
                <div id="chart_module" style="width:100%; height:100%;padding-left: 10px; padding-right: 10px;"></div>
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
import {SelectMonth} from "../../../../components/customer"
import { requestOsapAbnormalData } from "../../../../libs/request";
import echarts from "echarts";
import SelectCompany from "../../../org/selectCompany";
import SelectDept from "../../../org/selectDept";

export default {
  name: "chartModule",
  components: {
    SelectCompany,
    SelectDept,
    SelectMonth
  },
  data() {
    return {
      searchData: {
        companyID: "",
        deptID:"",
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
    chartOption(data) {
      var legendData = [];
      var seriesData = [];

      data.forEach(function(param) {
        legendData.push(param['moduleName']);
        seriesData.push({
          value:param['score'],
          name:param['moduleName'],
          tag:param
        });
      });
      return {
        title: {
          text: "模块异常统计图 （按"+(this.searchData.dataType==1?"分数":"次数")+")",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} ：{c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "right", 
          top: "25px",
          data: legendData
        },
        series: [
          {
            name:'扣分',
            type: "pie",
            radius: "45%",
            center: ["50%", "35%"],
            data: seriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
    },
    // 查询
    event_buttonSearchClick(component) {
      this.isLoading = true;
      var me = this;
      requestOsapAbnormalData
        .report_ByModule(
          this,
          this.searchData.dataType,
          this.searchData.year,
          this.searchData.month,
          this.searchData.companyID,
          this.searchData.deptID
        )
        .then(res => {
          // debugger
          var dataSourceChart = echarts.init(
            document.getElementById("chart_module")
          );

          var option = this.chartOption(res.data);
          // debugger
          dataSourceChart.setOption(option);
          //   window.addEventListener("resize", function() {
          //     dataSourceChart.resize();
          //   });

          component.loading = false;
          me.isLoading = false;
        })
        .catch(err => {
          me.data = {};
          component.loading = false;
          me.isLoading = false;
        });
    }
  }
};
</script>
