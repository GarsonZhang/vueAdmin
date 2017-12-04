<template>
  <div :class="classes">
      <div :class="topClass" ref="top" :style="_styleTop">
          <slot name="top" ></slot>
      </div>
      <div :class="mainClass" :style="_styleMain">
          <slot name="main" class="abc"></slot>
      </div>
      <div :class="bottomClass" ref="bootom" :style="_styleBottom">
          <slot name="bottom"></slot>
      </div>
  </div>
</template>
<script>
export default {
  name: "gzPanel",
  data() {
    return {
      topHeight: 0
    };
  },
  props: {
    topStyle: {
      //设置top样式，height设置无效
      type: Object,
      default: this.gobject
    },
    mainStyle: {
      //设置main样式，top和bottom设置无效
      type: Object,
      default: this.gobject
    },
    bottomStyle: {
      //设置bottom样式，height设置无效
      type: Object,
      default: this.gobject
    },
    className: String,
    autoHeight: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    gobject() {
      return {};
    },
    reLayout() {
      // debugger
      this.topHeight = this.$refs.top
        ? this.$refs.top.firstChild
          ? this.$refs.top.firstChild.getBoundingClientRect().height + "px"
          : "0px"
        : "0px";
      this.bottomHeight = this.$refs.bootom
        ? this.$refs.bootom.firstChild
          ? this.$refs.bootom.firstChild.getBoundingClientRect().height + `px`
          : "0px"
        : "0px";
    }
  },
  mounted() {
    this.reLayout();
    var me = this;
    if (this.autoHeight) {
      window.addEventListener("resize", function() {
        // console.log("systemModuleForm onresize");
        if (!me.resizeTimer) {
          //设置延时，禁止过大消耗浏览器性能
          me.resizeTimer = true;
          setTimeout(function() {
            // console.log("reLayout");
            me.reLayout();
            me.resizeTimer = false;
          }, 1000);
        }
      });
    }
  },
  computed: {
    _styleTop() {
      var v = {};
      if (this.topStyle) v = this.$utils.deepCopy(this.topStyle);
      v.height = this.topHeight;
      return v;
      console.dir(v);
    },
    _styleMain() {
      var v = {};
      if (this.topStyle) v = this.$utils.deepCopy(this.mainStyle);
      v.top = this.topHeight;
      v.bottom = this.bottomHeight;
      return v;
    },
    _styleBottom() {
      var v = {};
      if (this.bottomStyle) v = this.$utils.deepCopy(this.bottomStyle);
      v.height = this.bottomHeight;
      return v;
    },
    topClass() {
      return [
        `fill-100`,
        {
          [`gz-panel-top`]: true
        }
      ];
    },
    mainClass() {
      return [
        {
          [`gz-panel-main`]: true
        }
      ];
    },
    bottomClass() {
      return [
        {
          [`gz-panel-bottom`]: true
        }
      ];
    },
    classes() {
      return [
        {
          [`gz-panel-layout`]: true
          // [`${this.className}`]: !!this.className
        }
      ];
    }
  }
};
</script>
<style scoped>
.gz-panel-layout {
  /* position: relative; */
  height: 100%;
  width: 100%;
}

.gz-panel-top {
}

.gz-panel-main {
  min-height: 200px;
  overflow: hidden;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
}
.gz-panel-bottom {
  color: #9ea7b4;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
<style lang="less" scoped>
// .gz-top{
//   background-color: red;
// }
</style>


