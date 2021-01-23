const { app, Tray, Menu, MenuItem } = require('electron')
const ICON_PATH = `${__dirname}/img/icon.png`

app.on('ready', () => {
  const appIcon = new Tray(ICON_PATH)
  const menu = new Menu()

  menu.append(new MenuItem({
    label: 'item',
    click: () => {
      alert('click item')
    },
  }))
  menu.append(new MenuItem({ type: 'separator' }))
  menu.append(new MenuItem({ role: 'quit' }))

  appIcon.setContextMenu(menu)
})

app.on('ready', () => {
  app.dock.hide()
})