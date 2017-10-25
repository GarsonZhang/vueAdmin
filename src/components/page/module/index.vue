<style scoped>
.ivu-table-expanded-cell{
    padding: 0px;
    padding-left: 30px;
    background-color: red !important;
}
</style>

<template>
   <Table highlight-row size="small" :columns="moduleColumns" :data="moduleData"></Table>
</template>
<script>
import expandRow from "./table-expand.vue";
export default {
    name:"module",
  components: { expandRow },
  data() {
    return {
      moduleColumns: [],
      moduleData: []
    };
  },
  created() {
      this.init();
  },
  methods: {
    init() {
      this.$utils.ajaxRemote.get("/module/getall").then(res => {
        this.moduleColumns = [
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
          },{
            title: "序号",
            type: "index",
            width: 60,
            align: "center"
          },{
            title: "名称",
            key: "name",
            editable: true
          },{
            title: "描述",
            key: "description",
            editable: true
          },{
            title: "图标",
            key: "icon",
            editable: true
          },{
            title: "组件路径",
            key: "componentPath",
            editable: true
          },{
            title: "组件名称",
            key: "componentName",
            editable: true
          }
        ];
        this.moduleData = res.data;
      });
    }
  }
};
</script>