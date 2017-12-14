<template>
      <ul class="nodePanel">
                    <gz-tree-node
                        v-for="child in treeNodes[treeProps.children]"
                        :node="child"
                        :key="child[treeProps.value]"
                        :multiple="multiple"
                        :currentNodeId="currentNodeId"
                        :treeProps="treeProps"
                        :eventHub="eventHub">
                    </gz-tree-node>
                </ul>
</template>
<style lang="less" scoped>
.nodePanel {
  overflow-y: hidden;
}
</style>
<script>
import Clickoutside from "./utils/clickoutside";
import { objArrDeepCopy } from "./utils/tools";
import debounce from "throttle-debounce/throttle";
import Vue from "vue";

import gzTreeNode from "./gz-tree-node.vue";

export default {
  name: "gzTree",
  components: {
    gzTreeNode
  },
  props: {
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
      type: Boolean
    },
    query: "",
    value: ""
  },

  data() {
    return {
      isQuering: false,
      treeNodes: {
        [this.treeProps.children]: objArrDeepCopy(this.treeData, {
          visible: true
        }),
        visible: true
      },
      currentNodeId: "",
      eventHub: new Vue()
    };
  },
  watch: {
    treeData(val) {
      if (val) {
        this.treeNodes = {
          [this.treeProps.children]: objArrDeepCopy(val, { visible: true }),
          visible: true
        };
      }
    },
    value(val) {
      this.currentNodeId = val;
    },
    query(val) {
      // if (isQuering) {
      this.handleFilter();
      // }
    }
  },
  created() {
    // debugger;
    this.eventHub.$on("node-click", this.handleNodeClick);
  },

  methods: {
    handleFilter: debounce(1000, function() {
      this.treeFilterMethod(this.treeNodes);
    }),
    treeFilterMethod(node) {
      // debugger
      //1 有子项
      //2 有选中值
      var flag = 0;

      let self = this;
      let childNodes = node[self.treeProps.children];
      if (!childNodes) return;
      childNodes.forEach(child => {
        child.visible =
          self.query === ""
            ? true
            : child[self.treeProps.label]
                .toLowerCase()
                .indexOf(self.query.toLowerCase()) > -1;
        if (child.visible) flag = flag | 1;
        if (child[self.treeProps.value] === this.currentNodeId) flag = flag | 2;

        flag = flag | self.treeFilterMethod(child);
      });
      // if (!node.visible && childNodes.length) {
      //   let allHidden = true;
      //   childNodes.forEach(child => {
      //     if (child.visible) allHidden = false;
      //   });
      //   node.visible = allHidden === false;
      // }
      if (!node.visible && (flag & 1) === 1) {
        node.visible = true;
      }
      if (node.visible) {
        if (self.query === "") {
          node.expanded = (flag & 2) === 2;
        } else this.$set(node, "expanded", true);
      }

      return flag;
    },
    handleNodeClick(node, event) {
      // if(event){
      //     this.isDefault = false;
      // }
      // if(this.multiple){
      //     if(!this.hasSameItem(this.checkedItems,node)){
      //         this.handleAddItem(node);
      //         this.$emit('setSelectedId',this.checkedKeys);
      //     }else{
      //         this.handleDelItem(node,event);
      //     }
      // }else{
      //   debugger
      this.currentNodeId = node[this.treeProps.value];
      // this.treeSelected = node[this.treeProps.label];
      // this.currentSelected = this.treeSelected;
      //   debugger
      this.$emit("input", this.currentNodeId);
      this.$emit("on-select", node);
      // }
    }
  }
};
</script>

