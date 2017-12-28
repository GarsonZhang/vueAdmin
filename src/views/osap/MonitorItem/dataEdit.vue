<template>
  <Modal :ref="refNames.modal" :title="title" v-model="modalStatus" width="80" :styles="{'max-width':'800px'}" :mask-closable="false"
    :loading="(true)" @on-ok="event_submit" @on-cancel="event_cancel">
    <Tabs type="card" v-model="currentPage">
      <TabPane label="基础数据" name="tab1">
        <Form :ref="refNames.form" :model="data" :rules="dataRule" :label-width="80" style="width:400px;">
          <!-- 模块 -->
          <FormItem :label="$t('commonMonitorItem.keys.moduleDescription')" prop="moduleID">
            <!-- <i-input v-model="data.moduleID" :placeholder="$t('placeHolder.input',[$t('commonMonitorItem.keys.moduleDescription')])"></i-input> -->
            <Select v-model="data.moduleID" :placeholder="$t('placeHolder.select')">
              <Option v-for="item in dataModule" :key="item.rowID" :value="item.rowID" :label="item.description">
                <Row>
                  <i-col span="8">{{item.code}}</i-col>
                  <i-col span="16">{{item.description}}</i-col>
                </Row>
              </Option>
            </Select>
          </FormItem>
          <!-- 监察代码 -->
          <FormItem :label="$t('commonMonitorItem.keys.code')" prop="code">
            <i-input v-model="data.code" :placeholder="$t('placeHolder.input',[$t('commonMonitorItem.keys.code')])"></i-input>
          </FormItem>
          <!-- 监察描述 -->
          <FormItem :label="$t('commonMonitorItem.keys.description')" prop="description">
            <i-input v-model="data.description" :placeholder="$t('placeHolder.input',[$t('commonMonitorItem.keys.description')])"></i-input>
          </FormItem>
          <!-- 监察类型 -->
          <FormItem :label="$t('commonMonitorItem.keys.typeDescription')" prop="typeID">
            <!-- <i-input v-model="data.typeID" :placeholder="$t('placeHolder.input',[$t('commonMonitorItem.keys.typeDescription')])"></i-input> 
                -->
            <Select v-model="data.typeID" :placeholder="$t('placeHolder.select')">
              <Option v-for="item in dataMonitorType" :key="item.rowID" :value="item.rowID" :label="item.description">
                <Row>
                  <i-col span="8">{{item.code}}</i-col>
                  <i-col span="16">{{item.description}}</i-col>
                </Row>
              </Option>
            </Select>
          </FormItem>
          <!-- 扣分 -->
          <FormItem :label="$t('commonMonitorItem.keys.score')" prop="score">
            <i-input v-model="data.score" :placeholder="$t('placeHolder.input',[$t('commonMonitorItem.keys.score')])"></i-input>
          </FormItem>
          <!-- 说明 -->
          <FormItem :label="$t('commonMonitorItem.keys.remark')" prop="remark">
            <i-input v-model="data.remark" :placeholder="$t('placeHolder.input',[$t('commonMonitorItem.keys.remark')])" style="word-break: break-all;"
              type="textarea" :autosize="{minRows: 2,maxRows: 5}"></i-input>
          </FormItem>
        </Form>
      </TabPane>
      <TabPane label="项目关键字" name="tab2">
        <Row>
          <i-col span="6" v-for="(key,index) in keyCache" :key="index">
            <label style="width: 80px;">关键字{{substringKey(index+1)}}</label>
                  <label style="width: 80px;">{{key.description}}</label>
            <Select clearable v-model="key.rowID" :placeholder="$t('placeHolder.select')" label-in-value @on-change="(v)=>{key.description=v.label;}">
              <Option v-for="item in dataKey" :key="item.rowID" :value="item.rowID" :label="item.description">
                <Row>
                  <i-col span="8">{{item.code}}</i-col>
                  <i-col span="16">{{item.description}}</i-col>
                </Row>
              </Option>
            </Select>
          </i-col>
           <i-col span="6">
                 <label style="width: 80px;">&nbsp;</label>
                <Button type="dashed" long @click="addKey" icon="plus-round">Add item</Button>
           </i-col>
        </Row>
      </TabPane>
      <TabPane label="数据列设置" name="tab3">
        <label>每一行代表一列</label>
          <i-input v-model="viewHeader"
              type="textarea" :autosize="{minRows: 10,maxRows: 12}"></i-input>
      </TabPane>
    </Tabs>


  </Modal>
</template>
<style lang="less" scoped>

</style>
<script>
import {
  requestOsapMonitorItem,
  requestOsapCommonDataDict,
  requestOsapCommonDict
} from "../../../libs/request";
import Msg from "../../../mixins/msg";
export default {
  name: "DataEdit",
  data() {
    return {
      refNames: {
        modal: "modal",
        form: "form"
      },
      status: 0,
      data: {},
      request: {},
      dataModule: [],
      dataMonitorType: [],
      dataKey: [],
      keyCache: [],
      currentPage: "tab1",
      viewHeader: ""
    };
  },
  mixins: [Msg],
  created() {
    this.request = requestOsapMonitorItem;
  },
  mounted() {
    // 获取模块数据
    requestOsapCommonDataDict
      .dataModule(this)
      .then(res => {
        this.dataModule = res.data;
      })
      .catch(err => {
        this.dataModule = [];
      });
    // 获取监察类型数据
    requestOsapCommonDataDict
      .dataMonitorType(this)
      .then(res => {
        this.dataMonitorType = res.data;
      })
      .catch(err => {
        this.dataMonitorType = [];
      });
    requestOsapCommonDict
      .list(this)
      .then(res => {
        // debugger
        this.dataKey = res.data;
      })
      .catch(err => {
        this.dataKey = [];
      });
  },
  computed: {
    title() {
      var t = "";
      switch (this.status) {
        case 1:
          t = this.$t("commonMonitorItem.keys.titleCreate");
          break;
        case 2:
          t = this.$t("commonMonitorItem.keys.titleModify");
          break;
        default:
          t = this.$t("commonMonitorItem.keys.titleView");
          break;
      }
      return t;
    },
    dataRule() {
      return {
        moduleID: [
          {
            required: true,
            message: this.$t("validateErr.empty", [
              this.$t("commonMonitorItem.keys.moduleDescription")
            ]),
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: this.$t("validateErr.empty", [
              this.$t("commonMonitorItem.keys.code")
            ]),
            trigger: "blur"
          }
        ],
        description: [
          {
            required: true,
            message: this.$t("validateErr.empty", [
              this.$t("commonMonitorItem.keys.description")
            ]),
            trigger: "blur"
          },
          {
            type: "string",
            min: 2,
            max: 6,
            message: this.$t("validateErr.lengthBetween", [
              this.$t("commonMonitorItem.keys.description"),
              2,
              6
            ]),
            trigger: "blur"
          }
        ],
        typeID: [
          {
            required: true,
            message: this.$t("validateErr.empty", [
              this.$t("commonMonitorItem.keys.typeDescription")
            ]),
            trigger: "blur"
          }
        ]
      };
    },
    modalStatus: {
      get() {
        return this.status > 0;
      },
      set(value) {
        if (value == false) this.status = 0;
      }
    }
  },
  methods: {
    // 新增
    showCreate() {
      this.data = {};
      this.currentPage = "tab1";
      this.status = 1;
    },
    // 修改数据
    showModify(rowID, callBack) {
      this.request
        .get(this, rowID)
        .then(res => {
          this.data = res.data;
          this.updateKeyCache();
          this.updateViewHeader();
          this.currentPage = "tab1";
          this.status = 2;
          if (callBack) callBack();
        })
        .catch(err => {
          if (callBack) callBack();
        });
    },
    addKey() {
      this.keyCache.push({
        rowID: "",
        description: ""
      });
    },
    substringKey(index) {
      return ("0" + index).substring(("0" + index).length - 2);
    },
    updateKeyCache() {
      this.keyCache = [];
      for (let i = 1; i <= 40; i++) {
        var key = ("0" + i).substring(("0" + i).length - 2);
        if (this.$utils.isNULL(this.data["key" + key])) break;
        this.keyCache.push({
          rowID: this.data["key" + key],
          description: this.data["key" + key + "Description"]
        });
      }
    },
    applayKeyCache() {
      for (let i = 1; i <= 40; i++) {
        var key = ("0" + i).substring(("0" + i).length - 2);
        if (this.keyCache.length >= i) {
          this.data["key" + key] = this.keyCache[i - 1].rowID;
          this.data["key" + key + "Description"] = this.keyCache[
            i - 1
          ].description;
        } else {
          this.data["key" + key] = "";
          this.data["key" + key + "Description"] = "";
        }
      }
    },
    updateViewHeader() {
      this.viewHeader = "";
      if (this.data.headers) {
        this.data.headers.forEach(element => {
          this.viewHeader += element + "\n";
        });
      }
    },
    applyViewHeader() {
      this.data.headers = [];
      var me = this;
      this.viewHeader.split("\n").forEach(function(v) {
        if (!me.$utils.isNULL(v)) {
          me.data.headers.push(v);
        }
      });
    },
    // 提交
    event_submit() {
      this.applayKeyCache();
      this.applyViewHeader();
      this.$refs[this.refNames.form].validate(valid => {
        if (valid) {
          this.doSubmit();
        } else {
          this.showError(this.$t("failValidateForm"));
          this.$refs[this.refNames.modal].buttonLoading = false;
        }
      });
    },
    // 取消
    event_cancel() {
      this.data = {};
      this.status = 0;
    },
    doSubmit() {
      var req;
      var me = this;
      // 新增 or 修改
      debugger;
      if (this.status == 1) {
        req = this.request.create(this, this.data);
      } else req = this.request.update(this, this.data);
      req
        .then(res => {
          var result;
          if (me.status === 1) this.$emit("onCreate", res.data);
          else this.$emit("onModify", res.data);
          me.status = 0;
          me.showInfo(this.$t("saveSuccess"), 3);
        })
        .catch(err => {
          me.$refs[this.refNames.modal].buttonLoading = false;
        });
    }
  }
};
</script>