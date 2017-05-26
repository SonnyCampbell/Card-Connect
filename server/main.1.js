import Game from '../Game/Game'

var express = require('express');
var app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(path.join(__dirname, './client')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './client/index.html'));
});

let players = {};

io.on('connection', (socket) => {
    console.log('User ' + socket.id + ' connected to server.');

    socket.on('JoinGame', function(roomName){
        players[socket.id] = 'player' + (Object.keys(players).length + 1);
        console.log(players[socket.id] + ' joined the game.');
        console.log(roomName);
        socket.broadcast.emit('PlayerJoinedGame', players[socket.id] + ' joined the game.');
    });

    socket.on('StartGame', function(){
        console.log(players[socket.id] + ' started the game.');
        io.emit('StartGame', players[socket.id] + ' started the game.');
    });

    socket.on('disconnect', () => {
        //delete players[socket.id];
        console.log('User disconnected');
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});