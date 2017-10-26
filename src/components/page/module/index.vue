<template>
<div class="content">
    <gz-panel topHeight="40px" bottomHeight="0px" :childFull100=true >
        <div slot="top" class="tools" >
        <gz-button ref="refresh" icon="refresh" @click="doRresh" text="刷新" loadingText="请稍后" />
        <ButtonGroup>
          <Button type="primary" icon="plus" @click="doAdd">新增</Button>
          <Button type="success" icon="edit">编辑</Button>
          <Button type="error" icon="close">删除</Button>
        </ButtonGroup>
          </div>
        <div slot="main">
          <Table highlight-row size="small" :columns="moduleColumns" :data="moduleData"></Table>
        </div>
        <div slot="bottom">bottom</div>
    </gz-panel>

    <Modal
        title="模块新增"
        v-model="moduleAdd"
        width=80
        :styles="{'max-width':'800px'}"
        :mask-closable="false">
        <p>新增模块</p>
    </Modal>
</div>
</template>
<style lang="less" scoped>
.tools {
  padding-top: 5px;
}
</style>
<script>
import expandRow from "./table-expand.vue";

export default {
  name: "module",
  components: { expandRow },
  data() {
    return {
      moduleColumns: [
        {
          type: "expand",
          width: 30,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "名称",
          key: "name",
          editable: true
        },
        {
          title: "描述",
          key: "description",
          editable: true
        },
        {
          title: "图标",
          key: "icon",
          editable: true
        },
        {
          title: "组件路径",
          key: "componentPath",
          editable: true
        },
        {
          title: "组件名称",
          key: "componentName",
          editable: true
        }
      ],
      moduleData: [],
      moduleAdd: false
    };
  },
  created() {},
  mounted() {
    this.$refs.refresh.handleClick();
  },
  methods: {
    doRresh(event, component) {
      console.log("1");
      this.$utils.ajaxRemote.get("/module/getall").then(res => {
        this.moduleData = res.data;
        component.loading = false;
      });
    },
    doAdd(event,component){
        this.moduleAdd=true;
        
    }
  }
};
</script>