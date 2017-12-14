<template>
      <ul class="nodePanel">
                    <tree-node
                        v-for="child in treeNodes[treeProps.children]"
                        :node="child"
                        :key="child[treeProps.value]"
                        :multiple="multiple"
                        :currentNodeId="currentNodeId"
                        :treeProps="treeProps"
                        :eventHub="eventHub"
                        :query="query"
                        :isQuering="isQuering">
                    </tree-node>
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

import treeNode from "./tree-node.vue";

export default {
  components: {
    treeNode
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
    isQuering: false,
    value: ""
  },

  data() {
    return {
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
    }
  },
  created() {
    // debugger;
    this.eventHub.$on("node-click", this.handleNodeClick);
  },

  methods: {
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

