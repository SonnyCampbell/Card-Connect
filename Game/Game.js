import Card from './Card'
import CONST from './constants'
import Deck from './Deck'
import DiscardPile from './DiscardPile'
import Player from './Player'
import Hand from './Hand'

function Game(canvasState, socket){
    this.socket = socket;
    this.canvasState = canvasState;

    this.theDeck = new Deck();
    this.discardPile = new DiscardPile();

    this.cards = [];
    this.selectedCard = null;
    this.gameStarted = false;

    this.players = [];

    this.playerTurn = false;
    this.playerHand = new Hand();

    this.oppPlayerTurn = false;
    this.oppPlayerHand = new Hand();

    this.AddCardToGame = function(card){
        card.x += this.cards.length / 4;
        card.y += this.cards.length / 4;
        this.cards.push(card);
        this.canvasState.valid = false;
    }

    this.Draw = function(ctx){
        let cards = this.cards;
        let canvasState = this.canvasState;
        let discardPile = this.discardPile;

        //Draw Discard Pile
        if(this.gameStarted){
            this.discardPile.Draw(ctx);
        }

         //Draw Each card
        for(let i = 0; i < cards.length; i++){
            let card = cards[i];

            if (card.x > canvasState.width || card.y > canvasState.height || card.x + card.w < 0 || card.y + card.h < 0) 
                continue;
            
            //ctx.rotate(90 * Math.PI / 180);
            ctx.save();
            if(card.rotation != 0){
                ctx.translate(card.x + (card.w/2), card.y + (card.h/2));
                ctx.rotate(card.rotation);
                ctx.translate(-card.x -(card.w/2), -card.y - (card.h/2));
            }            
            
            card.DrawOnLoad(ctx);
            
            ctx.restore();
            //console.log('Card is here: ' + card.x + ' ' + card.y + ' ' + card.rotation);
        }

        // Draw Opponents Hand
        for(let i = 0; i < this.oppPlayerHand.cards.length; i++){
            let card = this.oppPlayerHand.cards[i];

            if (card.x > canvasState.width || card.y > canvasState.height || card.x + card.w < 0 || card.y + card.h < 0) 
                continue;
            
            //ctx.rotate(90 * Math.PI / 180);
            ctx.save();
            if(card.rotation != 0){
                ctx.translate(card.x + (card.w/2), card.y + (card.h/2));
                ctx.rotate(card.rotation);
                ctx.translate(-card.x -(card.w/2), -card.y - (card.h/2));
            }            
            
            card.DrawOnLoad(ctx);
            
            ctx.restore();
        }

        //Draw Player Hand
        for(let i = 0; i < this.playerHand.cards.length; i++){
            let card = this.playerHand.cards[i];

            if (card.x > canvasState.width || card.y > canvasState.height || card.x + card.w < 0 || card.y + card.h < 0) 
                continue;

            //ctx.rotate(90 * Math.PI / 180);
            ctx.save();
            if(card.rotation != 0){
                ctx.translate(card.x + (card.w/2), card.y + (card.h/2));
                ctx.rotate(card.rotation);
                ctx.translate(-card.x -(card.w/2), -card.y - (card.h/2));
            }            
            
            card.DrawOnLoad(ctx);
            
            ctx.restore();
        }

        //Draw Selected Card Outline
        if(this.selectedCard != null){
            ctx.strokeStyle = canvasState.selectionColor;
            ctx.lineWidth = canvasState.selectionWidth;
            let myCard = this.selectedCard;
            ctx.strokeRect(myCard.x, myCard.y - 10, myCard.w, myCard.h);
        }
    }
}

Game.prototype.StartGame = function(){
    this.gameStarted = true;
    console.log(this);
    if(!this.playerTurn){
        this.oppPlayerTurn = true;
    } 

    this.theDeck.Shuffle();
    for(let i = 0; i < this.theDeck.Cards().length; i++){
        this.AddCardToGame(this.theDeck.Cards()[i]);
    }
}

Game.prototype.DiscardSelectedCard = function(){
    let cardToDiscard = this.selectedCard;
    for(let i = 0; i < this.playerHand.cards.length; i++){
        if (cardToDiscard.SuitValue() == this.playerHand.cards[i].SuitValue()){
            this.playerHand.cards.splice(i, 1);
            this.playerHand.ReorganiseHand();
            this.discardPile.DiscardCard(cardToDiscard);
            this.selectedCard = null;
            this.canvasState.valid = false;
            this.socket.emit('DiscardCard', cardToDiscard.SuitValue());
            break;
        }
        if (i == this.playerHand.cards.length){
            console.log('Couldn\'t find the card in the deck. Something probably went wrong');
        }
    }
}

Game.prototype.OppPlayerDiscardedCard = function(discardedcardSV){
    let cardToDiscard = this.theDeck.deckDict[discardedcardSV];
    for(let i = 0; i < this.oppPlayerHand.cards.length; i++){
        if (cardToDiscard.SuitValue() == this.oppPlayerHand.cards[i].SuitValue()){
            this.oppPlayerHand.cards.splice(i, 1);
            cardToDiscard.displayImage = cardToDiscard.faceImage;
            let reorganiseHand = (function() {this.oppPlayerHand.ReorganiseHand()}).bind(this);
            this.canvasState.animateTo(cardToDiscard,(new Date()).getTime(), 0.5, this.discardPile.x + 5, this.discardPile.y + 5, cardToDiscard.x, cardToDiscard.y, reorganiseHand);
            this.discardPile.cards.push(cardToDiscard);
            this.canvasState.valid = false;
            break;
        }
        if (i == this.oppPlayerHand.cards.length){
            console.log('Couldn\'t find the card in the deck. Something probably went wrong');
        }
    }
    console.log(discardedcardSV);
}

Game.prototype.DealCardToPlayer = function(cardSV, openingHand){
    console.log('client side attempting to deal card ' + cardSV);
    if(!openingHand){
        this.playerTurn = false;
        this.oppPlayerTurn = true;
    }


    let card = this.theDeck.deckDict[cardSV];
    this.theDeck.RemoveCard(card);

    this.cards = this.theDeck.Cards();
    
    card.displayImage = card.faceImage;
    card.isFaceDown = false;
    this.selectedCard = card;

    let reorganiseHand = (function() {this.playerHand.ReorganiseHand()}).bind(this);

    this.canvasState.valid = false;
    this.playerHand.AddCardToHand(card);

    this.canvasState.animateTo(card, 
                            (new Date()).getTime(), 
                            0.75, 
                            300 + ((this.playerHand.cards.length-1) * 20), 
                            300, 
                            card.x, 
                            card.y,
                            reorganiseHand);
    
    
}

Game.prototype.DealCardToOppPlayer = function(cardSV, openingHand){
    console.log('Dealing opp: ' + cardSV);
    if(!openingHand){
        this.playerTurn = true;
        this.oppPlayerTurn = false;
    }

    let card = this.theDeck.deckDict[cardSV];
    this.theDeck.RemoveCard(card);
    this.cards = this.theDeck.Cards();

    let reorganiseHand = (function() {this.oppPlayerHand.ReorganiseHand()}).bind(this);

    this.canvasState.animateTo(card, 
                            (new Date()).getTime(), 
                            0.75, 
                            300 + (this.oppPlayerHand.cards.length * 20), 
                            100, 
                            card.x, 
                            card.y,
                            reorganiseHand);

    this.oppPlayerHand.AddCardToHand(card);
}

export default Game;