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
                <!--创建一个echarts的容器-->
                <div id="chart_GM2" style="width:100%; height:100%;padding-left: 10px; padding-right: 10px;"></div>
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
import { requestOsapAbnormalData } from "../../../libs/request";
import echarts from "echarts";
import SelectCompany from "../../org/selectCompany";
import SelectDept from "../../org/selectDept";

export default {
  name: "GMRpt02",
  components: {
    SelectCompany,
    SelectDept
  },
  data() {
    return {
      data: {},
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
    chartOption(data) {
      return {
        title: {
          text: "数据异常趋势图 （按"+(this.searchData.dataType==1?"分数":"次数")+")",
          left: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          show: false
        },
        toolbox: {
          show: true,
          top: "bottom",
          left: "center",
          feature: {
            dataView: {
              show: true,
              readOnly: true
            },
            magicType: {
              show: true,
              type: ["line", "bar"]
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            type: "bar",
            markPoint: {
              data: [
                {
                  type: "max",
                  name: "最大值"
                },
                {
                  type: "min",
                  name: "最小值"
                }
              ]
            },
            data: [
              data.score1,
              data.score2,
              data.score3,
              data.score4,
              data.score5,
              data.score6,
              data.score7,
              data.score8,
              data.score9,
              data.score10,
              data.score11,
              data.score12
            ]
          }
        ]
      };
    },
    // 查询
    event_buttonSearchClick(component) {
      this.isLoading = true;
      var me = this;
      requestOsapAbnormalData
        .report_GM02(
          this,
          this.searchData.dataType,
          this.searchData.year,
          this.searchData.companyID,
          this.searchData.deptID
        )
        .then(res => {
          if (res.data && res.data.length > 0) me.data = res.data[0];
          else me.data = {};
          // debugger
          var dataSourceChart = echarts.init(
            document.getElementById("chart_GM2")
          );
          var option = this.chartOption(me.data);
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
