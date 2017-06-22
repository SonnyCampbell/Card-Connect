import Card from './Card'
import Deck from './Deck'
import Player from './Player'
import Hand from './Hand'
import Game from './Game'

function GoFishGame(canvasState, socket) {
    Game.call(this,canvasState, socket);

    console.log(this.playerHand.cards);
}

GoFishGame.prototype = Object.create(Game.prototype);
GoFishGame.prototype.constructor = GoFishGame;

GoFishGame.prototype.DiscardSelectedCard = function(){
    console.log(Game.prototype);
    Game.prototype.DiscardSelectedCard.call(this);
    console.log('test');
}

export default GoFishGame;