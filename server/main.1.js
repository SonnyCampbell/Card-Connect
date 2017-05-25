import Deck from '../Game/serverDeck'
let deck = new Deck();

var express = require('express');
var app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(path.join(__dirname, './client')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './client/index.html'));
});

io.on('connection', (socket) => {
    console.log('A user connected1');

    // socket.on('chat message', function(msg){
    //     console.log(msg + 'serverside update');
    //     io.emit('chat message', msg );
    // });

    // socket.on('private message', function(msg){
    //     console.log(msg);
    //     socket.emit('private message', 'This should be private ' + socket.id );
    // });

    socket.on('ShuffleDeck', function(msg){
        console.log(msg + ' shuffled the deck.');
        deck.Shuffle();
        io.emit('ShuffleDeck', msg + ' shuffled the deck.');
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});