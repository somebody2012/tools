<template>
  <div class="GenInterface">
    <el-divider content-position="left">操作区</el-divider>
    <el-row>
      <el-button @click="selectExcel" type="primary" icon="el-icon-upload2">选择需要转换的接口excel</el-button>
    </el-row>
    
    <input type="file" @change="inputFileChange" ref="inputFile" style="display:none;">
  </div>
</template>
<script>
import FileUtils from "@/utils/file-utils.js";
import commRequest from "@/utils/comm-request.js";
let xlsx = window.m.xlsx;
export default {
  name: "GenInterface",
  components: {},
  props: {

  },
  data() {
    return {

    }
  },
  methods: {
    selectExcel(){
      this.$refs.inputFile.value = "";
      this.$refs.inputFile.click();
    },
    transform(){

    },
    async inputFileChange(e){
      let {fs,path} = window.m;
      let file = e.target.files[0];
      let filepath = file.path;
      let basename = window.m.path.basename(filepath);
      let extname = window.m.path.extname(file.path);
      let {dir,ext,name} = path.parse(filepath);
      let newFilepath = path.resolve(dir,`${name}_${Date.now()}${ext}`);
      if(![".xls",".xlsx"].includes(extname)){
        this.$notify({message:"必须是excel"});
        return;
      }
      let res = await FileUtils.readExcelAsync(file);
      let jsonData = res.data;
      
      let excelBuffer = fs.readFileSync(filepath);
      let WorkBook = xlsx.read(excelBuffer,{type:"array"})
      await this.genNewExcel(jsonData,WorkBook,newFilepath);
    },
    async genNewExcel(jsonData,WorkBook,newFilepath){
      this.genStyle(WorkBook);
      let res = await this.handleData(jsonData,WorkBook);
      if(!res) return;
      let result = xlsx.write(WorkBook,{
        type:"buffer",
        bookType:"xlsx"
      })
      fs.writeFileSync(newFilepath,result);
      this.alert(`成功生成文件${newFilepath}`,"成功");
    },
    genStyle(WorkBook){
      let contentStyle = [{wch:20},{wch:20},{wch:20},{wch:8},{wch:8},{wch:3},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20}];
      let indexStyle = new Array(20).fill(1).map(v =>({wch:20}));
      let Sheets = WorkBook.Sheets;
      for(let bookName in Sheets){
        if(bookName == "INDEX"){
          Sheets[bookName]["!cols"] = indexStyle;
        }else{
          Sheets[bookName]["!cols"] = contentStyle;
        }
      }
    },
    async handleData(jsonData,WorkBook){
      let notStandardFields = [];
      let distData = {};
      for(let name in jsonData){
        if(name == "INDEX") continue;
        if(!distData[name]){
          distData[name] = {};
        }
        let curSheet = jsonData[name];
        for(let i=0;i<curSheet.length;i++){
          // B G
          let row = curSheet[i];
          if(String(row.B).trim()){
            let key = "G"+(i + 1);
            if(i > 5){
              let enField = await this.findEnField(row.B,notStandardFields);
              distData[name][key] = enField;
            }
            
          }
        }
      }
      for(let sheetName in distData){
        for(let colRow in distData[sheetName]){
          let rowObj = WorkBook.Sheets[sheetName][colRow];
          if(rowObj){
            rowObj.v = distData[sheetName][colRow];
          }
        }
      }
      if(notStandardFields.length !=0){
        let msgStr = notStandardFields.map(v => `<span style="margin-left:5px;">${v}</span>`).join("")
        this.alert(msgStr,"以下字段联系标准组添加后再生成接口");
      }
      return notStandardFields.length == 0;
    },
    async findEnField(cnField,notStandardFields=[]){
      let excludeKey = ["中文名称"];
      if(excludeKey.includes(cnField)){
        return "";
      }
      return "test_field"
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
// @import "./GenInterface.scss";
</style>
