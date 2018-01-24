<template>
    <div>
        <Table size="small" :ref="refNames.dataTable" :loading="isLoading" :columns="columns" :data="AbnormalDataApp" @on-row-dblclick="viewRow"  border></Table>
        <!-- <Row>
            <i-col span="6">监察代码</i-col>
            <i-col span="12">描述</i-col>
            <i-col span="6">创建人</i-col>
        </Row>
        <Row v-for="item in AbnormalDataApp" :key="item.rowID" @click.native="doApp(item)">
            <i-col span="6">{{item.code}}</i-col>
            <i-col span="12">{{item.description}}</i-col>
            <i-col span="6">{{item.createUserName}}</i-col>
        </Row> -->
    </div>
</template>
<style lang="less" >
.GZTableCreateTime {
  width: 150px;
  .ivu-table-cell {
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>

<script>
import { requestOsapAbnormalSubmit } from "../../libs/request";
export default {
  name: "osapCAbnormalAppList",
  data() {
    return {
      isLoading: false,
      columns: [
        {
          title: "序号",
          type: "index",
          width: 50,
          align: "center",
          className: "table-cell-index"
        },
        {
          title: "监察代码",
          key: "code",
          width: 100
        },
        {
          title: "描述",
          key: "description"
        },
        {
          title: "创建人",
          key: "createUserName",
          width: 70
        },
        {
          title: "创建时间",
          key: "createTime",
          className: "GZTableCreateTime"
        }
      ],
      refNames: {
        dataTable: "dataTable"
      },
      AbnormalDataApp: []
    };
  },
  mounted() {
    this.AbnormalDataApp = [];
    this.isLoading=true
    requestOsapAbnormalSubmit
      .waitelist(this)
      .then(res => {
        this.AbnormalDataApp = res.data;
         this.isLoading=false
      })
      .catch(err => {
        this.AbnormalDataApp = [];
      });
  },
  methods: {
    refresh(){
        this.AbnormalDataApp = [];
        this.isLoading=true
        requestOsapAbnormalSubmit
            .waitelist(this)
            .then(res => {
                this.AbnormalDataApp = res.data;
                this.isLoading=false
            })
            .catch(err => {
                this.AbnormalDataApp = [];
            });
    },
    viewRow(row, index) {
      this.$refs[this.refNames.dataTable].handleMouseOut(index);
      this.$router.push({ path: "/osap/abnormal/flow/" + row.rowID });
    }
  }
};
</script>
