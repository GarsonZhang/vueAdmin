<template>
<div class="content">
    <gz-panel topHeight="100px" bottomHeight="60px" :childFull100=false >
        <div slot="top"><div>top</div></div>
        <div slot="main">main</div>
        <div slot="bottom">bottom</div>
    </gz-panel>
</div>  
</template>
<script>
export default {
    data () {
        return {
            topStyle:{
                background:'rgba(40,123,211,.91)'
            },
            mainStyle:{
                background:'#999'
            },
            bottomStyle:{
                background:'#9c6464'
            }
        }
    },
  components: {
  },
  methods: {
  }
}
</script>
<style scoped>
    .top{
        background: rgba(40,123,211,.91);
    }
    .main{
        background:#999
    }
    .bottom{
        background:#9c6464
    }
</style>


