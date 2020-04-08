import axios from "axios";
import fetchStandardFieldsRes from "./fetchStandardFieldsRes.js";
import queryAllStandardFieldsRes from "./queryAllStandardFieldsRes.js";


function fetchStandardFields(){
  var data = {
    "SYS_HEAD": {
      "BIZ_FOLN_NO": "",
      "SYS_FOLN_NO": "",
      "CLIENT_TYP": "110064",
      "BIZ_ACCESS_CHNL_CD": "0101",
      "SCENE_CD": "DBComm",
      "SERV_PTY_PROD_CD": "067",
      "SERV_CD": "DB",
      "REQE_PTY_PROD_CD": "066",
      "REQE_PTY_REQE_TS": "2020-01-10 19:14:03.966",
      "REQE_PTY_IP": "20.3.15.151",
      "RequestDate": "20200110",
      "RequestTime": "191403",
      "BagSeqNo": "",
      "AppNum": "TE",
      "Reserve": ""
    },
    "APP_HEAD": {
      "UserNum": "204217",
      "UserName": "俸馨",
      "BranchNum": "2039",
      "BranchName": "四川广汉农村商业银行股份有限公司对公专柜",
      "DvcNum": "",
      "MacValue": "8C-EC-4B-B7-10-91",
      "DeviceNum": "",
      "DeviceModel": "",
      "Tlr": "",
      "AhrTlr": "",
      "AhrTaskNum": "",
      "AhrBrah": "",
      "chcekTlr": "",
      "LUNCH_EMPNBR": "",
      "checkOrgNo": "",
      "BsnTranCode": "",
      "FictTellerNum": "",
      "LegalPersonNum": "2105",
      "TranCode": "",
      "TranNm": ""
    },
    "Body": {
      "CommCode": "DB",
      "SceneCode": "DBComm",
      "TradeData": "{\"_busidatakey_\":\"queryStandardFields\",\"PB_PRIVATE_KEY\":\"000000000000000A\"}"
    }
  }
  var headers = {
    "BranchNum":"2039",
    "ConsumerId":"066",
    "ConsumerIP":"20.3.15.151",
    "Content-Type":"application/json",
    "LegalNum":"2105",
    "Origin":"http://localhost:53008",
    "Referer":"http://localhost:53008/FCClient/modules/frame/custom-service/index.html",
    "Reserve":"",
    "TraceId":"01157865416332746708",
    "User-Agent":"Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36",
    "UserNum":"204217",
    "X-AmebaCloud-RandomNumber":"0.1513719200156629",
    "X-AmebaCloud-VerifyTime":"1578654163332",
  }
  return new Promise(resolve => {
    let standardFields = window.standardFields;
    if(standardFields){
      resolve({isSuccess:true,data:standardFields});
      return;
    }
    axios({
      method: 'post',
      url: 'http://10.16.2.228/abside/abs-ib-dbcomm/dbComm',
      headers:headers,
      data: data
    })
    .then(res => {
      res = res.data;
      if(res.OutArgs.errorcode == "000000"){
        let Result = JSON.parse(res.result.Rslt).Result;
        let data = Result.map(v => {
          let compAttr = {};
          try{
            let fn = new Function(`return ${v.COMP_DESC || '{}'}`)
            compAttr = fn();
          }catch(e){
            alert(`解析JSON出错${v.COMP_DESC}`);
          }
          let obj = {
            label:v.COLM_DESC,
            value:v.COLM_NM,
            isFullRow:v.DGIT > 60,
            length:v.DGIT,
            tagName:v.COMP_TAG,
            compAttr:compAttr,
          }
          return obj;
        });
        window.standardFields = data;
        resolve({isSuccess:true,data:data})
      }else{
        resolve({isSuccess:false,data:data})
      }
    })
    .catch(res => {
      // resolve({isSuccess:false,data:[]})
      resolve({isSuccess:true,data:fetchStandardFieldsRes})
    })
  });
}

function queryAllStandardFields(){
  var data = {
    "SYS_HEAD": {
      "BIZ_FOLN_NO": "",
      "SYS_FOLN_NO": "",
      "CLIENT_TYP": "110064",
      "BIZ_ACCESS_CHNL_CD": "0101",
      "SCENE_CD": "DBComm",
      "SERV_PTY_PROD_CD": "067",
      "SERV_CD": "DB",
      "REQE_PTY_PROD_CD": "066",
      "REQE_PTY_REQE_TS": "2020-01-10 19:14:03.966",
      "REQE_PTY_IP": "20.3.15.151",
      "RequestDate": "20200110",
      "RequestTime": "191403",
      "BagSeqNo": "",
      "AppNum": "TE",
      "Reserve": ""
    },
    "APP_HEAD": {
      "UserNum": "204217",
      "UserName": "俸馨",
      "BranchNum": "2039",
      "BranchName": "四川广汉农村商业银行股份有限公司对公专柜",
      "DvcNum": "",
      "MacValue": "8C-EC-4B-B7-10-91",
      "DeviceNum": "",
      "DeviceModel": "",
      "Tlr": "",
      "AhrTlr": "",
      "AhrTaskNum": "",
      "AhrBrah": "",
      "chcekTlr": "",
      "LUNCH_EMPNBR": "",
      "checkOrgNo": "",
      "BsnTranCode": "",
      "FictTellerNum": "",
      "LegalPersonNum": "2105",
      "TranCode": "",
      "TranNm": ""
    },
    "Body": {
      "CommCode": "DB",
      "SceneCode": "DBComm",
      "TradeData": "{\"_busidatakey_\":\"queryAllStandardFields\",\"PB_PRIVATE_KEY\":\"000000000000000A\"}"
    }
  }
  var headers = {
    "BranchNum":"2039",
    "ConsumerId":"066",
    "ConsumerIP":"20.3.15.151",
    "Content-Type":"application/json",
    "LegalNum":"2105",
    "Origin":"http://localhost:53008",
    "Referer":"http://localhost:53008/FCClient/modules/frame/custom-service/index.html",
    "Reserve":"",
    "TraceId":"01157865416332746708",
    "User-Agent":"Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36",
    "UserNum":"204217",
    "X-AmebaCloud-RandomNumber":"0.1513719200156629",
    "X-AmebaCloud-VerifyTime":"1578654163332",
  }
  return new Promise(resolve => {
    let standardAllFields = window.standardAllFields;
    if(standardAllFields){
      resolve({isSuccess:true,data:standardAllFields});
      return;
    }
    axios({
      method: 'post',
      url: 'http://10.16.2.228/abside/abs-ib-dbcomm/dbComm',
      headers:headers,
      data: data
    })
    .then(res => {
      res = res.data;
      if(res.OutArgs.errorcode == "000000"){
        let Result = JSON.parse(res.result.Rslt).Result;
        let data = Result.map(v => {
          let obj = {
            label:(v.COLM_DESC || "").trim(),
            value:(v.COLM_NM || "").trim(),
            isFullRow:(v.DGIT || 0) >= 60,
            isAmt:v.COMP_TAG == 'custom-amount'
          }
          return obj;
        });
        window.standardAllFields = data;
        resolve({isSuccess:true,data:data})
      }else{
        resolve({isSuccess:false,data:data})
      }
    })
    .catch(res => {
      // resolve({isSuccess:false,data:[]})
      resolve({isSuccess:true,data:queryAllStandardFieldsRes})
    })
  });
}
function getParentMenuInfo(){
  var data = {
    "SYS_HEAD": {
      "BIZ_FOLN_NO": "",
      "SYS_FOLN_NO": "",
      "CLIENT_TYP": "110064",
      "BIZ_ACCESS_CHNL_CD": "0101",
      "SCENE_CD": "DBComm",
      "SERV_PTY_PROD_CD": "067",
      "SERV_CD": "DB",
      "REQE_PTY_PROD_CD": "066",
      "REQE_PTY_REQE_TS": "2020-01-10 19:14:03.966",
      "REQE_PTY_IP": "20.3.15.151",
      "RequestDate": "20200110",
      "RequestTime": "191403",
      "BagSeqNo": "",
      "AppNum": "TE",
      "Reserve": ""
    },
    "APP_HEAD": {
      "UserNum": "204217",
      "UserName": "俸馨",
      "BranchNum": "2039",
      "BranchName": "四川广汉农村商业银行股份有限公司对公专柜",
      "DvcNum": "",
      "MacValue": "8C-EC-4B-B7-10-91",
      "DeviceNum": "",
      "DeviceModel": "",
      "Tlr": "",
      "AhrTlr": "",
      "AhrTaskNum": "",
      "AhrBrah": "",
      "chcekTlr": "",
      "LUNCH_EMPNBR": "",
      "checkOrgNo": "",
      "BsnTranCode": "",
      "FictTellerNum": "",
      "LegalPersonNum": "2105",
      "TranCode": "",
      "TranNm": ""
    },
    "Body": {
      "CommCode": "DB",
      "SceneCode": "DBComm",
      "TradeData": "{\"_busidatakey_\":\"getParentMenuInfo\",\"PB_PRIVATE_KEY\":\"000000000000000A\"}"
    }
  }
  var headers = {
    "BranchNum":"2039",
    "ConsumerId":"066",
    "ConsumerIP":"20.3.15.151",
    "Content-Type":"application/json",
    "LegalNum":"2105",
    "Origin":"http://localhost:53008",
    "Referer":"http://localhost:53008/FCClient/modules/frame/custom-service/index.html",
    "Reserve":"",
    "TraceId":"01157865416332746708",
    "User-Agent":"Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36",
    "UserNum":"204217",
    "X-AmebaCloud-RandomNumber":"0.1513719200156629",
    "X-AmebaCloud-VerifyTime":"1578654163332",
  }
  return new Promise(resolve => {
    if(window.parentMenuInfo){
      resolve({isSuccess:true,data:window.parentMenuInfo});
      return;
    }
    axios({
      method: 'post',
      url: 'http://10.16.2.228/abside/abs-ib-dbcomm/dbComm',
      headers:headers,
      data: data
    })
    .then(res => {
      res = res.data;
      if(res.OutArgs.errorcode == "000000"){
        let Result = JSON.parse(res.result.Rslt).Result;
        window.parentMenuInfo = Result;
        resolve({isSuccess:true,data:Result})
      }else{
        resolve({isSuccess:false,data:[]})
      }
    })
    .catch(res => {
      resolve({isSuccess:false,data:[]})
    })
  });
}
// 获取词根
function fetchWordRoot(){
  var data = {
    "SYS_HEAD": {
      "BIZ_FOLN_NO": "",
      "SYS_FOLN_NO": "",
      "CLIENT_TYP": "110064",
      "BIZ_ACCESS_CHNL_CD": "0101",
      "SCENE_CD": "DBComm",
      "SERV_PTY_PROD_CD": "067",
      "SERV_CD": "DB",
      "REQE_PTY_PROD_CD": "066",
      "REQE_PTY_REQE_TS": "2020-01-10 19:14:03.966",
      "REQE_PTY_IP": "20.3.15.151",
      "RequestDate": "20200110",
      "RequestTime": "191403",
      "BagSeqNo": "",
      "AppNum": "TE",
      "Reserve": ""
    },
    "APP_HEAD": {
      "UserNum": "204217",
      "UserName": "俸馨",
      "BranchNum": "2039",
      "BranchName": "四川广汉农村商业银行股份有限公司对公专柜",
      "DvcNum": "",
      "MacValue": "8C-EC-4B-B7-10-91",
      "DeviceNum": "",
      "DeviceModel": "",
      "Tlr": "",
      "AhrTlr": "",
      "AhrTaskNum": "",
      "AhrBrah": "",
      "chcekTlr": "",
      "LUNCH_EMPNBR": "",
      "checkOrgNo": "",
      "BsnTranCode": "",
      "FictTellerNum": "",
      "LegalPersonNum": "2105",
      "TranCode": "",
      "TranNm": ""
    },
    "Body": {
      "CommCode": "DB",
      "SceneCode": "DBComm",
      "TradeData": "{\"_busidatakey_\":\"queryAllWordRoot\",\"PB_PRIVATE_KEY\":\"000000000000000A\"}"
    }
  }
  var headers = {
    "BranchNum":"2039",
    "ConsumerId":"066",
    "ConsumerIP":"20.3.15.151",
    "Content-Type":"application/json",
    "LegalNum":"2105",
    "Origin":"http://localhost:53008",
    "Referer":"http://localhost:53008/FCClient/modules/frame/custom-service/index.html",
    "Reserve":"",
    "TraceId":"01157865416332746708",
    "User-Agent":"Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36",
    "UserNum":"204217",
    "X-AmebaCloud-RandomNumber":"0.1513719200156629",
    "X-AmebaCloud-VerifyTime":"1578654163332",
  }
  return new Promise(resolve => {
    if(window.WordRoot){
      resolve({isSuccess:true,data:window.WordRoot});
      return;
    }
    axios({
      method: 'post',
      url: 'http://10.16.2.228/abside/abs-ib-dbcomm/dbComm',
      headers:headers,
      data: data
    })
    .then(res => {
      res = res.data;
      if(res.OutArgs.errorcode == "000000"){
        let Result = JSON.parse(res.result.Rslt).Result;
        window.WordRoot = Result;
        resolve({isSuccess:true,data:Result})
      }else{
        resolve({isSuccess:false,data:[]})
      }
    })
    .catch(res => {
      resolve({isSuccess:false,data:[]})
    })
  });
}


export default {
  fetchStandardFields,
  queryAllStandardFields,
  getParentMenuInfo,
  fetchWordRoot
}