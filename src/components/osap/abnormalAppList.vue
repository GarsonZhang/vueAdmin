<template>
<div>
     <Row v-for="item in AbnormalDataApp" :key="item.rowID" @click.native="doApp(item)">
            <i-col span="6">{{item.code}}</i-col>
            <i-col span="12">{{item.description}}</i-col>
            <i-col span="6">{{item.createUserName}}</i-col>
        </Row>
        </div>
</template>
<script>
    import {
        requestOsapAbnormalSubmit
    } from "../../libs/request";
export default {
    name:'osapCAbnormalAppList',
    data () {
        return {
             AbnormalDataApp: []
        }
    },
  mounted () {
       requestOsapAbnormalSubmit
                .waitelist(this)
                .then(res => {
                    this.AbnormalDataApp = res.data;
                })
                .catch(err => {
                    this.AbnormalDataApp = [];
                });
  },
  methods: {
            doApp(item){
                 this.$router.push({path: '/osap/abnormal/flow/'+item.rowID});
                //  this.$router.push({name: ' osapMonitor-monitorSubmitView', params: {id: item.rowID}});
                
            }
  }
}
</script>
