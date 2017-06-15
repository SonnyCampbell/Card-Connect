function Card(xPos, yPos, width, height, faceImageSrc, suit, value) {
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

  let _suit = suit;
  let _value = value;

  this.DrawOnLoad = (ctx) => {
      if(this.backImage.complete)
      {
          this.Draw(ctx);
      }
      else
      {
          this.ctx = ctx;
          this.backImage.onload = this.DrawWhenReady;
      }
  }

  this.DrawWhenReady = () => {
      this.ctx.drawImage(this.backImage, this.x, this.y, this.w, this.h);
  }


  this.Draw = (ctx) => {
    //ctx.fillStyle = this.fill;
    //ctx.fillRect(this.x, this.y, this.w, this.h);
    let hoverRaise = 0;
    if(this.hovered || this.selected){
        hoverRaise = 10;
    }

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 0.01;
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    ctx.drawImage(this.displayImage, this.x, this.y - hoverRaise, this.w, this.h);
  }

  // Determine if a point is inside the shape's bounds
  this.Contains = function(mx, my) {
    // All we have to do is make sure the Mouse X,Y fall in the area between
    // the shape's X and (X + Width) and its Y and (Y + Height)
    return  (this.x <= mx) && (this.x + this.w >= mx) &&
            (this.y <= my) && (this.y + this.h >= my);
  }

  this.GetSuitString = () => {
    switch(_suit){
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

  this.GetValueString = () => {
    switch(_value){
        case 1:
            return 'Ace';
        case 11:
            return 'Jack';
        case 12:
            return 'Queen';
        case 13:
            return 'King';
        default:
            return _value;
    }
  }


  this.ToString = () => {
    return `The ${this.GetValueString()} of ${this.GetSuitString()}.`;
  }

  this.SuitValue = () => {
      return  _suit + _value;
  }
}

export default Card;