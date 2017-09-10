import Player from './ServerPlayer'
import Game from './Game'

class GameConnection {
    constructor(io){
        //privates
        this._io = io;
        this._players = {}; // { socket.id : Player() }
        this._games = {}; // { roomName : Game() }
        this._roomsPlayers = {}; // { roomName: [Player1(), Player2(), ...]}
        this._rooms = [];
    }


    JoinRoom(socket, username, roomName, gameType) {

        if(this._games.hasOwnProperty(roomName) && this._games[roomName].hasStarted){
            //Block player from joining
            console.log('Game already in progress in ' + roomName);
            socket.emit('joinRoomError', 'Game already in progress in ' + roomName  );
            return;
        }

        if(this._roomsPlayers.hasOwnProperty(roomName)){
            if(this._roomsPlayers[roomName].length >= 2){
                //Block player from joining
                console.log('Maximum player number reached in ' + roomName);
                socket.emit('joinRoomError', 'Maximum player number reached in ' + roomName);
                return;
            }

            for(let i = 0; i < this._roomsPlayers[roomName].length; i++){
                if(this._roomsPlayers[roomName][i].GetUsername() === username){
                    console.log('Username ' + username + ' already in use.');
                    socket.emit('joinRoomError', 'Username ' + username + ' already in use.');
                    return;
                }
            }
            
        }

        

        let player = new Player(socket, username, gameType);

        this._players[socket.id]  = player;

        player.SetRoomName(roomName);
        if(!this._rooms.includes(roomName)){
            this._rooms.push(roomName);
        }
        


        if(!this._roomsPlayers.hasOwnProperty(roomName)){
            this._roomsPlayers[roomName] = [player];
        } else {
            this._roomsPlayers[roomName].push(player);
        }
        //console.log(_roomsPlayers[roomName]);
        socket.emit('joinRoomSuccess', 'You successfully joined the room ' + roomName);

        socket.join(roomName, function() {
            socket.to(roomName).emit('PlayerJoinedGame', player.GetUsername() + ' joined the room ' + roomName + '.');
        });

    }


    GetRoomListUpdate(socket) {
        let roomList = [];

        for(let i = 0; i < this._rooms.length; i++){
            roomList.push({
                roomName: this._rooms[i],
                playerCount: this._roomsPlayers[this._rooms[i]].length,
                gameType: this._roomsPlayers[this._rooms[i]][0].gameType
            });
        }
        //console.log(socket.id + ' ' + roomList);
        socket.emit('RoomListUpdate', roomList);
    }


    StartGame(socket) {
        let player = this._players[socket.id];
        this._games[player.GetRoomName()] = new Game(player.gameType);
        this._games[player.GetRoomName()].hasStarted = true;

        console.log(player.GetUsername() + ' started the game.');
        this.EmitToRoom(player.GetRoomName(), 'StartGame', player.GetUsername() + ' started the game.');
    }

    DealHands(socket, numOfCards) {
        let player = this._players[socket.id];
        let game = this._games[player.GetRoomName()];
        
        this._io.in(player.GetRoomName()).clients((error, clients) => {
            for(let i = 0; i < clients.length; i++){
                game.players.push(this._players[clients[i]]);
            }

            game.DealHands(numOfCards);           
        });
    }

    ShuffleDeck(socket) {
        let player = this._players[socket.id];
        let game = this._games[player.GetRoomName()];
        game.ShuffleDeck();

        this.EmitToRoom(player.GetRoomName(), 'ShuffleDeck', player.GetUsername() + ' shuffled the deck.');
    }

    DealCard(socket) {
        let player = this._players[socket.id];
        let game = this._games[player.GetRoomName()];
        let dealtCard = game.DealCard();
        socket.emit('DealCard', dealtCard.SuitValue(), false);
        socket.to(player.GetRoomName()).emit('OppPlayerDealtCard', dealtCard.SuitValue());

    }

    DiscardCard(socket, discardCardSV) {
        let player = this._players[socket.id];
        let game = this._games[player.GetRoomName()];
        socket.to(player.GetRoomName()).emit('OppPlayerDiscardedCard', discardCardSV);
    }

    EmitToRoom(room, event, msg) {
        this._io.to(room).emit(event, msg);
    }


// ---------------------------------------------------------------------------------
//TODO: Logically separate functions
// Go Fish Functions
// ---------------------------------------------------------------------------------

    AskForCard(socket, cardQuestion, cardSV) {
        let player = this._players[socket.id];
        socket.to(player.GetRoomName()).emit('OppAskedForCard', cardQuestion, cardSV);
    }

    GoFish(socket) {
        let player = this._players[socket.id];
        socket.to(player.GetRoomName()).emit('ToldGoFish');
    }

    PassingCard(socket, cardSV) {
        let player = this._players[socket.id];
        socket.to(player.GetRoomName()).emit('PassedCard', cardSV);
    }

    //NOT BEING USED - LayDownBook used instead
    LayDownCard(socket, cardSV) {
        let player = this._players[socket.id];
        socket.to(player.GetRoomName()).emit('OppLaidDownCard', cardSV); 
    }

    LayDownBook(socket, cardValue) {
        let player = this._players[socket.id];
        socket.to(player.GetRoomName()).emit('OppLaidDownBook', cardValue); 
    }
}


export default GameConnection;