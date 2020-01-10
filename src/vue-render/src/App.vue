<template>
  <div id="app">
    <div class="menu" :style="{left:left+'px'}">
      <Menu></Menu>
    </div>
    <div class="tools-container" :style="{marginLeft:menuWidth+'px'}">
      <router-view/>
      <i @click="func(true)" v-show="menuWidth==200" class="el-icon-d-arrow-left handle-icon"></i>
      <i @click="func(false)" v-show="menuWidth==0" class="el-icon-d-arrow-right handle-icon"></i>
    </div>
  </div>
</template>

<script>
import Menu from "./Menu/Menu.vue"
export default {
  name: 'App',
  components:{Menu},
  data(){
    return {
      menuWidth:200,
    }
  },
  computed:{
    left(){
      return this.menuWidth - 200
    }
  },
  methods:{
    func(bol){
      if(bol){
        this.menuWidth = 0;
      }else{
        this.menuWidth = 200;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app{
  min-height: 100%;
  .menu{
    position: fixed;
    left: 0;
    top: 0;
    border-right:1px solid rgb(173, 167, 167);
    min-height: 100%;
  }
  .tools-container{
    box-sizing: border-box;
    padding-left:5px;
    position: relative;
    .handle-icon{
      position: absolute;
      left: 0px;
      top:5px;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>
