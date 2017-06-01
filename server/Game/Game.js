import Deck from './ServerDeck'

function Game(){
    let _deck = new Deck();

    this.ShuffleDeck = () => {
        _deck.Shuffle();
    }

    this.DealCard = () => {
        return _deck.Deal();
    }
}

export default Game;


