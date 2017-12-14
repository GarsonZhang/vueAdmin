<template>
     <Poptip placement="bottom-start" class="gz"  v-model="visible">
            <Input type="text"
            class="arrow"
            :class="{'expanded':visible}"
                 v-if="!this.multiple"
                    :readonly="!allowQuery"
                    v-model="currentLabel"
                    :placeholder="placetext"
                    icon="arrow-down-b"
                    @input="handleFilter"
                    @on-blur="handleAutoComplete">
                    </Input>
        <div slot="content" :style="contextClass">
           <gz-tree ref="tree" :treeData="treeData" :treeProps="treeProps" :query="query" v-model="currentValue" :multiple="multiple" @on-select="onSelect"></gz-tree>
        </div>
    </Poptip>
</template>
<style lang="less">
.gz {
  .ivu-poptip-body {
    padding: 3px;
  }
  .arrow {
    i {
      transition: transform 0.3s ease-in-out;
    }
  }
  .expanded {
    i {
      transform: rotate(180deg);
    }
  }
}
</style>

<style lang="less" scoped>

</style>

<script>
import gzTree from "../gz-tree";
export default {
  name: "gzTreeSelect",
  components: {
    gzTree
  },
  props: {
    placetext: {
      type: String,
      default: ""
    },
    allowQuery: false,
    treeData: {
      type: Array,
      default: []
    },
    treeProps: {
      type: Object,
      default: {
        label: "label",
        children: "children"
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    dropDownMaxHeight: 0,
    dropDownHeight: 0,
    value: ""
  },
  watch: {
    value(val) {
      this.currentValue = val;
    }
  },
  data() {
    return {
      query: "",
      isQuery: false,
      visible: false,
      currentValue: "",
      currentLabel: "",
      currentNode: {}
    };
  },
  computed: {
    contextClass() {
      //在这计算就好了   直接返回 ‘max-height：200px’ 这种格式
      var c = {};
      if (this.dropDownMaxHeight > 0)
        c["max-height"] = this.dropDownMaxHeight + "px";
      if (this.dropDownHeight > 0) c["height"] = this.dropDownHeight + "px";
      return c;
    }
  },
  methods: {
    handleFilter() {
      if (!this.visible) this.visible = true;
      this.isQuery = true;
      this.query = this.currentLabel;
    },
    handleAutoComplete() {
      if (this.isQuery) {
        this.clearQuery();
        this.currentLabel = this.currentNode[this.treeProps.label];
      }
    },
    clearQuery() {
      this.query = "";
      this.isQuery = false;
    },
    handleCloseTree() {},
    onSelect(node) {
      this.currentNode = node;
      this.currentLabel = node[this.treeProps.label];
      // debugger
      this.$emit("input", this.currentValue);
      this.visible = false;
      this.clearQuery();
      this.$emit("on-select", node);
    }
  }
};
</script>

