<template>
  <div class="t00101001">
    
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
      }
    };
  },
  computed(){},
  methods:{
  },
  mounted(){},
};
</script>


<style lang="sass" scoped>
.t00101001{
  display:block;
}
</style>
