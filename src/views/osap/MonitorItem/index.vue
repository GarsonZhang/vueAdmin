<template>
    <div>
        <gz-panel>
            <div slot="top">
                <div class="tools">
                    <gz-button :ref="refNames.buttonRefresh" icon="refresh" @click="event_buttonRefreshClick" text="刷新" />
                    <ButtonGroup class="tooltipButtonGroup">
                        <gz-button type="primary" icon="plus" @click="event_buttonAddClick" v-permission="1" text="新增"></gz-button>
                        <gz-button type="success" icon="edit" @click="event_buttonEditClick" v-permission="2" text="修改"></gz-button>
                        <gz-button type="error" icon="close" @click="event_buttonDeleteClick" v-permission="4" text="删除"></gz-button>
                    </ButtonGroup>
                </div>
            </div>
            <div slot="main" class="main">
                <Table :ref="refNames.dataTable" size="small" :loading="isLoading" :columns="columns" :data="data"
                    highlight-row border></Table>
            </div>
        </gz-panel>
        <data-edit :ref="refNames.form" @onCreate="onCreate" @onModify="onModify"></data-edit>
    </div>
</template>
<style lang="less" scoped>

</style>

<script>
import { requestOsapMonitorItem } from "../../../libs/request";
import DataEdit from "./dataEdit.vue";
import Authorize from "../../../mixins/authorize";
export default {
  name: "MonitorItem",
  data() {
    return {
      refNames: {
        dataTable: "dataTable",
        form: "form"
      },
      isLoading: false,
      data: [],
      request: {}
    };
  },
  mixins: [Authorize],
  components: {
    DataEdit
  },
  created() {
    // debugger
    this.request = requestOsapMonitorItem;
  },
  mounted() {
    // debugger
    this.loadData();
  },
  computed: {
    columns() {
      return [
        {
          //序号
          title: this.$t("commonMonitorItem.keys.index"),
          type: "index",
          width: 50,
          align: "center",
          className: "table-cell-index"
        },
        {
          //模块
          title: this.$t("commonMonitorItem.keys.moduleDescription"),
          key: "moduleDescription"
        },
        {
          //监察代码
          title: this.$t("commonMonitorItem.keys.code"),
          key: "code"
        },
        {
          //监察名称
          title: this.$t("commonMonitorItem.keys.description"),
          key: "description"
        },
        {
          //监察类别
          title: this.$t("commonMonitorItem.keys.typeDescription"),
          key: "typeDescription"
        },
        {
          //扣分
          title: this.$t("commonMonitorItem.keys.score"),
          key: "score"
        },
        {
          //说明
          title: this.$t("commonMonitorItem.keys.remark"),
          key: "remark"
        },
        {
          //关键字描述
          title: this.$t("commonMonitorItem.keys.keyAll"),
          key: "keyDescriptionAll"
        }
      ];
    }
  },
  methods: {
    // 刷新
    event_buttonRefreshClick(btn) {
      this.loadData(btn);
    },
    // 新增
    event_buttonAddClick(btn) {
      btn.loading=false;
      this.$refs[this.refNames.form].showCreate();
    },
    // 修改
    event_buttonEditClick(btn) {
      var obj = this.getSelect();
      if (!obj) return;
      this.$refs[this.refNames.form].showModify(obj.rowID, () => {
        btn.loading = false;
      });
    },
    // 删除
    event_buttonDeleteClick() {
      var obj = this.getSelect();
      if (!obj) return;
      this.request.delete(this, obj.rowID).then(res => {
        var index = this.$utils.searchJsonIndex(this.data, p => {
          return p.rowID == v.rowID;
        });
        this.data.splice(index, 1);
        this.showInfo(this.$t("deleteSuccess"));
      });
    },
    // 加载数据
    loadData(btn) {
      this.data = [];
      this.isLoading = true;
      this.request
        .list(this)
        .then(res => {
          this.data = res.data;
          this.isLoading = false;
          // debugger
          if (btn) btn.loading = false;
        })
        .catch(err => {
          this.isLoading = false;
          if (btn) btn.loading = false;
        });
    },

 
    getSelect() {
      var v = this.$utils.searchObserver(
        this.$refs[this.refNames.dataTable].objData,
        null,
        p => {
          return p._isHighlight == true;
        }
      );
      if (!v) {
        component.loading = false;
        this.showWarning(this.$t("noSelectData"));
        return;
      }
      return v;
    },
       onCreate(data) {
      this.data.push(data);
    },
    onModify(data) {
      var index = this.$utils.searchJsonIndex(this.data, p => {
        return p.rowID == data.rowID;
      });
      this.data.splice(index, 1, data);
    }
  }
};
</script>
