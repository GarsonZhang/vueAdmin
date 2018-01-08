<template>
    <div class="content">
        <gz-panel>
            <div slot="top">
                <gz-button v-if="$utils.isNULL(data.appUser)" icon="refresh" @click="doApply" text="审核" />
                      <gz-button icon="refresh" @click="doClose" text="close" />
            </div>
            <div slot="main" class="main">
                <Form :ref="refNames.form" :model="data" :rules="dataRule">
                    <!-- 监察项目 -->
                    <Row>
                        <i-col class="gzform" span="8">
                            <label class="gzform-label">监察代码</label>
                            <FormItem class="gzform-control" prop="monitorItemID">
                                <Select v-model="data.monitorItemID" :placeholder="$t('placeHolder.select')" disabled @on-change="onMonitorItemChanged">
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
                            <label class="gzform-label">异常来源</label>
                            <FormItem class="gzform-control" prop="source">
                                <i-input readonly v-model="data.source" :placeholder="$t('placeHolder.input')"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col class="gzform" span="8">
                            <label class="gzform-label">简要说明</label>
                            <FormItem class="gzform-control" prop="description">
                                <i-input readonly v-model="data.description" :placeholder="$t('placeHolder.input')"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col class="gzform" span="24">
                            <label class="gzform-label">详细信息</label>
                            <FormItem class="gzform-control" prop="content">
                                <i-input readonly v-model="data.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col class="gzform" span="8" v-for="item in monitorItemKeyData" :key="item.rowID">
                            <label class="gzform-label">{{item.description}}</label>
                            <Select class="gzform-control" disabled v-model="item.selectRowID" :placeholder="$t('placeHolder.select')" label-in-value
                                @on-change="(v)=>{item.selectDescription=v.label;item.onChange(v.value);}">
                                <Option v-for="row in item.data" :key="row.rowID" :value="row.rowID" :label="row.description">
                                    <Row>
                                        <i-col span="8">{{row.code}}</i-col>
                                        <i-col span="16">{{row.description}}</i-col>
                                    </Row>
                                </Option>
                            </Select>
                        </i-col>
                    </Row>
                    <Row>
                         <i-col class="gzform" span="6">
                            <label class="gzform-label">创建人</label>
                            <FormItem class="gzform-control">
                                <i-input readonly v-model="data.createUserName"></i-input>
                            </FormItem>
                        </i-col>
                           <i-col class="gzform" span="6">
                            <label class="gzform-label">创建时间</label>
                            <FormItem class="gzform-control">
                                <i-input readonly v-model="data.createTime"></i-input>
                            </FormItem>
                        </i-col>
                         <i-col class="gzform" span="6">
                            <label class="gzform-label">审核人</label>
                            <FormItem class="gzform-control">
                                <i-input readonly v-model="data.appUserName"></i-input>
                            </FormItem>
                        </i-col>
                           <i-col class="gzform" span="6">
                            <label class="gzform-label">审核时间</label>
                            <FormItem class="gzform-control">
                                <i-input readonly v-model="data.appTime"></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                </Form>
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
import {
  requestOsapAbnormalSubmit,
  requestOsapMonitorItem,
  requestOsapMonitorItemUserCfg
} from "../../../libs/request";

import Msg from "../../../mixins/msg";
export default {
  name: "osap-abnormalsubmit-view",
  data() {
    return {
      data: {},
      monitorItemData: [],
      monitorItemKeyData: [],
      refNames: {
        form: "form"
      },
      dataRule: {}
    };
  },
  mixins: [Msg],
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
  activated() {
    // debugger
    if (this.data.rowID === this.$route.params.id) return;
    this.data = {};
    requestOsapAbnormalSubmit
      .get(this, this.$route.params.id)
      .then(res => {
        console.log('获取数据成功')
        this.data = res.data;
      })
      .catch(err => {
        this.data = {};
      });
  },
  methods: {
    doApply(btn) {
      if (this.data.rowID) {
        requestOsapAbnormalSubmit
          .apply(this, this.data.rowID)
          .then(res => {
            btn.loading = false;
            this.showInfo("审核成功");
          })
          .catch(err => {
            // this.showError("保存失败：<br />" + err);
            btn.loading = false;
          });
      } else {
        this.showError("空数据无法审核");
      }
    },
    doClose() {
      debugger
      this.$utils.closePage(this.$route);
    },
    onMonitorItemChanged(value) {
      //   debugger;
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
    substringKey(index) {
      return ("0" + index).substring(("0" + index).length - 2);
    },
    initKeyData(cache) {
      if (!cache) return;

      var index = 0;
      cache.forEach(item => {
        index++;
        var key = this.substringKey(index);
        //添加公共属性
        item.selectRowID = this.data["key" + key];
        item.selectDescription = this.data["key" + key + "label"];
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
    }
  }
};
</script>
