<template>
  <div class="GenStandardEnField" style="padding-top:40px;">
    <el-row>
      <el-button @click="transform" type="primary" size="mini">转换</el-button>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-divider content-position="left">中文字段</el-divider>
        <el-input v-model="cnFields" :autosize="{ minRows: 100, maxRows: 1000 }" type="textarea"></el-input>
      </el-col>
      <el-col :span="12">
        <el-divider content-position="left">生成的英文标准字段</el-divider>
        <el-input v-model="enFields" :autosize="{ minRows: 100, maxRows: 1000 }" type="textarea"></el-input>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import commRequest from "@/utils/comm-request.js";
import CommUtils from "@/utils/comm-utils.js";
export default {
  name:"GenStandardEnField",
  mixins:[],
  validators:{},
  props:{},
  data(){
    return {
      cnFields:"",//英文
      enFields:"",//中文
      allFieldsData:[],//字段
      allWordRoot:[],//词根
    }
  },
  computed:{},
  watch:{},
  methods:{
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
    transform(){
      if(this.allFieldsData.length==0 || this.allWordRoot.length == 0){
        this.alert("后台请求接口未成功,请检查网络");
        return;
      }
      let cnFieldsArr = this.cnFields.split(/[|,，-\s\t\n]/g)
        .map(v => v.trim())
        .filter(v => v);
      let enFieldsArr = [];
      let notExistsFields = [];
      for(let i=0;i<cnFieldsArr.length;i++){
        let cnField = cnFieldsArr[i];
        let enField = this.findEnFields(cnField);
        if(enField){
          enFieldsArr.push({label:cnField,value:enField});
        }else{
          notExistsFields.push(cnField);
        }
      }
      if(notExistsFields.length!=0){
        let alertMsg = notExistsFields.join(" ");
        this.alert(`${alertMsg}`,"以下字段无法由词根生成，请将以下字段拷贝给标准组添加对应词根后再生成标准字段。");
      }
      this.enFields = enFieldsArr
        .map(v => `${v.label} ${v.value}`)
        .join("\n");
    },
    findEnFields(cnField){
      let enField1Obj = this.allFieldsData.find(v => v.label == cnField);
      if(enField1Obj){
        return enField1Obj.value;
      }else{
        let enField = CommUtils.findEnFieldFromWordRoot(cnField,this.allWordRoot);
        if(enField){
          return enField;
        }else{
          return "";
        }
      }
    }
  },
  mounted(){
    this.fetchWordRoot();
    this.fetchStandardAllFields();
  },
  beforeDestroy(){
  }
}
</script>
<style lang="scss" scoped>
.GenStandardEnField{
  display: block;
}
</style>