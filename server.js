'use strict'
const http = require('http')
const path = require('path')
const fs = require('fs')
const EventEmitter = require('events')
const express = require('express')
const socketio = require('socket.io')
const port = process.env.PORT || 8888

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const events = new EventEmitter()
let wind;

server.listen(port, () => console.log(`Listening on port ${port}`))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'js')))
app.use(express.static(path.join(__dirname, 'css')))

fs.writeFile('/mnt/ramdisk/wind.txt', '5.77', function (err, data) {
   if (err) {return console.log(err);
   }
 })

io.sockets.on('connect', socket => {

setInterval(() => {
 fs.readFile('/home/pi/wind.txt', 'utf8', function (err, data) {
    if (err) {return console.log(err);
    }
    wind = data;
  }, 500);
  socket.emit('wind', wind);
  });
});
