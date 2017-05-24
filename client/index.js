import CanvasState from '../Game/CanvasState'
import Card from '../Game/Card'
import Deck from '../Game/Deck'
// import Vector from './lib/Vector'

function init() {
  var s = new CanvasState(document.getElementById('canvas'));

  let theDeck = new Deck();
  theDeck.Shuffle()

  for(let i = 0; i < theDeck.Cards().length; i++){
      //hand[i].rotation = 90 * i * Math.PI / 180;
      s.addCard(theDeck.Cards()[i]);
  }

}

init();