const { app,dialog,ipcMain,globalShortcut,BrowserWindow,Menu,screen} = require('electron')
let fs = require("fs");
let {isDev} = require("./config.js");
let win = null;
function createWindow () {
  let display = screen.getPrimaryDisplay();
  let size = display.size;
  let width = size.width;
  let height = size.height;
  win = new BrowserWindow({
    // fullscreen:true,
    width:width,
    height:height,
    show:true,
    webPreferences: {
      nodeIntegration: true
    }
  })
  
  let template = []
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)



  if(isDev){
    win.loadURL('http://localhost:8080/#/')
  }else{
    win.loadFile('src/vue-render/dist/index.html');
    
  }
  
  win.webContents.on("dom-ready",event => {
    win.webContents.send("config-msg",{isDev});
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

