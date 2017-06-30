import Card from './Card'
import Deck from './Deck'
import Player from './Player'
import Hand from './Hand'
import Game from './Game'

function GoFishGame(canvasState, socket) {
    let game = this;
    socket.on('OppAskedForCard', function(cardQuestion, cardSV) {
        game.OppAskedForCard(cardQuestion, cardSV);
    });

    socket.on('PassedCard', function(cardSV) {
        game.OppPassedCard(cardSV);
    });

    socket.on('ToldGoFish', function() {
        game.OppToldGoFish();
    });


    Game.call(this,canvasState, socket);
    this.askedForCard = false;

    canvasState.canvas.addEventListener('dblclick', function(e){
        game.HandleDblClick();

    }, false);

}

GoFishGame.prototype = Object.create(Game.prototype);
GoFishGame.prototype.constructor = GoFishGame;

GoFishGame.prototype.HandleDblClick = function(){
    if (this.askedForCard) {
        PassCards(this);
    }
}

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

    if(this.selectedCard != null){
        this.selectedCard.selected = false;
        this.selectedCard = null;
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
        this.btnAskCard.disabled = true;
    }
}

GoFishGame.prototype.OppAskedForCard = function(cardQuestion, cardSV){  
    this.divCardQuestion.classList.remove('hide');
    this.divCardQuestionText.innerHTML = cardQuestion;

    CheckHandForCard(this, cardSV);
    this.askedForCard = true;

    this.btnGoFish.disabled = false;
}

GoFishGame.prototype.GoFish = function(){    
    this.socket.emit('GoFish'); 
    this.btnGoFish.disabled = true;  
    this.askedForCard = false;
}

GoFishGame.prototype.OppToldGoFish = function(){     
    this.divCardQuestion.classList.remove('hide');
    this.divCardQuestionText.innerHTML = 'Go fish!';  
}

GoFishGame.prototype.OppPassedCard = function(cardSV) {
    console.log(cardSV);
    let oppHand = this.oppPlayerHand.cards;

    for(let i = 0; i < oppHand.length; i++){
        if(oppHand[i].SuitValue() == cardSV){
            let passedCard = oppHand[i];
            passedCard.displayImage = passedCard.faceImage;

            console.log('passing card ' + oppHand[i].SuitValue());
            this.oppPlayerHand.cards.splice(i, 1);
            
            let reorganiseHand = (function() {this.playerHand.ReorganiseHand()}).bind(this);

            this.canvasState.animateTo(passedCard, 
                                    (new Date()).getTime(), 
                                    0.75, 
                                    300 + ((this.playerHand.cards.length) * 20), 
                                    300, 
                                    passedCard.x, 
                                    passedCard.y,
                                    reorganiseHand);

            this.playerHand.AddCardToHand(passedCard);

            this.OppPassedCard(cardSV);
            return;
        }
    }

    this.oppPlayerHand.ReorganiseHand();
}


function PassCards(game){
    let hand = game.playerHand.cards;

    for(let i = 0; i < hand.length; i++){
        if(hand[i].askedFor){
            let passedCard = hand[i];
            
            game.socket.emit('PassingCard', passedCard.SuitValue());

            console.log('passing card ' + hand[i].SuitValue());
            game.playerHand.cards.splice(i, 1);
            
            let reorganiseHand = (function() {
                passedCard.displayImage = passedCard.backImage;
                game.oppPlayerHand.ReorganiseHand();
            }).bind(game);

            game.canvasState.animateTo(passedCard, 
                                    (new Date()).getTime(), 
                                    0.75, 
                                    300 + ((game.oppPlayerHand.cards.length) * 20), 
                                    100, 
                                    passedCard.x, 
                                    passedCard.y,
                                    reorganiseHand);

            game.oppPlayerHand.AddCardToHand(passedCard);

            PassCards(game);
            return;
        }
    }

    game.playerHand.ReorganiseHand();

    game.selectedCard = null;
    game.canvasState.valid = false;
}


function CheckHandForCard(game, cardSV){
    let hand = game.playerHand.cards;
    let deck = game.theDeck;
    console.log(deck.deckDict[cardSV]);

    for(let i = 0; i < hand.length; i++){
        if(hand[i].GetValueString() == deck.deckDict[cardSV].GetValueString()){
            game.selectedCard = hand[i];
            hand[i].selected = true;
            hand[i].askedFor = true;
            game.canvasState.valid = false;
            break;
        }
    }

    
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