import Player from './Player'
import Game from './Game'

function GameConnection(io) {
    let _io = io;

    let _players = {};
    let _games = {};

    this.JoinRoom = (socket, username, roomName) => {
        let player = new Player(socket, username);
        _players[socket.id]  = player;
        player.setRoomName(roomName);
        console.log(player.getUsername() + ' joined the game.');
        socket.join(roomName, function() {
            socket.to(roomName).emit('PlayerJoinedGame', player.getUsername() + ' joined the room ' + roomName + '.');
        });
    }

    this.StartGame = (socket) => {
        let player = _players[socket.id];
        _games[player.getRoomName()] = new Game();
        console.log(player.getUsername() + ' started the game.');
        //io.to(player.getRoomName()).emit('StartGame', player.getUsername() + ' started the game.');
        this.EmitToRoom(player.getRoomName(), 'StartGame', player.getUsername() + ' started the game.');
    }

    this.ShuffleDeck = (socket) => {
        let player = _players[socket.id];
        let game = _games[player.getRoomName()];
        game.ShuffleDeck();
        this.EmitToRoom(player.getRoomName(), 'ShuffleDeck', player.getUsername() + ' shuffled the deck.');
    }

    this.EmitToRoom = (room, event, msg) => {
        io.to(room).emit(event, msg);
    }
}


export default GameConnection;