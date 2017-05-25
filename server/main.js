var express = require('express');
var app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(path.join(__dirname, './client')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './client/index.html'));
});

app.get('/test/', function(req, res){
    res.sendFile(path.join(__dirname, './client/index1.html'));
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', function(msg){
        console.log(msg + 'serverside update');
        io.emit('chat message', msg );
    });

    socket.on('private message', function(msg){
        console.log(msg);
        socket.emit('private message', 'This should be private ' + socket.id );
    });

    socket.on('shuffleDeck', function(msg){
        console.log(msg + ' message received');
        io.emit('chat message', msg );
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});