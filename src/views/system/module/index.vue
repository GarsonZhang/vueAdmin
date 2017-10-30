<template>
<div class="content">
  <Row class="fill-height">
    <Col span="6" class="fill-height">
    <gz-panel class="borderPanel" >
       <div slot="top" class="tools" >
          <div class="title"><span>模块列表</span></div>
       </div>
      <div slot="main">
        <gz-panel ref="gzabc" :childFull100=true >
            <div slot="top" class="tools" >    
              <Tooltip content="刷新" placement="bottom-start">
                <gz-button ref="refresh" icon="refresh" @click="doRresh" :showText='false' />
              </Tooltip>
              <ButtonGroup class="tooltipButtonGroup">
                <Tooltip content="新增" placement="bottom-start" >
                  <Button type="primary" icon="plus" @click="doAdd"></Button>
                </Tooltip>
                <Tooltip content="修改" placement="bottom-start" >
                  <Button type="success" icon="edit"></Button>
                  </Tooltip>
                  <Tooltip content="删除" placement="bottom-start">
                  <Button type="error" icon="close"></Button>
                  </Tooltip>
              </ButtonGroup>
            </div>
            <div slot="main">
              <Table highlight-row size="small" class="gztag" :columns="moduleColumns" :data="moduleData"></Table>
            </div>
            <!-- <div slot="bottom">这里是底部</div> -->
        </gz-panel>
      </div>
      
      </gz-panel>
    </Col>
  </Row>
    

    <Modal
        title="模块新增"
        v-model="moduleAdd"
        width=80
        :styles="{'max-width':'800px'}"
        :mask-closable="false">
        <p>新增模块</p>
    </Modal>
</div>
</template>
<<style lang="less">
.gztag .ivu-table-expanded-cell{
    padding: 0px;
    padding-left: 30px;
}
.table-cell-index .ivu-table-cell{
  padding-left: 5px;
  padding-right: 5px;
}
</style>

<style lang="less" scoped>
.tools {
  padding-top: 5px;
}
.title{
    height: 32px;
    line-height: 32px;
    border-bottom: 1px solid #e9eaec!important;
    color: #495060!important;
    background: #fff!important;
    padding: 0 12px;
    display: inline-block;
    margin: 2px 4px 2px 0;
    border-radius: 3px;
    font-size: 12px;
    vertical-align: middle;
    opacity: 1;
    overflow: hidden;
    width: 100%;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.ivu-tooltip, .ivu-tooltip-rel {
    // display: inline-block;
    position: relative;
    float: left;
    border-radius: 0;
}

.tooltipButtonGroup{
  margin-left: 5px;
}
.tooltipButtonGroup>.ivu-tooltip {
  margin-left: -1px;
}
.tooltipButtonGroup>.ivu-tooltip:first-child:not(:last-child) .ivu-btn {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
}
.tooltipButtonGroup>.ivu-tooltip:last-child:not(:first-child) .ivu-btn {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
}
.tooltipButtonGroup .ivu-tooltip:not(:first-child):not(:last-child) .ivu-btn {
    border-radius: 0;
}
.borderPanel{
  border: 1px solid #e9eaec!important;
}

</style>
<script>
import expandRow from "./table-expand.vue";

export default {
  name: "module",
  components: { expandRow },
  data() {
    return {
      moduleColumns: [
        {
          title: "序号",
          type: "index",
          width: 50,
          align: "center",
          className:"table-cell-index"
        },{
          title: "描述",
          key: "description",
          editable: true
        }
      ],
      moduleData: [],
      moduleAdd: false
    };
  },
  created() {},
  mounted() {
    this.$refs.refresh.handleClick();
    var me=this;
    window.onresize=function(e){
      me.$refs.gzabc.reLayout();
    }
  },
  methods: {
    doRresh(event, component) {
      console.log("1");
      this.$utils.ajaxRemote
        .get("/module/getall")
        .then(res => {
          this.moduleData = res.data;
          component.loading = false;
        })
        .catch(err => {
          component.loading = false;
        });
    },
    doAdd(event, component) {
      //on-row-click
      this.moduleAdd = true;
    }
  }
};
</script>