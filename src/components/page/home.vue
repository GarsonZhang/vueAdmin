<template>
<div class="content">
    <gz-panel topHeight="100px" bottomHeight="60px" 
        :topStyle="{background:'rgba(40,123,211,.91)'}" 
        :mainStyle="{background:'#999'}" 
        :bottomStyle="{background:'#9c6464'}">
        
        <div slot="top">top</div>
        <div slot="main">main</div>
        <div slot="bottom">bottom</div>
    </gz-panel>
</div>  
</template>
<script>
import gzPanel from '../layout/gz-panel'
export default {
  components: {
      gzPanel
  },
  methods: {
  }
}
</script>
<style scoped>
    
</style>


