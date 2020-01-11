
let xlsx = require("xlsx");
let fs = require("fs");


let excelBuffer = fs.readFileSync("./test.xlsx");
let WorkBook = xlsx.read(excelBuffer,{type:"array"})

let json = xlsx.utils.sheet_to_json(
  WorkBook.Sheets[WorkBook.SheetNames[0]],
  {
    header:"A",
    blankrows:false,
    defval:"",
    raw:true
  }
)
WorkBook.Sheets.Sheet1.B2.v = "xxxxxxx"
let result = xlsx.write(WorkBook,{
  type:"buffer",
  bookType:"xlsx"
})
fs.writeFileSync("./test1.xlsx",result);

console.log(1)