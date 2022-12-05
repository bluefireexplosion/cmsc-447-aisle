const {app, BrowserWindow} = require('electron');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const ipcMain = require('electron').ipcMain;

let mainWindow;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    userDB.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Closed the database connection.');
    });
    app.quit();
});

//do our db init here, which should be at native appdata with a file name of userdata.dbx
let userDB = new sqlite3.Database(path.join(app.getPath('userData'),"userdata.dbx"), 
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, 
    (err) => { 
        if (err)
        {
          console.log("Error opening SQLite db!");
          app.quit();
        }
        //try regenerating the table, if this doesn't error, it's first time, either way, we don't care
        //generate our table here
        userDB.run("CREATE TABLE IF NOT EXISTS allergies(name TEXT)")
        userDB.run("CREATE TABLE IF NOT EXISTS cookbook(recipe TEXT)")
        userDB.run("CREATE TABLE IF NOT EXISTS shoppinglist(ingredient TEXT, quantity REAL)")
        
    });
global.sharedData = {db: NaN};
global.sharedData.db = userDB;
// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 800, webPreferences: {nodeIntegration: true, enableRemoteModule: true, contextIsolation: false}});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
