<template>
  <div class="GenPrintF">
    <!-- <el-button type="primary">选择需要解析的json文件</el-button> -->
    

    <el-form ref="form" label-width="130px" size="mini">
      <el-form-item label="FCClient路径：">
        <el-input v-model="tradeRoot" style="width:100%;" />
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="F表文件名：">
            <el-input v-model="fTableName" style="width:100%;" placeholder="00101001.aft" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="F表标题：">
            <el-input v-model="title" style="width:100%;" />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="中文字段宽度：">
            <el-input v-model="labelWidth" style="width:100%;" />
          </el-form-item>
        </el-col> -->
        
      </el-row>
      <el-form-item label="F表字段：">
        <el-input v-model="config" type="textarea" :autosize="{ minRows: 10, maxRows: 40}" placeholder="
        输入字段格式:账号|客户姓名|性别|账户类型
        如果为表格则逗号隔开:性别,账号,客户姓名
        如果有字段和表格则:账号|客户姓名|性别|性别,账号,客户姓名"></el-input>
      </el-form-item>
    </el-form>
    <el-row>
      <el-button @click="parseFields" type="primary">生成F表</el-button>
    </el-row>



  </div>
</template>
<script>
import commRequest from "@/utils/comm-request.js";
export default {
  name: "GenPrintF",
  components: {},
  props: {

  },
  data() {
    return {
      labelWidth:"17.5",
      tradeRoot:"E:\\work\\zantong\\qdgz_TEClient\\FCClient",
      fTableName:"xxx.aft",
      config:"IMEI序列号|SIM卡序列号|保证金金额|保证金账号|保证金账户标志|IMEI序列号,SIM卡序列号|保证金金额,保证金账号,保证金账户标志",
      title:"无标题",
      //isAmt: true isFullRow: false label: "保证金金额" value: "MARGN_AMT"
      standardField:[{label:"账号",value:"acc"},{label:"客户姓名",value:"custName"},{label:"性别",value:"sex"}],//[{label:"",value:""}]
      fields:[],//[{label:"",value:""}]
      tables:[],//[{label:"",value:""}]
    }
  },
  methods: {
    async parseFields(){
      let res = await this.checkPath();
      if(!res) return;
      let fields1 = this.config.split("|").map(v => v.replace(/[\s\t\n]/g,"")).filter(v => v);
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
        v = v.replace(/[\s\t\n]/g,"");
        let fieldObj = this.findEnField(v);
        return {
          label:v,
          value:`TradeData.${fieldObj.value}`,
          isAmt:fieldObj.isAmt,
          isFullRow:fieldObj.isFullRow,
        }
      })
      this.tables = tables.map(v => {
        return v.map(v1 => {
          v1 = v1.replace(/[\s\t\n]/g,"");
          let fieldObj = this.findEnField(v1);
          return {
            label:v1,
            value:`TradeData.${fieldObj.value}`,
            isAmt:fieldObj.isAmt,
            isFullRow:fieldObj.isFullRow,
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
      return {
        value:curObj.value,
        isAmt:curObj.isAmt,
        isFullRow:curObj.isFullRow,
      };
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
      let tradeRootExist = window.m.fs.existsSync(this.tradeRoot);
      if(tradeRootExist){
        window.m.store.set("tradeRoot",this.tradeRoot);
      }else{
        this.alert(`项目路径不存在\n${this.tradeRoot}`);
        return;
      }
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
    // 转换成一行两列
    transformFields(fields){
      let distArr = [];
      for(let i=0;i<fields.length;i++){
        let curItem = fields[i];
        if(distArr.length == 0){
          distArr.push([curItem]);
        }else{
          let lastItemArr = distArr[distArr.length-1];
          if(lastItemArr.length == 1){
            let lastItemArrOfLast = lastItemArr[lastItemArr.length-1];
            if(lastItemArrOfLast.isFullRow || lastItemArrOfLast.isAmt || curItem.isFullRow || curItem.isAmt){
              distArr.push([curItem]);
            }else{
              lastItemArr.push(curItem);
            }
            continue;
          }
          if(lastItemArr.length == 2){
            distArr.push([curItem]);
          }
        }
      }
      return distArr;
    },
    async genFtableXml(fields,tables){
      let {path,fs,process,ejs} = window.m;
      //[ [{label:"",value:""}，{label:"",value:""}] ]
      let groups = this.transformFields(fields);
      console.log("this.groups",JSON.stringify(groups));
      console.log("this.tables",JSON.stringify(tables));
      let renderData = {
        title:this.title,
        groups:groups,
        tables:tables,
        labelWidth1:this.labelWidth
      };
      let srcAftPath = this.buildPath("src/vue-render/tpls/aft.ejs");
      let tplStr = fs.readFileSync(srcAftPath,{encoding:"utf-8"});
      let appTpl = ejs.render(tplStr,renderData);
      let distAppPath = path.resolve(this.tradeRoot,"print",this.fTableName);
      // let distAppPath = path.resolve("D:\\ABIDE-20180302\\ABIDE-20180302\\print\\test\\printType",this.fTableName)
      console.log("生成F表：",distAppPath);
      fs.writeFileSync(distAppPath,appTpl,{encoding:"utf-8"});
      this.alert(`生成F表成功\n${distAppPath}`);
    },
    async queryAllStandardFields(){
      let res = await commRequest.queryAllStandardFields();
      if(!res.isSuccess){
        this.alert("获取标准字段出错");
        return;
      }
      this.standardField = res.data;
    }
  },
  watch: {

  },
  filters: {

  },
  mounted() {
    // this.parseFields();
    this.queryAllStandardFields();
    let exists = window.m.store.has("tradeRoot");
    if(exists){
      this.tradeRoot = window.m.store.get("tradeRoot");
    }
  },
}
</script>
<style lang="scss" scoped>
// @import "./GenPrintF.scss";
</style>
