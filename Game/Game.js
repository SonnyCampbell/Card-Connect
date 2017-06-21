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
        this.theDeck.Shuffle()
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
        this.canvasState.animateTo(card, (new Date()).getTime(), 0.75, 200 + (this.playerHand.length * 20), 300, card.x, card.y);
        
        this.playerHand.push(card);
    }

    this.DealCardToOppPlayer = function(cardSV){
        console.log('Dealing opp: ' + cardSV);

        let card = this.theDeck.deckDict[cardSV];
        this.theDeck.RemoveCard(card);
        this.cards = this.theDeck.Cards();

        this.canvasState.animateTo(card, (new Date()).getTime(), 0.75, 200 + (this.oppPlayerHand.length * 20), 100, card.x, card.y);
        this.oppPlayerHand.push(card);
    }
}

export default Game;