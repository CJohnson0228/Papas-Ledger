const { app, BrowserWindow, protocol, ipcMain, dialog } = require("electron");
const electron = require ('electron');
const path = require("path");
const fs = require("fs");

// ipcMain functions
const userDataPath = (electron.app || electron.remote.app).getPath('userData');


// Create the native browser window.
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    icon: path.join(__dirname, '../src/assets/icon/favicon.ico'),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  // removes the file menu
  // mainWindow.removeMenu();
  // removes the file menu

  // In production, set the initial browser path to the local bundle generated
  // by the Create React App build process.
  // In development, set it to localhost to allow live/hot-reloading.
  const appURL = app.isPackaged
    ? `file://${__dirname}/../build/index.html`
    : "http://localhost:3000";
  mainWindow.loadURL(appURL);

  // Automatically open Chrome's DevTools in development mode.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
}

// Setup a local proxy to adjust the paths of requested files when loading
// them from the local production bundle (e.g.: local fonts, etc...).
function setupLocalFilesNormalizerProxy() {
  protocol.registerHttpProtocol(
    "file",
    (request, callback) => {
      const url = request.url.substr(8);
      callback({ path: path.normalize(`${__dirname}/${url}`) });
    },
    (error) => {
      if (error) console.error("Failed to register protocol");
    }
  );
}

// This method will be called when Electron has finished its initialization and
// is ready to create the browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  setupLocalFilesNormalizerProxy();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

/// IPC Main Functions
ipcMain.on('saveFile', (event,arg) => {
  let date = new Date();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  let year = date.getFullYear().toString();
  let hour = date.getHours().toString();
  let min = date.getMinutes();
  min = min <= 9 ? '0' + min : min;
  let saveDate = month + day + year + "-" + hour + min;
  this.path = path.join(userDataPath, 'papasledgerBackup' + saveDate + '.json' )
  let info = [ this.path, arg ]
  fs.writeFileSync(this.path, JSON.stringify(arg));
  event.reply('savereply', info)
})

ipcMain.on('loadFile', (event, arg) => {
  let options = {
    title: 'Select Backup File',
    defaultPath: userDataPath,
    buttonLabel: 'Load Backup',
    filters: [
      {names: 'Backups', extensions: [ 'json' ]},
      {names: 'All Files', extensions: [ '*' ]}
    ],
    properties: [ 'openFile' ]
  }
  let filePath = dialog.showOpenDialogSync(options)
  event.reply('path', filePath)
  if(filePath === undefined){
      event.reply('error', 'No File Selected')
    } else {
      let data = fs.readFileSync(filePath[0], 'utf-8')
      event.reply('fileData', data)
    }
  })

// Quit when all windows are closed, except on macOS.
// There, it's common for applications and their menu bar to stay active until
// the user quits  explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// If your app has no need to navigate or only needs to navigate to known pages,
// it is a good idea to limit navigation outright to that known scope,
// disallowing any other kinds of navigation.
const allowedNavigationDestinations = "https://my-electron-app.com";
app.on("web-contents-created", (event, contents) => {
  contents.on("will-navigate", (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);

    if (!allowedNavigationDestinations.includes(parsedUrl.origin)) {
      event.preventDefault();
    }
  });
});
