const { app,dialog,ipcMain,globalShortcut,BrowserWindow,Menu} = require('electron')
let fs = require("fs");
function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('./index.html')
  // win.loadURL('http:www.baidu.com')
  win.webContents.on("dom-ready",event => {
    
  })
  ipcMain.on("message",(e,m)=>{
    win.send("message","from main")
    console.log("dd------------------------receive message");
  })


  win.webContents.openDevTools({mode:"bottom",activate:false});
  win.setTitle("dfsdfsdfsdfsdf")


}


app.on('ready', createWindow)

