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
                player.GetHand().push(this.deck.Deal());
            }

            for(let i = 0; i < player.GetHand().length; i++){
                //console.log(this.players[j].GetHand()[i].ToString());
                let dealtCard = player.GetHand()[i];
                player.GetSocket().emit('DealCard', dealtCard.SuitValue(), true);
                player.GetSocket().to(player.GetRoomName()).emit('OppPlayerDealtCard', dealtCard.SuitValue(), true);
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


class Player {
    constructor(socket, username, gameType){

        //privates
        this._username = username;
        this._socket = socket;
        this._roomName = '';
        this._hand = [];

        //public
        this.isTurn = false;
        this.gameType = gameType;
    }
    

    // Getters and Setters
    GetSocket() {
        return  this._socket;
    }
    SetSocket(socket){
        this._socket = socket;
    }

    GetUsername() {
        return  this._username;
    }
    SetUsername(username) {
        this._username = username;
    }

    GetRoomName() {
        return  this._roomName;
    }
    SetRoomName(roomName) {
        this._roomName = roomName;
    }

    GetHand() {
        return this._hand;
    }
    SetHand(hand) {
        this._hand = hand;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Card {
    constructor(xPos, yPos, width, height, suit, value) {

        //private
        this._suit = suit;
        this._value = value;

        // This is a very simple and unsafe constructor. All we're doing is checking if the values exist.
        // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
        // But we aren't checking anything else! We could put "Lalala" for the value of x 
        //public
        this.x = xPos || 0;
        this.y = yPos || 0;
        this.w = width || 1;
        this.h = height || 1;
        this.rotation = 0;

        
    }



  GetSuitString() {
    switch(this._suit){
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

  GetValueString() {
    switch(this._value){
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


  ToString() {
    return `The ${this.GetValueString()} of ${this.GetSuitString()}.`;
  }

  SuitValue() {
      return  this._suit + this._value;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Card);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ServerPlayer__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Game__ = __webpack_require__(0);



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

        

        let player = new __WEBPACK_IMPORTED_MODULE_0__ServerPlayer__["a" /* default */](socket, username, gameType);

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
        this._games[player.GetRoomName()] = new __WEBPACK_IMPORTED_MODULE_1__Game__["a" /* default */](player.gameType);
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



class DeckOfCards { 
    constructor(){

        //privates
        this._cardCount = 52;
        this._cardsUsed = 0;
        this._cards = CreateDeck();
        //cards = Shuffle(cards);
        this._discardPile = [];

        //public
    } 




    Cards()  {
        return this._cards;
    }

    Deal() {
        let cards = this._cards;
        if(this._cardsUsed >= cards.length)
        {
            throw new Error("No cards left in the deck!");
        }

        let returnCard =  cards[cards.length - this._cardsUsed - 1];
        this._cardsUsed++;
        return returnCard;
    }

    CardsUsed() {
        return this._cardsUsed;
    }

    CardsLeft() {
        return this._cardCount - this._cardsUsed;
    }

    PutInDiscardPile(theCard) {
        this._discardPile.push(theCard);
    }

    TakeTopOfDiscardPile() {
        if (this._discardPile.length > 0){
            return this._discardPile.pop();
        } else {
            console.log('Discard pile is empty!');
            return null;
        }
    }

    Shuffle() {
        let cards = this._cards;
        for(let i = 0; i < cards.length  - this._cardsUsed; i++){
            let k = Math.floor(Math.random() * (cards.length - this._cardsUsed));
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

/***/ })
/******/ ])));