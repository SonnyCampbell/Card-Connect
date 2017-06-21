import Card from './Card'
import CONST from './constants'

function DiscardPile() {
    this.x = 150;
    this.y = 10;
    this.w = 110;
    this.h = 160;
    this.lineWidth = 2;
    this.selectionColor = '#c3c9c6';

    this.cards = [];

    this.Draw = function(ctx){
        ctx.save();
        ctx.strokeStyle = this.selectionColor;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        ctx.restore();

        //Draw Discarded Cards
        for(let i = 0; i < this.cards.length; i++){
            let card = this.cards[i];
            
            ctx.save();
            if(card.rotation != 0){
                ctx.translate(card.x + (card.w/2), card.y + (card.h/2));
                ctx.rotate(card.rotation);
                ctx.translate(-card.x -(card.w/2), -card.y - (card.h/2));
            }            
            
            card.DrawOnLoad(ctx);
            
            ctx.restore();
        }
    }

    this.DiscardCard = function(card){
        card.x = this.x + 5;
        card.y = this.y + 5;
        this.cards.push(card);
    }

    // Determine if a point is inside the shape's bounds
    this.Contains = function(mx, my) {
        // All we have to do is make sure the Mouse X,Y fall in the area between
        // the shape's X and (X + Width) and its Y and (Y + Height)
        return  (this.x <= mx) && (this.x + this.w >= mx) &&
            (this.y <= my) && (this.y + this.h >= my);
    }
}

export default DiscardPile;