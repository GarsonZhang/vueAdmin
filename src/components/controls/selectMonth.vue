<template>
  <Select v-model="currentValue" >
         <Option v-for="item in data" :value="item" :key="item">{{item}}月</Option>
        <!-- <Option value=1>1月</Option>
        <Option value=2>2月</Option>
        <Option value=3>3月</Option>
        <Option value=4>4月</Option>
        <Option value=5>5月</Option>
        <Option value=6>6月</Option>
        <Option value=7>7月</Option>
        <Option value=8>8月</Option>
        <Option value=9>9月</Option>
        <Option value=10>10月</Option>
        <Option value=11>11月</Option>
        <Option value=12>12月</Option> -->
    </Select>
</template>
<style lang="less" scoped>
// .ivu-col {
// .ivu-select{
//   width: 100%;
// }
// }
</style>

<script>
export default {
    name:"SelectMonth",
  data() {
    return {
      currentValue: 0,
      data:[1,2,3,4,5,6,7,8,9,10,11,12]
    };
  },
  props: {
    value: {
      type:Number,
      default:0
    }
  },
  watch: {
    value(val) {
      if (this.currentValue !== val) {
        debugger  
        this.currentValue = val;
      }
    },
    currentValue(val) {
      debugger
      if (this.value != val) this.$emit("input", val);
    }
  }
};
</script>


