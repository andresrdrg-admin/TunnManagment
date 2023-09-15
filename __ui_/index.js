const { app, BrowserWindow, globalShortcut, Menu } = require('electron')
const path = require('path');

// Deshabilitar el menú de desarrollador
// Menu.setApplicationMenu(null);

// app.on('ready', () => {
//   // Deshabilitar el acceso a las herramientas de desarrollo
//   globalShortcut.register('CommandOrControl+Shift+I', () => {});
// });

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1320,
    height: 600,
    minWidth: 1200,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname, 'icon.png'), // Ruta del archivo de ícono
    title: "TunnManagment Configuration"
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})