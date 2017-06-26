import CanvasState from '../Game/CanvasState'
import Card from '../Game/Card'
import Deck from '../Game/Deck'
import io from 'socket.io-client'
// import Vector from './lib/Vector'

function init() {
  let socket = io();

  let iptUsername = document.getElementById("iptUsername");
  let iptRoomName = document.getElementById("iptRoomName");
  let btnJoinGame = document.getElementById("btnJoinGame");

  //let btnAskCard = document.getElementById("btnAskCard");
  //btnAskCard.classList.add('hide');
  let btnShuffleDeck = document.getElementById("btnShuffleDeck");
  btnShuffleDeck.classList.add('hide');
  let btnGameStart = document.getElementById("btnGameStart");
  btnGameStart.classList.add('hide');

  let gameCanvas = new CanvasState(document.getElementById('canvas'), socket);
  gameCanvas.Draw();
  //gameCanvas.btnAskCard = btnAskCard;



  btnJoinGame.onclick = () => {
    socket.emit('JoinRoom', iptUsername.value, iptRoomName.value);

    btnGameStart.classList.remove('hide');
    btnJoinGame.classList.add('hide');
    iptRoomName.classList.add('hide');
  };

  btnGameStart.onclick = () => {
    
    socket.emit('StartGame');
    gameCanvas.game.playerTurn = true;
    
    socket.emit('DealHands', 5);

    btnShuffleDeck.classList.remove('hide');
    btnGameStart.classList.add('hide');
  };

  btnShuffleDeck.onclick = () => {
    socket.emit('ShuffleDeck');
  }

  socket.on('StartGame', function(msg){
    console.log(msg);   
    btnShuffleDeck.classList.remove('hide');
    btnGameStart.classList.add('hide');

    gameCanvas.StartGame();

  });

  socket.on('DealCard', function(cardSuitValue, openingHand) {
    console.log('deal card client side received: ' + cardSuitValue);
    gameCanvas.game.DealCardToPlayer(cardSuitValue, openingHand);
  });

  socket.on('OppPlayerDealtCard', (cardSuitValue, openingHand) => {
    gameCanvas.game.DealCardToOppPlayer(cardSuitValue, openingHand);
  });

  socket.on('OppPlayerDiscardedCard', (cardSuitValue) => {
    gameCanvas.game.OppPlayerDiscardedCard(cardSuitValue);
  });

  socket.on('PlayerJoinedGame', function(msg){
    console.log(msg);
  });

  socket.on('ShuffleDeck', function(msg) {
    console.log(msg);
  });

}

init();