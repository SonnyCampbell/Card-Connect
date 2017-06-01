import Card from './ServerCard'
import CONST from './Constants'

function DeckOfCards() {  
    let _cardCount = 52;
    let _cardsUsed = 0;

    let cards = CreateDeck();
    let discardPile = [];

    this.Shuffle = () => {
        for(let i = 0; i < cards.length; i++){
            let k = Math.floor(Math.random() * cards.length);
            let temp = cards[i];
            cards[i] = cards[k];
            cards[k] = temp;
        }
    }

    this.Cards = () => {
        return cards;
    }

    this.Deal = () => {
        if(_cardsUsed >= cards.length)
        {
            throw new Error("No cards left in the deck!");
        }

        let returnCard =  cards[cards.length - _cardsUsed - 1];
        _cardsUsed++;
        return returnCard;
    }

    this.CardsUsed = () => {
        return _cardsUsed;
    }

    this.CardsLeft = () => {
        return _cardCount - _cardsUsed;
    }

    this.PutInDiscardPile = (theCard) => {
        discardPile.push(theCard);
    }

    this.TakeTopOfDiscardPile = () => {
        if (discardPile.length > 0){
            return discardPile.pop();
        } else {
            console.log('Discard pile is empty!');
            return null;
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
    cards.push(new Card(0, 0, 100, 150, 'C', 10 ));
    cards.push(new Card(0, 0, 100, 150, 'C', 11 ));
    cards.push(new Card(0, 0, 100, 150, 'C', 12 ));
    cards.push(new Card(0, 0, 100, 150, 'C', 13 ));
    cards.push(new Card(0, 0, 100, 150, 'C', 1 ));

    cards.push(new Card(0, 0, 100, 150, 'S', 2 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 3 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 4 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 5 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 6 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 7 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 8 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 9 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 10 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 11 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 12 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 13 ));
    cards.push(new Card(0, 0, 100, 150, 'S', 1 ));

    cards.push(new Card(0, 0, 100, 150, 'H', 2 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 3 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 4 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 5 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 6 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 7 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 8 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 9 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 10 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 11 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 12 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 13 ));
    cards.push(new Card(0, 0, 100, 150, 'H', 1 ));

    cards.push(new Card(0, 0, 100, 150, 'D', 2 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 3 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 4 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 5 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 6 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 7 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 8 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 9 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 10 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 11 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 12 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 13 ));
    cards.push(new Card(0, 0, 100, 150, 'D', 1 ));

    return cards;
}


export default DeckOfCards;