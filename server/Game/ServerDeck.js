import Card from './ServerCard'
import CONST from './Constants'

class DeckOfCards { 
    constructor(){

        //privates
        this._cardCount = 52;
        this._cardsUsed = 0;
        this._cards = CreateDeck();
        //cards = Shuffle(cards);
        this._discardPile = [];

        //public
    } 




    Cards()  {
        return this._cards;
    }

    Deal() {
        let cards = this._cards;
        if(this._cardsUsed >= cards.length)
        {
            throw new Error("No cards left in the deck!");
        }

        let returnCard =  cards[cards.length - this._cardsUsed - 1];
        this._cardsUsed++;
        return returnCard;
    }

    CardsUsed() {
        return this._cardsUsed;
    }

    CardsLeft() {
        return this._cardCount - this._cardsUsed;
    }

    PutInDiscardPile(theCard) {
        this._discardPile.push(theCard);
    }

    TakeTopOfDiscardPile() {
        if (this._discardPile.length > 0){
            return this._discardPile.pop();
        } else {
            console.log('Discard pile is empty!');
            return null;
        }
    }

    Shuffle() {
        let cards = this._cards;
        for(let i = 0; i < cards.length  - this._cardsUsed; i++){
            let k = Math.floor(Math.random() * (cards.length - this._cardsUsed));
            let temp = cards[i];
            cards[i] = cards[k];
            cards[k] = temp;
        }
    }
   
}


function CreateDeck() {
    let cards = [];

    cards.push(new Card(0, 0, 100, 150, 'C', 2 ));
    cards.push(new Card(0, 0, 100, 150, 'C', 3 ));
    cards.push(new Card(0, 0, 100, 150, 'C', 4 ));
    cards.push(new Card(0, 0, 100, 150, 'C', 5 ));
    cards.push(new Card(0, 0, 100, 150, 'C', 6 ));
    cards.push(new Card(0, 0, 100, 150, 'C', 7 ));
    cards.push(new Card(0, 0, 100, 150, 'C', 8 ));
    cards.push(new Card(0, 0, 100, 150, 'C', 9 ));


    cards.push(new Card(0, 0, 100, 150, 'S', 2 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 3 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 4 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 5 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 6 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 7 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 8 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 9 ));


    cards.push(new Card(0, 0, 100, 150, 'H', 2 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 3 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 4 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 5 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 6 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 7 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 8 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 9 ));


    cards.push(new Card(0, 0, 100, 150, 'D', 2 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 3 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 4 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 5 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 6 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 7 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 8 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 9 ));

    cards.push(new Card(0, 0, 100, 150, 'C', 10 ));
    cards.push(new Card(0, 0, 100, 150, 'C', 11 ));
    cards.push(new Card(0, 0, 100, 150, 'C', 12 ));
    cards.push(new Card(0, 0, 100, 150, 'C', 13 ));


    cards.push(new Card(0, 0, 100, 150, 'S', 10 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 11 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 12 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 13 ));
    

    cards.push(new Card(0, 0, 100, 150, 'H', 10 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 11 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 12 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 13 ));
    

    cards.push(new Card(0, 0, 100, 150, 'D', 10 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 11 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 12 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 13 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 1 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 1 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 1 ));
    cards.push(new Card(0, 0, 100, 150, 'C', 1 ));

    return cards;
}


export default DeckOfCards;