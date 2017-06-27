import Card from './Card'
import Deck from './Deck'
import Player from './Player'
import Hand from './Hand'
import Game from './Game'

function GoFishGame(canvasState, socket) {
    let game = this;
    socket.on('OppAskedForCard', function(cardQuestion, cardSV) {
        game.AskedForCard(cardQuestion, cardSV);
    });

    socket.on('ToldGoFish', function() {
        game.ToldGoFish();
    });

    Game.call(this,canvasState, socket);

}

GoFishGame.prototype = Object.create(Game.prototype);
GoFishGame.prototype.constructor = GoFishGame;

GoFishGame.prototype.CreateUI = function() {
    CreateBtnAskCard(this);
    CreateBtnGoFish(this);

    CreateDivCardQuesion(this);

    
}

GoFishGame.prototype.SelectedCard = function() {
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
    this.btnGoFish.disabled = true;

    this.divCardQuestionText.innerHTML = '';
    this.divCardQuestion.classList.add('hide');

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
        this.btnAskCard.disabled = true;
    }
}

GoFishGame.prototype.AskedForCard = function(cardQuestion, cardSV){  
    this.divCardQuestion.classList.remove('hide');
    this.divCardQuestionText.innerHTML = cardQuestion;
    this.btnGoFish.disabled = false;
}

GoFishGame.prototype.GoFish = function(){  
    //if (this.playerTurn){   
    this.socket.emit('GoFish'); 
    this.btnGoFish.disabled = true;  
    //}
}

GoFishGame.prototype.ToldGoFish = function(){  
    //if (this.playerTurn){   
    this.divCardQuestion.classList.remove('hide');
    this.divCardQuestionText.innerHTML = 'Go fish!';  
    //}
}

function CreateBtnAskCard(game) {
    let btnAskCard = document.createElement("button");
    game.btnAskCard = btnAskCard;
    let btnText = document.createTextNode("Ask for Cards");
    btnAskCard.appendChild(btnText);

    btnAskCard.style.position = "absolute";
    btnAskCard.style.left = "300px";
    btnAskCard.style.top = "500px";
    btnAskCard.style.width = "100px"

    document.getElementById('canvas-wrapper').appendChild(btnAskCard);

    btnAskCard.disabled = !game.playerTurn;
    btnAskCard.onclick = function() { 
        game.AskForCard();
    }
}

function CreateBtnGoFish(game) {
    let btnGoFish = document.createElement("button");
    game.btnGoFish = btnGoFish;
    let btnText = document.createTextNode("Go Fish");
    btnGoFish.appendChild(btnText);

    btnGoFish.style.position = "absolute";
    btnGoFish.style.left = "420px";
    btnGoFish.style.top = "500px";
    btnGoFish.style.width = "100px"

    document.getElementById('canvas-wrapper').appendChild(btnGoFish);

    //btnGoFish.disabled = !game.playerTurn;
    btnGoFish.onclick = function() { 
        game.GoFish();
    }
}

function CreateDivCardQuesion(game){
    let divCardQuestion = document.createElement('div');
    game.divCardQuestion = divCardQuestion;

    let imgSpeechBubble = document.createElement('img');
    imgSpeechBubble.setAttribute('src', 'images/speechBubble.png');
    imgSpeechBubble.setAttribute('height', '100px');
    imgSpeechBubble.setAttribute('width', '200px');
    divCardQuestion.appendChild(imgSpeechBubble);

    let divCardQuestionText = document.createElement('div');
    game.divCardQuestionText = divCardQuestionText;
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

export default GoFishGame;