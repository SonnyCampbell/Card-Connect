function Card(xPos, yPos, width, height, imageSrc, suit, value) {
  // This is a very simple and unsafe constructor. All we're doing is checking if the values exist.
  // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
  // But we aren't checking anything else! We could put "Lalala" for the value of x 
  this.x = xPos || 0;
  this.y = yPos || 0;
  this.w = width || 1;
  this.h = height || 1;
  this.rotation = 0;

  this.image = new Image();
  this.image.src = imageSrc;

  let _suit = suit;
  let _value = value;




  this.Draw = (ctx) => {
    //ctx.fillStyle = this.fill;
    //ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
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
}

export default Card;