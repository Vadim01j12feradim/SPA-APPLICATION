const express = require('express');
const http = require('http');
const { Server } = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "*",  // O especifica el origen de tu app
  }
});

// Manejar la conexión de los clientes
io.on('connection', (socket) => {
  console.log('User connected');

  // Escuchar el mensaje del cliente
  socket.on('message', (msg) => {
    console.log('Message received:', msg);
    
    // Emitir el mensaje a todos los clientes conectados
    io.emit('message', msg);
  });

  // Manejar la desconexión
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Iniciar el servidor en el puerto 3001
server.listen(3001, () => {
  console.log('Server listening on port 3001');
});
