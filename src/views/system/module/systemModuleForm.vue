<template>
  <div>
       <gz-panel ref="gzPanelForm" class="borderPanel" :childFull100=true >
              <div slot="top" class="tools"  v-if="sortStatus">    
                <Button type="text">排序已开启</Button>
                <ButtonGroup class="float-right">
                  <gz-button  type="primary" icon="checkmark" @click="event_moduleFormSortSubmitClick" text="应用" loadingText="提交中"></gz-button >
                  <gz-button  icon="close" @click="event_moduleFormSortCancelClick" text="取消" loadingText="请稍后"></gz-button >
                </ButtonGroup>
              </div>
              <div slot="top" v-else class="tools" >    
                <gz-button icon="refresh" text="刷新" loadingText="刷新中" @click="event_moduleFormRefreshClick" />
                <ButtonGroup>
                  <gz-button  type="primary" icon="plus" @click="event_moduleFormAddClick" text="新增" loadingText="请稍后"></gz-button >
                  <gz-button  type="success" icon="plus" @click="event_moduleFormEditClick" text="修改" loadingText="请稍后"></gz-button >
                  <gz-button  type="error" icon="plus" @click="event_moduleFormDeleteClick" text="删除" loadingText="请稍后"></gz-button >
                </ButtonGroup>
              </div>

              <div slot="main">
                <Table ref="tableModuleForm" highlight-row :loading="isLoading" size="small" class="gztag" :columns="columns" :data="data"></Table>
              </div>
          </gz-panel>
           <Modal
                ref="modalModuleForm"
                title="功能新增"
                v-model="modalStatus"
                width=80
                :styles="{'max-width':'500px'}"
                :mask-closable="false"
                :loading="(true)"
                @on-ok="event_moduleFormEditDataSubmit"
                @on-cancel="event_moduleFormEditCancel">
                <Form ref="formModuleForm" :model="editData" :rules="dataRule"  label-position="left" :label-width="80">
                <FormItem label="功能编码" prop="name">
                    <Input v-model="editData.name" placeholder="请输入功能编码"></Input>
                </FormItem>
                <FormItem label="功能名称" prop="description">
                    <Input v-model="editData.description" placeholder="请输入功能名称"></Input>
                </FormItem>
                <FormItem label="路由地址" prop="routeName">
                    <Input v-model="editData.routeName" placeholder="请输入路由地址"></Input>
                </FormItem>
                <FormItem label="组件类型" prop="componentPath">
                    <Select v-model="editData.componentPath" placeholder="请选择组件类型">
                        <Option value="views">views</Option>
                        <Option value="components">components</Option>
                    </Select>
                </FormItem>
                <FormItem label="组件路径" prop="componentName">
                    <Input v-model="editData.componentName" placeholder="请输入组件路径"></Input>
                </FormItem>
                </Form>
            </Modal>
  </div>
</template>
<style lang="less">
.table-cell-index .ivu-table-cell {
  padding-left: 5px;
  padding-right: 5px;
}
</style>
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
.tooltipButtonGroup {
  margin-left: 5px;
}
.tooltipButtonGroup > .ivu-tooltip {
  margin-left: -1px;
}
.tooltipButtonGroup > .ivu-tooltip:first-child:not(:last-child) .ivu-btn {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.tooltipButtonGroup > .ivu-tooltip:last-child:not(:first-child) .ivu-btn {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.tooltipButtonGroup .ivu-tooltip:not(:first-child):not(:last-child) .ivu-btn {
  border-radius: 0;
}
.borderPanel {
  border: 1px solid #e9eaec !important;
}
</style>
<script>
import Sortable from "sortablejs";
import { requestForm } from "../../../libs/request";
import Msg from "../../../mixins/msg";

export default {
  name: "systemModuleForm",
  mixins: [Msg],
  data() {
    return {
      columns: [
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "描述",
          key: "description"
        },
        {
          title: "图标",
          key: "icon"
        },
        {
          title: "路由",
          key: "routeName"
        },
        {
          title: "组件路径",
          key: "componentPath"
        },
        {
          title: "组件名称",
          key: "componentName"
        }
      ],
      data: [],
      editData: {},
      dataRule: {
        name: [{ required: true, message: "模块编码不能为空", trigger: "blur" }],
        description: [
          { required: true, message: "模块名称不能为空", trigger: "blur" },
          {
            type: "string",
            min: 2,
            max: 6,
            message: "组件名称长度必须大于2且小于6",
            trigger: "blur"
          }
        ],
        routeName: [{ required: true, message: "路由不能为空", trigger: "blur" }],
        componentPath: [
          { required: true, message: "请选择组件类型", trigger: "change" }
        ],
        componentName: [
          { required: true, message: "组件路径不能为空", trigger: "blur" }
        ]
      },
      editStatus: 0,
      sortStatus: false,
      sortCache: [],
      isLoading: false
    };
  },
  props: {
    moduleID: {
      //设置top样式，height设置无效
      type: String,
      default: ""
    }
  },
  computed: {
    modalStatus: {
      get() {
        return this.editStatus > 0;
      },
      set(value) {
        if (value == false) this.editStatus = 0;
      }
    }
  },
  mounted() {
    var me = this;

    //模块排序
    var elModule = this.$refs["tableModuleForm"].$children[1].$el.children[1];
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
  methods: {
    // 功能
    //刷新
    event_moduleFormRefreshClick(e, component) {
      this.doModuleFormRefresh()
        .then(res => {
          component.loading = false;
        })
        .catch(err => {
          component.loading = false;
        });
    },

    //新增功能点击事件
    event_moduleFormAddClick(e, component) {
      if (!this.moduleID || this.moduleID.length < 1) {
        component.loading = false;
        this.showWarning("请先选择模块");
        return;
      }
      this.editData = {};
      this.editStatus = 1;
      component.loading = false;
    },

    //修改功能点击事件
    event_moduleFormEditClick(e, component) {
      var v = this.$utils.searchObserver(
        this.$refs.tableModuleForm.objData,
        null,
        p => {
          return p._isHighlight == true;
        }
      );
      if (!v) {
        component.loading = false;
        this.showWarning("请先选择要编辑的功能");
        return;
      }
      requestForm
        .get(v.rowID)
        .then(res => {
          this.editData = res.data;
          this.editStatus = 2;
          component.loading = false;
        })
        .catch(err => {
          component.loading = false;
        });
    },
    //模块编辑数据提交事件
    event_moduleFormEditDataSubmit() {
      this.$refs["formModuleForm"].validate(valid => {
        if (valid) {
          this.doModuleFormSubmit();
        } else {
          this.showError("表单验证失败!");
          this.$refs.modalModuleForm.buttonLoading = false;
        }
      });
    },
    //取消模块编辑
    event_moduleFormEditCancel() {
      this.editData = {};
      this.editStatus = 0;
    },
    //删除功能点击事件
    event_moduleFormDeleteClick(e, component) {
      var v = this.$utils.searchObserver(
        this.$refs.tableModuleForm.objData,
        null,
        p => {
          return p._isHighlight == true;
        }
      );
      var me = this;
      var title = "警告";
      var content = "确定要删除功能【" + v.description + "】吗？";
      this.ask(
        title,
        content,
        () => {
          requestForm
            .delete(v.rowID)
            .then(res => {
              var index = me.$utils.searchJsonIndex(me.data, p => {
                return p.rowID == v.rowID;
              });
              me.data.splice(index, 1);
              me.showInfo("删除成功");
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

    //功能排序提交
    event_moduleFormSortSubmitClick(e, component) {
      var tmp_data = this.$utils.deepCopyEx(this.data);
      for (let i = 0; i < tmp_data.length; i++) {
        tmp_data[i]["sort"] = this.sortCache.indexOf(i);
      }
      requestForm
        .updateBatch(tmp_data)
        .then(res => {
          component.loading = false;
          this.sortStatus = false;
          this.doModuleRefresh()
            .then(res => {})
            .catch(err => {});
        })
        .catch(err => {
          component.loading = false;
        });
    },

    //功能排序取消
    event_moduleFormSortCancelClick(event, component) {
      this.sortStatus = false;

      this.doModuleFormRefresh()
        .then(res => {
          component.loading = false;
        })
        .catch(err => {
          component.loading = false;
        });
    },

    //加载功能功能
    doModuleFormRefresh() {
        // debugger;
      var me = this;
      this.isLoading = true;
      return new Promise(function(resolve, reject) {
        if (!me.moduleID) {
          me.data = {};
          me.isLoading = false;
          reject("this.moduleID is null");
          me.showWarning("请先选择模块");
          return;
        }
        requestForm
          .list(me.moduleID)
          .then(res => {
            // debugger
            me.data = res.data;
            me.sortCatch = [];
            for (let i = 0; i < res.data.length; i++) {
              me.sortCatch.push(i);
            }
            me.isLoading = false;
            resolve(res);
          })
          .catch(err => {
            me.data = {};
            me.sortCatch = [];
            me.isLoading = false;
            reject(err);
          });
      });
    },
    doModuleFormSubmit() {
      var req;
      var me = this;
      // 新增 or 修改
      if (this.editStatus == 1) {
        // debugger
        this.editData["sort"] = this.data.length;
        this.editData["mainID"] = this.moduleID;
        req = requestForm.create(this.editData);
      } else req = requestForm.update(this.editData);
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

          me.showInfo("保存成功", 3);
        })
        .catch(err => {
          me.$refs.modalModuleForm.buttonLoading = false;
        });
    }
  },
  watch: {
      moduleID(val){
        //   debugger
          this.doModuleFormRefresh();
      }
  }
};
</script>
