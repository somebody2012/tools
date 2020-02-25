import _ from "underscore";
import compImport from "./comp-import.js";
// 转换成大驼峰
function transBigCamel(str=""){
  if(str.length == 0) return "";
  str = str.replace(/-childtype-\w+$/,"");
  str = str.charAt(0).toUpperCase() + str.substring(1)
  let bigCamel = str.replace(/-(\w)/g,(a,b,c)=>b.toUpperCase());
  return bigCamel;
}


/**
 * 生成方法
 * @param {*} vueIns 
 */
function genMethods(vueIns,methodsAll){
  methodsAll = methodsAll.map(v => {
    let methodName = v.value;
    let argsStr = (v.args || []).join(",");
    return `async ${methodName}(${argsStr}){}`
  });
  return methodsAll;
}

/**
 * 生成DATA
 * @param {} vueIns 
 */
function genDatas(vueIns,dataFieldsAll){
  let dataFieldsStr = dataFieldsAll.map(v => `\n${v}`);
  return dataFieldsStr;
}

function genCommonCompBack(vueIns,stdFieldObj,isButtom){
  /**
   * [{attrPosition: "tag",default: false,name: ":disabled",value: true}]
   */
  let compAttr = stdFieldObj.compAttr;
  let tagName = stdFieldObj.tagName.replace(/-childtype-\w+$/,"");
  let exculedKeys = [":visible"];//为false的值默认排除，除了这些key
  compAttr = compAttr.filter(v => {
    if(v.value === false){
      if(exculedKeys.includes(v.name)){
        return !v.value;
      }else{
        return false;
      }
    }else{
      return true;
    }
    // return Boolean(v.value);
  });
  if(isButtom){
    // 提交按钮下面不要ref
    compAttr = compAttr.filter(v => v.name !="ref");
  }
  compAttr = compAttr.map(item => {
    if(item.name.includes(".sync")){
      let curObj = compAttr.find(v => v.name == "v-model");
      let fieldName = "noVmodelField";
      if(curObj){
        fieldName = curObj.value.replace("TradeData.","");
      }
      let optName = item.name.replace(/(^:)|(\.sync$)/g,"");
      optName = optName.charAt(0).toUpperCase() + optName.substring(1);
      let value = fieldName + optName + "Sync";
      return `${item.name}="${value}"`;
    }else{
      let value = item.value;
      if(Array.isArray(value)){
        value = JSON.stringify(value);
      }
      if(Object.prototype.toString.call(value) == "[object Object]"){
        value = JSON.stringify(value).replace(/"/g,"'");
      }
      return `${item.name}="${value}"`;
    }
  });
  let attrStr = compAttr.join(" ");
  let compTpl = `<${tagName} ${attrStr}></${tagName}>`;
  stdFieldObj.compTpl = compTpl;
  return stdFieldObj;
}
/**
 * 生成普通组件
 * @param {Object}
 * {
 *   label:"账号",
 *   value:"ACC",
 *   isFullRow:false,
 *   tagName:"custom-selector",
 *   compAttr:compAttr
 * }
 * @returns {String}
 */
function genCommonComp(vueIns,stdFieldObj,isButtom){
  let methods = [];//[{name:"",args:[]}]
  let dataFields = [];//["xxx"]
  let allHasPosi = stdFieldObj.compAttr.every(v => Boolean(v.attrPosition));
  if(!allHasPosi){
    vueIns.alert(`<p>有属性没有attrPosition${JSON.stringify(stdFieldObj)}</p>`);
  }else{
    // methods datafield
    let fieldName = "noVmodelField";
    let curVmodelObj = stdFieldObj.compAttr.find(v => v.name = "v-model");
    if(curVmodelObj){
      fieldName = curVmodelObj.value.replace("TradeData.","");
    }
    for(let i=0;i<stdFieldObj.compAttr.length;i++){
      let compAttrItem = stdFieldObj.compAttr[i];
      if(compAttrItem.attrPosition == "methods"){
        methods.push({name:compAttrItem.name,args:compAttrItem.args,value:compAttrItem.value});
      }else if(compAttrItem.attrPosition == "data"){
        if(compAttrItem.name == "v-model"){
          compAttrItem.value = `TradeData.${stdFieldObj.value}`;
          dataFields.push({
            value:stdFieldObj.value,
            defaultValue:stdFieldObj.defaultValue || '""',
            label:stdFieldObj.label
          });
          // dataFields.push(stdFieldObj.value);
        }else{
          // dataFields.push(compAttrItem.value);
          let obj = {};
          if(/\.sync$/.test(compAttrItem.name)){
            let optName = compAttrItem.name.replace(/(^:)|(\.sync$)/g,"");
            optName = optName.charAt(0).toUpperCase() + optName.substring(1);
            obj.defaultValue = JSON.stringify(compAttrItem.value || "");
            obj.value = fieldName + optName + "Sync";
          }else{
            obj.defaultValue = JSON.stringify(compAttrItem.value || "");
            obj.value = compAttrItem.name.replace(/^:/g,"") + "Var";
          }
          obj.label = stdFieldObj.label;
          
          dataFields.push(obj);
        }
      }
    }
    //生成tpl挂在compTpl 字段上
    genCommonCompBack(vueIns,stdFieldObj,isButtom);
  }
  return {methods,dataFields};
}
/**
 * 生成表格
 */
function genTableComp(stdFieldObj){
  return {
    tplStr:[],
    methods:[],
    dataFields:[]
  }
}
function genComps(vueIns,standardFields,isButtom){
  let methodsAll = [];//[{name:"",args:[]}]
  let dataFieldsAll = [];//["xxx"]
  //交易import 信息
  let importArr = {
    import:[],
    components:[]
  };
  for(let i=0;i<standardFields.length;i++){
    let stdFieldObj = standardFields[i];
    if(stdFieldObj.tagName == "custom-table"){
      let {methods,dataFields} = genTableComp(vueIns,stdFieldObj);
      methodsAll = methodsAll.concat(methods);
      dataFieldsAll = dataFieldsAll.concat(dataFields);
    }else{
      let {methods,dataFields} = genCommonComp(vueIns,stdFieldObj,isButtom);
      methodsAll = methodsAll.concat(methods);
      dataFieldsAll = dataFieldsAll.concat(dataFields);
    }
    if(compImport[stdFieldObj.tagName.replace(/-childtype-\w+$/,"")]){
      let bigCamel = transBigCamel(stdFieldObj.tagName);
      let isExsit = importArr.components.find(v => v == bigCamel);
      if(!isExsit){
        importArr.components.push(bigCamel);
        importArr.import.push(compImport[stdFieldObj.tagName.replace(/-childtype-\w+$/,"")]);
      }
    }else{
      console.log(`comp-import 未配置${stdFieldObj.tagName}`);
    }
  }
  methodsAll = genMethods(vueIns,methodsAll);
  return {standardFields,methodsAll,dataFieldsAll,importArr};
}
/**
 * 生成所有
 */
function genAll(vueIns,standardFieldsExcelData,isButtom){
  let {standardFields,methodsAll,dataFieldsAll,importArr} = genComps(vueIns,standardFieldsExcelData,isButtom);
  return {
    excelFieldsAll:standardFields,
    methodsAll,
    dataFieldsAll,
    importArr
  }
}
/**
 * 
 * @param {*} group 
 * [
 *   {
 *     groupId:0,
 *     groupTitle: "客户信息",
 *     isFullRow: false,
 *     compTpl:"<div></div>"
 *   }
 *  ]
 * @returns {*} [ [{},{}] ]
 */
function twoDimensionalArrayItem(group){
  let newGroup = [];
  for(let i=0;i<group.length;i++){
    let curComp = group[i];
    if(newGroup.length == 0){
      newGroup.push([curComp]);
    }else{
      let lastRow = newGroup[newGroup.length-1];
      let lastRowLastComp = lastRow[lastRow.length-1];
      if(lastRow.length == 2){
        newGroup.push([curComp]);
      }else{
        if(lastRowLastComp.isFullRow){
          newGroup.push([curComp]);
        }else{
          lastRow.push(curComp);
        }
      }
    }
  }
  return newGroup;
}
/**
 * 转换成二位数组
 * [
 *  {
 *    compTpl: "<custom-input v-model="TradeData.ACC" label="账号" ref="ACC" property="ACC" :disabled="true"  :requisite="true"></custom-input>"
 *    groupId: 0
 *    groupTitle: "客户信息"
 *    isFullRow: false
 *  }
 * ]
 */
function twoDimensionalArray(vueIns,excelFieldsAll=[]){
  let groups = [];
  let group = _.groupBy(excelFieldsAll,v => v.groupId);
  let maxIndex = Math.max.apply(null,Object.keys(group))
  for(let i=0;i<=maxIndex;i++){
    groups.push(group[i]);
  }
  groups = groups.map(v => twoDimensionalArrayItem(v));
  return groups;
}
/**
 * 处理表格
 * @param {*} tableInfo [{groupTitle:"","label":"账号|姓名|年龄"}]
 * @returns {*} {tMsgs:[],tMethods:[],tDataFields:[{label:"",value:""}]}
 */
function handleTableInfo(tableInfo,standardFields){
  let tMsgs = [];
  let tMethods = [];
  let tDataFields = [];
  let tableTpls = [];
  let fields = tableInfo.map(v => v.label.split("|").filter(v1 => v1));
  
  for(let i=0;i<fields.length;i++){
    for(let j=0;j<fields[i].length;j++){
      let cnField = fields[i][j];
      let stdObj = standardFields.find(v => v.label == cnField);
      if(!stdObj){
        tMsgs.push(cnField);
      }
    }
  }
  if(tMsgs.length != 0){
    return {
      tMsgs:tMsgs,
      tMethods:tMethods,
      tDataFields:tDataFields,
      tableTpls:tableTpls
    }
  }
  /**
   * [  [{label:"",value:""}]  ]
   */
  let newFields = fields.map(v => {
    return v.map(cnField => {
      let stdObj = standardFields.find(v => v.label == cnField);
      return {label:stdObj.label,value:stdObj.value};
    })
  });
  
  newFields.forEach((tableItem,i) => {
    let tableHeadData = tableItem.map((v) => {
      return {
        label: v.label,
        prop: v.value,
        type: 'input'
      }
    })
    tDataFields.push({label:`tableHeadData${i}`,value:JSON.stringify(tableHeadData)});
    tDataFields.push({label:`tableData${i}`,value:JSON.stringify([])});
    tDataFields.push({label:`btnGroup${i}`,value:JSON.stringify([])});
    let tableTpl = `<custom-table ref="customTable${i}" :tableHeadData="tableHeadData${i}" :tableData="tableData${i}" :btnGroup="btnGroup${i}"/>`;
    tableTpls.push(tableTpl);
  })
  

  
  /**
   <custom-table ref="" :tableHeadData="tableHeadData" :tableData="tableData"/>
  */
  return {
    tMsgs:tMsgs,
    tMethods:tMethods,
    tDataFields:tDataFields,
    tableTpls:tableTpls
  }
}

export default {
  genAll:genAll,
  twoDimensionalArray:twoDimensionalArray,
  handleTableInfo:handleTableInfo
};