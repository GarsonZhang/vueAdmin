<template>
   <Modal class-name="vertical-center-modal dialog-modal user" :ref="refNames_modal" title="添加成员" v-model="modalStatus" width=80 :styles="{'max-width':'800px'}"
      :mask-closable="false" :loading="(true)" @on-ok="event_submit" @on-cancel="event_cancel">
      <div class="nav">
          <div class="tools">
              <SelectCompany @onSelected="onSelected" ></SelectCompany>
          </div>
          <div>value:{{testValue}}</div>
          <div>
            <gz-tree-select
              :treeData="testData"
              :treeProps="testProps"
              v-model="testValue"
              :multiple="false"
              :dropDownMaxHeight="500"
              placeholder="请选择部门"
            >
          </gz-tree-select>
          </div>
      </div>
      <div class="main">
        abcdefghigklmnopqrstuvwxyzabcdefghigklmnopqrstuvwxyzabcdefghigklmnopqrstuvwxyzabcdefghigklmnopqrstuvwxyzabcdefghigklmnopqrstuvwxyzabcdefghigklmnopqrstuvwxyzabcdefghigklmnopqrstuvwxyzabcdefghigklmnopqrstuvwxyzabcdefghigklmnopqrstuvwxyzabcdefghigklmnopqrstuvwxyzabcdefghigklmnopqrstuvwxyzabcdefghigklmnopqrstuvwxyzabcdefghigklmnopqrstuvwxyzabcdefghigklmnopqrstuvwxyz
      </div>
    </Modal>
</template>
<style lang="less" >
.user {
  .ivu-modal-body {
    padding: 0px;
  }
}
</style>
<style lang="less" scoped>
.nav,
.main {
  height: 100%;
}
.nav {
  width: 200px;
  float: left;
}
.main {
  overflow: hidden;
  background-color: green;
}
</style>

<script>
import Msg from "../../mixins/msg";
import SelectCompany from "./selectCompany";
import { ReqCommonDataCompany } from "../../libs/request";
export default {
  name: "ChooseUser",
  mixins: [Msg],
  components: { SelectCompany},
  data() {
    return {
      testValue:'',
      testData:[],
      testProps:{
            label: "label",
            children: "children",
            level:"deep",
            value:"value"
        },
      refNames_modal: "refNames_modal",
      data: [],
      modalStatus: false,
      objectID: "",
      category: 0
    };
  },
  
  props: {},
  mounted() {
    this.refreshData();
  },

  methods: {
     refreshData() {
      // debugger
      ReqCommonDataCompany.list(this).then(
        res => {
          // debugger
          this.testData = this.convert2Data(1,res.data);
          // debugger;
        },
        err => {
          this.data = {};
        }
      );
    },
    convert2Data(deep,lst) {
      var v = [];
      lst.forEach(function(element) {
        var item = {
          value: element.rowID,
          label: element.companyName_chs,
          levelID: element.levelID,
          deep:deep,
          parentID: element.parentFullID,
          parentName:element.parentFullName
        };
        if (element.children)
          item.children = this.convert2Data(deep+1,element.children);
        v.push(item);
      }, this);
      return v;
    },
    onSelected(value, e) {
      var me = this;
      console.dir(value);
      console.dir(e);
    },
    show() {
      this.modalStatus = true;
    },
    updateData(_category, _objectID) {},
    event_submit() {},
    event_cancel() {}
  },

  
  watch: {}
};
</script>

