<template>
     <Poptip placement="bottom-start" class="gz"  v-model="visible">
            <Input type="text"
                 v-if="!this.multiple"
                    v-model="currentLabel"
                    :placeholder="placetext"
                    :icon="treeVisible?'arrow-up-b':'arrow-down-b'" 
                    @on-change="handleFilter"
                    @on-focus="treeVisible=true"
                    @on-blur="handleAutoComplete"
                    @on-click="handleCloseTree(!treeVisible)">
                    </Input>

        <div slot="content" :style="contextClass">
           <Tree :treeData="treeData" :treeProps="treeProps" v-model="currentValue" :multiple="multiple" @on-select="onSelect"></Tree>
        </div>
    </Poptip>
</template>
<style lang="less">
.gz {
  .ivu-poptip-body {
    padding: 3px;
  }
}
</style>

<style lang="less" scoped>

</style>

<script>
import Tree from "../tree/tree.vue";
export default {
  components: {
    Tree
  },
  props: {
    placetext: {
      type: String,
      default: ""
    },
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
    value:''
    
  },
  watch: {
     value(val) {
      this.currentValue = val;
    }
  },
  data() {
    return {
      visible:false,
      treeVisible: false,
      treeSelected: "",
      currentValue:"",
      currentLabel:''
    };
  },
  computed: {
    contextClass(){
      //在这计算就好了   直接返回 ‘max-height：200px’ 这种格式
      var c={};
      if(this.dropDownMaxHeight>0)
        c['max-height']=this.dropDownMaxHeight+'px';
      if(this.dropDownHeight>0)
      c['height']=this.dropDownHeight+'px';
      return c;
    }
  },
  methods: {
    handleFilter() {},
    handleAutoComplete() {},
    handleCloseTree() {},
    onSelect(node){
      this.currentLabel=node[this.treeProps.label];
      // debugger
      this.visible=false;
      this.$emit("input", this.currentValue);
      this.$emit("on-select", node);
    }
  }
};
</script>

