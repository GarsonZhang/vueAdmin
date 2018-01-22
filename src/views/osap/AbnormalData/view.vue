<template>
    <div class="content">
        <gz-panel>
            <div slot="top">
                <Row style="padding-right:5px;">
                    <i-col class="gzform" span="8">
                        <label class="gzform-label">时间</label>
                        <i-input class="gzform-control" readonly v-model="data.createTime"></i-input>
                    </i-col>
                    <i-col class="gzform" span="8">
                        <label class="gzform-label">模块</label>
                        <i-input class="gzform-control" readonly v-model="data.moduleName"></i-input>
                    </i-col>
                    <i-col class="gzform" span="8">
                        <label class="gzform-label">类型</label>
                        <i-input class="gzform-control" readonly v-model="data.typeName"></i-input>
                    </i-col>
                    <i-col class="gzform" span="8">
                        <label class="gzform-label">扣分</label>
                        <i-input class="gzform-control" readonly v-model="data.score"></i-input>
                    </i-col>
                    <i-col class="gzform" span="8">
                        <label class="gzform-label">监察代码</label>
                        <i-input class="gzform-control" readonly v-model="data.monitorItemCode"></i-input>
                    </i-col>
                    <i-col class="gzform" span="8">
                        <label class="gzform-label">监察名称</label>
                        <i-input class="gzform-control" readonly v-model="data.monitorItemDescription"></i-input>
                    </i-col>
                    <i-col class="gzform" span="8">
                        <label class="gzform-label">描述</label>
                        <i-input class="gzform-control" readonly v-model="data.monitorItemRemark"></i-input>
                    </i-col>

                </Row>
            </div>
            <div slot="main" class="main">
                <Table size="small" :loading="isLoading" :columns="columns" :data="detail" highlight-row border></Table>
            </div>

        </gz-panel>
    </div>
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

.main {
  padding-left: 5px;
  padding-right: 5px;
}
</style>
<script>
import { requestOsapAbnormalData } from "../../../libs/request";

import Msg from "../../../mixins/msg";
export default {
  name: "osap-abnormalsubmit-view",
  data() {
    return {
      data: {},
      detail: [],
      isLoading: false
    };
  },
  mixins: [Msg],
  mounted() {},
  computed: {
    columns() {
      var result = [
        {
          //序号
          title: "序号",
          type: "index",
          width: 50,
          align: "center",
          className: "table-cell-index"
        }
      ];
      if (this.data && this.data.headers) {
        var index = 1;
        this.data.headers.forEach(element => {
          result.push({
            //模块
            title: element,
            key: "field" + this.substringKey(index++)
          });
        });
      }
      return result;
    }
  },
  created () {
    debugger
  },
  activated() {
    // debugger
    if (this.data.rowID === this.$route.params.id) return;
    this.data = {};
    this.isLoading = true;
    if (this.$route.params.uid) {
      requestOsapAbnormalData
        .viewUser(this, this.$route.params.id,this.$route.params.uid)
        .then(res => {
          // debugger
          console.log("获取数据成功");
          this.data = res.data.main;
          this.detail = res.data.detail;
          this.isLoading = false;
        })
        .catch(err => {
          this.data = {};
          this.isLoading = false;
        });
    } else {
      requestOsapAbnormalData
        .view(this, this.$route.params.id)
        .then(res => {
          // debugger
          console.log("获取数据成功");
          this.data = res.data.main;
          this.detail = res.data.detail;
          this.isLoading = false;
        })
        .catch(err => {
          this.data = {};
          this.isLoading = false;
        });
    }
  },
  methods: {
    substringKey(index) {
      return ("0" + index).substring(("0" + index).length - 2);
    }
  }
};
</script>
