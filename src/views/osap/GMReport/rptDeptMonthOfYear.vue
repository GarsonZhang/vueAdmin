<template>
    <div class="content">
        <Tabs type="card" class="gzFullTabs">
            <TabPane label="各部门扣分明细表" >
                <GMRpt01></GMRpt01>
            </TabPane>
             <TabPane label="各部门扣分趋势图">
                <GMRpt02></GMRpt02>
            </TabPane>
             <TabPane  label="各部门扣分分析">
                 <!-- <h1>各部门扣分分析</h1> -->
                <GMRpt03></GMRpt03> 
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
.ivu-tabs-tabpane{
    position: relative;
}
</style>
<script>
import GMRpt01 from "./cRpt01Ex.vue";
import GMRpt02 from "./cRpt02.vue";
import GMRpt03 from "./cRpt03.vue";

export default {
  name: "osap-rpt-GM",
  components: {
    GMRpt01,
    GMRpt02,
    GMRpt03
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
