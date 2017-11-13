<template>
  <Cascader :data="data" @on-change="selected" v-model="currentValue"  change-on-select></Cascader>
</template>
<style lang="less" scoped>

</style>
<script>
import { ReqCommonDataCompany } from "../../libs/request";
export default {
  name: "SelectCompany",
  data() {
    return {
      data: [],
      currentValue: []
    };
  },
  props: {
    value: String
  },
  created() {
    this.refreshData();
  },
  methods: {
    refreshData() {
      ReqCommonDataCompany.list().then(
        res => {
          this.data = this.convert2Data(res.data);
          // debugger;
        },
        err => {
          this.data = {};
        }
      );
    },
    convert2Data(lst) {
      var v = [];
      lst.forEach(function(element) {
        var item = {
          value: element.rowID,
          label: element.companyName_chs,
          levelID: element.levelID,
          parentID: element.parentFullID,
          parentName:element.parentFullName
        };
        if (element.children)
          item.children = this.convert2Data(element.children);
        v.push(item);
      }, this);
      return v;
    },
    selected(a, b) {
      // debugger;
      if (a.length > 0) {
        this.$emit("input", a[a.length - 1]);
        this.$emit("onSelected", a[a.length - 1], b[b.length - 1]);
      } else {
        this.$emit("input", "");
        this.$emit("onSelected");
      }
    }
  },
  watch: {
    value(val) {
      var v = [];
      if (!this.$utils.isNULL(val)) v.push(val);
      this.currentValue = v;
    }
  }
};
</script>


