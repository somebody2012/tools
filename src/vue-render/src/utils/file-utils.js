let XLSX = window.m.xlsx;

let colsStyle1 = [
  {wch:30},
  {wch:20},
  {wch:40},
  {wch:40},
];
const exportJsonToExcel = (dataArr,fileName,colsStyle) => {
  colsStyle=colsStyle||colsStyle1;
  const now = new Date()
  const wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };//这里的数据是用来定义导出的格式类型
  const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} };
  wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(dataArr);//通过json_to_sheet转成单页(Sheet)数据
  wb.Sheets.Sheet1["!cols"]=colsStyle;
  fileName = fileName || "模板.xls";
  saveAs(new Blob([s2ab(XLSX.write(wb, wopts))], { type: "application/octet-stream" }), fileName);
}

// 导出excel
const saveAs = (obj, fileName) => {
  var tmpa = document.createElement("a");
  tmpa.download = fileName;
  const href = URL.createObjectURL(obj); //绑定a标签
  tmpa.href = href;

  tmpa.click(); //模拟点击实现下载
  setTimeout(function () { //延时释放
      URL.revokeObjectURL(href); //用URL.revokeObjectURL()来释放这个object URL
  }, 100);
}

const s2ab = (s) => {
  if (typeof ArrayBuffer !== 'undefined') {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
  } else {
      var buf = new Array(s.length);
      for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
      return buf;
  }
}



function readExcelAsync(file) {
  return new Promise((resolve, eject) => {
    try {
      let reader = new FileReader(file);
      reader.onload = e => {
        let workbook = XLSX.read(e.target.result, { type: "binary"});
        let data = {};
        workbook.SheetNames.forEach(sheetName => {
          let sheet = workbook.Sheets[sheetName];
          let sheetData = XLSX.utils.sheet_to_json(sheet, { header: "A" ,blankrows:false,defval:"" });
          data[sheetName] = sheetData;
        })
        resolve({
          isSuccess: true,
          data: data
        })
      };
      reader.readAsBinaryString(file);
    } catch (e) {
      resolve({ isSuccess: false, errorcode: e.name, msg: e.message })
    }
  });
}

export default {
  readExcelAsync:readExcelAsync,
  exportJsonToExcel:exportJsonToExcel
}