<template>
  <div style="display:none" v-id="id">print</div>
</template>
<script>
export default {
  name: "gzPrint",
  directives: {
    id: {
      bind(el, binding, vnode) {
        console.log("report id bind:" + binding.value);
        el.id = binding.value;
      },
      // update(el, binding, vnode) {
      //   if (!vnode.context.$utils.isNULL(binding.value)) {
      //     console.log("report id update:" + binding.value);
      //     el.id = binding.value;
      //   }
      // }
    }
  },
  data() {
    return {
      id: "",
      // printStatus: true
    };
  },
  created() {
    this.id = this.$utils.GUID();
  },
  methods: {
    print(reportID) {
      var url =
        this.$utils.baseURLReport +
        "/" +
        reportID +
        "?format=pdf&inline=true";
      window.open(url);
    }
  }
};
</script>
