<template>
  <div class="content">
    <!-- <component :is="osapCAbnormalAppList"> -->
    <!-- 组件在 vm.currentview 变化时改变！ -->
    <!-- </component> -->
    <component v-for="(item,index) in userOptions" :key="index" :is="item.component">
      <!-- 组件在 vm.currentview 变化时改变！ -->
    </component>
    <!--创建一个echarts的容器-->
    <div id="data_source_con" style="width:500px; height:500px"></div>
    <h1>Home</h1>
    <Button type="success" @click="onClick">点击</Button>
  </div>
</template>
<script>
  import osapCAbnormalAppList from "../components/osap/abnormalAppList";
  import echarts from 'echarts';

  export default {
    name: "vue-home",
    data() {
      return {
        userOptions: [{
          component: osapCAbnormalAppList
        }]
      };
    },
    mounted() {
        this.$nextTick(() => {
            var dataSourcePie = echarts.init(document.getElementById('data_source_con'));
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: ['ios', 'android', 'pc', 'web', 'others']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '66%',
                        center: ['50%', '60%'],
                        data: [
                            {value: 2103456, name: 'ios', itemStyle: {normal: {color: '#9bd598'}}},
                            {value: 1305923, name: 'android', itemStyle: {normal: {color: '#ffd58f'}}},
                            {value: 543250, name: 'pc', itemStyle: {normal: {color: '#abd5f2'}}},
                            {value: 798403, name: 'web', itemStyle: {normal: {color: '#ab8df2'}}},
                            {value: 302340, name: 'others', itemStyle: {normal: {color: '#e14f60'}}}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            dataSourcePie.setOption(option);
            window.addEventListener('resize', function () {
                dataSourcePie.resize();
            });
        });
    },
    methods: {
      onClick() {
        // debugger
        var v = this.$utils.jsonSearch.test6(121);
        console.dir(v);
      }
    }
  };
</script>
