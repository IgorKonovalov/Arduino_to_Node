const http = require('http')
const express = require('express')
const app = express()
const serialport = require('serialport')

const server = http.createServer(app).listen(3000)
const io = require('socket.io').listen(server)

app.use(express.static(__dirname + '/public'))
const sp_readline = serialport.parsers.Readline

// check your serial port and use it on next line
const port = new serialport('/dev/tty.usbserial-DN02BJH9', {
  baudRate: 9600
})

const parser = new sp_readline()
port.pipe(parser)

port.on('open', () => {
  console.log('Serial Port Opened')
  let lastValue
  io.sockets.on('connection', socket => {
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
