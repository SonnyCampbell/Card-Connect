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

    socket.on('OppLaidDownCard', function(cardSV) {
        console.log('Opp laid down ' + cardSV);
        game.OppLaidDownCard(cardSV);
    });


    Game.call(this,canvasState, socket);
    this.askedForCard = false;
    this.laidDownBooks = [];
    this.oppLaidDownBooks = [];

    canvasState.canvas.addEventListener('dblclick', function(e){
        game.HandleDblClick();

    }, false);

}

GoFishGame.prototype = Object.create(Game.prototype);
GoFishGame.prototype.constructor = GoFishGame;

GoFishGame.prototype.HandleDblClick = function(){
    if (this.askedForCard && !this.playerTurn) {        
        PassCards(this);
    }
}

GoFishGame.prototype.CreateUI = function() {
    CreateBtnAskCard(this);
    CreateBtnGoFish(this);
    CreateBtnLayDownBook(this);

    CreateDivCardQuesion(this);

    
}

GoFishGame.prototype.SelectedCard = function() {
    if(this.selectedCard == null){
        this.btnAskCard.innerHTML = 'Ask for Cards';
    } else {
        this.CheckForBook();
        this.btnAskCard.innerHTML = 'Any ' + this.selectedCard.GetValueString() + 's?';
    }
    
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

GoFishGame.prototype.StartTurn = function(){
    Game.prototype.StartTurn.call(this);
    this.btnAskCard.disabled = false;
    this.btnGoFish.disabled = true;
}

GoFishGame.prototype.EndTurn = function(){
    Game.prototype.EndTurn.call(this);
    this.btnAskCard.disabled = true;
}

GoFishGame.prototype.AskForCard = function(){  
    if (this.selectedCard != null && this.playerTurn){   
        console.log(this.selectedCard);
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

GoFishGame.prototype.LayDownBook = function(){
    console.log('laying down book')
    let hand = this.playerHand.cards;
    let laidDownCards = [];

    for(let i = hand.length - 1; i >= 0 ; i--){
        if(this.selectedCard.GetValueString() == hand[i].GetValueString()){           
            let laidDownCard = hand[i];
            this.socket.emit('LayDownCard', laidDownCard.SuitValue());

            //console.log('passing card ' + hand[i].SuitValue());
            laidDownCards.push(laidDownCard);
            this.discardPile.cards.push(laidDownCard);
            this.playerHand.cards.splice(i, 1)
            
            let reorganiseHand = (function() {
                //passedCard.displayImage = passedCard.backImage;
                this.playerHand.ReorganiseHand();
            }).bind(this);

            this.canvasState.animateTo(laidDownCard, 
                                    (new Date()).getTime(), 
                                    0.75, 
                                    700 + ((this.laidDownBooks.length) * 20), 
                                    300, 
                                    laidDownCard.x, 
                                    laidDownCard.y,
                                    reorganiseHand);

        }
    }

    this.laidDownBooks[this.laidDownBooks.length] = laidDownCards;
    console.log(this.laidDownBooks);

    this.selectedCard = null;
    this.canvasState.valid = false;

}

GoFishGame.prototype.OppLaidDownCard = function(cardSV) {
    console.log(cardSV);
    let oppHand = this.oppPlayerHand.cards;
    let laidDownCards = [];

    for(let i = oppHand.length - 1; i >= 0 ; i--){
        if(oppHand[i].SuitValue() == cardSV){
            let laidDownCard = oppHand[i];
            laidDownCard.displayImage = laidDownCard.faceImage;

            console.log('opp laying down card ' + oppHand[i].SuitValue());
            laidDownCards.push(laidDownCard);
            this.discardPile.cards.push(laidDownCard);
            this.oppPlayerHand.cards.splice(i, 1);
            
            //let reorganiseHand = (function() {this.oppPlayerHand.ReorganiseHand()}).bind(this);

            this.canvasState.animateTo(laidDownCard, 
                                    (new Date()).getTime(), 
                                    0.75, 
                                    700 + ((this.oppLaidDownBooks.length) * 20), 
                                    100, 
                                    laidDownCard.x, 
                                    laidDownCard.y,
                                    (function(){console.log('animation for ' + laidDownCard.SuitValue() + ' complete')}));

        }
    }

    this.oppPlayerHand.ReorganiseHand();
    this.oppLaidDownBooks[this.oppLaidDownBooks.length] = laidDownCards;
    console.log(this.oppLaidDownBooks);
    //this.EndTurn();
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
    this.EndTurn();
}

GoFishGame.prototype.CheckForBook = function() {
    let hand = this.playerHand.cards;
    let matchCount = 0;

    for(let i = 0; i < hand.length; i++){
        if(this.selectedCard.GetValueString() == hand[i].GetValueString()){
            matchCount++;
        }
    }

    if(matchCount == 4){
        this.btnLayDownBook.disabled = false;
    } else {
        this.btnLayDownBook.disabled = true;
    }

}


function PassCards(game){
    let hand = game.playerHand.cards;
    let didPassCard = false;
    console.log('PassCards called')

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


            game.askedForCard = false;

            game.divCardQuestionText.innerHTML = '';
            game.divCardQuestion.classList.add('hide');
            game.playerHand.ReorganiseHand();
            game.StartTurn();

            PassCards(game);

            return;
        }
    }

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
            //break;
        } else {
            hand[i].askedFor = false;
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

    btnGoFish.onclick = function() { 
        game.GoFish();
    }
}

function CreateBtnLayDownBook(game) {
    let btnLayDownBook = document.createElement("button");
    game.btnLayDownBook = btnLayDownBook;
    let btnText = document.createTextNode("Lay Down Book");
    btnLayDownBook.appendChild(btnText);

    btnLayDownBook.style.position = "absolute";
    btnLayDownBook.style.left = "540px";
    btnLayDownBook.style.top = "500px";
    btnLayDownBook.style.width = "100px"
    btnLayDownBook.disabled = true;

    document.getElementById('canvas-wrapper').appendChild(btnLayDownBook);

    btnLayDownBook.onclick = function() { 
        game.LayDownBook();
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