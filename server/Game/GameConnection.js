import Player from './ServerPlayer'
import Game from './Game'

function GameConnection(io) {
    let _io = io;

    let _players = {}; // { socket.id : Player() }
    let _games = {}; // { roomName : Game() }
    let _roomsPlayers = {}; // { roomName: [Player1(), Player2(), ...]}
    let _rooms = [];

    this.JoinRoom = (socket, username, roomName) => {


        if(_games.hasOwnProperty(roomName) && _games[roomName].hasStarted){
            //Block player from joining
            console.log('Game already in progress in ' + roomName);
            socket.emit('joinRoomError', 'Game already in progress in ' + roomName  );
            return;
        }

        if(_roomsPlayers.hasOwnProperty(roomName)){
            if(_roomsPlayers[roomName].length >= 2){
                //Block player from joining
                console.log('Maximum player number reached in ' + roomName);
                socket.emit('joinRoomError', 'Maximum player number reached in ' + roomName);
                return;
            }

            for(let i = 0; i < _roomsPlayers[roomName].length; i++){
                if(_roomsPlayers[roomName][i].getUsername() === username){
                    console.log('Username ' + username + ' already in use.');
                    socket.emit('joinRoomError', 'Username ' + username + ' already in use.');
                    return;
                }
            }
            
        }

        

        let player = new Player(socket, username);
        _players[socket.id]  = player;
        player.setRoomName(roomName);
        if(!_rooms.includes(roomName)){
            _rooms.push(roomName);
        }
        


        if(!_roomsPlayers.hasOwnProperty(roomName)){
            _roomsPlayers[roomName] = [player];
        } else {
            _roomsPlayers[roomName].push(player);
        }
        //console.log(_roomsPlayers[roomName]);
        socket.emit('joinRoomSuccess', 'You successfully joined the room ' + roomName);

        socket.join(roomName, function() {
            socket.to(roomName).emit('PlayerJoinedGame', player.getUsername() + ' joined the room ' + roomName + '.');
        });

    }


    this.GetRoomListUpdate = function(socket){
        let roomList = [];

        for(let i = 0; i < _rooms.length; i++){
            roomList.push({
                roomName: _rooms[i],
                playerCount: _roomsPlayers[_rooms[i]].length
            });
        }
        console.log(socket.id + ' ' + roomList);
        socket.emit('RoomListUpdate', roomList);
    }


    this.StartGame = (socket) => {
        let player = _players[socket.id];
        _games[player.getRoomName()] = new Game();
        _games[player.getRoomName()].hasStarted = true;

        console.log(player.getUsername() + ' started the game.');
        this.EmitToRoom(player.getRoomName(), 'StartGame', player.getUsername() + ' started the game.');
    }

    this.DealHands = (socket, numOfCards) => {
        let player = _players[socket.id];
        let game = _games[player.getRoomName()];
        
        io.in(player.getRoomName()).clients(function(error, clients){
            for(let i = 0; i < clients.length; i++){
                game.players.push(_players[clients[i]]);
            }

            game.DealHands(numOfCards);           
        });
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
        let dealtCard = game.DealCard();
        socket.emit('DealCard', dealtCard.SuitValue(), false);
        socket.to(player.getRoomName()).emit('OppPlayerDealtCard', dealtCard.SuitValue());

    }

    this.DiscardCard = (socket, discardCardSV) => {
        let player = _players[socket.id];
        let game = _games[player.getRoomName()];
        socket.to(player.getRoomName()).emit('OppPlayerDiscardedCard', discardCardSV);
    }

    this.EmitToRoom = (room, event, msg) => {
        io.to(room).emit(event, msg);
    }


// ---------------------------------------------------------------------------------
//TODO: Logically separate functions
// Go Fish Functions
// ---------------------------------------------------------------------------------

    this.AskForCard = (socket, cardQuestion, cardSV) => {
        let player = _players[socket.id];
        socket.to(player.getRoomName()).emit('OppAskedForCard', cardQuestion, cardSV);
    }

    this.GoFish = (socket) => {
        let player = _players[socket.id];
        socket.to(player.getRoomName()).emit('ToldGoFish');
    }

    this.PassingCard = (socket, cardSV) => {
        let player = _players[socket.id];
        socket.to(player.getRoomName()).emit('PassedCard', cardSV);
    }

    //NOT BEING USED - LayDownBook used instead
    this.LayDownCard = (socket, cardSV) => {
        let player = _players[socket.id];
        socket.to(player.getRoomName()).emit('OppLaidDownCard', cardSV); 
    }

    this.LayDownBook = (socket, cardValue) => {
        let player = _players[socket.id];
        socket.to(player.getRoomName()).emit('OppLaidDownBook', cardValue); 
    }
}


export default GameConnection;