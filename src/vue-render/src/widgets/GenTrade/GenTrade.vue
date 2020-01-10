<template>
  <div class="GenTrade">
    generate trade
    <div>
      {{msg}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'GenTrade',
  data () {
    return {
      msg: JSON.stringify(nodeModules.process.argv,null,2)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
