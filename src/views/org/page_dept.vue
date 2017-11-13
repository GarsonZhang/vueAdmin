<template>
  <div class="content">
    <div class="company borderPanel">
    <gz-panel>
      <div slot="top" class="top">
        公司信息
      </div>
      <div slot="main" class="main">
        <Tree :data="data" @on-select-change="event_onCompanySelectChanged"></Tree>
        
        </div>
    </gz-panel>
</div>
  </div>
   
</template>
<style lang="less" scoped>
.company {
  width: 190px;
  float: left;
  position: relative;
  height: 100%;
  .top {
    height: 32px;
    line-height: 32px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    color: #666;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: bold;
    padding-left: 9px;
    font-size: 12px;
    -moz-user-select: text;
    -webkit-user-select: text;
    -ms-user-select: text;
    -khtml-user-select: text;
    user-select: text;
  }
  .main {
    padding-left: 5px;
    padding-right: 5px;
  }
}

.borderPanel {
  border: 1px solid #e9eaec !important;
}
</style>
<script>
import { ReqCommonDataCompany } from "../../libs/request";
export default {
  data() {
    return {
      data: []
    };
  },
  created() {
    // debugger;
    ReqCommonDataCompany.treeData().then(res => {
      this.data = res.data;
    });
  },
  methods: {
    event_onCompanySelectChanged(node, a, b) {}
  }
};
</script>


