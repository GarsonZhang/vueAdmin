<template>
    <div class="content">
        <Tabs type="card" class="gzFullTabs">
            <TabPane label="各部门扣分明细" >
                <GMRpt01></GMRpt01>
            </TabPane>
             <TabPane label="各模块扣分明细">
                <rptByModule></rptByModule>
            </TabPane>
             <TabPane  label="各部门模块扣分明细">
                <rptDeptModule></rptDeptModule> 
            </TabPane>
             <TabPane  label="各监察项目扣分明细">
                <rptByMonitorItem></rptByMonitorItem> 
            </TabPane>
             <TabPane  label="年度扣分趋势图">
                <GMRpt02></GMRpt02> 
            </TabPane>
             <TabPane  label="异常部门分布图">
                <GMRpt03></GMRpt03> 
            </TabPane>
              <TabPane  label="异常模块分布图">
                <chartModule></chartModule> 
            </TabPane>
               <TabPane  label="异常项目分布图">
                <chartMonitorItem></chartMonitorItem> 
            </TabPane>
        </Tabs>

    </div>
</template>
<style lang="less">
.gzFullTabs {
  height: 100%;
  .ivu-tabs-content {
    position: absolute;
    top: 48px;
    bottom: 0px;
  }
}
</style>

<style lang="less" scoped>
.ivu-tabs-tabpane {
  position: relative;
}
</style>
<script>
import GMRpt01 from "./components/cRpt01Ex.vue";
import rptByModule from "./components/cRptByModule.vue";
import rptDeptModule from "./components/cRptByDeptModule.vue";
import rptByMonitorItem from "./components/cRptByMonitorItem.vue";
import rptDeptMonitorItem from "./components/cRptByDeptMonitorItem.vue";
import GMRpt02 from "./components/cRpt02.vue";
import GMRpt03 from "./components/cRpt03.vue";
import chartModule from "./components/cChartModule.vue";
import chartMonitorItem from "./components/cChartMonitorItem.vue";

export default {
  name: "osap-rpt-IT",
  components: {
    GMRpt01,
    rptByModule,
    rptDeptModule,
    rptByMonitorItem,
    rptDeptMonitorItem,
    GMRpt02,
    chartModule,
    chartMonitorItem
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
