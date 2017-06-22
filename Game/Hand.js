import Card from './Card'

function Hand(){
    this.cards = [];

    this.AddCardToHand = function(card){
        this.cards.push(card);
    }

    this.ReorganiseHand = function(){
        // let handAngle = 30;
        // let halfHandAngle = handAngle / 2;
        
        // let cardAngle = 0;
        // if(this.cards.length == 1){
        //     cardAngle = halfHandAngle;
        // } else {
        //     cardAngle = (handAngle / (this.cards.length - 1));
        // }

        // for(let i = 0; i < this.cards.length; i++){
        //     console.log(-halfHandAngle + (cardAngle * i));
        //     this.cards[i].rotation = (-halfHandAngle + (cardAngle * i)) * (Math.PI / 180);

        // }
        for(let i = 0; i < this.cards.length; i++ ){
            this.cards[i].x = 300 + (i * 20);
        }
    }
}

export default Hand;