import { Server } from 'socket.io'

let io

export function start (httpServer) {
  io = new Server(httpServer)

  io.on('connection', onNewWebsocketConnection)

  io.engine.on('connection_error', err => {
    console.error('IO encountered an error')
    console.error(err)
  })
}

function onNewWebsocketConnection (socket) {
  console.log(`Socket ${socket.id} has connected.`)

  socket.on('room', room => {
    console.log('Room established', { room, id: socket.id })
    socket.join(room)
  })

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} has disconnected.`)
  })
}

export function emit (room, name, data) {
  console.log('Sending IO', { room, name, data })
  io.to(room).emit(name, data)
}
