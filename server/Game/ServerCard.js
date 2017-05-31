function Card(xPos, yPos, width, height, suit, value) {
  // This is a very simple and unsafe constructor. All we're doing is checking if the values exist.
  // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
  // But we aren't checking anything else! We could put "Lalala" for the value of x 
  this.x = xPos || 0;
  this.y = yPos || 0;
  this.w = width || 1;
  this.h = height || 1;
  this.rotation = 0;

  let _suit = suit;
  let _value = value;


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