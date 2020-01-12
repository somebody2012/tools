<template>
  <div class="t00101001">
      <trade-group title="客户信息">
          <aui-row>
                <aui-col :span="10" :offset="0">
                  <custom-input v-model="TradeData.ACC" label="账号" ref="ACC" property="ACC" :disabled="true" :success="ACCSuccess" :requisite="true"></custom-input>
                </aui-col>
                <aui-col :span="10" :offset="2">
                  <custom-selector v-model="TradeData.ACC1" label="账号1" ref="ACC1" property="ACC1" :disabled="true" :success="ACC1Success" :requisite="true"></custom-selector>
                </aui-col>
          </aui-row>
          <aui-row>
                <aui-col :span="10" :offset="0">
                  <custom-selector v-model="TradeData.ACC2" label="账号2" ref="ACC2" property="ACC2" :disabled="true" :success="ACC2Success" :requisite="true"></custom-selector>
                </aui-col>
          </aui-row>
      </trade-group>
      <trade-group title="客户信息1">
          <aui-row>
                <aui-col :span="10" :offset="0">
                  <custom-selector v-model="TradeData.ACC3" label="账号3" ref="ACC3" property="ACC3" :disabled="true" :success="ACC3Success" :requisite="true"></custom-selector>
                </aui-col>
          </aui-row>
      </trade-group>
    
  </div>
</template>

<script>
import {TradeFlow,ServiceConfig,TradeMessage} from "@/FCClient/common/constants/trade-import.js";
export default {
  mixins: [TradeFlow,TradeMessage],
  validators: {},
  props:{},
  data(){
    return {
      TradeData:{
        ACC:"",
        ACC1:"",
        ACC2:"",
        ACC3:"",
      }
    };
  },
  computed(){},
  methods:{
    async ACCSuccess(name,age){},
    async ACC1Success(name,age){},
    async ACC2Success(name,age){},
    async ACC3Success(name,age){},
  },
  mounted(){},
};
</script>


<style lang="sass" scoped>
.t00101001{
  display:block;
}
</style>
