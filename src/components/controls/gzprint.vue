<template>
  <!-- <iframe v-id="id" @load="onload"></iframe> -->
  <!-- <embed name="plugin" v-id="id" src="http://localhost:4462/report/c2914cc014b046fd8cf2dde843a8eb2b?format=pdf&inline=true" type="application/pdf" internalinstanceid="109" style="
    width: auto;
    height: auto;"> -->
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
      //   this.printStatus = false;
      //   var url =
      //     this.$utils.baseURLReport + "/" + reportID + "?format=pdf&inline=true";
      //   document.getElementById(this.id).setAttribute("src", url);

      var url =
        this.$utils.baseURLReport +
        "/" +
        reportID +
        "?format=pdf&inline=true";
      window.open(url);
    },
    // onload() {
    //   console.log("report print");
    //   if (this.printStatus == false) {
    //     document.getElementById(this.id).document.domain = "localhost:8081";
    //     document.getElementById(this.id).contentWindow.print();
    //     this.printStatus = true;
    //   }
    // }
  }
};
</script>
