const { app, BrowserWindow } = require('electron')
const path = require('path')
const init = require("./init");

init.initDB();

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preloads/preload.js')
        }
    })

    mainWindow.loadFile('src/views/index.html')

    // Open development tools.
    mainWindow.webContents.openDevTools()
}


app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})