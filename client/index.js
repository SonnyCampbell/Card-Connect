import CanvasState from '../Game/CanvasState'
import Card from '../Game/Card'
import Deck from '../Game/Deck'
import io from 'socket.io-client'
// import Vector from './lib/Vector'

function init() {
  var socket = io();
  let theDeck = new Deck();
  var gameCanvas = new CanvasState(document.getElementById('canvas'), socket);
  gameCanvas.Draw();

  let iptUsername = document.getElementById("iptUsername");
  let iptRoomName = document.getElementById("iptRoomName");
  var btnJoinGame = document.getElementById("btnJoinGame");
  var btnShuffleDeck = document.getElementById("btnShuffleDeck");
  btnShuffleDeck.classList.add('hide');
  var btnGameStart = document.getElementById("btnGameStart");
  btnGameStart.classList.add('hide');

  btnJoinGame.onclick = () => {
    socket.emit('JoinRoom', iptUsername.value, iptRoomName.value);

    btnGameStart.classList.remove('hide');
    btnJoinGame.classList.add('hide');
    iptRoomName.classList.add('hide');
  }

  btnGameStart.onclick = () => {
    socket.emit('StartGame');

    btnShuffleDeck.classList.remove('hide');
    btnGameStart.classList.add('hide');
  }

  btnShuffleDeck.onclick = () => {
    socket.emit('ShuffleDeck');
  }

  socket.on('PlayerJoinedGame', function(msg){
    console.log(msg);
  });

  socket.on('StartGame', function(msg){
    console.log(msg);   
    btnShuffleDeck.classList.remove('hide');
    btnGameStart.classList.add('hide');

    theDeck.Shuffle()
    for(let i = 0; i < theDeck.Cards().length; i++){
      gameCanvas.addCard(theDeck.Cards()[i]);
    }
    gameCanvas.Draw();
    console.log(theDeck.deckDict[theDeck.Cards()[0].SuitValue()].ToString());
  });

  socket.on('ShuffleDeck', function(msg) {
    console.log(msg);
  });

}

init();