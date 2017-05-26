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

  let iptRoomName = document.getElementById("iptRoomName");
  var btnJoinGame = document.getElementById("btnJoinGame");
  var btnShuffleDeck = document.getElementById("btnShuffleDeck");
  btnShuffleDeck.classList.add('hide');
  var btnGameStart = document.getElementById("btnGameStart");
  btnGameStart.classList.add('hide');

  btnJoinGame.onclick = function(){
    socket.emit('JoinGame', iptRoomName.value);

    btnGameStart.classList.remove('hide');
    btnJoinGame.classList.add('hide');
    iptRoomName.classList.add('hide');
  }

  btnGameStart.onclick = function(){
    socket.emit('StartGame');

    btnShuffleDeck.classList.remove('hide');
    btnGameStart.classList.add('hide');
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

}

init();