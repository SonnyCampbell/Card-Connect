import Player from './Player'
import Game from './Game'

function GameConnection(io) {
    let _io = io;

    let _players = {}; // { socket.id : Player() }
    let _games = {}; // { roomName : Game() }
    let _roomsPlayers = {}; // { roomName: [Player1(), Player2(), ...]}

    this.JoinRoom = (socket, username, roomName) => {
        let player = new Player(socket, username);
        _players[socket.id]  = player;
        player.setRoomName(roomName);


        if(_roomsPlayers[roomName] === undefined){
            _roomsPlayers[roomName] = [player];
        } else {
            _roomsPlayers[roomName].push(player);
        }
        //console.log(_roomsPlayers[roomName]);

        socket.join(roomName, function() {
            socket.to(roomName).emit('PlayerJoinedGame', player.getUsername() + ' joined the room ' + roomName + '.');
        });
    }

    this.StartGame = (socket) => {
        let player = _players[socket.id];
        _games[player.getRoomName()] = new Game();

        console.log(player.getUsername() + ' started the game.');
        this.EmitToRoom(player.getRoomName(), 'StartGame', player.getUsername() + ' started the game.');
    }

    this.ShuffleDeck = (socket) => {
        let player = _players[socket.id];
        let game = _games[player.getRoomName()];
        game.ShuffleDeck();

        this.EmitToRoom(player.getRoomName(), 'ShuffleDeck', player.getUsername() + ' shuffled the deck.');
    }

    this.DealCard = (socket) => {
        let player = _players[socket.id];
        let game = _games[player.getRoomName()];
        socket.emit('DealCard', game.DealCard().SuitValue());
    }

    this.EmitToRoom = (room, event, msg) => {
        io.to(room).emit(event, msg);
    }
}


export default GameConnection;