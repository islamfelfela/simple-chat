const express = require('express');
const app = express();
const socket = require('socket.io');

app.use(express.static('public'));

const server = app.listen(3000, (err) => {
    if (err) {
        console.log(err);    
    }else{
        console.log("server up on 3000");
    }

});

const io = socket(server);
io.on('connection', (socket) => {
    console.log("Socket connection is up", socket.id);

    // listining to chat event
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });
    
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});