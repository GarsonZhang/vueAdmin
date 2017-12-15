<template>
  <Modal class-name="vertical-center-modal dialog-modal user" :ref="refNames_modal" title="添加成员" v-model="modalStatus" width=80
    :styles="{'max-width':'800px'}" :mask-closable="false" :loading="(true)" @on-ok="event_submit" @on-cancel="event_cancel">
    
    <div class="nav">
      <gz-panel :topHeight="40" :autoHeight="false">
      <div slot="top" >
        <SelectCompany @onSelected="onSelected" :width="200"></SelectCompany>
      </div>
      <div slot="main">
      <h1>这里是内容</h1>
      </div>
      </gz-panel>
      
      <div>

      </div>
    </div>
    <div class="main">
      <div class="tools">
        <Button class="cache">已选人员</Button>
        <div class="search">
          <Input  v-model="query">
              <Button  slot="append" icon="ios-search"></Button>
          </Input>
        </div>
      </div>
    </div>
  </Modal>
</template>
<style lang="less">
.user {
  .ivu-modal-body {
    padding: 0px;
  }
}
</style>
<style lang="less" scoped>
.cache{
  float: right;
}
.search{
  overflow: hidden;
  height: 100%;
}

.nav,
.main {
  height: 100%;
}

.nav {
  width: 200px;
  float: left;
}

.main {
  overflow: hidden; // background-color: green;
}
.tools{
      padding-top: 3px;
    padding-left: 0px;
    padding-right:0px;
    padding-bottom: 3px;
    height: 40px;
}
</style>

<script>
import Msg from "../../mixins/msg";
import SelectCompany from "./selectCompany";
import { ReqCommonDataCompany } from "../../libs/request";
export default {
  name: "ChooseUser",
  mixins: [Msg],
  components: {
    SelectCompany
  },
  data() {
    return {
      query: "",
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
    refreshData() {},

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
