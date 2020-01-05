const { app, BrowserWindow,dialog,ipcMain } = require('electron')
var {ipcRenderer} = require("electron")
function createWindow () {   
  // 创建浏览器窗口
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  
  // 加载index.html文件
  win.loadFile('./index.html')
  ipcMain.on("message",(e,m)=>{
    win.send("message","from main")
    console.log("dd------------------------receive message");
  })


  win.webContents.openDevTools({mode:"undocked",activate:false});
  win.setTitle("dfsdfsdfsdfsdf")


}


app.on('ready', createWindow)

