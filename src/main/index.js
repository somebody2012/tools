const { app,dialog,ipcMain,globalShortcut,BrowserWindow,Menu} = require('electron')
let fs = require("fs");
let {isDev} = require("./config.js");
let win = null;
function createWindow () {
  win = new BrowserWindow({
    fullscreen:true,
    webPreferences: {
      nodeIntegration: true
    }
  })
  if(isDev){
    win.loadURL('http://localhost:8080/#/')
  }else{
    win.loadFile('src/vue-render/dist/index.html')
  }
  
  win.webContents.on("dom-ready",event => {
    
  })
  if(isDev){
    win.webContents.openDevTools({mode:"bottom",activate:false});
  }
  win.setTitle("工具")
}
let registHotKey = () => {
  globalShortcut.register('shift+d', () => {
    if(win){
      win.webContents.openDevTools({mode:"bottom",activate:false});
    }
  })
}
let appReady = function(){
  createWindow();
  registHotKey();
}

app.on('ready', appReady);

