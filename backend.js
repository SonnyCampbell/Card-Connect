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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__serverCard__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(5);



function DeckOfCards() {  
    let _cardCount = 52;
    let _cardsUsed = 0;

    let cards = CreateDeck();
    let discardPile = [];

    // for (let i = 0; i < CONST.SUITS().length; i++)
    // {           
    //     for(let value = 1; value <= 13; value++)
    //     {               
    //         cards.push(new Card(CONST.SUITS()[i], value));
    //     }
    // }


    this.Shuffle = () => {
        for(let i = 0; i < cards.length; i++){
            let k = Math.floor(Math.random() * cards.length);
            let temp = cards[i];
            cards[i] = cards[k];
            cards[k] = temp;
        }
    }

    this.Cards = () => {
        return cards;
    }

    this.Deal = () => {
        if(_cardsUsed >= cards.length)
        {
            throw new Error("No cards left in the deck!");
        }
        return cards[_cardsUsed++];
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
   
}


function CreateDeck() {
    let cards = [];

    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'C', 2 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'C', 3 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'C', 4 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'C', 5 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'C', 6 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'C', 7 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'C', 8 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'C', 9 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'C', 10 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'C', 11 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'C', 12 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'C', 13 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'C', 1 ));

    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'S', 2 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'S', 3 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'S', 4 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'S', 5 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'S', 6 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'S', 7 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'S', 8 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'S', 9 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'S', 10 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'S', 11 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'S', 12 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'S', 13 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'S', 1 ));

    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'H', 2 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'H', 3 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'H', 4 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'H', 5 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'H', 6 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'H', 7 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'H', 8 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'H', 9 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'H', 10 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'H', 11 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'H', 12 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'H', 13 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'H', 1 ));

    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'D', 2 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'D', 3 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'D', 4 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'D', 5 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'D', 6 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'D', 7 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'D', 8 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'D', 9 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'D', 10 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'D', 11 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'D', 12 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'D', 13 ));
    cards.push(new __WEBPACK_IMPORTED_MODULE_0__serverCard__["a" /* default */](0, 0, 100, 150, '' , 'D', 1 ));

    return cards;
}


/* harmony default export */ __webpack_exports__["a"] = (DeckOfCards);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CONST {
    
    static SUITS() {
        return ['S','C','H','D'];
    } 
}



/* unused harmony default export */ var _unused_webpack_default_export = (CONST);

/***/ }),
/* 6 */
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

  this.ValueSuit = () => {
      return _value.ToString() + _suit;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Card);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Game_serverDeck__ = __webpack_require__(0);

let deck = new __WEBPACK_IMPORTED_MODULE_0__Game_serverDeck__["a" /* default */]();

var express = __webpack_require__(1);
var app = express();

var http = __webpack_require__(2).createServer(app);
var io = __webpack_require__(4)(http);
var path = __webpack_require__(3);

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

/***/ })
/******/ ])));