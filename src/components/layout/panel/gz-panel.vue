<template>
  <div class="container">
      <div :class="topClass" :style="_styleTop">
          <slot name="top"></slot>
      </div>
      <div :class="mainClass" :style="_styleMain">
          <slot name="main" class="abc"></slot>
      </div>
      <div :class="bottomClass" :style="_styleBottom">
          <slot name="bottom"></slot>
      </div>
  </div>
</template>
<script>
export default {
  name: "gzPanel",
  data() {
    return {};
  },
  props: {
    childFull100:{//第一个子元素100%铺满
      type:Boolean,
      default:true
    },
    topHeight: {//设置top高度
      type: String,
      default: "60px"
    },
    bottomHeight: {//设置bottom高度
      type: String,
      default: "20px"
    },
    topStyle: {//设置top样式，height设置无效
      type: Object,
      default: this.gobject
    },
    mainStyle: {//设置main样式，top和bottom设置无效
      type: Object,
      default: this.gobject
    },
    bottomStyle: {//设置bottom样式，height设置无效
      type: Object,
      default: this.gobject
    }
  },
  methods: {
    gobject() {
      return {}
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
    topClass(){
        return this.childFull100?'fill-100 gz-top':'gz-top';
    },
    mainClass(){
        return this.childFull100?'fill-100 gz-main':'gz-main';
    },
    bottomClass(){
        return this.childFull100?'fill-100 gz-bottom':'gz-bottom';
    }
  }
};
</script>
<style scoped>
.container{
    position: relative;
    height: 100%;
    width:100%;
}
.gz-top{
}
.gz-main{
    min-height: 200px;
    overflow: hidden;
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
}
.gz-bottom{
    color: #9ea7b4;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}

.fill-100>:first-child{
  width:100%;
  height:100%;
}
</style>
<style lang="less" scoped>
  // .gz-top{
  //   background-color: red;
  // }
</style>


