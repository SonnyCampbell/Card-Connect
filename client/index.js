import CanvasState from '../Game/CanvasState'
import Card from '../Game/Card'
import Deck from '../Game/Deck'
import io from 'socket.io-client'
// import Vector from './lib/Vector'

function init() {
  var s = new CanvasState(document.getElementById('canvas'));
  var socket = io();

  let theDeck = new Deck();
  theDeck.Shuffle()

  for(let i = 0; i < theDeck.Cards().length; i++){
      //hand[i].rotation = 90 * i * Math.PI / 180;
      s.addCard(theDeck.Cards()[i]);
  }

  var p = document.getElementById("test");
  p.onclick = function(){
    socket.emit('shuffleDeck','shuffleDeck');
  }

}

init();