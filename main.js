
const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
  win = new BrowserWindow({ width: 1000, height: 900 });
  // win.webContents.openDevTools();
  // win.setFullScreen(true);
  win.setMenu(null);
  win.loadURL('http://localhost:5000');
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

// main.js
// Displaying main.js.