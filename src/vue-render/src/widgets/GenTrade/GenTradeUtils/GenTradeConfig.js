/**
 * {
 *  name:"",//属性名称
 *  attrPosition:"",//tag(标签上)|data|methods 属性位置 
 *  default?:"",//默认值
 *  args?:[],// 如果是方法，方法的形参
 * }
 */
let compAttr = [
  {
    name:":disabled",
    attrPosition:"tag",//tag data methods 属性所在位置
    default:false,
  },
  {
    name:":success",
    attrPosition:"methods",//tag data methods 属性所在位置
    args:["name","age"]
  },
  {
    name:"v-model",
    attrPosition:"data",//tag data methods 属性所在位置
  },
]
//标准字段
let standardFields = [
  {
    label:"账号",
    value:"ACC",
    isFullRow:false,
    tagName:"custom-selector",
    compAttr:compAttr
  }
];
export default {
  // 数据库 获取标准字段
  async getStandardConfig(vueIns){
    return vueIns.success(standardFields,"成功");
  },
  // excel 获取栏位数据后转换
  async transformExcelData(){
    let excelData = [
      {groupTitle:"客户信息",label:"账号",requisite:true,}
    ];
  }
}
