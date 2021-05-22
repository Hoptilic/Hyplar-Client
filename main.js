const { app, BrowserWindow, ipcMain } = require('electron');
const log = require('electron-log')
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 760,
    frame: false,
    transparent: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools({mode:'undocked'})
  console.log("kill me")

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', function() {
  createWindow();
});

app.on('second-instance', (e, c, w) => {
  app.quit();
});