import Deck from './ServerDeck'

function Game(){
    let _deck = new Deck();

    this.ShuffleDeck = () => {
        _deck.Shuffle();
    }
}

export default Game;


