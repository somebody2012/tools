webpackJsonp([1],{"+hAf":function(e,t){},"09yM":function(e,t){},"0CLL":function(e,t){},"1ghf":function(e,t){},"3rt+":function(e,t){},"DW+F":function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("kV13"),n={name:"Menu",components:{},props:{},data:function(){return{isCollapse:!1}},methods:{handleOpen:function(e,t){console.log(e,t)},handleClose:function(e,t){console.log(e,t)}},watch:{},filters:{},mounted:function(){}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"Menu"},[a("el-menu",{attrs:{"default-active":"/GenTrade","default-openeds":["/GenTrade"],collapse:e.isCollapse,router:""}},[a("el-submenu",{attrs:{index:"1"}},[a("template",{slot:"title"},[a("i",{staticClass:"el-icon-s-tools"}),e._v(" "),a("span",{attrs:{slot:"title"},slot:"title"},[e._v("工具")])]),e._v(" "),a("el-menu-item",{attrs:{index:"/GenTrade"}},[e._v("生成交易")]),e._v(" "),a("el-menu-item",{attrs:{index:"/GenPrintF"}},[e._v("生成打印F表")]),e._v(" "),a("el-menu-item",{attrs:{index:"/GenInterface"}},[e._v("生成接口")])],2)],1)],1)},staticRenderFns:[]};var o={name:"App",components:{Menu:a("C7Lr")(n,l,!1,function(e){a("yfIn")},"data-v-69219a49",null).exports},data:function(){return{menuWidth:200}},computed:{left:function(){return this.menuWidth-200}},methods:{func:function(e){this.menuWidth=e?0:200}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("div",{staticClass:"menu",style:{left:e.left+"px"}},[a("Menu")],1),e._v(" "),a("div",{staticClass:"tools-container",style:{marginLeft:e.menuWidth+"px"}},[a("router-view"),e._v(" "),a("i",{directives:[{name:"show",rawName:"v-show",value:200==e.menuWidth,expression:"menuWidth==200"}],staticClass:"el-icon-d-arrow-left handle-icon",on:{click:function(t){return e.func(!0)}}}),e._v(" "),a("i",{directives:[{name:"show",rawName:"v-show",value:0==e.menuWidth,expression:"menuWidth==0"}],staticClass:"el-icon-d-arrow-right handle-icon",on:{click:function(t){return e.func(!1)}}})],1)])},staticRenderFns:[]};var i=a("C7Lr")(o,s,!1,function(e){a("DW+F")},"data-v-956f53a0",null).exports,u=a("7LQH"),c={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"Home"},[t("div",[this._v("home")])])}]};var d=a("C7Lr")({name:"Home",components:{},props:{},data:function(){return{}},methods:{},watch:{},filters:{},mounted:function(){}},c,!1,function(e){a("iWT2")},"data-v-551d7287",null).exports,p=a("rVsN"),m=a.n(p),f=a("lC5x"),v=a.n(f),h=a("J0Oq"),g=a.n(h),A=a("3cXf"),w=a.n(A),x=[{name:"v-model",attrPosition:"data"},{name:":disabled",attrPosition:"tag"},{name:"parafile",attrPosition:"tag",value:""},{name:":success",attrPosition:"methods",args:["name","age"]}],b=[{label:"账号",value:"ACC",isFullRow:!1,tagName:"custom-input",compAttr:JSON.parse(w()(x))},{label:"账号1",value:"ACC1",isFullRow:!1,tagName:"custom-selector",compAttr:JSON.parse(w()(x))},{label:"账号2",value:"ACC2",isFullRow:!1,tagName:"custom-selector",compAttr:JSON.parse(w()(x))},{label:"账号3",value:"ACC3",isFullRow:!1,tagName:"custom-selector",compAttr:JSON.parse(w()(x))}],F=[{groupTitle:"客户信息",label:"账号",":requisite":"true"},{groupTitle:"客户信息",label:"账号1",":requisite":"true"},{groupTitle:"客户信息",label:"账号2",":requisite":"true"},{groupTitle:"客户信息1",label:"账号3",":requisite":"true"}],_={getStandardConfig:function(e){var t=this;return g()(v.a.mark(function a(){var r;return v.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.success(JSON.parse(w()(b)),"成功"),t.abrupt("return",r);case 2:case"end":return t.stop()}},a,t)}))()},transformExcelData:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:JSON.parse(w()(F)),r=a.map(function(e){return e.groupTitle});return r=(r=r.filter(function(e,t){return r.indexOf(e)==t})).map(function(e,t){return{groupTitle:e,groupId:t}}),a.forEach(function(e){var t=r.find(function(t){return t.groupTitle==e.groupTitle});e.groupId=t.groupId}),{excelData:a,msgs:this.findEnFieldName(e,t,a).msgs}},findEnFieldName:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],r=[],n=function(e){var n=a[e],l=t.find(function(e){return e.label==n.label});if(l){n.value=l.value,n.compAttr=l.compAttr,n.isFullRow=l.isFullRow,n.tagName=l.tagName;for(var o=0;o<n.compAttr.length;o++){var s=l.compAttr[o];if("methods"==s.attrPosition){var i=s.name.replace(/:/g,"").toLocaleLowerCase();i=i.charAt(0).toUpperCase()+i.substr(1);var u=""+l.value+i;s.value=u}else"data"==s.attrPosition&&"v-model"==s.name&&(s.value=l.value)}var c=n.compAttr;n.tagName;n.hasOwnProperty(":requisite")&&c.push({name:":requisite",attrPosition:"tag",value:n[":requisite"]}),n.hasOwnProperty(":disabled")&&c.push({name:":disabled",attrPosition:"tag",value:n[":disabled"]});var d={name:"ref",value:n.value,attrPosition:"tag"},p={name:"property",value:n.value,attrPosition:"tag"},m={name:"label",value:n.label,attrPosition:"tag"};c.splice(1,0,p),c.splice(1,0,d),c.splice(1,0,m)}else r.push(n.label)},l=0;l<a.length;l++)n(l);return{msgs:r}}},y=a("ZLEe"),C=a.n(y),T=a("89ll"),R=a.n(T);function S(e,t){var a=[],r=[];if(t.compAttr.every(function(e){return Boolean(e.attrPosition)})){for(var n=0;n<t.compAttr.length;n++){var l=t.compAttr[n];"methods"==l.attrPosition?a.push({name:l.name,args:l.args,value:l.value}):"data"==l.attrPosition&&("v-model"==l.name?(l.value="TradeData."+t.value,r.push(t.value)):r.push(l.value))}!function(e,t){var a=t.compAttr,r=t.tagName,n="<"+r+" "+(a=(a=a.filter(function(e){return Boolean(e.value)})).map(function(t){return!1===t.value||""===t.value||void 0===t.value?(e.alert(w()(t)+" 无value值"),""):t.name+'="'+t.value+'"'})).join(" ")+"></"+r+">";t.compTpl=n}(e,t)}else e.alert("<p>有属性没有attrPosition"+w()(t)+"</p>");return{methods:a,dataFields:r}}var N={genAll:function(e,t){var a=function(e,t){for(var a=[],r=[],n=0;n<t.length;n++){var l=t[n];if("custom-table"==l.tagName){var o={tplStr:[],methods:[],dataFields:[]},s=o.methods,i=o.dataFields;a=a.concat(s),r=r.concat(i)}else{var u=S(e,l),c=u.methods,d=u.dataFields;a=a.concat(c),r=r.concat(d)}}return{standardFields:t,methodsAll:a=function(e,t){return t=t.map(function(e){return"async "+e.value+"("+(e.args||[]).join(",")+"){}"})}(0,a),dataFieldsAll:r}}(e,t);return{excelFieldsAll:a.standardFields,methodsAll:a.methodsAll,dataFieldsAll:a.dataFieldsAll}},twoDimensionalArray:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],a=[],r=R.a.groupBy(t,function(e){return e.groupId}),n=Math.max.apply(null,C()(r)),l=0;l<=n;l++)a.push(r[l]);return a=a.map(function(e){return function(e){for(var t=[],a=0;a<e.length;a++){var r=e[a];if(0==t.length)t.push([r]);else{var n=t[t.length-1],l=n[n.length-1];2==n.length?t.push([r]):l.isFullRow?t.push([r]):n.push(r)}}return t}(e)})}},k=window.m.xlsx,E=function(e,t){var a=document.createElement("a");a.download=t;var r=URL.createObjectURL(e);a.href=r,a.click(),setTimeout(function(){URL.revokeObjectURL(r)},100)},P=function(e){if("undefined"!=typeof ArrayBuffer){for(var t=new ArrayBuffer(e.length),a=new Uint8Array(t),r=0;r!=e.length;++r)a[r]=255&e.charCodeAt(r);return t}for(t=new Array(e.length),r=0;r!=e.length;++r)t[r]=255&e.charCodeAt(r);return t};var G={readExcelAsync:function(e){return new m.a(function(t,a){try{var r=new FileReader(e);r.onload=function(e){var a=k.read(e.target.result,{type:"binary"}),r={};a.SheetNames.forEach(function(e){var t=a.Sheets[e],n=k.utils.sheet_to_json(t,{header:"A",blankrows:!1,defval:""});r[e]=n}),t({isSuccess:!0,data:r})},r.readAsBinaryString(e)}catch(e){t({isSuccess:!1,errorcode:e.name,msg:e.message})}})},exportJsonToExcel:function(e,t){new Date;var a={SheetNames:["Sheet1"],Sheets:{},Props:{}};a.Sheets.Sheet1=k.utils.json_to_sheet(e),a.Sheets.Sheet1["!cols"]=[{wch:30},{wch:20},{wch:20},{wch:20}],t=t||"模板.xls",E(new Blob([P(k.write(a,{bookType:"xlsx",bookSST:!1,type:"binary"}))],{type:"application/octet-stream"}),t)}},$={name:"GenTrade",data:function(){return{titleRule:[{required:!0,message:"不能为空"}],tradeAttrArea:{tradeRoot:"E:\\work\\zantong\\qdgz_TEClient\\FCClient",devGroup:"asu-test",tradeCode:"00101001",tradeName:"测试交易生成",userName:"",email:""},devGroupOptions:[{label:"测试-asu-test",value:"asu-test"},{label:"现金结算-cash-out",value:"cash-out"}],collapseValues:[],rules:[{type:"any"}],tplsStr:"",excelFieldsAll:[{groupId:0,groupTitle:"客户信息",isFullRow:!1,compTpl:"<div></div>"}],methodsAll:[],distTplData:[],standardFields:[],excelData:[]}},methods:{saveTmpExcel:function(){G.exportJsonToExcel([{"组名称(trade-group)":""},{"栏位名称":""},{"是否必输":""},{"是否可用":""}],"生成交易模板.xls")},chooseExcel:function(){this.$refs.inputFile.value="",this.$refs.inputFile.click()},inputFileChange:function(e){var t=this;return g()(v.a.mark(function a(){var r,n,l,o,s;return v.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(r=e.target.files[0],r.path,n=window.m.path.extname(r.path),[".xls",".xlsx"].includes(n)){a.next=6;break}return t.$notify({message:"必须是excel"}),a.abrupt("return");case 6:return a.next=8,G.readExcelAsync(r);case 8:l=a.sent,o=l.data.Sheet1.slice(1),s=o.map(function(e){return{groupTitle:e.A,label:e.B,":requisite":e.C.includes("是"),":disabled":e.D.includes("是")}}),t.parseExcel(s);case 12:case"end":return a.stop()}},a,t)}))()},calcCollapseValues:function(){var e=this.excelData.map(function(e){if(!e.compAttr.every(function(e){return""!==e.value&&void 0!==e.value}))return e.label});this.collapseValues=e.filter(function(e){return e})},genStandardField:function(){var e=this;return g()(v.a.mark(function t(){var a;return v.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,_.getStandardConfig(e);case 2:if((a=t.sent).isSuccess){t.next=6;break}return e.$notify({title:a.msg,duration:0}),t.abrupt("return");case 6:e.standardFields=a.data;case 7:case"end":return t.stop()}},t,e)}))()},parseExcel:function(e){var t=_.transformExcelData(this,this.standardFields,e),a=t.excelData,r=t.msgs;if(r.length>0){(r=r.map(function(e){return" "+e+" "})).unshift('<div style="font-weight:bold;font-size:17px;">请联系标准组添加以下字段后再生成交易</div>');var n=r.join("");this.alert(n,"提示")}else this.excelData=[],this.excelData=a,this.calcCollapseValues()},genTradeTpl:function(){var e=this;return g()(v.a.mark(function t(){var a,r,n,l,o;return v.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.validateForm();case 2:if(t.sent){t.next=6;break}return e.$notify({type:"warning",message:"交易属性填完"}),t.abrupt("return");case 6:if(0!=e.excelData.length){t.next=9;break}return e.$notify({type:"warning",message:"先导入统计的excel"}),t.abrupt("return");case 9:a=N.genAll(e,e.excelData),r=a.excelFieldsAll,n=a.methodsAll,l=a.dataFieldsAll,r=r.map(function(e){return{groupId:e.groupId,groupTitle:e.groupTitle,isFullRow:e.isFullRow,compTpl:e.compTpl}}),o=N.twoDimensionalArray(e,r),e.distTplData=o,e.writeToFile({distTplData:o,methodsAll:n,dataFieldsAll:l});case 14:case"end":return t.stop()}},t,e)}))()},writeToFile:function(e){var t=e.distTplData,a=e.methodsAll,r={tradeCode:"t00101001",groups:t,dataFieldsAll:e.dataFieldsAll,methodsAll:a},n=window.m,l=n.path,o=n.fs,s=(n.process,n.ejs),i=(window.m.process.cwd(),this.buildPath("src/vue-render/tpls/App.ejs")),u=l.resolve(this.tradeAttrArea.tradeRoot,"modules/trade",this.tradeAttrArea.devGroup,"t"+this.tradeAttrArea.tradeCode);o.mkdirpSync(u);var c=l.resolve(u,"App.vue"),d=o.readFileSync(i,{encoding:"utf-8"}),p=s.render(d,r);o.writeFileSync(c,p,{encoding:"utf-8"}),this.$notify({type:"success",title:"成功",message:"写入模板成功"})},tradeRootChange:function(){return!!window.m.fs.existsSync(this.tradeAttrArea.tradeRoot)||(this.alert("FCClient项目根目录不存在:"+this.tradeAttrArea.tradeRoot),this.$refs.tradeRoot.focus(),!1)},getUsernameEmail:function(){var e=window.m.child_process;try{var t=e.execSync("git config --global user.name",{encoding:"utf-8"}),a=e.execSync("git config --global user.email",{encoding:"utf-8"});this.tradeAttrArea.userName=t,this.tradeAttrArea.email=a}catch(e){}},validateForm:function(){var e=this;return new m.a(function(t){e.$refs.titleForm.validate(function(a){var r=e.tradeRootChange();t(a&&r)})})}},computed:{},mounted:function(){this.genStandardField(),this.getUsernameEmail()}},D={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"GenTrade"},[a("el-divider",{attrs:{"content-position":"left"}},[e._v("交易属性")]),e._v(" "),a("el-form",{ref:"titleForm",attrs:{model:e.tradeAttrArea,"label-width":"130px",size:"mini"}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"FCClient路径",rules:e.titleRule,prop:"tradeRoot"}},[a("el-input",{ref:"tradeRoot",on:{change:e.tradeRootChange},model:{value:e.tradeAttrArea.tradeRoot,callback:function(t){e.$set(e.tradeAttrArea,"tradeRoot",t)},expression:"tradeAttrArea.tradeRoot"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"开发组",rules:e.titleRule,prop:"devGroup"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.tradeAttrArea.devGroup,callback:function(t){e.$set(e.tradeAttrArea,"devGroup",t)},expression:"tradeAttrArea.devGroup"}},e._l(e.devGroupOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"8位交易码",rules:e.titleRule,prop:"tradeCode"}},[a("el-input",{model:{value:e.tradeAttrArea.tradeCode,callback:function(t){e.$set(e.tradeAttrArea,"tradeCode",t)},expression:"tradeAttrArea.tradeCode"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"交易名称",rules:e.titleRule,prop:"tradeName"}},[a("el-input",{model:{value:e.tradeAttrArea.tradeName,callback:function(t){e.$set(e.tradeAttrArea,"tradeName",t)},expression:"tradeAttrArea.tradeName"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"开发名称",rules:e.titleRule,prop:"userName"}},[a("el-input",{model:{value:e.tradeAttrArea.userName,callback:function(t){e.$set(e.tradeAttrArea,"userName",t)},expression:"tradeAttrArea.userName"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"开发邮件",rules:e.titleRule,prop:"email"}},[a("el-input",{model:{value:e.tradeAttrArea.email,callback:function(t){e.$set(e.tradeAttrArea,"email",t)},expression:"tradeAttrArea.email"}})],1)],1)],1)],1),e._v(" "),a("el-row",[a("el-button",{attrs:{type:"primary",icon:"el-icon-document"},on:{click:e.genTradeTpl}},[e._v("生成交易")]),e._v(" "),a("el-button",{attrs:{icon:"el-icon-upload2"},on:{click:e.chooseExcel}},[e._v("导入交易统计excel")]),e._v(" "),a("el-button",{attrs:{icon:"el-icon-download"},on:{click:e.saveTmpExcel}},[e._v("生成交易统计模板excel")])],1),e._v(" "),a("el-divider",{attrs:{"content-position":"left"}},[e._v("交易内容")]),e._v(" "),a("div",[a("el-form",{ref:"form",attrs:{"label-width":"80px",size:"mini"}},[a("div",{staticClass:"groups"},[a("el-collapse",{model:{value:e.collapseValues,callback:function(t){e.collapseValues=t},expression:"collapseValues"}},e._l(e.excelData,function(t,r){return a("div",{key:r,staticClass:"group"},[a("el-collapse-item",{attrs:{name:t.label}},[a("template",{slot:"title"},[a("span",[e._v("组："+e._s(t.groupTitle))]),e._v(" "),a("span",{staticStyle:{"margin-left":"30px"}},[e._v("栏位："+e._s(t.label))])]),e._v(" "),a("el-row",e._l(t.compAttr,function(t,r){return a("div",{key:r},[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:t.name,rules:e.rules}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.value,expression:"compo.value"}],domProps:{value:t.value},on:{input:function(a){a.target.composing||e.$set(t,"value",a.target.value)}}})])],1)],1)}),0)],2)],1)}),0)],1)])],1),e._v(" "),a("input",{ref:"inputFile",staticStyle:{display:"none"},attrs:{type:"file"},on:{change:e.inputFileChange}})],1)},staticRenderFns:[]};var L=a("C7Lr")($,D,!1,function(e){a("OrtY")},"data-v-3b37c2d1",null).exports,O={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"GenPrintF"},[this._v("GenPrintF")])},staticRenderFns:[]};var I=a("C7Lr")({name:"GenPrintF",components:{},props:{},data:function(){return{}},methods:{},watch:{},filters:{},mounted:function(){}},O,!1,function(e){a("1ghf")},"data-v-b8d00f6e",null).exports,W={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"GenInterface"},[this._v("GenInterface")])},staticRenderFns:[]};var q=a("C7Lr")({name:"GenInterface",components:{},props:{},data:function(){return{}},methods:{},watch:{},filters:{},mounted:function(){}},W,!1,function(e){a("3rt+")},"data-v-2233ce59",null).exports;r.default.use(u.a);var j=new u.a({routes:[{path:"/",name:"Home",redirect:"/GenTrade",component:d},{path:"/GenTrade",name:"GenTrade",component:L},{path:"/GenPrintF",name:"GenPrintF",component:I},{path:"/GenInterface",name:"GenInterface",component:q}]}),J=(a("0CLL"),a("09yM"),a("TcQY")),M=a.n(J),U=(a("+hAf"),{methods:{success:function(e,t){return{isSuccess:!0,msg:t||"",data:e||{}}},fail:function(e,t){return{isSuccess:!1,msg:t||"",data:e||{}}},alert:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return new m.a(function(r){e.$alert(t,a,{dangerouslyUseHTMLString:!0,closeOnPressEscape:!1,closeOnClickModal:!1}).then(function(e){return r(!0)}).catch(function(e){return r(!1)})})},repeat:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"\t").repeat(e)},buildPath:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=window.m,a=t.isDev,r=t.path,n=(t.process,window.m.process.cwd());return a?r.resolve(n,e):r.resolve(n,"resources/app/",e)}},mounted:function(){(window.comps||(window.comps={}))[this.$options.name||"anonymous"]=this}});r.default.use(M.a,{size:"small",zIndex:3e3}),r.default.config.productionTip=!1,r.default.mixin(U),new r.default({el:"#app",router:j,components:{App:i},template:"<App/>"})},OrtY:function(e,t){},iWT2:function(e,t){},yfIn:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.js.map