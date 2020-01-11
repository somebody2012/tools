<template>
  <div class="GenTrade">
    generate trade
    <div>
      {{msg}}
    </div>
  </div>
</template>

<script>
import GenTradeConfig from "./GenTradeUtils/GenTradeConfig.js"
export default {
  name: 'GenTrade',
  data () {
    return {
      msg: JSON.stringify(window.m.process.argv,null,2)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
