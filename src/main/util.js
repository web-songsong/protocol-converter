const { ipcMain } = require('electron')
// const protocol = require('./tool/protocol.js')
import protocol from './tool/protocol.js'
ipcMain.on('path_file', (event, arg) => {
  protocol(arg)
    .then(data => {
      event.sender.send('node_over', data)
    })
    .catch(err => {
      event.sender.send('node_over_err', err)
    })
})
