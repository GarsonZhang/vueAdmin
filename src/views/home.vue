<template>
    <div class="content">
        <!-- <component :is="osapCAbnormalAppList"> -->
        <!-- 组件在 vm.currentview 变化时改变！ -->
        <!-- </component> -->
            <component v-for="(item,index) in userOptions" :key="index" :is="item.component">
        <!-- 组件在 vm.currentview 变化时改变！ -->
        </component>
        <h1>Home</h1>
        <Button type="success" @click="onClick">点击</Button>
    </div>
</template>
<script>
import osapCAbnormalAppList from "../components/osap/abnormalAppList";
export default {
  name: "vue-home",
  data() {
    return {
      userOptions: [{ component: osapCAbnormalAppList }]
    };
  },
  mounted() {},
  methods: {
    onClick() {
      // debugger
      var v = this.$utils.jsonSearch.test6(121);
      console.dir(v);
    }
  }
};
</script>
