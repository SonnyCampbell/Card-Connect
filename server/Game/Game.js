import Deck from './ServerDeck'

class Game {
    constructor(gameType) {
        this.deck = new Deck(); 

        this.players = [];
        this.hasStarted = false;
        this.gameType = gameType;
    }


    ShuffleDeck() {
        this.deck.Shuffle();
    }

    DealCard() {
        return this.deck.Deal();
    }

    DealHands(numOfCards) {
        
        for(let j = 0; j < this.players.length; j++){
            let player = this.players[j];

            for(let i = 0; i < numOfCards; i++){
                player.getHand().push(this.deck.Deal());
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


