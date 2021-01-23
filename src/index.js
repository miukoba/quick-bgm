const { app, dialog, Tray, Menu, MenuItem } = require('electron')
const ICON_PATH_PLAYING = `${__dirname}/img/icon_playing.png`
const ICON_PATH_STOPPING = `${__dirname}/img/icon_stopping.png`

let tray

const startMusic = () => {
  tray.setImage(ICON_PATH_PLAYING)
}

const stopMusic = () => {
  tray.setImage(ICON_PATH_STOPPING)
}

app.on('ready', () => {
  tray = new Tray(ICON_PATH_STOPPING)
  const menu = new Menu()

  menu.append(new MenuItem({
    label: 'start BGM',
    click: () => {
      startMusic()
      dialog.showErrorBox('エラー1', 'start clicked!')
    },
  }))
  menu.append(new MenuItem({
    label: 'stop BGM',
    click: () => {
      stopMusic()
      dialog.showErrorBox('エラー2', 'stop clicked!')
    },
  }))
  menu.append(new MenuItem({ type: 'separator' }))
  menu.append(new MenuItem({ role: 'quit' }))

  tray.setContextMenu(menu)
})

app.on('ready', () => {
  app.dock.hide()
})