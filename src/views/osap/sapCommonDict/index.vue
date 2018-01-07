<template>
<div class="content">
  <Row class="fill-height">
    <i-col span="12" class="fill-height">
      <gz-panel class="borderPanel" >
        <div slot="top" class="title" >
            <span>{{$t('mainData')}}</span>
        </div>
        <div slot="main">
         <SAPCommonDicMain @selectChanged="event_mainSelect"></SAPCommonDicMain>
        </div>
        </gz-panel>
    </i-col>
      <i-col span="12" class="fill-height">
      <gz-panel class="borderPanel" >
        <div slot="top" class="title">
            <span>{{detailTitle}}</span>
        </div>
        <div slot="main">
         <SAPCommonDicDetail :mainID="selectMainID" :mainDescription="selectMainDescription" :parentID="selectParentID"></SAPCommonDicDetail>
        </div>
        </gz-panel>
    </i-col>
  </Row>

</div>
</template>


<style lang="less" scoped>
.title {
  height: 32px;
  line-height: 32px;
  border-bottom: 1px solid #e9eaec !important;
  color: #495060 !important;
  background: #fff !important;
  padding: 0 12px;
  display: inline-block;
  margin: 2px 4px 2px 0;
  border-radius: 3px;
  font-size: 12px;
  vertical-align: middle;
  opacity: 1;
  overflow: hidden;
  width: 100%;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.borderPanel {
  border: 1px solid #e9eaec !important;
}
</style>
<script>
import SAPCommonDicMain from "./dict-main.vue";
import SAPCommonDicDetail from "./dict-detail.vue";
export default {
  name: "osap-sapCommonDict",
  components: { SAPCommonDicMain, SAPCommonDicDetail },
  data() {
    return {
      selectModule: {},
      refsName: {
        Form: "Form"
      },
      selectMainID: "",
      selectMainDescription: "",
      selectParentID:""
    };
  },
  computed: {
    detailTitle() {
      var v = this.$t("detailData");
      if (!this.$utils.isNULL(this.selectMainDescription))
        v = "【" + this.selectMainDescription + "】" + v;
      return v;
    }
  },
  created() {},
  methods: {
    //选择一个模块，加载模块功能
    event_mainSelect(row, index) {
      this.selectModule = row;
      // $emit("selectChanged", row);
      this.selectMainID = row["rowID"];
      // debugger
      this.selectMainDescription = row["description"];
      this.selectParentID=row["parentID"];
    }
  }
};
</script>