<template>
    <div class="content">
        <div class="nav border">
            <gz-panel >
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
            <h1>这里是table数据</h1>
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
    border: 2px solid #ff5d5b;
    // padding: 0 0px;
    background: url(../../../assets/duihao_03.png) right top no-repeat;
  }
}
</style>

<script>
import { requestUser } from "../../../libs/request";
import SelectCompany from "../../org/selectCompany";
import SelectDept from "../../org/selectDept";
export default {
  data() {
    return {
      companyID: "",
      deptID: "",
      userData: [],
      queryStr: "",
      // filterUserList: [],
      currentUser: {},
      filterType: 0
    };
  },
  components: {
    SelectCompany,
    SelectDept
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
    }
  }
};
</script>
