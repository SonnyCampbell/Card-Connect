import Card from './Card'
import Deck from './Deck'
import Player from './Player'
import Hand from './Hand'
import Game from './Game'

function GoFishGame(canvasState, socket) {
    Game.call(this,canvasState, socket);
    
    
}

GoFishGame.prototype = Object.create(Game.prototype);
GoFishGame.prototype.constructor = GoFishGame;

GoFishGame.prototype.CreateUI = function() {
    let btnAskCard = document.createElement("button");
    this.btnAskCard = btnAskCard;
    let btnText = document.createTextNode("Ask for Cards");
    btnAskCard.appendChild(btnText);

    btnAskCard.style.position = "absolute";
    btnAskCard.style.left = "100px";
    btnAskCard.style.top = "100px";

    // btnAskCard.style.left = this.playerHand.cards[0].x + "px";
    // btnAskCard.style.top = (this.playerHand.cards[0].y + 50) + "px";

    document.getElementById('canvas-wrapper').appendChild(btnAskCard);

    btnAskCard.onclick = () => {
        this.AskForCard();
    }
}

GoFishGame.prototype.StartGame = function(){
    Game.prototype.StartGame.call(this);
    console.log('test');
    this.CreateUI();
}

GoFishGame.prototype.DiscardSelectedCard = function(){
    Game.prototype.DiscardSelectedCard.call(this);
}

GoFishGame.prototype.AskForCard = function(){  
    console.log(this.btnAskCard);
}

export default GoFishGame;