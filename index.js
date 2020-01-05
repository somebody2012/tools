const { ipcRenderer } = require('electron')
window.addEventListener("load",()=>{
  
  document.write(JSON.stringify(ipcRenderer))
  // ipcRender.send("msg","from render process")
  // ipcRender.on("msg",(e,m)=>{
  //   document.write("dddddd")
  // })
})

