const { app, BrowserWindow, Tray, Menu, MenuItem } = require('electron')

const ICON_PATH_PLAYING = `${__dirname}/img/icon_playing.png`
const ICON_PATH_STOPPING = `${__dirname}/img/icon_stopping.png`

let mainWindow
let tray

app.on('ready', () => {
  tray = new Tray(ICON_PATH_STOPPING)
  const menu = new Menu()

  menu.append(new MenuItem({
    label: 'start BGM',
    click: () => { startMusic() },
  }))
  menu.append(new MenuItem({
    label: 'stop BGM',
    click: () => { stopMusic() },
  }))
  menu.append(new MenuItem({ type: 'separator' }))
  menu.append(new MenuItem({ role: 'quit' }))

  tray.setContextMenu(menu)

  createWindow()
})

app.on('ready', () => {
  app.dock.hide()
})

const createWindow = () => {
  mainWindow = new BrowserWindow({
    // width: 100, height: 800, webPreferences: {
    width: 0, height: 0, webPreferences: {
      nodeIntegration: true, // FIXME セキュリティ的に良くない
    },
  })
  mainWindow.loadFile(`${__dirname}/index.html`)
  // mainWindow.webContents.openDevTools()
}

const startMusic = () => {
  tray.setImage(ICON_PATH_PLAYING)

  if (mainWindow !== null) {
    mainWindow.webContents.send('play-bgm')
  }
}

const stopMusic = () => {
  tray.setImage(ICON_PATH_STOPPING)

  if (mainWindow !== null) {
    mainWindow.webContents.send('stop-bgm')
  }

}
