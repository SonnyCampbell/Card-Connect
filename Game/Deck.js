import Card from './Card'
import CONST from './constants'

class DeckOfCards {  
    constructor(){
        this._cardCount = 52;
        this._cardsUsed = 0;
        
    
        this.deckDict = {};
    
        this.cards = CreateDeck(this.deckDict);
        this.discardPile = [];
    }


    // for (let i = 0; i < CONST.SUITS().length; i++)
    // {           
    //     for(let value = 1; value <= 13; value++)
    //     {               
    //         cards.push(new Card(CONST.SUITS()[i], value));
    //     }
    // }

    


    Shuffle() {
        for(let i = 0; i < this.cards.length; i++){
            let k = Math.floor(Math.random() * this.cards.length);
            let temp = this.cards[i];
            this.cards[i] = this.cards[k];
            this.cards[k] = temp;
        }
    }

    Cards() {
        return this.cards;
    }

    Deal() {
        if(this._cardsUsed >= this.cards.length)
        {
            throw new Error("No cards left in the deck!");
        }
        return this.cards[this._cardsUsed++];
    }

    CardsUsed() {
        return this._cardsUsed;
    }

    CardsLeft() {
        return this.cards.length;
    }

    PutInDiscardPile(theCard) {
        this.discardPile.push(theCard);
    }

    TakeTopOfDiscardPile() {
        if (this.discardPile.length > 0){
            return this.discardPile.pop();
        } else {
            console.log('Discard pile is empty!');
            return null;
        }
    }

    RemoveCard(card) {
        for(let i = 0; i < this.Cards().length; i++){
            if (card.SuitValue() == this.Cards()[i].SuitValue()){
                this.Cards().splice(i, 1);
                break;
            }
            if (i == this.Cards().length){
                console.log('Couldn\' find the card in the deck. Something probably went wrong');
            }
        }
    }
   
}


// function CreateDeck(deckDict) {
//     let cards = [];

//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/2_of_clubs.png' , 'C', 2 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/3_of_clubs.png' , 'C', 3 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/4_of_clubs.png' , 'C', 4 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/5_of_clubs.png' , 'C', 5 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/6_of_clubs.png' , 'C', 6 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/7_of_clubs.png' , 'C', 7 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/8_of_clubs.png' , 'C', 8 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/9_of_clubs.png' , 'C', 9 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/10_of_clubs.png' , 'C', 10 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/jack_of_clubs2.png' , 'C', 11 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/queen_of_clubs2.png' , 'C', 12 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/king_of_clubs2.png' , 'C', 13 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/ace_of_clubs.png' , 'C', 1 ));

//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/2_of_spades.png' , 'S', 2 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/3_of_spades.png' , 'S', 3 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/4_of_spades.png' , 'S', 4 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/5_of_spades.png' , 'S', 5 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/6_of_spades.png' , 'S', 6 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/7_of_spades.png' , 'S', 7 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/8_of_spades.png' , 'S', 8 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/9_of_spades.png' , 'S', 9 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/10_of_spades.png' , 'S', 10 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/jack_of_spades2.png' , 'S', 11 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/queen_of_spades2.png' , 'S', 12 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/king_of_spades2.png' , 'S', 13 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/ace_of_spades.png' , 'S', 1 ));

//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/2_of_hearts.png' , 'H', 2 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/3_of_hearts.png' , 'H', 3 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/4_of_hearts.png' , 'H', 4 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/5_of_hearts.png' , 'H', 5 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/6_of_hearts.png' , 'H', 6 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/7_of_hearts.png' , 'H', 7 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/8_of_hearts.png' , 'H', 8 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/9_of_hearts.png' , 'H', 9 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/10_of_hearts.png' , 'H', 10 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/jack_of_hearts2.png' , 'H', 11 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/queen_of_hearts2.png' , 'H', 12 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/king_of_hearts2.png' , 'H', 13 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/ace_of_hearts.png' , 'H', 1 ));

//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/2_of_diamonds.png' , 'D', 2 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/3_of_diamonds.png' , 'D', 3 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/4_of_diamonds.png' , 'D', 4 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/5_of_diamonds.png' , 'D', 5 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/6_of_diamonds.png' , 'D', 6 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/7_of_diamonds.png' , 'D', 7 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/8_of_diamonds.png' , 'D', 8 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/9_of_diamonds.png' , 'D', 9 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/10_of_diamonds.png' , 'D', 10 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/jack_of_diamonds2.png' , 'D', 11 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/queen_of_diamonds2.png' , 'D', 12 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/king_of_diamonds2.png' , 'D', 13 ));
//     cards.push(new Card(0, 0, 100, 150, '/images/Cards/ace_of_diamonds.png' , 'D', 1 ));

//     cards.forEach(function(card) {
//         deckDict[card.SuitValue()] = card;
//     }, this);

//     return cards;
// }

function CreateDeck(deckDict) {
    let cards = [];

    cards.push(new Card(0, 0, 100, 150, '/images/Cards/2_of_clubs.png' , 'C', 2 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/3_of_clubs.png' , 'C', 3 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/4_of_clubs.png' , 'C', 4 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/5_of_clubs.png' , 'C', 5 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/6_of_clubs.png' , 'C', 6 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/7_of_clubs.png' , 'C', 7 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/8_of_clubs.png' , 'C', 8 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/9_of_clubs.png' , 'C', 9 ));

    cards.push(new Card(0, 0, 100, 150, '/images/Cards/2_of_spades.png' , 'S', 2 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/3_of_spades.png' , 'S', 3 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/4_of_spades.png' , 'S', 4 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/5_of_spades.png' , 'S', 5 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/6_of_spades.png' , 'S', 6 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/7_of_spades.png' , 'S', 7 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/8_of_spades.png' , 'S', 8 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/9_of_spades.png' , 'S', 9 ));

    cards.push(new Card(0, 0, 100, 150, '/images/Cards/2_of_hearts.png' , 'H', 2 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/3_of_hearts.png' , 'H', 3 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/4_of_hearts.png' , 'H', 4 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/5_of_hearts.png' , 'H', 5 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/6_of_hearts.png' , 'H', 6 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/7_of_hearts.png' , 'H', 7 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/8_of_hearts.png' , 'H', 8 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/9_of_hearts.png' , 'H', 9 ));


    cards.push(new Card(0, 0, 100, 150, '/images/Cards/2_of_diamonds.png' , 'D', 2 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/3_of_diamonds.png' , 'D', 3 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/4_of_diamonds.png' , 'D', 4 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/5_of_diamonds.png' , 'D', 5 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/6_of_diamonds.png' , 'D', 6 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/7_of_diamonds.png' , 'D', 7 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/8_of_diamonds.png' , 'D', 8 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/9_of_diamonds.png' , 'D', 9 ));

    cards.push(new Card(0, 0, 100, 150, '/images/Cards/10_of_clubs.png' , 'C', 10 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/jack_of_clubs2.png' , 'C', 11 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/queen_of_clubs2.png' , 'C', 12 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/king_of_clubs2.png' , 'C', 13 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/ace_of_clubs.png' , 'C', 1 ));

    cards.push(new Card(0, 0, 100, 150, '/images/Cards/10_of_spades.png' , 'S', 10 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/jack_of_spades2.png' , 'S', 11 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/queen_of_spades2.png' , 'S', 12 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/king_of_spades2.png' , 'S', 13 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/ace_of_spades.png' , 'S', 1 ));

    cards.push(new Card(0, 0, 100, 150, '/images/Cards/10_of_hearts.png' , 'H', 10 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/jack_of_hearts2.png' , 'H', 11 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/queen_of_hearts2.png' , 'H', 12 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/king_of_hearts2.png' , 'H', 13 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/ace_of_hearts.png' , 'H', 1 ));

    cards.push(new Card(0, 0, 100, 150, '/images/Cards/10_of_diamonds.png' , 'D', 10 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/jack_of_diamonds2.png' , 'D', 11 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/queen_of_diamonds2.png' , 'D', 12 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/king_of_diamonds2.png' , 'D', 13 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/ace_of_diamonds.png' , 'D', 1 ));

    cards.forEach(function(card) {
        deckDict[card.SuitValue()] = card;
    }, this);

    return cards;
}


export default DeckOfCards;