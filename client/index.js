import CanvasState from '../Game/CanvasState'
import Card from '../Game/Card'
import Deck from '../Game/Deck'
import io from 'socket.io-client'
// import Vector from './lib/Vector'

function init() {
  var socket = io();
  var s = new CanvasState(document.getElementById('canvas'), socket);


  let theDeck = new Deck();
  theDeck.Shuffle()

  for(let i = 0; i < theDeck.Cards().length; i++){
      //hand[i].rotation = 90 * i * Math.PI / 180;
      s.addCard(theDeck.Cards()[i]);
  }
  s.Draw();

  var p = document.getElementById("test");
  p.onclick = function(){
    socket.emit('ShuffleDeck', 'Player: ' + socket.id);
  }

  socket.on('ShuffleDeck', function(msg){
        console.log(msg);
  });

}

init();