
let child_process = require("child_process");





let res = child_process.execSync("java -jar java-test.jar D:/a/b/ccc.xlsx",{encoding:"utf-8"})

console.log(res);




