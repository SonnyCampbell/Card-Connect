import Card from './Card'
import Deck from './Deck'
import Player from './Player'
import Hand from './Hand'
import Game from './Game'

function GoFishGame(canvasState, socket) {
    let game = this;
    socket.on('OppAskedForCard', function(cardQuestion, cardSV) {
        game.AskedForCard(cardQuestion, cardSV);
    })

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
    btnAskCard.style.left = "300px";
    btnAskCard.style.top = "500px";
    btnAskCard.style.width = "100px"

    document.getElementById('canvas-wrapper').appendChild(btnAskCard);

    let game = this;
    btnAskCard.disabled = !this.playerTurn;
    btnAskCard.onclick = function() { 
        game.AskForCard();
    }

    let divCardQuestion = document.createElement('div');
    this.divCardQuestion = divCardQuestion;

    let imgSpeechBubble = document.createElement('img');
    imgSpeechBubble.setAttribute('src', 'images/speechBubble.png');
    imgSpeechBubble.setAttribute('height', '100px');
    imgSpeechBubble.setAttribute('width', '200px');
    divCardQuestion.appendChild(imgSpeechBubble);

    let divCardQuestionText = document.createElement('div');
    this.divCardQuestionText = divCardQuestionText;
    let txtCardQuestion = document.createTextNode('');
    divCardQuestionText.appendChild(txtCardQuestion);
    divCardQuestionText.style.position = 'absolute';
    divCardQuestionText.style.top = "20px";
    divCardQuestionText.style.left = "20px";



    divCardQuestion.appendChild(divCardQuestionText);
    divCardQuestion.style.position = 'absolute';
    divCardQuestion.style.left = "300px";
    divCardQuestion.style.top = "10px";
    document.getElementById('canvas-wrapper').appendChild(divCardQuestion);
}

GoFishGame.prototype.UpdateUI = function() {
    this.btnAskCard.innerHTML = 'Any ' + this.selectedCard.GetValueString() + 's?';
}

GoFishGame.prototype.StartGame = function(){
    Game.prototype.StartGame.call(this);

    this.CreateUI();
}

GoFishGame.prototype.DiscardSelectedCard = function(){
    console.log('test1');
    Game.prototype.DiscardSelectedCard.call(this);
}

GoFishGame.prototype.DealCardToPlayer = function(cardSV, openingHand){
    if(!openingHand){
        this.btnAskCard.disabled = true;
    }

    Game.prototype.DealCardToPlayer.call(this, cardSV, openingHand); 
}

GoFishGame.prototype.DealCardToOppPlayer = function(cardSV, openingHand){
    if(!openingHand){
        this.btnAskCard.disabled = false;
        
    }

    this.divCardQuestionText.innerHTML = '';
    this.divCardQuestion.classList.add('hide');

    Game.prototype.DealCardToOppPlayer.call(this, cardSV, openingHand);

    
}

GoFishGame.prototype.AskForCard = function(){  
    if (this.playerTurn){   
        this.socket.emit('AskForCard', this.btnAskCard.innerHTML, this.selectedCard.SuitValue());   
    }
}

GoFishGame.prototype.AskedForCard = function(cardQuestion, cardSV){  
    this.divCardQuestion.classList.remove('hide');
    this.divCardQuestionText.innerHTML = cardQuestion;
}

export default GoFishGame;