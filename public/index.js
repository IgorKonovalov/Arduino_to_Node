const socket = io.connect('http://localhost:3000')

socket.on('connected', () => {
  console.log('Socket Connected')
})
socket.on('disconnect', () => {
  console.log('Socket Disconnected')
})

socket.on('data', data => {
  document.body.setAttribute('style', `background-color: hsl(${Math.round(data/3)}, 100%, 50%)`)
})
