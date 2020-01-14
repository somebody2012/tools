/**
 * {
 *  name:"",//属性名称
 *  attrPosition:"",//tag(标签上)|data|methods 属性位置 
 *  args?:[],// 如果是方法，方法的形参
 *  value?:"",// 若为data 为字段名字 若为方法 为函数名字, 为tag 则为属性值
 * }
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
  {groupTitle:"客户信息",label:"账号",":requisite":"true",},
  {groupTitle:"客户信息",label:"账号1",":requisite":"true",},
  {groupTitle:"客户信息",label:"账号2",":requisite":"true",},
  {groupTitle:"客户信息1",label:"账号3",":requisite":"true",},
];
export default {
  // 数据库 获取标准字段
  async getStandardConfig(vueIns){
    let res = vueIns.success(JSON.parse(JSON.stringify(standardFields)),"成功");
    return res;
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
        let refAttr = {name:"ref",value:rowObj.value,attrPosition:"tag"};
        let propertyAttr = {name:"property",value:rowObj.value,attrPosition:"tag"};
        let labelAttr = {name:"label",value:rowObj.label,attrPosition:"tag"};
        compAttr.splice(1,0,propertyAttr);
        compAttr.splice(1,0,refAttr);
        compAttr.splice(1,0,labelAttr);
      }else{
        msgs.push(rowObj.label);
      }
    }
    // excelData [{groupId:0,groupTitle:"客户信息",label:"账号",requisite:true,compAttr:compAttr}]
    return {msgs};
  }
}
