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
import {system} from './libs/request'

export default {
  data() {
    return {
      dataMenus: []
    };
  },
  created() {
    //判断是否登录，如果登录就获取，如果没登录，则在登录后获取
    this.getMenus();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getMenus() {
      //console.log('1 '+this.getNowFormatDate());

      // this.$utils.ajax.get("/static/menus.json").then(res => {
      //   this.dataMenus = res.data;
      //   var customer_router = this.$utils.convertRouteMap(res.data);
      //   var v={children:customer_router};
      //   this.$router.options.routes.push(v);
      //   this.$router.addRoutes(customer_router);
      // });

      system.getMenu().then(res => {
        this.dataMenus = res.data;
        var customer_router = this.$utils.convertRouteMap(res.data);
        var v = { children: customer_router };
        this.$router.options.routes.push(v);
        this.$router.addRoutes(customer_router);
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