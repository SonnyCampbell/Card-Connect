class Card {
    constructor(xPos, yPos, width, height, faceImageSrc, suit, value){
        // This is a very simple and unsafe constructor. All we're doing is checking if the values exist.
        // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
        // But we aren't checking anything else! We could put "Lalala" for the value of x 
        this.x = xPos || 0;
        this.y = yPos || 0;
        this.w = width || 1;
        this.h = height || 1;
        this.rotation = 0;

        this.faceImage = new Image();
        this.faceImage.src = faceImageSrc;
        this.backImage = new Image();
        this.backImage.src = '/images/Cards/card_back2.png';
        this.displayImage = this.backImage;
        this.isFaceDown = true;

        this.hovered = false;
        this.selected = false;
        this.askedFor = false;

        this._suit = suit;
        this._value = value;
    }
  

    DrawOnLoad(ctx) {
        if(this.backImage.complete)
        {
            this.Draw(ctx);
        }
        else
        {
            this.ctx = ctx;
            this.backImage.onload = this.ctx.drawImage(this.backImage, this.x, this.y, this.w, this.h);
        }
    }

    Draw(ctx) {
        //ctx.fillStyle = this.fill;
        //ctx.fillRect(this.x, this.y, this.w, this.h);
        let hoverRaise = 0;
        //if((this.hovered && !this.selected)){
        if((this.hovered || this.selected)){
            hoverRaise = 10;
        }

        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 0.01;
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        ctx.drawImage(this.displayImage, this.x, this.y - hoverRaise, this.w, this.h);
    }

    // Determine if a point is inside the shape's bounds
    Contains(mx, my) {
        // All we have to do is make sure the Mouse X,Y fall in the area between
        // the shape's X and (X + Width) and its Y and (Y + Height)
        return  (this.x <= mx) && (this.x + this.w >= mx) &&
            (this.y <= my) && (this.y + this.h >= my);
    }

    GetSuitString() {
        switch(this._suit){
            case 'S':
                return 'Spades';
            case 'C':
                return 'Clubs';
            case 'H':
                return 'Hearts';
            case 'D':
                return 'Diamonds';
        }
    }

    GetValueString() {
        switch(this._value){
            case 1:
                return 'Ace';
            case 11:
                return 'Jack';
            case 12:
                return 'Queen';
            case 13:
                return 'King';
            default:
                return this._value;
        }
    }


    ToString() {
        return `The ${this.GetValueString()} of ${this.GetSuitString()}.`;
    }

    SuitValue(){
        return  this._suit + this._value;
    }
}

export default Card;