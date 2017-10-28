const http = require('http')
const express = require('express')
const app = express()
const serialport = require('serialport')
const sp_readline = serialport.parsers.Readline

const port = 3000
const Server = http.createServer(app)
const io = require('socket.io').listen(Server)

app.use(express.static(__dirname + '/public'))

const sPort = new serialport('/dev/tty.usbserial-DN02BJH9', {
  // you'll need to check for a your port name first
  baudRate: 9600
})
const parser = new sp_readline()

sPort.on('open', () => {
  console.log('Serial Port Opened')
  let lastValue
  io.on('connection', socket => {
    socket.emit('connected')
    parser.on('data', data => {
      let lastValue // we use additional variable to avoid constant sending data to connected socket
      if (lastValue !== data) {
        socket.emit('data', data)
      }
      lastValue = data
    })
  })
})

Server.listen(port, () => {
  console.log(`Express server started on ${port}`)
})
