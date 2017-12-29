<template>
  <Modal :ref="refNames.modal" :title="title" v-model="modalStatus" width="80" :styles="{'max-width':'800px'}" :mask-closable="false"
    :loading="(true)" @on-ok="event_submit" @on-cancel="event_cancel">
     <Form :ref="refNames.form" :model="data" :rules="dataRule" :label-width="80" style="width:400px;">
          <!-- 监察项目 -->
          <FormItem :label="$t('commonMonitorItemUserCfg.keys.monitorItemCode')" prop="monitorItemID">
            <Select v-model="data.monitorItemID" :placeholder="$t('placeHolder.select')">
              <Option v-for="item in monitorItemData" :key="item.rowID" :value="item.rowID" :label="item.description">
                <Row>
                  <i-col span="8">{{item.code}}</i-col>
                  <i-col span="16">{{item.description}}</i-col>
                </Row>
              </Option>
            </Select>
          </FormItem>
          <!-- 类型 -->
          <FormItem :label="$t('commonMonitorItemUserCfg.keys.typeDescription')" prop="typeID">
            <Select v-model="data.typeID" :placeholder="$t('placeHolder.select')">
              <Option v-for="item in typeData" :key="item.value" :value="item.value" :label="item.description">
                <Row>
                  <i-col span="8">{{item.value}}</i-col>
                  <i-col span="16">{{item.description}}</i-col>
                </Row>
              </Option>
            </Select>
          </FormItem>
           <FormItem label="发送邮件" prop="sendMail">
            <i-input v-model="data.sendMail"></i-input>
          </FormItem>
             <FormItem label="发送微信" prop="sendWeChat">
            <i-input v-model="data.sendWeChat"></i-input>
          </FormItem>
             <FormItem label="发送附件" prop="sendMailAffix">
            <i-input v-model="data.sendMailAffix"></i-input>
          </FormItem>
        </Form>
  </Modal>
</template>
<style lang="less" scoped>

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
        { value: 1, description: "责任人" },
        { value: 2, description: "知情人" }
      ],
      status: 0,
      data: {}
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
      debugger
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