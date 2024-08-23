const { app, BrowserWindow, Menu, MenuItem, ipcMain } = require('electron');
const path = require('node:path');


// Pour mac
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createTray = () => {
  const trayMenu = new Menu.buildFromTemplate([{ role: 'quit' }]);
  tray = new Tray(path.join(assetsDirectory, 'tray.png'));
  tray.setToolTip(app.getName());
  tray.on('click', (e) => {
  mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  mainWindow.webContents.send('nom-channel-handle', 'ping');
  });
  tray.setContextMenu(trayMenu);
 };

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
  minWidth: 500,
  height: 600,
  minHeight: 400,
  backgroundColor: '#C0FFC5',
  webPreferences: {
  preload: path.join(__dirname, 'preload.js')
 },
});

 mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Menu
 const mainMenu = new Menu();
 const menuItem1 = new MenuItem({
 label: 'Electron',
 submenu: [
 { label: 'Item 1' },
 {
    label: 'Item 2',
    enabled: false,
 },
 {
  label: 'Item 3',
  click: () => {
    console.log('TEST');
  },
  accelerator: 'Shift+Alt+T',
},
 ],
 });
 mainMenu.append(menuItem1);
 Menu.setApplicationMenu(mainMenu);

};

app.whenReady().then(() => {
  ipcMain.on('nom-channel-oneway', handleActionOneWay);
  ipcMain.handle('nom-channel-twoway', handleActionTwoWay);

  createWindow();
  createTray();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();

   }
    });
});

app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
    app.quit();
   }
});

app.on('before-quit', (e) => {
  // e.preventDefault();
  console.log('before-quit');
 });
 app.on('browser-window-blur', () => {
  console.log('browser-window-blur');
 });
 app.on('browser-window-focus', () => {
  console.log('browser-window-focus');
 });

 const handleActionOneWay = (event, param1, param2) => {
  console.log(param1, param2);
 };

 const handleActionTwoWay = async (event, param) => {
  console.log(param);
  // Traitement asynchrone ... await
  return 'pong';
 };



