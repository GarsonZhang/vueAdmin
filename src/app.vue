<template>
    <div class="divContent">
        <router-view></router-view>
    </div>
</template>
<style>
html,
body {
  height: 100%;
}
.divContent {
  height: 100%;
}
</style>

<script>
import Util from "./libs/util";

export default {
  data() {
    return {
      dataMenus: []
    };
  },
  created() {
    console.log("app.vue   created");
    this.getMenus();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getMenus() {
      //console.log('1 '+this.getNowFormatDate());
      Util.ajax.get("/static/menus.json").then(res => {
        this.dataMenus = res.data;
        var customer_router = Util.convertRouteMap(res.data);
        this.$router.options.routes.push(customer_router);
        this.$router.addRoutes(customer_router);

        //测试异步操作

        // console.log('2 '+this.getNowFormatDate());
        // setTimeout(() => {
        //   console.log('3 '+this.getNowFormatDate());
        //   this.dataMenus = res.data;
        //   var customer_router = Util.convertRouteMap(res.data);
        //   this.$router.options.routes.push(customer_router);
        //   this.$router.addRoutes(customer_router);
        // }, 5000);
      });
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        date.getHours() +
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds();
      return currentdate;
    }
  }
};
</script>