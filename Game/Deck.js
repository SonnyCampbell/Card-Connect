import Card from './Card'
import CONST from './constants'

function DeckOfCards() {  
    let _cardCount = 52;
    let _cardsUsed = 0;

    let cards = CreateDeck();
    let discardPile = [];

    // for (let i = 0; i < CONST.SUITS().length; i++)
    // {           
    //     for(let value = 1; value <= 13; value++)
    //     {               
    //         cards.push(new Card(CONST.SUITS()[i], value));
    //     }
    // }


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
        return cards[_cardsUsed++];
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

    cards.push(new Card(200, 200, 100, 150, '/images/Cards/2_of_clubs.png' , 'C', 2 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/3_of_clubs.png' , 'C', 3 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/4_of_clubs.png' , 'C', 4 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/5_of_clubs.png' , 'C', 5 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/6_of_clubs.png' , 'C', 6 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/7_of_clubs.png' , 'C', 7 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/8_of_clubs.png' , 'C', 8 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/9_of_clubs.png' , 'C', 9 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/10_of_clubs.png' , 'C', 10 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/jack_of_clubs2.png' , 'C', 11 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/queen_of_clubs2.png' , 'C', 12 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/king_of_clubs2.png' , 'C', 13 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/ace_of_clubs.png' , 'C', 1 ));

    cards.push(new Card(0, 0, 100, 150, '/images/Cards/2_of_spades.png' , 'S', 2 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/3_of_spades.png' , 'S', 3 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/4_of_spades.png' , 'S', 4 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/5_of_spades.png' , 'S', 5 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/6_of_spades.png' , 'S', 6 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/7_of_spades.png' , 'S', 7 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/8_of_spades.png' , 'S', 8 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/9_of_spades.png' , 'S', 9 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/10_of_spades.png' , 'S', 10 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/jack_of_spades2.png' , 'S', 11 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/queen_of_spades2.png' , 'S', 12 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/king_of_spades2.png' , 'S', 13 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/ace_of_spades.png' , 'S', 1 ));

    cards.push(new Card(0, 0, 100, 150, '/images/Cards/2_of_hearts.png' , 'H', 2 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/3_of_hearts.png' , 'H', 3 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/4_of_hearts.png' , 'H', 4 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/5_of_hearts.png' , 'H', 5 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/6_of_hearts.png' , 'H', 6 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/7_of_hearts.png' , 'H', 7 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/8_of_hearts.png' , 'H', 8 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/9_of_hearts.png' , 'H', 9 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/10_of_hearts.png' , 'H', 10 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/jack_of_hearts2.png' , 'H', 11 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/queen_of_hearts2.png' , 'H', 12 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/king_of_hearts2.png' , 'H', 13 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/ace_of_hearts.png' , 'H', 1 ));

    cards.push(new Card(0, 0, 100, 150, '/images/Cards/2_of_diamonds.png' , 'D', 2 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/3_of_diamonds.png' , 'D', 3 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/4_of_diamonds.png' , 'D', 4 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/5_of_diamonds.png' , 'D', 5 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/6_of_diamonds.png' , 'D', 6 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/7_of_diamonds.png' , 'D', 7 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/8_of_diamonds.png' , 'D', 8 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/9_of_diamonds.png' , 'D', 9 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/10_of_diamonds.png' , 'D', 10 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/jack_of_diamonds2.png' , 'D', 11 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/queen_of_diamonds2.png' , 'D', 12 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/king_of_diamonds2.png' , 'D', 13 ));
    cards.push(new Card(0, 0, 100, 150, '/images/Cards/ace_of_diamonds.png' , 'D', 1 ));

    return cards;
}


export default DeckOfCards;