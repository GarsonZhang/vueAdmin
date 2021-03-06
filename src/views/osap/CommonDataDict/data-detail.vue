<template>
  <div>
    <gz-panel ref="gzPanelModule" class="borderPanel" :childFull100="true" :autoHeight="true">
      <div slot="top" class="tools" v-if="sortStatus">
          <Button type="text">{{$t('sortTip')}}</Button>
        <ButtonGroup class="tooltipButtonGroup float-right">
          <Tooltip :content="$t('apply')" placement="bottom-start">
            <gz-button type="primary" icon="checkmark" @click="event_dataSortSubmitClick"></gz-button>
          </Tooltip>
          <Tooltip :content="$t('cancel')" placement="bottom-start">
            <gz-button icon="close" @click="event_dataSortCancelClick"></gz-button>
          </Tooltip>
        </ButtonGroup>
      </div>
      <div slot="top" v-else class="tools">
              <ButtonGroup>
        <Tooltip :content="$t('refresh')"  placement="bottom-start">
          <gz-button :ref="refNames.refresh" icon="refresh" @click="event_dataRefreshClick" :showText='false' />
        </Tooltip>
        </ButtonGroup>
        <ButtonGroup class="tooltipButtonGroup">
          <Tooltip :content="$t('create')"  v-permission="8" placement="bottom-start">
            <gz-button type="primary" icon="plus" @click="event_dataCreateClick"></gz-button>
          </Tooltip>
          <Tooltip :content="$t('modify')"  v-permission="16" placement="bottom-start">
            <gz-button type="success" icon="edit" @click="event_dataModifyClick"></gz-button>
          </Tooltip>
          <Tooltip :content="$t('delete')"  v-permission="32" placement="bottom-start">
            <gz-button type="error" icon="close" @click="event_dataDeleteClick"></gz-button>
          </Tooltip>
        </ButtonGroup>
      </div>
      <div slot="main">
        <Table :ref="refNames.dataTable" size="small" class="gztag table-cell-smallpadding" :loading="isLoading" :columns="columns" :data="data"
          @on-row-click="event_dataSelect" highlight-row border></Table>
      </div>
    </gz-panel>
    <Modal :ref="refNames.modal" :title="modalTitle" v-model="modalStatus" width="80" :styles="{'max-width':'500px'}" :mask-closable="false"
      :loading="(true)" @on-ok="event_dataEditDataSubmit" @on-cancel="event_dataEditCancel">
      <Form :ref="refNames.form" :model="editData" :rules="dataRule" label-position="left" :label-width="80">
        <FormItem :label="$t('commonDataDictDetail.form.codeLabel')" prop="code">
          <i-input v-model="editData.code" :placeholder="$t('commonDataDictDetail.form.codePlaceHolder')"></i-input>
        </FormItem>
        <FormItem :label="$t('commonDataDictDetail.form.descriptionLabel')" prop="description">
          <i-input v-model="editData.description" :placeholder="$t('commonDataDictDetail.form.descriptionPlaceHolder')"></i-input>
        </FormItem>
      
      </Form>
    </Modal>
  </div>
</template>
<style lang="less" scoped>
.tools {
  padding-top: 5px;
  padding-left: 5px;
  padding-bottom: 5px;
}

.ivu-tooltip,
.ivu-tooltip-rel {
  position: relative;
  float: left;
  border-radius: 0;
}

.float-right {
  float: right;
}

div.tooltipButtonGroup {
  margin-left: 5px;
}

.ivu-form-item-label ::before {
  margin-left: -6px;
}
.borderPanel {
  border: 1px solid #e9eaec !important;
}
</style>

<script>
import Sortable from "sortablejs";
import { requestOsapCommonDataDict } from "../../../libs/request";
import Msg from "../../../mixins/msg";
import Authorize from "../../../mixins/authorize";

export default {
  name: "DataDetail",
  mixins: [Msg,Authorize],
  data() {
    return {
      refNames: {
        refresh: "refresh",
        dataTable: "mainData",
        modal: "modal",
        form: "form"
      },
      data: [],
      editData: {},
      dataRule: {
        code: [
          {
            required: true,
            message: this.$t("commonDataDictDetail.validate.emptyCode"),
            trigger: "blur"
          }
        ],
        description: [
          {
            required: true,
            message: this.$t("commonDataDictDetail.validate.emptyDescription"),
            trigger: "blur"
          }
        ]
      },
      editStatus: 0,
      sortStatus: false,
      sortCache: [],
      isLoading: false
    };
  },
  props: {
    mainID: {
      type: String,
      default: ""
    },
    mainDescription: {
      type: String,
      default: ""
    }
  },
  watch: {
    mainID(val) {
      if (this.$utils.isNULL(val)) {
        this.data = [];
        this.sortCache = [];
      } else this.$refs[this.refNames.refresh].handleClick();
    }
  },
  computed: {
    columns() {
      return [
        {
          title: this.$t("commonDataDictDetail.columns.index"),
          type: "index",
          width: 50,
          align: "center",
          className: "table-cell-index"
        },
        {
          title: this.$t("commonDataDictDetail.columns.code"),
          key: "code",
          width: 65
        },
        {
          title: this.$t("commonDataDictDetail.columns.description"),
          key: "description"
        }
      ];
    },
    modalStatus: {
      get() {
        return this.editStatus > 0;
      },
      set(value) {
        if (value == false) this.editStatus = 0;
      }
    },
    modalTitle: {
      get() {
        var t = "";
        switch (this.editStatus) {
          case 1:
            t = this.$t("dataTitleCreateFormat", [this.mainDescription]);
            break;
          case 2:
            t = this.$t("dataTitleModifyFormat", [this.mainDescription]);
            break;
          default:
            t = this.$t("dataTitleViewFormat", [this.mainDescription]);
            break;
        }

        return t;
      }
    }
  },
  created() {},
  mounted() {
    if (this.VerifyPermissions(64)) this.initSort();
  },
  methods: {
    initSort() {
      var me = this;
      //模块排序
      var elModule = this.$refs[this.refNames.dataTable].$children[1].$el
        .children[1];
      Sortable.create(elModule, {
        //排序移动前
        onStart(el) {},
        //排序移动后
        onEnd(el) {
          var v = me.sortCache[el.oldIndex];
          me.sortCache.splice(el.oldIndex, 1);
          me.sortCache.splice(el.newIndex, 0, v);
          if (me.sortStatus === false) me.sortStatus = true;
        },
        //排序选择
        onChoose(el) {}
      });
    },

    onParentSelect(value) {
      // debugger;
      var v = this.$utils.jsonSearch.search(
        this.parentData,
        null,
        p => p.rowID === value
      );
      if (v) {
        this.$set(this.editData, "parentCode", v.code);
        this.$set(this.editData, "parentName", v.description);
        this.editData.parentName = v.description;
      }
    },
    //选择一个模块，加载模块功能
    event_dataSelect(row, index) {
      this.$emit("selectChanged", row);
    },
    //模块排序提交
    event_dataSortSubmitClick(component) {
      //var tmp_data = this.$utils.deepCopyEx(this.data);
      // debugger;
      var me = this;
      requestOsapCommonDataDict
        .detailUpdateBatch(me, me.mainID, me.sortCache)
        .then(res => {
          component.loading = false;
          me.sortStatus = false;
          var c = [];
          for (let i = 0; i < me.data.length; i++) {
            me.data[i]["sort"] = me.sortCache.indexOf(i);
            c.push(i);
          }
          //this.sortCache = c;
          //参数排序
          debugger;
          me.data.sort((a, b) => {
            return a.sort > b.sort;
          });
          me.sortCache = [];
          for (let i = 0; i < me.data.length; i++) {
            me.sortCache.push(i);
          }
        })
        .catch(err => {
          component.loading = false;
        });
    },
    //模块排序取消
    event_dataSortCancelClick(component) {
      this.sortStatus = false;
      this.doGetList(() => {
        component.loading = false;
      });
    },

    //刷新模块点击事件
    event_dataRefreshClick(component) {
      this.isLoading = true;
      this.doGetList(() => {
        component.loading = false;
        this.isLoading = false;
      });
    },
    //新增模块点击事件
    event_dataCreateClick(component) {
      this.editData = {};
      this.editStatus = 1;
      component.loading = false;
    },

    //修改模块点击事件
    event_dataModifyClick(component) {
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
      requestOsapCommonDataDict
        .detailGet(this, v.rowID)
        .then(res => {
          this.editData = res.data;
          this.editStatus = 2;
          component.loading = false;
        })
        .catch(err => {
          component.loading = false;
        });
    },
    //删除模块点击事件
    event_dataDeleteClick(component) {
      // debugger;
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
      var me = this;
      var title = this.$t("askTitleWarning");
      var content = this.$t("deleteWarningWithDetail", [v.description]);
      this.ask(
        title,
        content,
        () => {
          requestOsapCommonDataDict
            .detailDelete(me, v.rowID)
            .then(res => {
              var index = me.$utils.searchJsonIndex(me.data, p => {
                return p.rowID == v.rowID;
              });
              me.data.splice(index, 1);
              me.showInfo(this.$t("deleteSuccess"));
              component.loading = false;
            })
            .catch(err => {
              component.loading = false;
            });
        },
        () => {
          component.loading = false;
        }
      );
    },

    //模块编辑数据提交事件
    event_dataEditDataSubmit() {
      // debugger;
      this.$refs[this.refNames.form].validate(valid => {
        if (valid) {
          this.doModuleSubmit();
        } else {
          this.showError(this.$t("failValidateForm"));
          this.$refs[this.refNames.modal].buttonLoading = false;
        }
      });
    },
    //取消模块编辑
    event_dataEditCancel() {
      this.editData = {};
      this.editStatus = 0;
    },
    doGetList(callBack) {
      if (this.$utils.isNULL(this.mainID)) {
        this.data = [];
        this.sortCache = [];
        if (callBack) callBack();
        return;
      }
      requestOsapCommonDataDict
        .detailList(this, this.mainID)
        .then(res => {
          this.data = res.data;
          this.sortCache = [];
          for (let i = 0; i < res.data.length; i++) {
            this.sortCache.push(i);
          }
          if (callBack) callBack();
        })
        .catch(err => {
          this.data = [];
          this.sortCache = [];
          if (callBack) callBack();
        });
    },
    doModuleSubmit() {
      var req;
      var me = this;
      // 新增 or 修改
      if (this.editStatus == 1) {
        this.editData["mainID"] = this.mainID;
        this.editData["sort"] = this.data.length;
        req = requestOsapCommonDataDict.detailCreate(this, this.editData);
      } else req = requestOsapCommonDataDict.detailUpdate(this, this.editData);
      req
        .then(res => {
          if (me.editStatus == 1) {
            //新增
            me.data.push(res.data);
            me.sortCache.push(me.data.length - 1);
          } else {
            var index = me.$utils.searchJsonIndex(me.data, p => {
              return p.rowID == me.editData.rowID;
            });
            me.data.splice(index, 1, me.editData);
          }
          me.editStatus = 0;

          me.showInfo(this.$t("saveSuccess"), 3);
        })
        .catch(err => {
          me.$refs[this.refNames.modal].buttonLoading = false;
        });
    }
  }
};
</script>