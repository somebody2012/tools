<template>
  <div class="GenTrade">
    <el-button @click="genTradeTpl">生成交易</el-button>
    <div>
      {{tplsStr}}
    </div>
  </div>
</template>

<script>
import GenTradeConfig from "./GenTradeUtils/GenTradeConfig.js"
import genTpls from "./GenTradeUtils/genTpls.js";
export default {
  name: 'GenTrade',
  data () {
    return {
      tplsStr:"",
      excelFieldsAll:[
        {
          groupId:0,
          groupTitle: "客户信息",
          isFullRow: false,
          compTpl:"<div></div>"
        }
      ],
      methodsAll:[],
      distTplData:[]
    }
  },
  methods:{
    async genTradeTpl(){
      let res = await GenTradeConfig.getStandardConfig(this);
      if(!res.isSuccess){
        this.$notify({title:res.msg,duration: 0});
        return;
      }
      let standardFields = res.data;
      /**
      [
        {
          :requisite: true
          compAttr: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
          groupId: 0
          groupTitle: "客户信息"
          isFullRow: false
          label: "账号"
          tagName: "custom-input"
          value: "ACC"
        }
      ]
       */
      let {excelData,msgs} = GenTradeConfig.transformExcelData(this,standardFields);//exceldata用默认值
      debugger
      if(msgs.length > 0){
        msgs = msgs.map(v => ` ${v} `);
        msgs.unshift(`<div style="font-weight:bold;font-size:17px;">请联系标准组添加以下字段后再生成交易</div>`);
        let msgHtml = msgs.join("");
        this.alert(msgHtml,"提示");
        return;
      }
      /**
       * excelFieldsAll
       * [
       *   {
       *     groupId:0,
       *     groupTitle: "客户信息",
       *     isFullRow: false,
       *     compTpl:"<div></div>"
       *   }
       * ]
       */
      let {excelFieldsAll,methodsAll,dataFieldsAll} = genTpls.genAll(this,excelData);
      excelFieldsAll = excelFieldsAll.map(v => {
        return {
          groupId:v.groupId,
          groupTitle:v.groupTitle,
          isFullRow:v.isFullRow,
          compTpl:v.compTpl,
        }
      });
      let distTplData = genTpls.twoDimensionalArray(this,excelFieldsAll);
      this.distTplData = distTplData;
      this.writeToFile({distTplData,methodsAll,dataFieldsAll});
    },
    writeToFile({distTplData,methodsAll,dataFieldsAll}){
      let _this = this;
      // this.tplsStr = tplCompsStrAll + methodsTpl + datasTpl;
      // let root = m.process.cwd();
      // let outDir = m.path.resolve(root,"dist/trade-out/","App.vue");
      // window.m.fs.writeFileSync(outDir,this.tplsStr);
      let renderData = {
        tradeCode:"t00101001",
        groups:distTplData,
        dataFieldsAll:dataFieldsAll,
        methodsAll:methodsAll
      };
      // debugger
      let {path,fs,process,ejs} = window.m;
      let root = window.m.process.cwd();
      let srcAppPath = path.resolve(root,"src/vue-render/tpls","App.ejs");
      let distAppPath = path.resolve(root,"src/vue-render/tpls","App.vue");
      ejs.renderFile(srcAppPath,renderData,function(err,data){
        if(err){
          _this.alert(`写入文件${srcAppPath}失败`);
        }else{
          // data = data.replace(/\n\s+$/gm,"");
          fs.writeFileSync(distAppPath,data,{pretty:true});
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
