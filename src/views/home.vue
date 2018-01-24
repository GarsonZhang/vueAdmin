<template>
  <div class="content">
    <!-- <component :is="osapCAbnormalAppList"> -->
    <!-- 组件在 vm.currentview 变化时改变！ -->
    <!-- </component> -->
    <Row>
        <i-col span="12"  v-for="(item,index) in userOptions" :key="index">
             <Card class="gzCard">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    {{item.title}}
                </p>
                <a href="#" slot="extra" @click.prevent="onRefresh(item.id)">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>
                <component :ref="item.id" :is="item.component"></component>
            </Card>
        </i-col>
    </Row>
   
     <!-- 组件在 vm.currentview 变化时改变！ -->
    <!-- <component v-for="(item,index) in userOptions" :key="index" :is="item.component">
    </component> -->
    <!--创建一个echarts的容器-->
    <!-- <div id="data_source_con" style="width:500px; height:500px"></div> -->
    <!-- <h1>Home</h1>
    <Button type="success" @click="onClick">点击</Button> -->
  </div>
</template>
<style lang="less">
.gzCard {
  .ivu-card-head {
    padding-bottom: 8px;
  }
  .ivu-card-body {
    padding: 3px;
  }
}
</style>

<script>
import osapCAbnormalAppList from "../components/osap/abnormalAppList";
import echarts from "echarts";

export default {
  name: "vue-home",
  data() {
    return {
      userOptions: [
        {
          id: "c1",
          component: osapCAbnormalAppList,
          title: "待审核"
        }
      ]
    };
  },
  mounted() {
    // this.$nextTick(() => {
    //     var dataSourcePie = echarts.init(document.getElementById('data_source_con'));
    //     const option = {
    //         tooltip: {
    //             trigger: 'item',
    //             formatter: '{a} <br/>{b} : {c} ({d}%)'
    //         },
    //         legend: {
    //             orient: 'vertical',
    //             left: 'right',
    //             data: ['ios', 'android', 'pc', 'web', 'others']
    //         },
    //         series: [
    //             {
    //                 name: '访问来源',
    //                 type: 'pie',
    //                 radius: '66%',
    //                 center: ['50%', '60%'],
    //                 data: [
    //                     {value: 2103456, name: 'ios', itemStyle: {normal: {color: '#9bd598'}}},
    //                     {value: 1305923, name: 'android', itemStyle: {normal: {color: '#ffd58f'}}},
    //                     {value: 543250, name: 'pc', itemStyle: {normal: {color: '#abd5f2'}}},
    //                     {value: 798403, name: 'web', itemStyle: {normal: {color: '#ab8df2'}}},
    //                     {value: 302340, name: 'others', itemStyle: {normal: {color: '#e14f60'}}}
    //                 ],
    //                 itemStyle: {
    //                     emphasis: {
    //                         shadowBlur: 10,
    //                         shadowOffsetX: 0,
    //                         shadowColor: 'rgba(0, 0, 0, 0.5)'
    //                     }
    //                 }
    //             }
    //         ]
    //     };
    //     dataSourcePie.setOption(option);
    //     window.addEventListener('resize', function () {
    //         dataSourcePie.resize();
    //     });
    // });
  },
  methods: {
    onRefresh(id) {
      this.$refs[id][0].refresh();
    },
    onClick() {
      // debugger
      // var v = this.$utils.jsonSearch.test6(121);
      // console.dir(v);
    }
  }
};
</script>
