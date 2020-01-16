<template>
  <div class="GenPrintF">
    <!-- <el-button type="primary">选择需要解析的json文件</el-button> -->
    

    <el-form ref="form" label-width="130px" size="mini">
      <el-form-item label="FCClient路径：">
        <el-input v-model="tradeRoot" style="width:100%;" />
      </el-form-item>
      <el-form-item label="F表文件名：">
        <el-input v-model="fTableName" style="width:100%;" placeholder="00101001.aft" />
      </el-form-item>
      <el-form-item label="F表标题：">
        <el-input v-model="title" style="width:100%;" />
      </el-form-item>
      <el-form-item label="F表字段：">
        <el-input v-model="config" type="textarea" :autosize="{ minRows: 10, maxRows: 40}" placeholder="输入字段格式:(账号|客户姓名|性别|账户类型)"></el-input>
      </el-form-item>
    </el-form>
    <el-row>
      <el-button @click="parseFields" type="primary">生成F表</el-button>
    </el-row>



  </div>
</template>
<script>
export default {
  name: "GenPrintF",
  components: {},
  props: {

  },
  data() {
    return {
      tradeRoot:"E:\\work\\zantong\\qdgz_TEClient\\FCClient",
      fTableName:"xxx",
      config:"账号|客户姓名|性别",
      title:"无标题",
      standardField:[{label:"账号",value:"acc"},{label:"客户姓名",value:"custName"},{label:"性别",value:"sex"}],//[{label:"",value:""}]
      fields:[],//[{label:"",value:""}]
      tables:[],//[{label:"",value:""}]
    }
  },
  methods: {
    async parseFields(){
      let res = await this.checkPath();
      if(!res) return;
      let fields1 = this.config.split("|").filter(v => v);
      let fields = fields1.filter(v => !/[,，]/.test(v));
      let tables = fields1.filter(v => /[,，]/.test(v));
      tables = tables.map(v=>v.split(/[,，]/g));
      let checkFields = [...fields];
      tables.forEach(v => {
        v = v.filter(v1 => v1);
        checkFields = checkFields.concat(v);
      })
      let msgs = this.checkFields(checkFields);
      if(msgs.length != 0){
        let msgsStr = msgs.join(" ");
        this.alert(msgsStr,"以下字段在标准库中不存在，联系标准组添加后继续生成F表");
        return;
      }
      this.fields = fields.map(v => {
        return {
          label:v,
          value:this.findEnField(v)
        }
      })
      this.tables = tables.map(v => {
        return v.map(v1 => {
          return {
            label:v1,
            value:this.findEnField(v1)
          }
        })
      })
      this.genFtableXml(this.fields,this.tables);
      
    },
    // 检查字段是否在标准字段里面存在
    checkFields(checkFields){
      let msgs = [];
      for(let i=0;i<checkFields.length;i++){
        let curObj = this.standardField.find(v => v.label == checkFields[i]);
        if(!curObj){
          msgs.push(checkFields[i]);
        }
      }
      return msgs;
    },
    findEnField(cnField){
      let curObj = this.standardField.find(v => v.label == cnField);
      return curObj.value;
    },
    async checkPath(){
      if(!this.fTableName.trim()){
        this.alert("f表名称不能为空")
        return false;
      }
      if(!this.config) {
        this.alert("F表字段不能为空")
        return false;
      };
      let fTableDir = window.m.path.resolve(this.tradeRoot,"print");
      let isExist = window.m.fs.existsSync(fTableDir);
      if(!isExist){
        this.alert(`目录${fTableDir}不存在`);
        return false;
      }
      let fTableFilepath = window.m.path.resolve(fTableDir,this.fTableName);
      let isFileExist = window.m.fs.existsSync(fTableFilepath);
      if(isFileExist){
        let res = await this.alert(`文件f表${fTableFilepath}已存在是否覆盖？`)
        if(res){
          return true;
        }else{
          return false;
        }
      }else{
        return true;
      }
    },
    genFtableXml(fields,tables){
      console.log("this.fields",JSON.stringify(fields));
      console.log("this.tables",JSON.stringify(tables));
    }
  },
  watch: {

  },
  filters: {

  },
  mounted() {
    // this.parseFields();
  },
}
</script>
<style lang="scss" scoped>
// @import "./GenPrintF.scss";
</style>
