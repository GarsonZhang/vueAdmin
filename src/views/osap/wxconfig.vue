<template>
 <div>
    <Form class="content" :ref="refNames.form" :model="editData" :rules="dataRule" :label-width="120">
        <FormItem label="CorpID" prop="corpID">
            <i-input v-model="editData.corpID" :readonly="!isAuthorize" placeholder=""></i-input>
        </FormItem>
        <FormItem label="CorpSecret" prop="CorpSecret">
            <i-input v-model="editData.corpsecret" style="word-break: break-all;"   type="textarea" :autosize="{minRows: 1,maxRows: 5}" :readonly="!isAuthorize" placeholder=""></i-input>       
        </FormItem>

        <FormItem label="AccessToken" prop="access_token">
            <i-input v-model="editData.access_token" style="word-break: break-all;"   type="textarea" :autosize="{minRows: 2,maxRows: 5}" :readonly="!isAuthorize" placeholder=""></i-input>
        </FormItem>
        <FormItem label="agentID" prop="agentID">
            <i-input v-model="editData.agentID" :readonly="!isAuthorize" placeholder=""></i-input>

        </FormItem>
            <FormItem label="" prop="">
              <gz-button  v-permission="1"  type="primary" icon="document" @click="event_onSave" text="保存"></gz-button >
        </FormItem>
    </Form>
  
    </div>
</template>
<style lang="less" scoped>
.content{
    width: 450px;
    margin-top: 10px;
}
</style>

<script>
import { requestOsapWXConfig } from "../../libs/request";
import Msg from "../../mixins/msg";
import Authorize from "../../mixins/authorize"; 

export default {
  name:'osap-wxconfig',
  data() {
    return {
      refNames: {
        form: "form"
      },
      editData: {}
    };
  },
  mixins: [Msg,Authorize],
  computed: {
    dataRule() {
      return {
        corpID: [
          {
            required: true,
            message: this.$t("dataRuleNullMsg", ["corpID"]),
            trigger: "blur"
          }
        ],
        access_token: [
          {
            required: true,
            message: this.$t("dataRuleNullMsg", ["access_token"]),
            trigger: "blur"
          }
        ],
        corpsecret: [
          {
            required: true,
            message: this.$t("dataRuleNullMsg", ["corpsecret"]),
            trigger: "blur"
          }
        ],
        agent: [
          {
            required: true,
            message: this.$t("dataRuleNullMsg", ["agent"]),
            trigger: "blur"
          }
        ]
      };
    },
    isAuthorize()   {
        return this.VerifyPermissions(1);
    }
  },
  mounted() {
    requestOsapWXConfig
      .data(this)
      .then(res => {
        this.editData = res.data;
      })
      .catch(err => {
        this.editData = [];
      });
  },
  methods: {
    event_onSave(component) {
      this.$refs[this.refNames.form].validate(valid => {
        if (valid) {
          requestOsapWXConfig
            .update(this, this.editData)
            .then(res => {
              component.loading = false;
              this.showInfo('保存成功！');
            })
            .catch(err => {
              component.loading = false;
            });
        } else {
          this.showError(this.$t("failValidateForm"));
          component.loading = false;
        }
      });
    }
  }
};
</script>
