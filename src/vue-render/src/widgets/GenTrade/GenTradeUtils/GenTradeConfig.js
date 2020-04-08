import commRequest from "@/utils/comm-request.js";
import syncFieldsInfo from "./syncFieldsInfo.js";

/**
 * {
 *  name:"",//属性名称
 *  attrPosition:"",//tag(标签上)|data|methods 属性位置 
 *  args?:[],// 如果是方法，方法的形参
 *  value?:"",// 若为data 为字段名字 若为方法 为函数名字, 为tag 则为属性值
 * }
 */
/*
let customInputCompAttr = [{name:"v-model",attrPosition:"data"}]
let customSelector = [{name:"v-model",attrPosition:"data"},{name:"paraFile",attrPosition:"tag",value:""},{name:"listName",attrPosition:"tag",value:""},{name:":success",attrPosition:"methods"}]
*/
let compAttr = [
  {
    name:"v-model",
    attrPosition:"data",//tag data methods 属性所在位置
  },
  // {
  //   name:":disabled",
  //   attrPosition:"tag",
  //   // value:"true"
  // },
  {
    name:"paraFile",
    attrPosition:"tag",
    value:"",
  },
  {
    name:"listName",
    attrPosition:"tag",
    value:""
  },
  {
    name:":success",
    attrPosition:"methods",
    args:["name","age"]
  },
  
]
//标准字段
let standardFields = [
  {
    label:"账号",
    value:"ACC",
    isFullRow:false,
    tagName:"custom-input",
    compAttr:JSON.parse(JSON.stringify(compAttr))
  },
  {
    label:"账号1",
    value:"ACC1",
    isFullRow:false,
    tagName:"custom-selector",
    compAttr:JSON.parse(JSON.stringify(compAttr))
  },
  {
    label:"账号2",
    value:"ACC2",
    isFullRow:false,
    tagName:"custom-selector",
    compAttr:JSON.parse(JSON.stringify(compAttr))
  },
  {
    label:"账号3",
    value:"ACC3",
    isFullRow:false,
    tagName:"custom-selector",
    compAttr:JSON.parse(JSON.stringify(compAttr))
  },
];
// excel导入的数据
let excelData1 = [
  {groupTitle:"客户信息",label:"IMEI序列号",":requisite":"true",},
  {groupTitle:"客户信息",label:"SIM卡序列号",":requisite":"true",},
  {groupTitle:"客户信息",label:"保证金金额",":requisite":"true",},
  {groupTitle:"客户信息1",label:"保证金账号",":requisite":"true",},
  {groupTitle:"客户信息1",label:"保证金账户标志",":requisite":"true",},
];
export default {
  // 数据库 获取标准字段
  async getStandardConfig(vueIns){
    /**
     * compAttr: {alise: Array(0), compAttr: {…}, events: Array(0)}
      isFullRow: false
      label: "IMEI序列号"
      tagName: "custom-input"
      value: "IMEI_SER_NUM"
     */
    let res1 = await commRequest.fetchStandardFields();
    // let res = vueIns.success(JSON.parse(JSON.stringify(standardFields)),"成功");
    return res1;
  },
  // excel 获取栏位数据后转换
  transformExcelData(vueIns,standardFields=[],excelData=JSON.parse(JSON.stringify(excelData1))){
    let groupTitles = excelData.map(v => v.groupTitle);
    groupTitles = groupTitles.filter((v,i) => groupTitles.indexOf(v) == i);
    groupTitles = groupTitles.map((v,i) => ({groupTitle:v,groupId:i}));
    excelData.forEach(v => {
      let obj = groupTitles.find(groupTitleObj => groupTitleObj.groupTitle == v.groupTitle);
      v.groupId = obj.groupId;
    });
    //excelData [{groupId:0,groupTitle:"客户信息",label:"账号",requisite:true,}]
    let {msgs} = this.findEnFieldName(vueIns,standardFields,excelData);
    return {excelData,msgs};
  },
  // 根据中文获取英文字段
  findEnFieldName(vueIns,standardFields=[],excelData=[]){
    let msgs = [];//没有找到英文的label
    for(let i=0;i<excelData.length;i++){
      let rowObj = excelData[i];//{groupId:0,groupTitle:"客户信息",label:"账号",requisite:true,}
      
      let standardFieldObj = standardFields.find(v => v.label == rowObj.label);
      if(standardFieldObj){
        rowObj.value = standardFieldObj.value;
        rowObj.compAttr = standardFieldObj.compAttr;
        rowObj.isFullRow = standardFieldObj.isFullRow;
        rowObj.tagName = standardFieldObj.tagName;
        rowObj.length = standardFieldObj.length;
        for(let j=0;j<rowObj.compAttr.length;j++){
          let compAttrItem = standardFieldObj.compAttr[j];
          if(compAttrItem.attrPosition == "methods"){
            let eventName = compAttrItem.name.replace(/:/g,"").toLocaleLowerCase();
            eventName = eventName.charAt(0).toUpperCase()+eventName.substr(1);
            let methodName = `${standardFieldObj.value}${eventName}`;
            compAttrItem.value = methodName;
          }else if(compAttrItem.attrPosition == "data"){
            if(compAttrItem.name == "v-model"){
              // compAttrItem.value = `TradeData.${standardFieldObj.value}`;
              compAttrItem.value = standardFieldObj.value;
            }
          }
          //listNameOptions
          if(["paraFile","listName"].includes(compAttrItem.name)){
            compAttrItem.listNameOptions = [];
          }
        }
        let compAttr = rowObj.compAttr;
        let tagName = rowObj.tagName;
        if(rowObj.hasOwnProperty(":requisite")){
          compAttr.push({name:":requisite",attrPosition:"tag",value:rowObj[":requisite"]});
        }
        if(rowObj.hasOwnProperty(":disabled")){
          let disabledObj = rowObj.compAttr.find(v => v.name==":disabled");
          if(disabledObj){
            disabledObj.value = rowObj[":disabled"];
          }else{
            compAttr.push({name:":disabled",attrPosition:"tag",value:rowObj[":disabled"]});
          }
        }
        if(rowObj.hasOwnProperty(":readonly")){
          let readonlyObj = rowObj.compAttr.find(v => v.name==":readonly");
          if(readonlyObj){
            readonlyObj.value = rowObj[":readonly"];
          }else{
            compAttr.push({name:":readonly",attrPosition:"tag",value:rowObj[":readonly"]});
          }
        }
        if(rowObj.hasOwnProperty(":visible")){
          let visibleObj = rowObj.compAttr.find(v => v.name==":visible");
          if(visibleObj){
            visibleObj.value = rowObj[":visible"];
          }else{
            compAttr.push({name:":visible",attrPosition:"tag",value:rowObj[":visible"]});
          }
        }
        
        let refAttr = {name:"ref",value:rowObj.value,attrPosition:"tag"};
        let propertyAttr = {name:"property",value:rowObj.value,attrPosition:"tag"};
        let labelAttr = {name:"label",value:rowObj.label,attrPosition:"tag"};
        compAttr.splice(1,0,propertyAttr);
        compAttr.splice(1,0,refAttr);
        compAttr.splice(1,0,labelAttr);
        let compAttrRef = compAttr.find(v => v.name == "ref");
        let compAttrProp = compAttr.find(v => v.name == "property");
        let compAttrLabel = compAttr.find(v => v.name == "label");
      }else{
        msgs.push(rowObj.label);
      }
      if(syncFieldsInfo[rowObj.tagName] && !rowObj.labelExt){
        rowObj.labelExt = syncFieldsInfo[rowObj.tagName].join("|");
      }
      let labelExtArr = (rowObj.labelExt || "").split("|").filter(v => v);
      for(let j=0;j<labelExtArr.length;j++){
        let curLabel = labelExtArr[j];
        let curLabelObj = standardFields.find(v => v.label == curLabel);
        if(curLabelObj){
          for(let k=0;k<rowObj.compAttr.length;k++){
            let curAttr = rowObj.compAttr[k];
            if(curAttr.name.includes(".sync") && !curAttr.value){
              curAttr.value = curLabelObj.value;
              curAttr.cnName = curLabel;
              break;
            }
          }
        }else{
          msgs.push(curLabel);
        }
      }
    }
    // excelData [{groupId:0,groupTitle:"客户信息",label:"账号",requisite:true,compAttr:compAttr}]
    return {msgs};
  }
}
