import Game from './Game/Game'
import Player from './Game/ServerPlayer'
import GameConnection from './Game/GameConnection'

var path = require('path');

var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.use(express.static(path.join(__dirname, './client')));
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './client/index.html'));
});

let conn = new GameConnection(io);
let players = {};

io.on('connection', (socket) => {
    console.log('User ' + socket.id + ' connected to server.');

    socket.on('JoinRoom', function(username, roomName, gameType){
        conn.JoinRoom(socket, username, roomName, gameType);
    });

    socket.on('StartGame', function(){
        conn.StartGame(socket);
    });

    socket.on('DealHands', function(numOfCards){
        conn.DealHands(socket, numOfCards);
    });

    socket.on('ShuffleDeck', function() {
        conn.ShuffleDeck(socket);
    });

    socket.on('DealCard', function() {
        conn.DealCard(socket);
    });

    socket.on('DiscardCard', function(discardCardSV) {
        conn.DiscardCard(socket, discardCardSV);
    });

    socket.on('GetRoomListUpdate', function() {
        conn.GetRoomListUpdate(socket);
    });



    socket.on('disconnect', () => {
        console.log('User disconnected');
    });


// ---------------------------------------------------------------------------------
//TODO: Logically separate functions
// Go Fish Functions
// ---------------------------------------------------------------------------------

    socket.on('AskForCard', function(cardQuestion, cardSV){
        conn.AskForCard(socket, cardQuestion, cardSV);
    });

    socket.on('GoFish', function(){
        conn.GoFish(socket);
    });

    socket.on('PassingCard', function(cardSV){
        conn.PassingCard(socket, cardSV);
    });

    socket.on('LayDownCard', function(laidDownCardSV) {
        console.log('Laying down card ' + laidDownCardSV);
        conn.LayDownCard(socket, laidDownCardSV);
    });

    socket.on('LayDownBook', function(laidDownCardValueString) {
        console.log('Laying down book of ' + laidDownCardValueString);
        conn.LayDownBook(socket, laidDownCardValueString);
    });

});

http.listen(3000, () => {
    console.log('listening on *:3000');
});