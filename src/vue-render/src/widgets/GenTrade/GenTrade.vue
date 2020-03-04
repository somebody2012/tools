<template>
  <div class="GenTrade">
    <el-divider content-position="left">交易属性</el-divider>
    <el-form ref="titleForm" :model="tradeAttrArea" label-width="130px" size="mini">
      <el-row>
        <el-col :span="8">
          <el-form-item label="FCClient路径" :rules="titleRule" prop="tradeRoot">
            <el-input @change="tradeRootChange" ref="tradeRoot" v-model="tradeAttrArea.tradeRoot"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开发组" :rules="titleRule" prop="devGroup">
            <el-select @focus="devGroupChildBlur" @change="devGroupChildBlur" v-model="tradeAttrArea.devGroup" filterable placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in devGroupOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="子目录" prop="devGroupChild">
            <el-select v-model="tradeAttrArea.devGroupChild" filterable placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in devGroupOptionsChild"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="交易名称" :rules="titleRule" prop="tradeName">
            <el-input v-model="tradeAttrArea.tradeName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开发者" :rules="titleRule" prop="userName">
            <el-input v-model="tradeAttrArea.userName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮件" :rules="titleRule" prop="email">
            <el-input v-model="tradeAttrArea.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    <el-divider content-position="left">菜单属性</el-divider>
    <el-row>
      <el-col :span="6">
        <el-form-item label="菜单位置" :rules="titleRule" prop="menuPosition">
          <el-select v-model="tradeAttrArea.menuPosition" style="width:100%;">
            <el-option label="客户服务" value="001"></el-option>
            <el-option label="内部服务" value="002"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="6位交易码" :rules="titleRule" prop="tradeCodeBiz">
          <el-input v-model="tradeAttrArea.tradeCodeBiz"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="8位交易码" :rules="titleRule" prop="tradeCode">
          <el-input v-model="tradeAttrArea.tradeCode"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="父级菜单" :rules="titleRule" prop="parentMenu">
          <el-select v-model="tradeAttrArea.parentMenu" style="width:100%;" filterable>
            <el-option v-for="(item,index) in parentMenuOptions" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="菜单icon" :rules="titleRule" prop="menuIcon">
          <el-select v-model="tradeAttrArea.menuIcon" style="width:100%;">
            <el-option v-for="(item,index) in iconsOptions" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="是否可见" :rules="titleRule" prop="visiable">
          <el-select v-model="tradeAttrArea.visiable" style="width:100%;">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="签到可见" :rules="titleRule" prop="signVisiable">
          <el-select v-model="tradeAttrArea.signVisiable" style="width:100%;">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      
    </el-row>
    </el-form>
    
    <el-row>
      <el-button @click="genTradeTpl" type="primary" icon="el-icon-document">生成交易</el-button>
      <el-button @click="gentTradeMenu" type="primary" icon="el-icon-document">生成菜单sql</el-button>
      <el-button @click="chooseExcel" icon="el-icon-upload2">导入交易统计excel</el-button>
      <el-button @click="saveTmpExcel" icon="el-icon-download">生成交易统计模板excel</el-button>
    </el-row>
    <el-divider content-position="left">交易内容</el-divider>
    <div>
      <el-form ref="form" label-width="80px" size="mini">
        <div class="groups">
          <el-collapse v-model="collapseValues">
            <div v-for="(group,index) in excelDataRender" :key="index" class="group">
              <el-collapse-item :name="group.label">
                <template slot="title">
                  <span>组：{{group.groupTitle}}</span>
                  <span style="margin-left:30px;">栏位：{{group.label}}</span>
                </template>
                <el-row>
                  <div v-for="(compo,index1) in group.compAttr" :key="index1">
                    <el-col :span="6">
                      <template v-if="compo.name=='paraFile'">
                        <el-form-item :label="compo.name" :rules="rules">
                          <el-select @change="paraFileOptionsChange(compo.value,group.compAttr)" v-model="compo.value" placeholder="请选择" filterable style="width:100%;">
                            <el-option v-for="item in paraFileOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                          </el-select>
                        </el-form-item>
                      </template>
                      <template v-else-if="compo.name=='listName'">
                        <el-form-item :label="compo.name" :rules="rules">
                          <el-select v-model="compo.value" placeholder="请选择" filterable style="width:100%;">
                            <el-option v-for="item in compo.listNameOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                          </el-select>
                        </el-form-item>
                      </template>
                      <template v-else>
                        <el-form-item :label="compo.name" :rules="rules">
                          <input v-model="compo.value" style="width:100%;">
                        </el-form-item>
                      </template>
                      
                    </el-col>
                  </div>
                </el-row>
              </el-collapse-item>
            </div>
          </el-collapse>
        </div>
        
      </el-form>
    </div>
    <input type="file" @change="inputFileChange" ref="inputFile" style="display:none;">
    <el-dialog :visible.sync="dialogVisiable" title="菜单sql" :close-on-click-modal="false" :close-on-press-escape="false">
      <h3>生成菜单sql</h3>
      <el-input v-model="menuSqlStr" :autosize="{ minRows: 10, maxRows: 100 }" type="textarea"></el-input>
    </el-dialog>
  </div>
</template>

<script>
import GenTradeConfig from "./GenTradeUtils/GenTradeConfig.js"
import genTpls from "./GenTradeUtils/genTpls.js";
import FileUtils from "@/utils/file-utils.js";
import commRequest from "@/utils/comm-request.js";
export default {
  name: 'GenTrade',
  data () {
    return {
      titleRule:[{ required: true, message: '不能为空'}],
      tradeAttrArea:{
        tradeRoot:"E:\\work\\zantong\\qdgz_TEClient\\FCClient",
        devGroup:"asu-test",
        devGroupChild:"",
        tradeCode:"00101001",
        tradeName:"测试交易生成",
        userName:"",
        email:"",
        tradeCodeBiz:"010101",
        menuPosition:"001",//菜单位置
        menuIcon:"inner-gird-maintain.svg",//菜单icon
        parentMenu:"0101",//父级菜单
        visiable:"1",//是否可见
        signVisiable:"1",//签到可见
      },
      devGroupOptionsChild:[],
      devGroupOptions:[
        {label:"测试-asu-test",value:"asu-test"}
      ],
      collapseValues:[],
      collapseValuesButtom:[],
      rules:[
        // { required: true, message: '不能为空'}
        {type:"any"}
      ],
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
      distTplData:[],
      standardFields:[],
      standardFieldsBackup:[],//标准字段备份
      standardFieldsButtom:[],
      excelDataRender:[],//页面显示字段 提交按钮上面 下面区域
      paraFileOptions:[],//下拉框
      tMethods:[],
      tDataFields:[],
      tableTpls:[],
      buttomArea:[],//提交按钮下面区域数据
      excelData:[],
      cascaderGroup:[],
      cascaderGroupOptions:[
        {
          label:"label1",
          value:"value1",
          children:[
            {label:"ddd",value:"vvv"}
          ]
        }
      ],
      iconsOptions:[
        {label:"inner-gird-maintain.svg",value:"inner-gird-maintain.svg"},
        {label:"inner-grid-01.png",value:"inner-grid-01.png"},
        {label:"icon_trade_debt.png",value:"icon_trade_debt.png"},
        {label:"icon_trade_other.png",value:"icon_trade_other.png"},
        {label:"icon_trade_dayend.png",value:"icon_trade_dayend.png"},
        {label:"icon_trade_feature.png",value:"icon_trade_feature.png"},
        {label:"icon_trade_default.png",value:"icon_trade_default.png"},
        {label:"inner-gird-finance.svg",value:"inner-gird-finance.svg"},
        {label:"inner-gird-query.svg",value:"inner-gird-query.svg"},
        {label:"inner-gird-other.svg",value:"inner-gird-other.svg"},
        {label:"icon_trade_inside.png",value:"icon_trade_inside.png"},
        {label:"inner-grid-04.png",value:"inner-grid-04.png"},
        {label:"inner-grid-other.svg",value:"inner-grid-other.svg"},
        {label:"inner-grid-03.png",value:"inner-grid-03.png"},
      ],
      parentMenuOptions:[],
      dialogVisiable:false,
      menuSqlStr:""
    }
  },
  methods:{
    saveTmpExcel(){
      let dataArr = [
        {"组名称(trade-group)":"","栏位名称":"","必输(Q)|不可用(D)|只读(R)|不可见(V)":""},
        {"组名称(trade-group)":"","栏位名称":"","必输(Q)|不可用(D)|只读(R)|不可见(V)":""},
        {"组名称(trade-group)":"","栏位名称":"提交","必输(Q)|不可用(D)|只读(R)|不可见(V)":""},
      ];
      FileUtils.exportJsonToExcel(dataArr,"生成交易模板.xls");
    },
    chooseExcel(){
      let isExists = this.tradeRootChange();
      if(!isExists) return;
      // 获取下拉框
      this.fetchParaFileOptions();
      this.$refs.inputFile.value = "";
      this.$refs.inputFile.click();
    },
    async inputFileChange(e){
      let file = e.target.files[0];
      let path = file.path;
      let extname = window.m.path.extname(file.path);
      if(![".xls",".xlsx"].includes(extname)){
        this.$notify({message:"必须是excel"});
        return;
      }
      let res = await FileUtils.readExcelAsync(file);
      let Sheet1 = res.data.Sheet1.slice(1);
      Sheet1 = Sheet1.filter(v=>{
        if(v.B.trim() == "提交"){
          return true;
        }else{
          if(v.A.trim() == "" && v.B.trim() == "" && v.C.trim() == ""){
            return false;
          }else{
            return true;
          }
        }
      });
      let excelData = Sheet1.map(v => {
        let C = String(v.C).toUpperCase();
        let requisite = C.includes("Q");
        let disabled = C.includes("D");
        let readonly = C.includes("R");
        let visible = C.includes("V"); 
        let obj = {
          "groupTitle":v.A,
          "label":v.B,
          ":requisite":requisite,
          ":disabled":disabled,
          ":readonly":readonly,
          ":visible":!visible,
        }
        if(obj[":visible"]){
          delete obj[":visible"];
        }
        return obj;
      });
      this.parseExcel(excelData);
    },
    calcCollapseValues(){
      let names = this.excelData.map(v => {
        let isNeedOpen = v.compAttr.every(v1 => {
          return v1.value !== "" && v1.value !== undefined;
        });
        if(!isNeedOpen){
          return v.label;
        }
      });
      this.collapseValues = names.filter(v => v);
    },
    async genStandardField(){
      let res = await GenTradeConfig.getStandardConfig(this);
      if(!res.isSuccess){
        this.$notify({title:res.msg,duration: 0});
        return;
      }
      this.standardFields = JSON.parse(JSON.stringify(res.data));
      this.standardFieldsBackup = JSON.parse(JSON.stringify(res.data));
      this.standardFieldsButtom = JSON.parse(JSON.stringify(res.data));
    },
    parseExcel(excelData1){
      excelData1 = excelData1.map(v => {
        v.groupTitle = String(v.groupTitle);
        if(!v.groupTitle.trim()){
          v.groupTitle = "默认分组";
        }
        return v;
      })
      /**
       * 表格
       * tableInfo [{groupTitle:"","label":"账号|姓名|年龄"}]
       */
      let tableInfo = excelData1.filter(v => v.label.includes("|"));
      let {tMsgs,tMethods,tDataFields,tableTpls} = genTpls.handleTableInfo(tableInfo,this.standardFields);
      this.tMethods = tMethods;
      this.tDataFields = tDataFields;
      this.tableTpls = tableTpls;
      // 提交按钮上面区域
      excelData1 = excelData1.filter(v => !v.label.includes("|"));
      let buttonIndex = excelData1.findIndex(v => v.label.trim()=="提交");
      if(buttonIndex == -1){
        buttonIndex = excelData1.length;
      }
      let buttomArea1 = excelData1.slice(buttonIndex+1,excelData1.length);
      excelData1 = excelData1.slice(0,buttonIndex);
      let {excelData,msgs} = GenTradeConfig.transformExcelData(this,this.standardFields,excelData1);
      msgs = msgs.concat(tMsgs)
      if(msgs.length > 0){
        msgs = msgs.map(v => ` ${v} `);
        msgs.unshift(`<div style="font-weight:bold;font-size:17px;">请联系标准组添加以下字段后再生成交易</div>`);
        let msgHtml = msgs.join("");
        this.alert(msgHtml,"提示");
        return;
      }
      
      
      // 提交按钮下面区域
      let buttomRes = GenTradeConfig.transformExcelData(this,this.standardFieldsButtom,buttomArea1);

      let buttomArea = buttomRes.excelData;
      let msgs1 = buttomRes.msgs;
      if(msgs1.length > 0){
        msgs1 = msgs1.map(v => ` ${v} `);
        msgs1.unshift(`<div style="font-weight:bold;font-size:17px;">请联系标准组添加以下字段后再生成交易</div>`);
        let msgHtml = msgs1.join("");
        this.alert(msgHtml,"提示");
        return;
      }
      this.excelData = [];
      this.excelData = excelData;
      this.calcCollapseValues();
      this.buttomArea = [];
      this.buttomArea = buttomArea;
      this.excelDataRender = this.excelData.concat(this.buttomArea)
    },
    async genTradeTpl(){
      let passed = await this.validateForm();
      if(!passed) {
        this.$notify({type:"warning",message:"交易属性填完"})
        return;
      }
      if(this.excelDataRender.length == 0){
        this.$notify({type:"warning",message:"先导入统计的excel"})
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
      let {excelFieldsAll,methodsAll,dataFieldsAll,importArr} = genTpls.genAll(this,this.excelData);
      excelFieldsAll = excelFieldsAll.map(v => {
        return {
          groupId:v.groupId,
          groupTitle:v.groupTitle,
          isFullRow:v.isFullRow,
          compTpl:v.compTpl,
        }
      });
      let buttomObj = genTpls.genAll(this,this.buttomArea,true);
      let excelFieldsAllB = buttomObj.excelFieldsAll;
      let methodsAllB = buttomObj.methodsAll;
      let dataFieldsAllB = buttomObj.dataFieldsAll;
      excelFieldsAllB = excelFieldsAllB.map(v => {
        return {
          groupId:v.groupId,
          groupTitle:v.groupTitle,
          isFullRow:v.isFullRow,
          compTpl:v.compTpl,
        }
      });

      let distTplData = genTpls.twoDimensionalArray(this,excelFieldsAll);
      let distTplDataB = genTpls.twoDimensionalArray(this,excelFieldsAllB);
      methodsAll = methodsAll.concat(methodsAllB);
      dataFieldsAll = dataFieldsAll.concat(dataFieldsAllB);
      dataFieldsAll = dataFieldsAll.filter((v,i)=>dataFieldsAll.findIndex(v1 => v1.value == v.value) == i);
      methodsAll = methodsAll.filter((v,i)=>methodsAll.indexOf(v) == i);
      this.writeToFile({distTplData,distTplDataB,methodsAll,dataFieldsAll,importArr});
      // 重置数据
      this.resetData();
    },
    async gentTradeMenu(){
      let passed = await this.validateForm();
      if(!passed) {
        this.$notify({type:"warning",message:"交易属性填完"})
        return;
      }
      let MENU_VIEW_NO = this.tradeAttrArea.menuPosition;
      let MENU_NO = this.tradeAttrArea.tradeCode;
      let MENU_NM = this.tradeAttrArea.tradeName;
      let MENU_ICON_PATH = this.tradeAttrArea.menuIcon;
      let MENU_PATH = "";
      let PARE_RANK_MENU_NO = this.tradeAttrArea.parentMenu;
      let VIS_FLG = this.tradeAttrArea.visiable == "1" ? "1" : "0";
      let SGNIN_VIS_FLG_CD = this.tradeAttrArea.signVisiable == "1" ? "1" : "0";
      let BIZ_MENU_NO = this.tradeAttrArea.tradeCodeBiz;
      let BIZ_MENU_NM = this.tradeAttrArea.tradeName;

      let devGroup = this.tradeAttrArea.devGroup;
      let devGroupChild = this.tradeAttrArea.devGroupChild ? "/" + this.tradeAttrArea.devGroupChild : "";
      let tradeCodeT = "/t" + this.tradeAttrArea.tradeCode;
      let html = "/index.html";
      MENU_PATH = "modules/trade/" + devGroup + devGroupChild + tradeCodeT + html;
      let sql = `INSERT INTO \`pub_db\`.\`IB_UPM_MENU_INFO\`(\`APP_NO\`, \`MENU_VIEW_NO\`, \`MENU_NO\`, \`MENU_NM\`, \`MENU_ICON_PATH\`, \`MENU_PATH\`, \`MENU_TYP_CD\`, \`QUNG_SEQ_NO\`, \`PARE_RANK_MENU_NO\`, \`VIS_FLG\`, \`SYNC_ASYNC_FLG\`, \`BLNG_LPR_CD\`, \`MATN_ORG_NO\`, \`MATN_TM\`, \`MATN_DT\`, \`REMRK_1\`, \`REMRK_2\`, \`REMRK_3\`, \`MATN_TELR_NO\`, \`SGNIN_VIS_FLG_CD\`, \`CLNT_MENU_FLG\`, \`IS_BPMN_FLG\`, \`MENU_SIZE\`, \`ACTIVE_CLASS\`, \`BCKGRND_COLR_CD\`, \`BCKGRND_PICT_PATH\`, \`LAYOUT_ROW\`, \`LAYOUT_COL\`, \`MENU_ENG_NM\`, \`BIZ_MENU_NO\`, \`BIZ_MENU_NM\`, \`STRK_BAL_FLG\`, \`NEED_PR_ELEC_SIGNET_FLG\`, \`UPLDG_ATCH_FLG\`) VALUES ('TE', '${MENU_VIEW_NO}', '${MENU_NO}', '${MENU_NM}', '${MENU_ICON_PATH}', '${MENU_PATH}', '02', 100, '${PARE_RANK_MENU_NO}', '${VIS_FLG}', '1', '0000', '0000', NULL, NULL, NULL, NULL, NULL, NULL, '${SGNIN_VIS_FLG_CD}', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '${BIZ_MENU_NO}', '${BIZ_MENU_NM}', NULL, NULL, NULL);`;
      this.menuSqlStr = sql;
      this.dialogVisiable = true;
    },
    writeToFile({distTplData,distTplDataB,methodsAll,dataFieldsAll,importArr}){
      let _this = this;
      // this.tplsStr = tplCompsStrAll + methodsTpl + datasTpl;
      // let root = m.process.cwd();
      // let outDir = m.path.resolve(root,"dist/trade-out/","App.vue");
      // window.m.fs.writeFileSync(outDir,this.tplsStr);
      let renderData = {
        tradeCode:`t${this.tradeAttrArea.tradeCode}`,
        tradeCodeBiz:this.tradeAttrArea.tradeCodeBiz,
        Author:`${this.tradeAttrArea.userName}   ${this.tradeAttrArea.email}`.replace(/\n/g,''),
        time:new Date(),
        tradeName:this.tradeAttrArea.tradeName,
        groups:distTplData,
        dataFieldsAll:dataFieldsAll,
        methodsAll:methodsAll,
        //表格
        tMethods:this.tMethods,
        tDataFields:this.tDataFields,
        tableTpls:this.tableTpls,
        // 提交按钮下面区域
        buttomGroup:distTplDataB,
        importArr:importArr
      };
      let {path,fs,process,ejs} = window.m;
      let root = window.m.process.cwd();
      let srcAppPath = this.buildPath("src/vue-render/tpls/App.ejs");
      let tradeDirPath = path.resolve(this.tradeAttrArea.tradeRoot,"modules/trade",this.tradeAttrArea.devGroup,this.tradeAttrArea.devGroupChild,`t${this.tradeAttrArea.tradeCode}`);
      fs.mkdirpSync(tradeDirPath);
      let distAppPath = path.resolve(tradeDirPath,"App.vue");
      console.log(distAppPath,"写入成功");

      // app.vue
      let tplStr = fs.readFileSync(srcAppPath,{encoding:"utf-8"});
      let appTpl = ejs.render(tplStr,renderData);
      fs.writeFileSync(distAppPath,appTpl,{encoding:"utf-8"});
      //main.js
      let srcMainjsPath = this.buildPath("src/vue-render/tpls/main.ejs");
      // let tradeDirPath = path.resolve(this.tradeAttrArea.tradeRoot,"modules/trade",this.tradeAttrArea.devGroup,this.tradeAttrArea.devGroupChild,`t${this.tradeAttrArea.tradeCode}`);
      // fs.mkdirpSync(tradeDirPath);
      let distAppPathMainjs = path.resolve(tradeDirPath,"main.js");
      let tplStrMainjs = fs.readFileSync(srcMainjsPath,{encoding:"utf-8"});
      let appTplMainjs = ejs.render(tplStrMainjs,{});
      fs.writeFileSync(distAppPathMainjs,appTplMainjs,{encoding:"utf-8"});
      this.$notify({type:"success",title:"成功",message:"写入模板成功"});
    },
    tradeRootChange(){
      if(!/FCClient$/.test(this.tradeAttrArea.tradeRoot)){
        this.alert("必须以FCClient结尾");
        return;
      }
      let isExists = window.m.fs.existsSync(this.tradeAttrArea.tradeRoot);
      if(!isExists){
        this.alert(`FCClient项目根目录不存在:${this.tradeAttrArea.tradeRoot}`);
        this.$refs.tradeRoot.focus();
        return false;
      }
      this.fetchDevGroupOptions();
      window.m.store.set("tradeRoot",this.tradeAttrArea.tradeRoot);
      return true;
    },
    getUsernameEmail(){
      let {child_process} = window.m;
      child_process.exec('git config --global user.name',{encoding:"utf-8"},(err,stdout,stderr)=>{
        let userName = stdout.replace(/[\n\s]/g,'');
        this.tradeAttrArea.userName = userName;
      })
      child_process.exec('git config --global user.email',{encoding:"utf-8"},(err,stdout,stderr)=>{
        let email = stdout.replace(/[\n\s]/g,'');
        this.tradeAttrArea.email = email;
      })
    },
    validateForm(){
      return new Promise(resolve => {
        this.$refs.titleForm.validate(valid => {
          let rootExist = this.tradeRootChange();
          resolve(valid && rootExist);
        });
      });
    },
    fetchParaFileOptions(){
      let {fs,path} = window.m;
      let paraFilePath = path.resolve(this.tradeAttrArea.tradeRoot,"static/para/selector-config");
      let jsonFiles = fs.readdirSync(paraFilePath);
      jsonFiles = jsonFiles.filter(v => /\.json/.test(v));
      this.paraFileOptions = jsonFiles.map(v=>({label:v,value:v}))
    },
    //下拉框change
    paraFileOptionsChange(value,compAttr){
      let {fs,path} = window.m;
      let listNameObj = compAttr.find(v => v.name === "listName");
      if(!listNameObj){
        console.log("不存在listName",compAttr);
        return;
      }
      let listNamePath = path.resolve(this.tradeAttrArea.tradeRoot,"static/para/selector-config",value);
      let jsonStr = fs.readFileSync(listNamePath);
      let itemKeys = Object.keys(JSON.parse(jsonStr));
      listNameObj.listNameOptions = itemKeys.map(v => ({label:v,value:v}));
      listNameObj.value = "";
    },
    async fetchStandardFields(){
      let res = await commRequest.fetchStandardFields();
    },
    fetchDevGroupOptions(){
      let groupOptions = [];
      let {fs,path} = window.m;
      //modules\trade
      let tradePath = path.resolve(this.tradeAttrArea.tradeRoot,"modules/trade");
      let level1Dirs = fs.readdirSync(tradePath);
      level1Dirs.forEach(v => {
        let p = path.resolve(tradePath,v);
        let isDir = fs.statSync(p).isDirectory();
        if(isDir){
          groupOptions.push({label:v,value:v});
        }
      })
      this.devGroupOptions = groupOptions;
    },
    devGroupChildBlur(){
      let isExists = this.tradeRootChange();
      if(!isExists) return;
      this.tradeAttrArea.devGroupChild = "";
      if(!this.tradeAttrArea.devGroup) return;
      let groupOptions = [];
      let {fs,path} = window.m;
      let pa = path.resolve(this.tradeAttrArea.tradeRoot,"modules/trade",this.tradeAttrArea.devGroup);
      let level2Dirs = fs.readdirSync(pa);
      level2Dirs.forEach(v => {
        let p = path.resolve(pa,v);
        let isDir = fs.statSync(p).isDirectory();
        if(isDir){
          groupOptions.push({label:v,value:v});
        }
      })
      this.devGroupOptionsChild = groupOptions;
    },
    async getParentMenuInfo(){
      let res = await commRequest.getParentMenuInfo();
      if(!res.isSuccess){
        this.alert("获取父级餐单失败");
        return;
      }
      this.parentMenuOptions = res.data.map(v => {
        /**
         * MENU_NM: "客户账户管理"
         * MENU_NO: "01"
         */
        return {
          label:`${v.MENU_NM}-${v.MENU_NO}`,
          value:v.MENU_NO
        }
      });
    },
    resetData(){
      this.collapseValues = [];
      this.collapseValuesButtom = [];
      this.excelFieldsAll = [];
      this.methodsAll = [];
      this.distTplData = [];
      this.standardFields = JSON.parse(JSON.stringify(this.standardFieldsBackup));
      this.standardFieldsButtom = [];
      this.excelDataRender = [];
      this.tMethods = [];
      this.tDataFields = [];
      this.tableTpls = [];
      this.buttomArea = [];
      this.excelData = [];
      this.cascaderGroup = [];
      this.cascaderGroupOptions = [];
    }
  },
  computed:{
    
  },
  mounted(){
    this.genStandardField();
    // 获取邮件
    this.getUsernameEmail();
    let exists = window.m.store.has("tradeRoot");
    if(exists){
      this.tradeAttrArea.tradeRoot = window.m.store.get("tradeRoot");
    }
    this.getParentMenuInfo();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.GenTrade{
  .groups{
    .group{
      /deep/
      .el-collapse-item{
        border-top: 1px solid grey;
      }
    }
  }
}

</style>
