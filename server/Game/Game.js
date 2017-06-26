import Deck from './ServerDeck'

function Game(){
    let _deck = new Deck();

    this.players = [];

    this.ShuffleDeck = () => {
        _deck.Shuffle();
    }

    this.DealCard = () => {
        return _deck.Deal();
    }

    this.DealHands = function(numOfCards){
        
        for(let j = 0; j < this.players.length; j++){
            let player = this.players[j];

            for(let i = 0; i < numOfCards; i++){
                player.getHand().push(_deck.Deal());
            }

            for(let i = 0; i < player.getHand().length; i++){
                //console.log(this.players[j].getHand()[i].ToString());
                let dealtCard = player.getHand()[i];
                player.getSocket().emit('DealCard', dealtCard.SuitValue(), true);
                player.getSocket().to(player.getRoomName()).emit('OppPlayerDealtCard', dealtCard.SuitValue(), true);
            }
        };
    }
}

export default Game;


