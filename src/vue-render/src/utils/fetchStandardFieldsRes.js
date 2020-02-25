
/**
账号
户名
余额
可用余额
开户证实书凭证号
支取方式
密码
印鉴卡号码
证件类型
证件号码
冠字号
存单号

 */
export default [
  {
    "label": "IMEI序列号",
    "value": "IMEI_SER_NUM",
    "isFullRow": false,
    "tagName": "custom-input",
    "compAttr": [{
      "name": "v-model",
      "attrPosition": "data"
    }]
  },
{
  "label": "SIM卡序列号",
  "value": "SIM_CARD_SER_NUM",
  "isFullRow": false,
  "tagName": "custom-selector",
  "compAttr": [{
    "name": "v-model",
    "attrPosition": "data"
  }, {
    "name": "paraFile",
    "attrPosition": "tag",
    "value": ""
  }, {
    "name": "listName",
    "attrPosition": "tag",
    "value": ""
  }]
}, {
  "label": "保证金金额",
  "value": "MARGN_AMT",
  "isFullRow": false,
  "tagName": "custom-cust-addr",
  "compAttr": [{
    "attrPosition": "data",
    "name": "v-model"
  }, {
    "attrPosition": "data",
    "name": ":options.sync",
    "value": []
  }, {
    "attrPosition": "data",
    "name": ":province.sync",
    "value": ""
  }, {
    "attrPosition": "data",
    "name": ":city.sync",
    "value": ""
  }, {
    "attrPosition": "data",
    "name": ":county.sync",
    "value": ""
  }, {
    "attrPosition": "data",
    "name": ":street.sync",
    "value": ""
  }, {
    "attrPosition": "data",
    "name": ":address.sync",
    "value": ""
  }, {
    "attrPosition": "tag",
    "name": ":showAddressCascader",
    "value": true
  }, {
    "attrPosition": "tag",
    "name": ":showAddress",
    "value": true
  }]
}, {
  "label": "保证金账号",
  "value": "MARGN_ACCT_NO",
  "isFullRow": false,
  "tagName": "custom-cert-num",
  "compAttr": [{
    "attrPosition": "data",
    "name": "v-model"
  }, {
    "attrPosition": "tag",
    "name": "custType",
    "value": "0"
  }, {
    "attrPosition": "tag",
    "name": "certType",
    "value": "0"
  }]
}, {
  "label": "保证金账户标志",
  "value": "MARGN_ACCT_FLG",
  "isFullRow": false,
  "tagName": "custom-cert-type",
  "compAttr": [{
    "attrPosition": "data",
    "name": "v-model"
  }, {
    "attrPosition": "tag",
    "name": "cust-type",
    "value": "1"
  }]
}, {
  "label": "最大用印次数",
  "value": "MAX_SEAL_DOC_TMS",
  "isFullRow": false,
  "tagName": "custom-input",
  "compAttr": [{
    "name": "v-model",
    "attrPosition": "data"
  }]
}, {
  "label": "最大账页号",
  "value": "MAX_LDGR_PG_NO",
  "isFullRow": false,
  "tagName": "custom-input",
  "compAttr": [{
    "name": "v-model",
    "attrPosition": "data"
  }]
}, {
  "label": "最后接收柜员号",
  "value": "FINL_RCPTN_TELR_NO",
  "isFullRow": false,
  "tagName": "custom-user-num",
  "compAttr": [{
    "attrPosition": "data",
    "name": "v-model"
  }]
}, {
  "label": "最后维护柜员号",
  "value": "FINL_MATN_TELR_NO",
  "isFullRow": false,
  "tagName": "custom-user-num",
  "compAttr": [{
    "attrPosition": "data",
    "name": "v-model"
  }]
}, {
  "label": "最后修改柜员号",
  "value": "FINL_MODFY_TELR_NO",
  "isFullRow": false,
  "tagName": "custom-user-num",
  "compAttr": [{
    "attrPosition": "data",
    "name": "v-model"
  }]
}, {
  "label": "最后修改员工号",
  "value": "FINL_MODFY_EMPNBR",
  "isFullRow": false,
  "tagName": "custom-user-num",
  "compAttr": [{
    "attrPosition": "data",
    "name": "v-model"
  }]
}, {
  "label": "最小发送金额",
  "value": "MIN_SND_AMT",
  "isFullRow": false,
  "tagName": "custom-amount",
  "compAttr": [{
    "attrPosition": "data",
    "name": "v-model"
  }, {
    "attrPosition": "tag",
    "name": ":allowZero",
    "value": true
  }]
}, {
  "label": "作废凭证待上缴张数",
  "value": "CANCL_VOUCH_WAIT_TURNIN_SHETNBR",
  "isFullRow": false,
  "tagName": "custom-input",
  "compAttr": [{
    "name": "v-model",
    "attrPosition": "data"
  }]
}]