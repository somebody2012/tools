<template>
  <div class="GenStandardFieldSql">
    <el-steps :space="200" :active="active" finish-status="success">
      <el-step title="导出统计模板"></el-step>
      <el-step title="导入数据"></el-step>
      <el-step title="生成sql"></el-step>
    </el-steps>
    <el-row>
      <el-button @click="exportExcelTpl" type="primary" size="mini">导出统计模板</el-button>
      <el-button @click="importExcel" type="primary" size="mini">导入数据</el-button>
      <el-button @click="genSql" type="primary" size="mini">生成sql</el-button>
      <el-button @click="reset" type="primary" size="mini">重置</el-button>
    </el-row>
    <el-divider content-position="left">已经存在的字段：</el-divider>
    <el-card class="box-card">
      <div>
        <span v-for="(item,i) in existFields" :key="i" >{{item.A}} </span>
        <div v-if="existFields.length == 0">无</div>
      </div>
    </el-card>
    <el-divider content-position="left">数据不完整字段：</el-divider>
    <el-card class="box-card">
      <div>
        <span v-for="(item,i) in notCompletionFields" :key="i" >{{item.A}} </span>
        <div v-if="notCompletionFields.length == 0">无</div>
      </div>
    </el-card>
    <el-divider content-position="left">有效字段：</el-divider>
    <el-card class="box-card">
      <div>
        <span v-for="(item,i) in sqlFields" :key="i" >{{item.COLM_DESC}} </span>
        <div v-if="sqlFields.length == 0">无</div>
      </div>
    </el-card>
    <input type="file" @change="inputFileChange" ref="inputFile" style="display:none;" accept="application/vnd.ms-excel">
  </div>
</template>
<script>
import FileUtils from "@/utils/file-utils.js";
import commRequest from "@/utils/comm-request.js";
import CommUtils from "@/utils/comm-utils.js";
export default {
  name:"GenStandardFieldSql",
  mixins:[],
  validators:{},
  props:{},
  data(){
    return {
      active:1,
      userName:"",
      notCompletionFields:[],//excel 数据统计不完整
      existFields:[],//存在字段
      sqlFields:[],//剩余字段
      allFieldsData:[],//[{label:"",value:""}]
      filepath:"",
      allWordRoot:[],//所有词根[{label:"中文",value:"chinese"}]
    }
  },
  computed:{},
  watch:{},
  methods:{
    exportExcelTpl(){
      this.active = 1;
      let colsStyle = [
        {wch:25},
        {wch:25},
        {wch:25},
        {wch:25},
        {wch:30},
      ];
      let dataArr = [
        {"字段中文名称":"","字段长度(默认0)":"","小数位长度(默认0)":"","组件标签":"","英文字段":""}
      ];
      let filename = `缺失字段统计模板_${this.userName||""}.xls`;
      FileUtils.exportJsonToExcel(dataArr,filename,colsStyle);
    },
    async importExcel(){
      this.$refs.inputFile.value = "";
      this.$refs.inputFile.click();
      this.active = 2;
    },
    async inputFileChange(e){
      let file = e.target.files[0];
      let path = file.path;
      let extname = window.m.path.extname(file.path);
      this.filepath = file.path;
      if(![".xls",".xlsx"].includes(extname)){
        this.$notify({message:"必须是excel"});
        return;
      }
      let res = await FileUtils.readExcelAsync(file);
      let Sheet1 = res.data.Sheet1.slice(1);
      Sheet1 = Sheet1.map(v => {
        return {
          A:String(v.A).trim(),//字段中文名称
          B:String(v.B).trim(),//字段长度(默认0)
          C:String(v.C).trim(),//小数位长度(默认0)
          D:String(v.D).trim(),//组件标签
          E:String(v.E).trim(),//英文字段
        }
      });
      let notEmptyData = Sheet1.filter(v => {
        let values = [v.A,v.D];
        let isNotEmpty = values.every(v => v);
        if(!isNotEmpty){
          this.notCompletionFields.push(v);
        }
        return isNotEmpty;
      });
      this.findAndTransFields(notEmptyData,this.allFieldsData);
    },
    // 查找转换英文字段
    findAndTransFields(excelData,allFieldsData){
      let notFindEnfieldArr = [];
      for(let i=0;i<excelData.length;i++){
        let curExcelRow = excelData[i];// {A:"",B:"",C:"",D:"",E:""}
        if(!curExcelRow.A || !curExcelRow.D){
          this.notCompletionFields.push(curExcelRow);
          continue;
        }
        let cnField = curExcelRow.A;
        let isExistObj = this.findEnField(cnField,allFieldsData);
        if(isExistObj){
          this.existFields.push(curExcelRow);
        }else{
          let COLM_DESC = curExcelRow.A;
          let COLM_ARCHT_INFO = curExcelRow.A;
          let COLM_NM = CommUtils.findEnFieldFromWordRoot(curExcelRow.A,this.allWordRoot);
          if(!COLM_NM) {
            notFindEnfieldArr.push(COLM_DESC);
            continue;
          }
          let ENG_FULLNAME = "";
          let CLSF = curExcelRow.A;
          let DATA_TYP = curExcelRow.A;
          let DGIT = curExcelRow.B || 0;
          let DEC_DGIT = curExcelRow.C || 0;
          let COMNT = curExcelRow.A;
          let COMP_TAG = curExcelRow.D;
          let ALISE = "";
          let obj = {
            COLM_DESC:COLM_DESC,
            COLM_ARCHT_INFO:COLM_ARCHT_INFO,
            COLM_NM:COLM_NM,
            ENG_FULLNAME:ENG_FULLNAME,
            CLSF:CLSF,
            DATA_TYP:DATA_TYP,
            DGIT:DGIT,
            DEC_DGIT:DEC_DGIT,
            COMNT:COMNT,
            COMP_TAG:COMP_TAG,
            ALISE:ALISE,
          };
          this.sqlFields.push(obj);
        }
      }
      if(notFindEnfieldArr.length!=0){
        let str = notFindEnfieldArr.join("  ");
        this.alert(`${str}`,"一下字段无法由词根生成");
      }
    },
    findEnField(cnField,allFieldsData){
      let isExist = allFieldsData.find(v => v.label == cnField);
      return isExist;
    },
    genSql(){

      let sqlsArr = this.sqlFields.map(v => {
        let str = `INSERT INTO \`pub_db\`.\`IB_IP_DICTRY_STMT\`(\`COLM_DESC\`, \`COLM_ARCHT_INFO\`, \`COLM_NM\`, \`ENG_FULLNAME\`, \`CLSF\`, \`DATA_TYP\`, \`DGIT\`, \`DEC_DGIT\`, \`COMNT\`, \`COMP_TAG\`, \`ALISE\`) VALUES ('${v.COLM_DESC}', '${v.COLM_ARCHT_INFO}', '${v.COLM_NM}', '${v.ENG_FULLNAME}', '${v.CLSF}', '${v.DATA_TYP}', ${v.DGIT}, ${v.DEC_DGIT}, '${v.COMNT}', '${v.COMP_TAG}', '');`
        return str;
      });
      let sqls = sqlsArr.join("\n");
      let {name,dir} = window.m.path.parse(this.filepath);
      let filename = `${name}.sql`;
      let sqlPath = window.m.path.resolve(dir,`${name}.sql`);
      this.alert(sqlPath,"提示");
      window.m.fs.writeFileSync(sqlPath,sqls,{encoding:"utf-8"});
      this.reset();
      this.active = 3;
    },
    fetchStandardAllFields(){
      commRequest.queryAllStandardFields()
        .then(res => {
          this.allFieldsData = res.data;
        });
    },
    fetchWordRoot(){
      commRequest.fetchWordRoot()
        .then(res => {
          let data = res.data.map(v => {
            return {
              label:v.COMNT,
              value:v.DATA_DICTRY
            }
          });
          this.allWordRoot = data;
        });
    },
    reset(){
      this.notCompletionFields = [];
      this.existFields = [];
      this.sqlFields = [];
      this.active = 1;
    },
    // 从词根表中找单词
    findEnFieldFromWordRoot(cnField,allWordRoot){
      let fieldCharsArr = cnField.split("");
      let curIndex = 0;
      let enFields = [];
      while(curIndex < fieldCharsArr.length){
        let enFieldItems = [];
        for(let i=curIndex;i<fieldCharsArr.length;i++){
          let cnFieldItem = fieldCharsArr.slice(curIndex,i+1).join("");
          let tempEnField = this.findWord(cnFieldItem,allWordRoot);
          if(tempEnField){
            enFieldItems.push({cnField:tempEnField,index:i});
          }
        }
        if(enFieldItems.length == 0) return "";// 没根据词根找到单词
        let indexs = enFieldItems.map(v => v.index);
        let maxIndex = Math.max.apply(null,indexs);
        curIndex = maxIndex+1;
        let maxIndexObj = enFieldItems.find(v => v.index == maxIndex);
        enFields.push(maxIndexObj.cnField);
      }
      return enFields.join("_");
    },
    findWord(curField,allWordRoot){
      let resObj =  allWordRoot.find(v => v.label == curField);
      if(resObj){
        return resObj.value;
      }
    }
  },
  mounted(){
    this.fetchWordRoot();
    this.fetchStandardAllFields();
    
    let {child_process} = window.m;
    child_process.exec('git config --global user.name',{encoding:"utf-8"},(err,stdout,stderr)=>{
      let userName = stdout.replace(/[\n\s]/g,'');
      this.userName = userName;
    })
  },
  beforeDestroy(){
  }
}
</script>
<style lang="scss" scoped>
.GenStandardFieldSql{
  display: block;
}
</style>