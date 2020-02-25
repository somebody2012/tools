-- label prototype ref disabled requisite 默认有，不用统计
-- attrPosition 标签位置 tag（标签上） data (data域) method （method域）

DELETE FROM `IB_IP_COMPS_DESC`;

INSERT INTO `pub_db`.`IB_IP_COMPS_DESC`(`COMP_TAG`, `COMP_DESC`) VALUES 
('custom-input', '[{attrPosition:"data",name:"v-model"}]'),
('custom-date', '[{attrPosition:"data",name:"v-model"}]'),
('custom-selector', '[{attrPosition:"data",name:"v-model"},{name:"paraFile",attrPosition:"tag",value:""},{name:"listName",attrPosition:"tag",value:""}]'),
('custom-user-num', '[{attrPosition:"data",name:"v-model"}]'),
('custom-user-verify-type', '[{attrPosition:"data",name:"v-model"}]'),
('custom-cert-num', '[{attrPosition:"data",name:"v-model"},{attrPosition:"tag",name:"custType",value:"0"},{attrPosition:"tag",name:"certType",value:"0"}]'),
('custom-cert-type', '[{attrPosition:"data",name:"v-model"},{attrPosition:"tag",name:"cust-type",value:"1"}]'),
('custom-cust-num', '[{attrPosition:"data",name:"v-model"},{attrPosition:"tag",name:":auto-fill",value:true},{attrPosition:"tag",name:":fill-len",value:"16"},{attrPosition:"methods",name:":success",args:["custInfo"]},{attrPosition:"methods",name:":fail",args:["res"]}]'),
('custom-cust-addr', '[{attrPosition:"data",name:"v-model"},{attrPosition:"data",name:":options.sync",value:[]},{attrPosition:"data",name:":province.sync",value:""},{attrPosition:"data",name:":city.sync",value:""},{attrPosition:"data",name:":county.sync",value:""},{attrPosition:"data",name:":street.sync",value:""},{attrPosition:"data",name:":address.sync",value:""},{attrPosition:"tag",name:":showAddressCascader",value:true},{attrPosition:"tag",name:":showAddress",value:true}]'),
('custom-phone-num', '[{attrPosition:"data",name:"v-model"},{attrPosition:"methods",name:":success",args:["val"]},{attrPosition:"methods",name:":fail",args:["val"]}]'),
('custom-email', '[{attrPosition:"data",name:"v-model"},{attrPosition:"methods",name:":success",args:["val"]},{attrPosition:"methods",name:":fail",args:["val"]}]'),
('custom-account', '[{attrPosition:"data",name:"v-model"},{attrPosition:"tag",name:":read55ResFlg",value:true},{attrPosition:"methods",name:":success",args:["res","cardInfo"]}]'),
('custom-sub-account', '[{attrPosition:"data",name:"v-model"},{attrPosition:"methods",name:":success",args:[]}]'),
('custom-amount', '[{attrPosition:"data",name:"v-model"},{attrPosition:"tag",name:":allowZero",value:true}]'),
('custom-password', '[{attrPosition:"data",name:"v-model"},{attrPosition:"tag",name:"custType",value:"0"},{attrPosition:"tag",name:"certType",value:"0"},{attrPosition:"methods",name:":success",args:["cardInfo"]}]'),
('custom-card-input-mode', '[{attrPosition:"data",name:"v-model"},{attrPosition:"tag",name:"inputMode",value:["1","2"]}]'),
('custom-currency', '[{attrPosition:"data",name:"v-model"}]'),
('custom-remittance-mark', '[{attrPosition:"data",name:"v-model"}]'),
('custom-withdrawal', '[{attrPosition:"data",name:"v-model"}]'),
('custom-cash-analysis-code', '[{attrPosition:"data",name:"v-model"}]'),
('custom-charge-mode', '[{attrPosition:"data",name:"v-model"}]'),
('custom-passbook-num', '[{attrPosition:"data",name:"v-model"}]'),
('custom-sealcard-num', '[{attrPosition:"data",name:"v-model"},{attrPosition:"tag",name:":auto-fill",value:true},{attrPosition:"tag",name:"fill-len",value:"16"}]'),
('custom-coronal-num', '[{attrPosition:"data",name:"v-model"},{attrPosition:"methods",name:":success",args:[]}]'),
('custom-deposit-type', '[{attrPosition:"data",name:"v-model"}]'),
('custom-plate-type', '[{attrPosition:"data",name:"v-model"},{attrPosition:"tag",name:"inputModel",value:"0"}]'),
('custom-vehicle-use', '[{attrPosition:"data",name:"v-model"}]'),
('custom-vehicle-color', '[{attrPosition:"data",name:"v-model"}]'),
('custom-vehicle-user-type', '[{attrPosition:"data",name:"v-model"}]'),
('custom-obu-status', '[{attrPosition:"data",name:"v-model"}]'),
('custom-user-num-project','[{attrPosition:"data",name:"v-model"},{attrPosition:"methods",name:":success",args:["userInfo"]}]'),
('custom-user-pwd-project','[{attrPosition:"data",name:"v-model"}]'),
('custom-account-project','[{attrPosition:"data",name:"v-model"},{attrPosition:"methods",name:":success",args:["res","cardInfo"]}]'),
('custom-bankno', '[{attrPosition:"data",name:"v-model"}]'),
('custom-orgno', '[{attrPosition:"data",name:"v-model"}]'),
('custom-upload', '[{attrPosition:"data",name:"v-model"}]'),
('custom-socialsec-prdcode', '[{attrPosition:"data",name:"v-model"},{attrPosition:"tag",name:"codeType",value:"02"}]'),
('custom-escrow-num', '[{attrPosition:"data",name:"v-model"}]'),
('custom-plate-num', '[{attrPosition:"data",name:"v-model"}]'),
('custom-debit-credit-account-type', '[{attrPosition:"data",name:"v-model"}]'),
('custom-voucher-num', '[{attrPosition:"data",name:"v-model"}]'),
('custom-crown-num', '[{attrPosition:"data",name:"v-model"}]'),
('custom-payment-code', '[{attrPosition:"data",name:"v-model"}]'),
('custom-voucher-interval', '[{attrPosition:"data",name:"v-model"}]'),
('custom-ip-addr', '[{attrPosition:"data",name:"v-model"}]'),
('custom-etc-card-status', '[{attrPosition:"data",name:"v-model"}]'),
('custom-pinying-name', '[{attrPosition:"data",name:"v-model"}]'),
('custom-cust-type', '[{attrPosition:"data",name:"v-model"}]'),
-- 不存在的组件
('custom-certification-level', '[{attrPosition:"data",name:"v-model"}]'),
('custom-agent', '[{attrPosition:"data",name:"v-model"}]'),
('custom-plate-color', '[{attrPosition:"data",name:"v-model"}]'),
('custom-etc-card-brand', '[{attrPosition:"data",name:"v-model"}]'),
('custom-vehicle-classification', '[{attrPosition:"data",name:"v-model"}]'),
('custom-etc-blacklist-type', '[{attrPosition:"data",name:"v-model"}]'),
('custom-etc-blacklist-reason', '[{attrPosition:"data",name:"v-model"}]'),
('custom-product-code', '[{attrPosition:"data",name:"v-model"}]'),
('custom-remark-code', '[{attrPosition:"data",name:"v-model"}]'),
('custom-water-elec-product-code', '[{attrPosition:"data",name:"v-model"}]');



