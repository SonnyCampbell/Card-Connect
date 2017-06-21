import Card from './Card'
import CONST from './constants'
import Deck from './Deck'
import DiscardPile from './DiscardPile'
import Player from './Player'

function Game(canvasState, socket){
    this.socket = socket;
    this.canvasState = canvasState;

    this.theDeck = new Deck();
    this.discardPile = new DiscardPile();

    this.cards = [];
    this.gameStarted = false;
    this.players = [];

    this.playerHand = [];
    this.oppPlayerHand = [];
    this.selectedCard = null;

    this.StartGame = function(){
        this.gameStarted = true;  
        this.theDeck.Shuffle();
        for(let i = 0; i < this.theDeck.Cards().length; i++){
            this.AddCardToGame(this.theDeck.Cards()[i]);
        }
    }

    this.AddCardToGame = function(card){
        card.x += this.cards.length / 4;
        card.y += this.cards.length / 4;
        this.cards.push(card);
        this.canvasState.valid = false;
    }

    this.DealCardToPlayer = function(cardSV){
        console.log('client side attempting to deal card ' + cardSV);
        let card = this.theDeck.deckDict[cardSV];
        this.theDeck.RemoveCard(card);

        this.cards = this.theDeck.Cards();
        
        card.displayImage = card.faceImage;
        card.isFaceDown = false;
        this.selectedCard = card;

        this.canvasState.valid = false;
        this.canvasState.animateTo(card, (new Date()).getTime(), 0.75, 300 + (this.playerHand.length * 20), 300, card.x, card.y);
        
        this.playerHand.push(card);
    }

    this.DealCardToOppPlayer = function(cardSV){
        console.log('Dealing opp: ' + cardSV);

        let card = this.theDeck.deckDict[cardSV];
        this.theDeck.RemoveCard(card);
        this.cards = this.theDeck.Cards();

        this.canvasState.animateTo(card, (new Date()).getTime(), 0.75, 300 + (this.oppPlayerHand.length * 20), 100, card.x, card.y);
        this.oppPlayerHand.push(card);
    }

    this.DiscardSelectedCard = function(){
        let cardToDiscard = this.selectedCard;
        for(let i = 0; i < this.playerHand.length; i++){
            if (cardToDiscard.SuitValue() == this.playerHand[i].SuitValue()){
                this.playerHand.splice(i, 1);
                this.discardPile.DiscardCard(cardToDiscard);
                this.selectedCard = null;
                this.canvasState.valid = false;
                this.socket.emit('DiscardCard', cardToDiscard.SuitValue());
                break;
            }
            if (i == this.playerHand.length){
                console.log('Couldn\'t find the card in the deck. Something probably went wrong');
            }
        }
    }

    this.OppPlayerDiscardedCard = function(discardedcardSV){
        let cardToDiscard = this.theDeck.deckDict[discardedcardSV];
        for(let i = 0; i < this.oppPlayerHand.length; i++){
            if (cardToDiscard.SuitValue() == this.oppPlayerHand[i].SuitValue()){
                this.oppPlayerHand.splice(i, 1);
                cardToDiscard.displayImage = cardToDiscard.faceImage;
                this.canvasState.animateTo(cardToDiscard,(new Date()).getTime(), 0.5, this.discardPile.x + 5, this.discardPile.y + 5, cardToDiscard.x, cardToDiscard.y);
                this.discardPile.cards.push(cardToDiscard);
                this.canvasState.valid = false;
                break;
            }
            if (i == this.oppPlayerHand.length){
                console.log('Couldn\'t find the card in the deck. Something probably went wrong');
            }
        }
        console.log(discardedcardSV);
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
        for(let i = 0; i < this.oppPlayerHand.length; i++){
            let card = this.oppPlayerHand[i];

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
        for(let i = 0; i < this.playerHand.length; i++){
            let card = this.playerHand[i];

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
            ctx.strokeRect(myCard.x, myCard.y, myCard.w, myCard.h);
        }
    }
}

export default Game;