<template>
<div class="content">
  <Row class="fill-height">
    <Col span="6" class="fill-height">
      <gz-panel class="borderPanel" >
        <div slot="top" class="title" >
            <span>模块列表</span>
        </div>
        <div slot="main">
          <gz-panel ref="gzPanelModule" :childFull100=true >
            <div slot="top" class="tools"  v-if="module.sortStatus">    
               <Button type="text">排序已开启</Button>
                <ButtonGroup class="tooltipButtonGroup float-right">
                  <Tooltip content="应用" placement="bottom-start" >
                    <gz-button  type="primary" icon="checkmark" @click="event_moduleSortSubmitClick"></gz-button >
                  </Tooltip>
                    <Tooltip content="取消" placement="bottom-start">
                    <gz-button  icon="close" @click="event_moduleSortCancelClick"></gz-button >
                  </Tooltip>
                </ButtonGroup>
            </div>
              <div slot="top" v-else class="tools" >    
                <Tooltip content="刷新" placement="bottom-start">
                  <gz-button ref="moduleRefresh" icon="refresh" @click="event_moduleRefreshClick" :showText='false' />
                </Tooltip>
                <ButtonGroup  class="tooltipButtonGroup">
                  <Tooltip content="新增" placement="bottom-start" >
                    <gz-button  type="primary" icon="plus" @click="event_moduleAddClick"></gz-button >
                  </Tooltip>
                  <Tooltip content="修改" placement="bottom-start" >
                    <gz-button type="success" icon="edit"  @click="event_moduleEditClick"></gz-button>
                    </Tooltip>
                    <Tooltip content="删除" placement="bottom-start">
                    <gz-button  type="error" icon="close"  @click="event_moduleDeleteClick"></gz-button >
                    </Tooltip>
                </ButtonGroup>
              </div>
              <div slot="main">
                <Table ref="tableModule" size="small" class="gztag" :loading="module.isLoading" :columns="module.columns" :data="module.data" @on-row-click="event_moduleSelect"  highlight-row border></Table>
              </div>
          </gz-panel>
        </div>
        </gz-panel>
    </Col>
      <Col span="18" class="fill-height">
      <gz-panel class="borderPanel" >
        <div slot="top" class="title">
            <span>功能列表</span>
        </div>
        <div slot="main">
          <gz-panel ref="gzPanelForm" :childFull100=true >
              <div slot="top" class="tools"  v-if="form.sortStatus">    
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
                <Table ref="tableModuleForm" highlight-row :loading="form.isLoading" size="small" class="gztag" :columns="form.columns" :data="form.data"></Table>
              </div>
          </gz-panel>
        </div>
        </gz-panel>
    </Col>
  </Row>
    <Modal
        ref="modalModule"
        title="模块新增"
        v-model="modalStatusModule"
        width=80
        :styles="{'max-width':'500px'}"
        :mask-closable="false"
        :loading="(true)"
        @on-ok="event_moduleEditDataSubmit"
        @on-cancel="event_moduleEditCancel">
        <Form ref="formModule" :model="module.editData" :rules="module.dataRule"  label-position="left" :label-width="80">
          <FormItem label="模块编码" prop="name">
            <Input v-model="module.editData.name" placeholder="请输入模块编码"></Input>
          </FormItem>
          <FormItem label="模块名称" prop="description">
            <Input v-model="module.editData.description" placeholder="请输入模块名称"></Input>
          </FormItem>
          <FormItem label="组件类型" prop="componentPath">
            <Select v-model="module.editData.componentPath" placeholder="请选择组件类型">
                <Option value="views">views</Option>
                <Option value="components">components</Option>
            </Select>
          </FormItem>
          <FormItem label="组件路径" prop="componentName">
            <Input v-model="module.editData.componentName" placeholder="请输入组件路径"></Input>
          </FormItem>
        </Form>
    </Modal>


    <Modal
        ref="modalModuleForm"
        title="功能新增"
        v-model="modalStatusModuleForm"
        width=80
        :styles="{'max-width':'500px'}"
        :mask-closable="false"
        :loading="(true)"
        @on-ok="event_moduleFormEditDataSubmit"
        @on-cancel="event_moduleFormEditCancel">
        <Form ref="formModuleForm" :model="form.editData" :rules="form.dataRule"  label-position="left" :label-width="80">
          <FormItem label="功能编码" prop="name">
            <Input v-model="form.editData.name" placeholder="请输入功能编码"></Input>
          </FormItem>
          <FormItem label="功能名称" prop="description">
            <Input v-model="form.editData.description" placeholder="请输入功能名称"></Input>
          </FormItem>
          <FormItem label="路由地址" prop="routeName">
            <Input v-model="form.editData.routeName" placeholder="请输入路由地址"></Input>
          </FormItem>
          <FormItem label="组件类型" prop="componentPath">
            <Select v-model="form.editData.componentPath" placeholder="请选择组件类型">
                <Option value="views">views</Option>
                <Option value="components">components</Option>
            </Select>
          </FormItem>
          <FormItem label="组件路径" prop="componentName">
            <Input v-model="form.editData.componentName" placeholder="请输入组件路径"></Input>
          </FormItem>
        </Form>
    </Modal>
</div>
</template>
<style lang="less">
.gztag .ivu-table-expanded-cell {
  padding: 0px;
  padding-left: 30px;
}
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
.ivu-tooltip,
.ivu-tooltip-rel {
  // display: inline-block;
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
import expandRow from "./table-expand.vue";
import Sortable from "sortablejs";
import Vue from "vue";
import { requestModule, requestForm } from "../../../libs/request";
import Msg from "../../../mixins/msg";

export default {
  name: "module",
  mixins: [Msg],
  components: { expandRow },
  data() {
    return {
      module: {
        columns: [
          {
            title: "序号",
            type: "index",
            width: 50,
            align: "center",
            className: "table-cell-index"
          },
          {
            title: "描述",
            key: "description"
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
      },
      form: {
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
      },
      selectModule: {}
    };
  },
  computed: {
    modalStatusModule: {
      get() {
        return this.module.editStatus > 0;
      },
      set(value) {
        if (value == false) this.module.editStatus = 0;
      }
    },
    modalStatusModuleForm: {
      get() {
        return this.form.editStatus > 0;
      },
      set(value) {
        if (value == false) this.form.editStatus = 0;
      }
    }
  },
  created() {},
  mounted() {
    this.$refs["moduleRefresh"].handleClick();
    var me = this;
    window.onresize = function(e) {
      me.$refs.gzPanelModule.reLayout();
      me.$refs.gzPanelForm.reLayout();
    };

    //模块排序
    let vm = this;
    
    var elModule = this.$refs["tableModule"].$children[1].$el.children[1];
    Sortable.create(elModule, {
      //排序移动前
      onStart(el) {},
      //排序移动后
      onEnd(el) {
        var v = vm.module.sortCache[el.oldIndex];
        vm.module.sortCache.splice(el.oldIndex, 1);
        vm.module.sortCache.splice(el.newIndex, 0, v);
        if (vm.module.sortStatus === false) vm.module.sortStatus = true;
      },
      //排序选择
      onChoose(el) {}
    });

    var elForm = this.$refs["tableModuleForm"].$children[1].$el.children[1];
    Sortable.create(elForm, {
      //排序移动前
      onStart(el) {},
      //排序移动后
      onEnd(el) {
        var v = vm.form.sortCache[el.oldIndex];
        vm.form.sortCache.splice(el.oldIndex, 1);
        vm.form.sortCache.splice(el.newIndex, 0, v);
        if (vm.form.sortStatus === false) vm.form.sortStatus = true;
      },
      //排序选择
      onChoose(el) {}
    });
  },
  methods: {
    //选择一个模块，加载模块功能
    event_moduleSelect(row, index) {
      this.selectModule = row;

      this.doModuleFormRefresh()
        .then()
        .catch();
    },
    //模块排序提交
    event_moduleSortSubmitClick(e, component) {
      var tmp_data = this.$utils.deepCopyEx(this.module.data);
      for (let i = 0; i < tmp_data.length; i++) {
        tmp_data[i]["sort"] = this.module.sortCache.indexOf(i);
      }
      requestModule
        .updateBatch(tmp_data)
        .then(res => {
          component.loading = false;
          this.module.sortStatus = false;
          this.doModuleRefresh()
            .then(res => {})
            .catch(err => {});
        })
        .catch(err => {
          component.loading = false;
        });
    },
    //模块排序取消
    event_moduleSortCancelClick(event, component) {
      this.module.sortStatus = false;
      this.doModuleRefresh()
        .then(res => {
          component.loading = false;
        })
        .catch(err => {
          component.loading = false;
        });
    },

    //刷新模块点击事件
    event_moduleRefreshClick(event, component) {
      this.module.isLoading = true;
      this.doModuleRefresh()
        .then(res => {
          component.loading = false;
          this.module.isLoading = false;
        })
        .catch(err => {
          component.loading = false;
          this.module.isLoading = false;
        });
    },
    //新增模块点击事件
    event_moduleAddClick(e, component) {
      this.module.editData = {};
      this.module.editStatus = 1;
      component.loading = false;
    },

    //修改模块点击事件
    event_moduleEditClick(e, component) {
      var v = this.$utils.searchObserver(
        this.$refs.tableModule.objData,
        null,
        p => {
          return p._isHighlight == true;
        }
      );
      if (!v) {
        component.loading = false;
        this.showWarning('请先选择要编辑的模块');
        return;
      }
      requestModule
        .get(v.rowID)
        .then(res => {
          this.module.editData = res.data;
          this.module.editStatus = 2;
          component.loading = false;
        })
        .catch(err => {
          component.loading = false;
        });
    },
    //删除模块点击事件
    event_moduleDeleteClick(e, component) {
      var v = this.$utils.searchObserver(
        this.$refs.tableModule.objData,
        null,
        p => {
          return p._isHighlight == true;
        }
      );
      var me = this;
      var title = "警告";
      var content = "确定要删除【" + v.description + "】模块吗？删除以后模块功能也会清空";
      this.ask(
        title,
        content,
        () => {
          requestModule
            .delete(v.rowID)
            .then(res => {
              var index = me.$utils.searchJsonIndex(me.module.data, p => {
                return p.rowID == v.rowID;
              });
              me.module.data.splice(index, 1);
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

    //模块编辑数据提交事件
    event_moduleEditDataSubmit() {
      this.$refs["formModule"].validate(valid => {
        if (valid) {
          this.doModuleSubmit();
        } else {
          this.showError("表单验证失败!");
          this.$refs.modalModule.buttonLoading = false;
        }
      });
    },
    //取消模块编辑
    event_moduleEditCancel() {
      this.module.editData = {};
      this.module.editStatus = 0;
    },

    //刷新模块
    doModuleRefresh() {
      let me = this;
      return new Promise(function(resolve, reject) {
        requestModule
          .list()
          .then(res => {
            me.module.data = res.data;
            me.module.sortCache = [];
            for (let i = 0; i < res.data.length; i++) {
              me.module.sortCache.push(i);
            }
            resolve(res);
          })
          .catch(err => {
            me.module.data = {};
            me.module.sortCache = [];
            reject(err);
          });
      });
    },

    doModuleSubmit() {
      var req;
      var me = this;
      // 新增 or 修改
      if (this.module.editStatus == 1) {
        this.module.editData["sort"] = this.module.data.length;
        req = requestModule.create(this.module.editData);
      } else req = requestModule.update(this.module.editData);
      req
        .then(res => {
          if (me.module.editStatus == 1) {
            //新增
            me.module.data.push(res.data);
            me.module.sortCache.push(me.module.data.length - 1);
          } else {
            var index = me.$utils.searchJsonIndex(me.module.data, p => {
              return p.rowID == me.module.editData.rowID;
            });
            me.module.data.splice(index, 1, me.module.editData);
          }
          me.module.editStatus = 0;

          me.showInfo("保存成功", 3);
        })
        .catch(err => {
          me.$refs.modalModule.buttonLoading = false;
        });
    },

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
      if (!this.selectModule.rowID) {
        component.loading = false;
        this.showWarning('请先选择模块');
        return;
      }
      this.form.editData = {};
      this.form.editStatus = 1;
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
        this.showWarning('请先选择要编辑的功能');
        return;
      }
      requestForm
        .get(v.rowID)
        .then(res => {
          this.form.editData = res.data;
          this.form.editStatus = 2;
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
      this.form.editData = {};
      this.form.editStatus = 0;
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
              var index = me.$utils.searchJsonIndex(me.form.data, p => {
                return p.rowID == v.rowID;
              });
              me.form.data.splice(index, 1);
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
      var tmp_data = this.$utils.deepCopyEx(this.form.data);
      for (let i = 0; i < tmp_data.length; i++) {
        tmp_data[i]["sort"] = this.form.sortCache.indexOf(i);
      }
      requestForm
        .updateBatch(tmp_data)
        .then(res => {
          component.loading = false;
          this.form.sortStatus = false;
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
      this.form.sortStatus = false;

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
      var id = this.selectModule["rowID"];

      let me = this;
      this.form.isLoading = true;
      return new Promise(function(resolve, reject) {
        if (!id) {
          me.form.data = {};
          me.form.isLoading = false;
          reject("id is null");
          this.showWarning('请先选择模块');
          return;
        }
        requestForm
          .list(id)
          .then(res => {
            // debugger
            me.form.data = res.data;
            me.form.sortCatch = [];
            for (let i = 0; i < res.data.length; i++) {
              me.form.sortCatch.push(i);
            }
            me.form.isLoading = false;
            resolve(res);
          })
          .catch(err => {
            me.form.data = {};
            me.form.sortCatch = [];
            me.form.isLoading = false;
            reject(err);
          });
      });
    },
    doModuleFormSubmit() {
      var req;
      var me = this;
      // 新增 or 修改
      if (this.form.editStatus == 1) {
        // debugger
        this.form.editData["sort"] = this.form.data.length;
        this.form.editData['mainID'] = this.selectModule["rowID"];
        req = requestForm.create(this.form.editData);
      } else req = requestForm.update(this.form.editData);
      req
        .then(res => {
          if (me.form.editStatus == 1) {
            //新增
            me.form.data.push(res.data);
            me.form.sortCache.push(me.form.data.length - 1);
          } else {
            var index = me.$utils.searchJsonIndex(me.form.data, p => {
              return p.rowID == me.form.editData.rowID;
            });
            me.form.data.splice(index, 1, me.form.editData);
          }
          me.form.editStatus = 0;

          me.showInfo("保存成功", 3);
        })
        .catch(err => {
          me.$refs.modalModuleForm.buttonLoading = false;
        });
    }
  }
};
</script>