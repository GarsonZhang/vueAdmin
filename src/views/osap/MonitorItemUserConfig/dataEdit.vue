<template>
  <Modal :ref="refNames.modal" :title="title" v-model="modalStatus" width="80" :styles="{'max-width':'800px'}" :mask-closable="false"
    :loading="(true)" @on-ok="event_submit" @on-cancel="event_cancel">
    <Form :ref="refNames.form" :model="data" :rules="dataRule">
      <!-- 监察项目 -->
      <Row>
        <i-col class="gzform" span="8">
          <label class="gzform-label">{{$t('commonMonitorItemUserCfg.keys.monitorItemCode')}}</label>
          <FormItem class="gzform-control" prop="monitorItemID">
            <Select v-model="data.monitorItemID" :placeholder="$t('placeHolder.select')" @on-change="onMonitorItemChanged">
              <Option v-for="item in monitorItemData" :key="item.rowID" :value="item.rowID" :label="'【'+item.code+'】 '+ item.description">
                <Row>
                  <i-col span="8">{{item.code}}</i-col>
                  <i-col span="16">{{item.description}}</i-col>
                </Row>
              </Option>
            </Select>
          </FormItem>
        </i-col>


        <i-col class="gzform" span="8">
          <label class="gzform-label">{{$t('commonMonitorItemUserCfg.keys.typeDescription')}}</label>
          <FormItem prop="typeID">
            <Select class="gzform-control" v-model="data.typeID" :placeholder="$t('placeHolder.select')" label-in-value @on-change="onTypeChanged">
              <Option v-for="item in typeData" :key="item.value" :value="item.value" :label="item.description">
                <Row>
                  <i-col span="8">{{item.value}}</i-col>
                  <i-col span="16">{{item.description}}</i-col>
                </Row>
              </Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col class="gzform" span="24">
          <label class="gzform-label"></label>

          <FormItem class="gzform-control">
          <Checkbox v-model="flagSendEmail">{{$t('commonMonitorItemUserCfg.keys.sendEmail')}}</Checkbox>
          <Checkbox v-model="flagSendWeChat">{{$t('commonMonitorItemUserCfg.keys.sendWebChat')}}</Checkbox>
          <Checkbox v-model="flagSendAffix">{{$t('commonMonitorItemUserCfg.keys.sendAffix')}}</Checkbox>
          </FormItem>
        </i-col>
      </Row>
    </Form>
    <Row>
      <i-col class="gzform" span="8" v-for="item in monitorItemKeyData" :key="item.rowID">
        <label class="gzform-label">{{item.description}}</label>
        <Select class="gzform-control" clearable v-model="item.selectRowID" :placeholder="$t('placeHolder.select')" label-in-value
          @on-change="(v)=>{item.selectDescription=item.description+'：'+v.label;item.onChange(v.value);}">
          <Option v-for="row in item.data" :key="row.rowID" :value="row.rowID" :label="row.description">
            <Row>
              <i-col span="8">{{row.code}}</i-col>
              <i-col span="16">{{row.description}}</i-col>
            </Row>
          </Option>
        </Select>
      </i-col>
    </Row>
  </Modal>
</template>
<style lang="less" scoped>
.gzform {
  margin-top: 3px;
  .gzform-label {
    float: left;
    width: 80px;
    padding: 5px 12px 5px 0;
    text-align: right;
  }
  .gzform-control {
    display: block;
    margin-left: 80px;
    width: auto;
  }
}
</style>
<script>
import {
  requestOsapMonitorItem,
  requestOsapMonitorItemUserCfg
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
      userID: "",
      monitorItemData: [],
      typeData: [
        {
          value: 1,
          description: "责任人"
        },
        {
          value: 2,
          description: "知情人"
        }
      ],
      status: 0,
      data: {},
      monitorItemKeyData: []
    };
  },
  mixins: [Msg],
  created() {},
  mounted() {
    // 获取模块数据
    requestOsapMonitorItem
      .list(this)
      .then(res => {
        this.monitorItemData = res.data;
      })
      .catch(err => {
        this.monitorItemData = [];
      });
  },
  computed: {
    flagSendEmail: {
      get() {
        return this.data.sendMail === 1;
      },
      set(value) {
        if (value) this.data.sendMail = 1;
        else this.data.sendMail = 0;
      }
    },
    flagSendWeChat: {
      get() {
        return this.data.sendWeChat === 1;
      },
      set(value) {
        if (value) this.data.sendWeChat = 1;
        else this.data.sendWeChat = 0;
      }
    },
    flagSendAffix: {
      get() {
        return this.data.sendMailAffix === 1;
      },
      set(value) {
        if (value) this.data.sendMailAffix = 1;
        else this.data.sendMailAffix = 0;
      }
    },
    title() {
      var t = "";
      switch (this.status) {
        case 1:
          t = this.$t("commonMonitorItemUserCfg.keys.titleCreate");
          break;
        case 2:
          t = this.$t("commonMonitorItemUserCfg.keys.titleModify");
          break;
        default:
          t = this.$t("commonMonitorItemUserCfg.keys.titleView");
          break;
      }
      return t;
    },
    dataRule() {
      return {};
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
    onMonitorItemChanged(value) {
      debugger;
      if (this.$utils.isNULL(value)) this.monitorItemKeyData = [];
      else
        requestOsapMonitorItemUserCfg
          .getMonitorItemKeyDatas(this, value)
          .then(res => {
            this.initKeyData(res.data);
            this.monitorItemKeyData = res.data;
          })
          .catch(err => {
            this.monitorItemKeyData = [];
          });
    },
    initKeyData(cache) {
      if (!cache) return;

      var index=0;
      cache.forEach(item => {
        index++;
        var key=this.substringKey(index);
        //添加公共属性
        item.selectRowID = this.data['key'+key];
        item.selectDescription = this.data['key'+key+'label'];
        item.children = [];
        item.data = [];
        //添加值改变事件，更新子数据源
        item.onChange = function(id) {
          item.children.forEach(element => {
            element.updateData(id);
          });
        };
        //如果没有父级，数据源无需过滤
        if (this.$utils.isNULL(item.parentID)) {
          item.data = item.dataSource;
        } else {
          //存在父级 添加监听
          var parentItem = this.$utils.jsonSearch.search(
            cache,
            "",
            p => p.rowID === item.parentID
          );
          parentItem.children.push(item);
          //父级值改变，刷新数据源
          item.updateData = function(parentID) {
            item.selectRowID = "";
            item.selectDescription = "";
            item.data = item.dataSource.filter(
              item => item.parentID === parentID
            );
          };
        }
      });
    },
    // 新增
    showCreate(userID) {
      this.userID = userID;
      this.data = {};
      this.currentPage = "tab1";
      this.status = 1;
    },
    // 修改数据
    showModify(rowID, callBack) {
      requestOsapMonitorItemUserCfg
        .get(this, rowID)
        .then(res => {
          this.data = res.data;
          this.status = 2;
          if (callBack) callBack();
        })
        .catch(err => {
          if (callBack) callBack();
        });
    },

    // 提交
    event_submit() {
      for (var i = 0; i < 40; i++) {
        var key = this.substringKey(i + 1);
        if (this.monitorItemKeyData.length > i) {
          this.data["key" + key] = this.monitorItemKeyData[i].selectRowID;
          this.data["key" + key + "Label"] = this.monitorItemKeyData[i].selectDescription;
        } else {
          this.data["key" + key] = "";
          this.data["key" + key + "Label"] = "";
        }
      }
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
    onTypeChanged(e) {
      // debugger
      this.data.typeDescription = e.label;
    },
    substringKey(index) {
      return ("0" + index).substring(("0" + index).length - 2);
    },
    doSubmit() {
      var req;
      var me = this;
      // debugger
      // 新增 or 修改
      if (this.status == 1) {
        this.data.userID = this.userID;
        req = requestOsapMonitorItemUserCfg.create(this, this.data);
      } else req = requestOsapMonitorItemUserCfg.update(this, this.data);
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