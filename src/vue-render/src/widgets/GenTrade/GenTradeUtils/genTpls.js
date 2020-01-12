import _ from "underscore";
/**
 * 生成组件模板
 */


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

function genCommonCompBack(vueIns,stdFieldObj){
  /**
   * [{attrPosition: "tag",default: false,name: ":disabled",value: true}]
   */
  let compAttr = stdFieldObj.compAttr;
  let tagName = stdFieldObj.tagName;
  compAttr = compAttr.filter(v => Boolean(v.value));
  compAttr = compAttr.map(item => {
    if(item.value === false || item.value === "" || item.value === undefined){
      vueIns.alert(`${JSON.stringify(item)} 无value值`);
      return "";
    }
    return `${item.name}="${item.value}"`;
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
function genCommonComp(vueIns,stdFieldObj){
  let methods = [];//[{name:"",args:[]}]
  let dataFields = [];//["xxx"]
  let allHasPosi = stdFieldObj.compAttr.every(v => Boolean(v.attrPosition));
  if(!allHasPosi){
    vueIns.alert(`<p>有属性没有attrPosition${JSON.stringify(stdFieldObj)}</p>`);
  }else{
    // methods datafield
    for(let i=0;i<stdFieldObj.compAttr.length;i++){
      let compAttrItem = stdFieldObj.compAttr[i];
      if(compAttrItem.attrPosition == "methods"){
        methods.push({name:compAttrItem.name,args:compAttrItem.args,value:compAttrItem.value});
      }else if(compAttrItem.attrPosition == "data"){
        if(compAttrItem.name == "v-model"){
          compAttrItem.value = `TradeData.${stdFieldObj.value}`;
          dataFields.push(stdFieldObj.value);
        }else{
          dataFields.push(compAttrItem.value);
        }
      }
    }
    //生成tpl挂在compTpl 字段上
    genCommonCompBack(vueIns,stdFieldObj);
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
function genComps(vueIns,standardFields){
  let methodsAll = [];//[{name:"",args:[]}]
  let dataFieldsAll = [];//["xxx"]
  for(let i=0;i<standardFields.length;i++){
    let stdFieldObj = standardFields[i];
    if(stdFieldObj.tagName == "custom-table"){
      let {methods,dataFields} = genTableComp(vueIns,stdFieldObj);
      methodsAll = methodsAll.concat(methods);
      dataFieldsAll = dataFieldsAll.concat(dataFields);
    }else{
      let {methods,dataFields} = genCommonComp(vueIns,stdFieldObj);
      methodsAll = methodsAll.concat(methods);
      dataFieldsAll = dataFieldsAll.concat(dataFields);
    }
  }
  methodsAll = genMethods(vueIns,methodsAll);
  return {standardFields,methodsAll,dataFieldsAll};
}
/**
 * 生成所有
 */
function genAll(vueIns,standardFieldsExcelData){
  let {standardFields,methodsAll,dataFieldsAll} = genComps(vueIns,standardFieldsExcelData);
  return {
    excelFieldsAll:standardFields,
    methodsAll,
    dataFieldsAll
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

export default {
  genAll:genAll,
  twoDimensionalArray:twoDimensionalArray
};