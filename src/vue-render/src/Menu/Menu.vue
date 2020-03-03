<template>
  <div class="Menu">
    <el-menu
      default-active="/GenTrade"
      :default-openeds='["/GenTrade","/GenStandardFieldSql"]'
      :collapse="isCollapse"
      router>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span slot="title">工具</span>
        </template>
        <el-menu-item index="/GenTrade">生成交易</el-menu-item>
        <el-menu-item index="/GenPrintF">生成打印F表</el-menu-item>
        <el-menu-item index="/GenInterface">生成接口</el-menu-item>
        <el-menu-item-group>
          <span slot="title"><i class="el-icon-setting"></i>标准组工具</span>
          <el-menu-item index="/GenStandardFieldSql">生成标准字段sql</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>

  </div>
</template>
<script>
export default {
  name: "Menu",
  components: {},
  props: {

  },
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  watch: {

  },
  filters: {

  },
  mounted() {

  },
}
</script>
<style lang="scss" scoped>
// @import "./Menu.scss";
.Menu{
  position: relative;
}
</style>
