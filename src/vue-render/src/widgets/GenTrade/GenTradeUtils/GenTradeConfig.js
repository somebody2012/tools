let config = {
  tagName:"custom-selector",
  attrs:[
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
}
