<template>
<div class="content">
    <gz-panel topHeight="100px" bottomHeight="60px" :childFull100=false >
        <div slot="top"><div>top</div></div>
        <div slot="main">
            <Row>
                <Col span="12">
                    <tree-table :data="data1" @on-check-change="selectChange" @changed="selectChange2"></tree-table>
                    <button @click="btnclick">点击</button>
                </Col>
            </Row>
            
        </div>
        <div slot="bottom">bottom</div>
    </gz-panel>
</div>  
</template>
<script>
export default {
  data() {
    return {
      topStyle: {
        background: "rgba(40,123,211,.91)"
      },
      mainStyle: {
        background: "#999"
      },
      bottomStyle: {
        background: "#9c6464"
      },
      data1: [
        {
          title: "parent 1",
          expand: true,
          children: [
            {
              title: "parent 1-1",
              expand: true,
              children: [
                {
                  title: "leaf 1-1-1"
                },
                {
                  title: "leaf 1-1-2"
                }
              ]
            },
            {
              title: "parent 1-2",
              expand: true,
              children: [
                {
                  title: "leaf 1-2-1"
                },
                {
                  title: "leaf 1-2-1"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  components: {},
  methods: {
    btnclick(e) {
      debugger;
    },
    selectChange(e) {
      debugger;
    },
    selectChange2(e) {
      debugger;
    }
  },
  mounted() {
    this.$on("on-select-change", function(msg) {
      debugger;
      console.log(msg);
    });
  }
};
</script>
<style scoped>
.top {
  background: rgba(40, 123, 211, 0.91);
}
.main {
  background: #999;
}
.bottom {
  background: #9c6464;
}
</style>


