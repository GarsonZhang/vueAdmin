<template>
   <Modal class-name="autoHeight" :ref="refNames_modal" title="系统功能" v-model="modalStatus" width=80 :styles="{'max-width':'500px'}"
      :mask-closable="false" :loading="(true)" @on-ok="event_submit" @on-cancel="event_cancel">
      <Tree :data="data" show-checkbox></Tree>
    </Modal>
</template>
<style lang="less">
.autoHeight {
  display: flex;
  align-items: center;
  // justify-content: center;
  .ivu-modal {
    top: 0;
    height: 100%;
    max-height: 700px;
    .ivu-modal-content {
      height: 100%;
      .ivu-modal-body {
        position: absolute;
        top: 50px;
        bottom: 60px;
        width: 100%;
      }
      .ivu-modal-footer {
        position: absolute;
        bottom: 0px;
        width: 100%;
      }
    }
  }

  .ivu-modal-body {
    overflow-y: auto;
  }
}
</style>

<script>
import { system } from "../../libs/request";
export default {
  name: "FormTreeData",
  data() {
    return {
      refNames_modal: "refNames_modal",
      data: [],
      modalStatus: false
    };
  },
  props: {
    objectID: {
      type: String,
      default: ""
    },
    category: Number
  },
  mounted() {},
  methods: {
    show() {
      this.modalStatus = true;
    },
    event_submit() {},
    event_cancel() {}
  },

  components: {},
  watch: {
    objectID(val) {
      //   debugger;
      if (this.$utils.isNULL(val)) {
        this.data = [];
        return;
      }
      system
        .getMenuTree(this, val)
        .then(res => {
          this.data = res.data;
        })
        .catch(err => {
          this.data = [];
          return;
        });
    }
  }
};
</script>

