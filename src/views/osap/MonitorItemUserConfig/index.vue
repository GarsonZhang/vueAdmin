<template>
  <div class="content">
    <div class="nav border">
      <gz-panel>
        <div slot="top">
          <SelectCompany @onSelected="onCompanySelected" v-model="companyID" :width="200"></SelectCompany>
          <SelectDept :companyID="companyID" @onSelected="onDeptSelected" v-model="deptID"></SelectDept>
        </div>
        <div slot="main">
          <div class="selectItem" v-for="item in filterUserList" @click.stop="selectUser(item)" :key="item.userID" :class="{'active':item.rowID===currentUser.rowID}">
            <p>{{item.companyName}}</p>
            <p>{{item.deptName}} 【{{item.userName}}】</p>
          </div>
        </div>
      </gz-panel>
    </div>
    <div class="main">
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
          <Table :ref="refNames.dataTable" size="small" :loading="isLoading" :columns="columns" :data="data" highlight-row border></Table>
        </div>
      </gz-panel>
      <data-edit :ref="refNames.form" @onCreate="onCreate" @onModify="onModify"></data-edit>
    </div>
  </div>
</template>
<style lang="less" scoped>
.nav,
.main {
  height: 100%;
}

.nav {
  width: 200px;
  float: left;
  position: relative;
}

.main {
  overflow: hidden; // background-color: green;
  position: relative;
}

.selectItem {
  user-select: none;
  position: relative;
  /* width: 160px; */
  height: 44px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: auto;
  margin: 10px;
  padding: 5px 0 0 10px;
  &.active {
    border: 2px solid #ff5d5b; // padding: 0 0px;
    background: url(../../../assets/duihao_03.png) right top no-repeat;
  }
}
</style>

<script>
import {
  requestUser,
  requestOsapMonitorItemUserCfg
} from "../../../libs/request";
import SelectCompany from "../../org/selectCompany";
import SelectDept from "../../org/selectDept";
import Authorize from "../../../mixins/authorize";
import DataEdit from "./dataEdit.vue";
export default {
  data() {
    name:'osap-monitorItemUserconfig'
    return {
      isLoading: false,
      companyID: "",
      deptID: "",
      userData: [],
      queryStr: "",
      // filterUserList: [],
      currentUser: {},
      filterType: 0,
      data: [],
      refNames: {
        dataTable: "dataTable",
        form: "form"
      }
    };
  },
  mixins: [Authorize],
  components: {
    SelectCompany,
    SelectDept,
    DataEdit
  },
  watch: {
    companyID(val) {
      this.filterType = 0;
    },
    deptID(val) {
      this.filterType = 0;
    }
  },
  computed: {
    filterUserList() {
      switch (this.filterType) {
        case 0:
          {
            if (!this.$utils.isNULL(this.deptID))
              return this.userData.filter(item => item.deptID === this.deptID);
            else if (!this.$utils.isNULL(this.companyID))
              return this.userData.filter(
                item => item.companyID === this.companyID
              );
            else return this.userData;
          }
          break;
        case 1: {
          return this.userData.filter(
            item =>
              item.account.indexOf(_this.queryStr) > -1 ||
              item.userName.indexOf(_this.queryStr) > -1
          );
        }
        default:
          break;
      }
    },
    columns() {
      return [
        {
          //序号
          title: this.$t("commonMonitorItemUserCfg.keys.index"),
          type: "index",
          width: 50,
          align: "center",
          className: "table-cell-index",
          fixed: "left"
        },
        {
          //监察代码
          title: this.$t("commonMonitorItemUserCfg.keys.monitorItemCode"),
          key: "monitorItemCode",
          width: 100,
          fixed: "left"
        },
        {
          //监察描述
          title: this.$t(
            "commonMonitorItemUserCfg.keys.monitorItemDescription"
          ),
          key: "monitorItemDescription",
          width: 150,
          fixed: "left"
        },
        {
          //类型
          title: this.$t("commonMonitorItemUserCfg.keys.typeDescription"),
          key: "typeDescription",
          width: 80,
          fixed: "left"
        },
        {
          //发送邮件
          title: this.$t("commonMonitorItemUserCfg.keys.sendEmail"),
          key: "sendMail",
          width: 80,
          // fixed: "left",
          align: "center",
          render: (h, params) => {
            return h("Icon", {
              props: {
                size: "18",
                type:
                  params.row.sendMail === 1
                    ? "ios-checkmark"
                    : "ios-circle-outline"
              }
            });
          }
        },
        {
          //发送微信
          title: this.$t("commonMonitorItemUserCfg.keys.sendWebChat"),
          key: "sendWeChat",
          width: 80,
          // fixed: "left",
          align: "center",
          render: (h, params) => {
            return h("Icon", {
              props: {
                size: "18",
                type:
                  params.row.sendWeChat === 1
                    ? "ios-checkmark"
                    : "ios-circle-outline"
              }
            });
          }
        },
        {
          //发送附件
          title: this.$t("commonMonitorItemUserCfg.keys.sendAffix"),
          key: "sendMailAffix",
          width: 80,
          // fixed: "left",
          align: "center",
          render: (h, params) => {
            return h("Icon", {
              props: {
                size: "18",
                type:
                  params.row.sendMailAffix === 1
                    ? "ios-checkmark"
                    : "ios-circle-outline"
              }
            });
          }
        },
        {
          title: this.$t("commonMonitorItemUserCfg.keys.columnKey") + "01",
          key: "key01Label",
          width: 120
        },
        {
          title: this.$t("commonMonitorItemUserCfg.keys.columnKey") + "02",
          key: "key02Label",
          width: 120
        },
        {
          title: this.$t("commonMonitorItemUserCfg.keys.columnKey") + "03",
          key: "key03Label",
          width: 120
        },
        {
          title: this.$t("commonMonitorItemUserCfg.keys.columnKey") + "04",
          key: "key04Label",
          width: 120
        },
        {
          title: this.$t("commonMonitorItemUserCfg.keys.columnKey") + "05",
          key: "key05Label",
          width: 120
        },
        {
          title: this.$t("commonMonitorItemUserCfg.keys.columnKey") + "06",
          key: "key06Label",
          width: 120
        },
        {
          title: this.$t("commonMonitorItemUserCfg.keys.columnKey") + "07",
          key: "key07Label",
          width: 120
        },
        {
          title: this.$t("commonMonitorItemUserCfg.keys.columnKey") + "08",
          key: "key08Label",
          width: 120
        },
        {
          title: this.$t("commonMonitorItemUserCfg.keys.columnKey") + "09",
          key: "key09Label",
          width: 120
        },
        {
          title: this.$t("commonMonitorItemUserCfg.keys.columnKey") + "10",
          key: "key10Label",
          width: 120
        },
        {
          title: this.$t("commonMonitorItemUserCfg.keys.columnKey") + "11",
          key: "key11Label",
          width: 120
        },
        {
          title: this.$t("commonMonitorItemUserCfg.keys.columnKey") + "12",
          key: "key12Label",
          width: 120
        },
        {
          title: this.$t("commonMonitorItemUserCfg.keys.columnKey") + "13",
          key: "key13Label",
          width: 120
        },
        {
          title: this.$t("commonMonitorItemUserCfg.keys.columnKey") + "14",
          key: "key14Label",
          width: 120
        },
        {
          title: this.$t("commonMonitorItemUserCfg.keys.columnKey") + "15",
          key: "key15Label",
          width: 120
        },
        {
          title: this.$t("commonMonitorItemUserCfg.keys.columnKey") + "16",
          key: "key16Label",
          width: 120
        },
        {
          title: this.$t("commonMonitorItemUserCfg.keys.columnKey") + "17",
          key: "key17Label",
          width: 120
        },
        {
          title: this.$t("commonMonitorItemUserCfg.keys.columnKey") + "18",
          key: "key18Label",
          width: 120
        },
        {
          title: this.$t("commonMonitorItemUserCfg.keys.columnKey") + "19",
          key: "key19Label",
          width: 120
        },
        {
          title: this.$t("commonMonitorItemUserCfg.keys.columnKey") + "20",
          key: "key20Label",
          width: 120
        }
      ];
    }
  },
  mounted() {
    requestUser
      .list(this, 1, -1)
      .then(res => {
        this.userData = res.data.data;
      })
      .catch(err => {
        this.userData = [];
      });
  },
  methods: {
    event_buttonRefreshClick(e) {
      this.loadData(() => {
        e.loading = false;
      });
    },
    event_buttonAddClick(btn) {
      btn.loading = false;
      this.$refs[this.refNames.form].showCreate(this.currentUser.rowID);
    },
    event_buttonEditClick(btn) {
      var obj = this.getSelect();
      if (!obj) return;
      this.$refs[this.refNames.form].showModify(obj.rowID, () => {
        btn.loading = false;
      });
    },
    event_buttonDeleteClick(btn) {
      var obj = this.getSelect();
      if (!obj) return;
      requestOsapMonitorItemUserCfg.delete(this, obj.rowID).then(res => {
        var index = this.$utils.searchJsonIndex(this.data, p => {
          return p.rowID == v.rowID;
        });
        this.data.splice(index, 1);
        this.showInfo(this.$t("deleteSuccess"));
        btn.loading = false;
      });
    },
    loadData(callback) {
      if (this.currentUser.rowID) {
        requestOsapMonitorItemUserCfg
          .list(this, this.currentUser.rowID)
          .then(res => {
            this.data = res.data;
            if (callback) callback();
          })
          .catch(err => {
            this.data = [];
            if (callback) callback();
          });
      } else {
        if (callback) callback();
      }
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
    onCompanySelected(value, e) {
      //   debugger;
      // this.filterUserList = this.userData.filter(
      //   item => item.companyID === this.companyID
      // );
      //   var me = this;
      //   filterUserList = this.userData.filter(function(item) {
      //     return item.deptID === me.companyID;
      //   });
    },
    onDeptSelected(value, e) {
      //   debugger;
      // this.filterUserList = this.userData.filter(
      //   item => item.deptID === this.deptID
      // );
    },
    selectUser(user) {
      // debugger
      this.currentUser = user;
      this.loadData();
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
