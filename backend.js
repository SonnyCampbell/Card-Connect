(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ServerDeck__ = __webpack_require__(9);


class Game {
    constructor(gameType) {
        this.deck = new __WEBPACK_IMPORTED_MODULE_0__ServerDeck__["a" /* default */](); 

        this.players = [];
        this.hasStarted = false;
        this.gameType = gameType;
    }


    ShuffleDeck() {
        this.deck.Shuffle();
    }

    DealCard() {
        return this.deck.Deal();
    }

    DealHands(numOfCards) {
        
        for(let j = 0; j < this.players.length; j++){
            let player = this.players[j];

            for(let i = 0; i < numOfCards; i++){
                player.getHand().push(this.deck.Deal());
            }

            for(let i = 0; i < player.getHand().length; i++){
                //console.log(this.players[j].getHand()[i].ToString());
                let dealtCard = player.getHand()[i];
                player.getSocket().emit('DealCard', dealtCard.SuitValue(), true);
                player.getSocket().to(player.getRoomName()).emit('OppPlayerDealtCard', dealtCard.SuitValue(), true);
            }
        };
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ServerCard__ = __webpack_require__(2);


function Player(socket, username, gameType) {
    let _username = username;
    let _socket = socket;
    let _roomName = '';
    let _hand = [];

    this.isTurn = false;

    this.gameType = gameType;

    // Getters and Setters
    this.getSocket = () => {
        return  _socket;
    }
    this.setSocket = (socket) => {
        _socket = socket;
    }

    this.getUsername = () => {
        return  _username;
    }
    this.setUsername = (username) => {
        _username = username;
    }

    this.getRoomName = () => {
        return  _roomName;
    }
    this.setRoomName = (roomName) => {
        _roomName = roomName;
    }

    this.getHand = () => {
        return _hand;
    }
    this.setHand = (hand) => {
        _hand = hand;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Card(xPos, yPos, width, height, suit, value) {
  // This is a very simple and unsafe constructor. All we're doing is checking if the values exist.
  // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
  // But we aren't checking anything else! We could put "Lalala" for the value of x 
  this.x = xPos || 0;
  this.y = yPos || 0;
  this.w = width || 1;
  this.h = height || 1;
  this.rotation = 0;

  let _suit = suit;
  let _value = value;


  this.GetSuitString = () => {
    switch(_suit){
        case 'S':
            return 'Spades';
        case 'C':
            return 'Clubs';
        case 'H':
            return 'Hearts';
        case 'D':
            return 'Diamonds';
    }
  }

  this.GetValueString = () => {
    switch(_value){
        case 1:
            return 'Ace';
        case 11:
            return 'Jack';
        case 12:
            return 'Queen';
        case 13:
            return 'King';
        default:
            return _value;
    }
  }


  this.ToString = () => {
    return `The ${this.GetValueString()} of ${this.GetSuitString()}.`;
  }

  this.SuitValue = () => {
      return  _suit + _value;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Card);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ServerPlayer__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Game__ = __webpack_require__(0);



function GameConnection(io) {
    let _io = io;

    let _players = {}; // { socket.id : Player() }
    let _games = {}; // { roomName : Game() }
    let _roomsPlayers = {}; // { roomName: [Player1(), Player2(), ...]}
    let _rooms = [];

    this.JoinRoom = (socket, username, roomName, gameType) => {


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

        

        let player = new __WEBPACK_IMPORTED_MODULE_0__ServerPlayer__["a" /* default */](socket, username, gameType);

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
                playerCount: _roomsPlayers[_rooms[i]].length,
                gameType: _roomsPlayers[_rooms[i]][0].gameType
            });
        }
        console.log(socket.id + ' ' + roomList);
        socket.emit('RoomListUpdate', roomList);
    }


    this.StartGame = (socket) => {
        let player = _players[socket.id];
        _games[player.getRoomName()] = new __WEBPACK_IMPORTED_MODULE_1__Game__["a" /* default */](player.gameType);
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


/* harmony default export */ __webpack_exports__["a"] = (GameConnection);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CONST {
    
    static SUITS() {
        return ['S','C','H','D'];
    } 
}



/* unused harmony default export */ var _unused_webpack_default_export = (CONST);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ServerCard__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Constants__ = __webpack_require__(8);



function DeckOfCards() {  
    let _cardCount = 52;
    let _cardsUsed = 0;

    let cards = CreateDeck();
    //cards = Shuffle(cards);
    let discardPile = [];



    this.Cards = () => {
        return cards;
    }

    this.Deal = () => {
        if(_cardsUsed >= cards.length)
        {
            throw new Error("No cards left in the deck!");
        }

        let returnCard =  cards[cards.length - _cardsUsed - 1];
        _cardsUsed++;
        return returnCard;
    }

    this.CardsUsed = () => {
        return _cardsUsed;
    }

    this.CardsLeft = () => {
        return _cardCount - _cardsUsed;
    }

    this.PutInDiscardPile = (theCard) => {
        discardPile.push(theCard);
    }

    this.TakeTopOfDiscardPile = () => {
        if (discardPile.length > 0){
            return discardPile.pop();
        } else {
            console.log('Discard pile is empty!');
            return null;
        }
    }

    this.Shuffle = () => {
        for(let i = 0; i < cards.length; i++){
            let k = Math.floor(Math.random() * cards.length);
            let temp = cards[i];
            cards[i] = cards[k];
            cards[k] = temp;
        }
    }
   
}


function CreateDeck() {
    let cards = [];

    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'C', 2 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'C', 3 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'C', 4 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'C', 5 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'C', 6 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'C', 7 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'C', 8 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'C', 9 ));


    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'S', 2 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'S', 3 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'S', 4 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'S', 5 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'S', 6 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'S', 7 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'S', 8 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'S', 9 ));


    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'H', 2 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'H', 3 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'H', 4 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'H', 5 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'H', 6 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'H', 7 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'H', 8 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'H', 9 ));


    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'D', 2 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'D', 3 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'D', 4 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'D', 5 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'D', 6 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'D', 7 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'D', 8 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'D', 9 ));

    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'C', 10 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'C', 11 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'C', 12 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'C', 13 ));


    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'S', 10 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'S', 11 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'S', 12 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'S', 13 ));
    

    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'H', 10 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'H', 11 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'H', 12 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'H', 13 ));
    

    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'D', 10 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'D', 11 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'D', 12 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'D', 13 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'D', 1 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'H', 1 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'S', 1 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__ServerCard__["a" /* default */](0, 0, 100, 150, 'C', 1 ));

    return cards;
}


/* harmony default export */ __webpack_exports__["a"] = (DeckOfCards);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Game_Game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Game_ServerPlayer__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Game_GameConnection__ = __webpack_require__(3);




var path = __webpack_require__(6);

var express = __webpack_require__(4);
var app = express();
var http = __webpack_require__(5).createServer(app);
var io = __webpack_require__(7)(http);


app.use(express.static(path.join(__dirname, './client')));
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './client/index.html'));
});

let conn = new __WEBPACK_IMPORTED_MODULE_2__Game_GameConnection__["a" /* default */](io);
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
        console.log('Dealing Hands');
        conn.DealHands(socket, numOfCards);
    });

    socket.on('ShuffleDeck', function() {
        conn.ShuffleDeck(socket);
    });

    socket.on('DealCard', function() {
        console.log('deal card server side received');
        conn.DealCard(socket);
    });

    socket.on('DiscardCard', function(discardCardSV) {
        console.log('discard card server side received ' + discardCardSV);
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

/***/ })
/******/ ])));