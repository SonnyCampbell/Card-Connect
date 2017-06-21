import Deck from './Deck'
import DiscardPile from './DiscardPile'
import Player from './Player'

function CanvasState(canvas, socket)
{
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');

    this.valid = false;

    this.dragging = false;
    this.selection = null;
    this.dragoffx = 0;
    this.dragoffy = 0;

    this.socket = socket;

    this.theDeck = new Deck();
    this.discardPile = new DiscardPile();

    this.cards = [];
    this.gameStarted = false;
    this.players = [];

    this.playerHand = [];
    this.oppPlayerHand = [];

    //-----------------------------------------------------------------------------
    // Padding and border offets
    //-----------------------------------------------------------------------------
    let html = document.body.parentNode;
    this.htmlTop = html.offsetTop;
    this.htmlLeft = html.offsetLeft;

    let stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
    if (document.defaultView && document.defaultView.getComputedStyle) {
    this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
    this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
    this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
    this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
    }

    let theState = this;
  
    //-----------------------------------------------------------------------------
    // Event Listeners
    //-----------------------------------------------------------------------------
    canvas.addEventListener('selectstart', function(e) {e.preventDefault(); return false;}, false);
  
    canvas.addEventListener('mousedown', function(e){
        let mouse = theState.GetMouse(e);
        let mx = mouse.x;
        let my = mouse.y;
        let cards = theState.cards;
        
        for(let i = cards.length - 1; i >= 0; i--){
            if (cards[i].Contains(mx, my)){
                if (cards[i].isFaceDown){
                    console.log('start deal card client side');
                    socket.emit('DealCard');
                    return;
                }
                else {
                    let selectedCard = cards[i];
                    selectedCard.displayImage = selectedCard.faceImage;
                    // Keep track of where in the object we clicked so we can move it smoothly (see mousemove)
                    theState.dragoffx = mx - selectedCard.x;
                    theState.dragoffy = my - selectedCard.y;
                    theState.dragging = true;
                    theState.selection = selectedCard;
                    theState.valid = false;

                    //theState.animateTo(selectedCard, (new Date()).getTime(), 200, 200);
                    return;
                }
            }
        }
        let cardSelected = false;

        for(let i = theState.playerHand.length - 1; i >= 0; i--){
            if(theState.playerHand[i].hovered){
                let selectedCard = theState.playerHand[i]
                //selectedCard.displayImage = selectedCard.faceImage;
                // Keep track of where in the object we clicked so we can move it smoothly (see mousemove)
                theState.dragoffx = mx - selectedCard.x;
                theState.dragoffy = my - selectedCard.y;
                theState.dragging = true;
                theState.selection = selectedCard;
                theState.valid = false;

                selectedCard.selected = true;
                cardSelected = true;
            } else {
                theState.playerHand[i].selected = false;
            }

        }

        //havent returned means we have failed to select anything. If there was an object selected, we deselect it
        if(!cardSelected){
            theState.selection = null;
            theState.valid = false;
        }
    }, false);
  
    canvas.addEventListener('mouseup', function(e){
        theState.dragging = false;

        let mouse = theState.GetMouse(e);
        let mx = mouse.x;
        let my = mouse.y;
        let card = theState.selection;

        if(theState.discardPile.Contains(mx, my)){
            for(let i = 0; i < theState.playerHand.length; i++){
                if (card.SuitValue() == theState.playerHand[i].SuitValue()){
                    theState.playerHand.splice(i, 1);
                    theState.discardPile.DiscardCard(card);
                    theState.selection = null;
                    theState.valid = false;
                    break;
                }
                if (i == theState.playerHand.length){
                    console.log('Couldn\' find the card in the deck. Something probably went wrong');
                }
            }
        }

        


    }, false);
  
    canvas.addEventListener('mousemove', function(e){
        let mouse = theState.GetMouse(e);
        let mx = mouse.x;
        let my = mouse.y;

        if(theState.dragging){      
            theState.selection.x = mouse.x - theState.dragoffx;
            theState.selection.y = mouse.y - theState.dragoffy;
            theState.valid = false;
        }

        let hovering = false;

        for(let i = theState.playerHand.length - 1; i >= 0; i--){
            
            if (!hovering && theState.playerHand[i].Contains(mx, my)){
                console.log(theState.playerHand[i].ToString());  
                hovering = true;
                theState.playerHand[i].hovered = true;
                theState.valid = false;
            } else if (theState.playerHand[i].hovered) {
                theState.playerHand[i].hovered = false;
                theState.valid = false;
            }
        }
    }, false);


  
    this.selectionColor = '#CC0000';
    this.selectionWidth = 2;
    this.interval = 30;
    setInterval(function() { theState.Draw(); }, theState.interval);
  
    //Add new shape on 'dblclick'
}

CanvasState.prototype.DealCard = function(cardSV){
    console.log('client side attempting to deal card ' + cardSV);
    let card = this.theDeck.deckDict[cardSV];
    this.theDeck.RemoveCard(card);

    this.cards = this.theDeck.Cards();

    card.displayImage = card.faceImage;
    card.isFaceDown = false;
    this.selection = card;
    this.valid = false;
    
    this.animateTo(card, (new Date()).getTime(), 0.75, 200 + (this.playerHand.length * 20), 300, card.x, card.y);
    this.playerHand.push(card);
    
    return;
}

CanvasState.prototype.DealOppPlayerCard = function(cardSV){
    console.log('Dealing opp: ' + cardSV);

    let card = this.theDeck.deckDict[cardSV];
    this.theDeck.RemoveCard(card);
    this.cards = this.theDeck.Cards();

    this.animateTo(card, (new Date()).getTime(), 0.75, 200 + (this.oppPlayerHand.length * 20), 100, card.x, card.y);
    this.oppPlayerHand.push(card);

}

CanvasState.prototype.DealHands = function(numOfCards){
}

CanvasState.prototype.StartGame = function() {
    this.gameStarted = true;  
    this.theDeck.Shuffle()
    for(let i = 0; i < this.theDeck.Cards().length; i++){
      this.AddCard(this.theDeck.Cards()[i]);
    }
    this.Draw();
}

CanvasState.prototype.GetMouse = function(e){
  let theCanvas = this.canvas;
  let offsetX = 0;
  let offsetY = 0;
  let mx, my;
  
  if (theCanvas.offsetParent !== undefined) {
    do {
      offsetX += theCanvas.offsetLeft;
      offsetY += theCanvas.offsetTop;
    } while ((theCanvas = theCanvas.offsetParent));
  }
  
  offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
  offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;
  mx = e.pageX - offsetX;
  my = e.pageY - offsetY;
  
  return {x: mx, y: my};
}

CanvasState.prototype.AddCard = function(card){
    card.x += this.cards.length / 4;
    card.y += this.cards.length / 4;
    this.cards.push(card);
    this.valid = false;
}

CanvasState.prototype.Clear = function(){
    this.ctx.clearRect(0, 0, this.width, this.height);
}

CanvasState.prototype.Draw = function(){
    if(!this.valid){
        let ctx = this.ctx;
        let cards = this.cards;
        let discardPile = this.discardPile;
        this.Clear();

        //-------------------
        //Do background stuff
        //-------------------
        
        //Draw Discard Pile
        if(this.gameStarted){
            discardPile.Draw(ctx);
        }
        

        //Draw Each card
        for(let i = 0; i < cards.length; i++){
            let card = cards[i];

            if (card.x > this.width || card.y > this.height || card.x + card.w < 0 || card.y + card.h < 0) 
                continue;
            
            //ctx.rotate(90 * Math.PI / 180);
            ctx.save();
            if(card.rotation != 0){
                ctx.translate(card.x + (card.w/2), card.y + (card.h/2));
                ctx.rotate(card.rotation);
                ctx.translate(-card.x -(card.w/2), -card.y - (card.h/2));
            }            
            
            card.DrawOnLoad(ctx);
            
            ctx.restore();
            //console.log('Card is here: ' + card.x + ' ' + card.y + ' ' + card.rotation);
        }

        // Draw Opponents Hand
        for(let i = 0; i < this.oppPlayerHand.length; i++){
            let card = this.oppPlayerHand[i];

            if (card.x > this.width || card.y > this.height || card.x + card.w < 0 || card.y + card.h < 0) 
                continue;
            
            //ctx.rotate(90 * Math.PI / 180);
            ctx.save();
            if(card.rotation != 0){
                ctx.translate(card.x + (card.w/2), card.y + (card.h/2));
                ctx.rotate(card.rotation);
                ctx.translate(-card.x -(card.w/2), -card.y - (card.h/2));
            }            
            
            card.DrawOnLoad(ctx);
            
            ctx.restore();
        }

        //Draw Player Hand
        for(let i = 0; i < this.playerHand.length; i++){
            let card = this.playerHand[i];

            if (card.x > this.width || card.y > this.height || card.x + card.w < 0 || card.y + card.h < 0) 
                continue;

            //ctx.rotate(90 * Math.PI / 180);
            ctx.save();
            if(card.rotation != 0){
                ctx.translate(card.x + (card.w/2), card.y + (card.h/2));
                ctx.rotate(card.rotation);
                ctx.translate(-card.x -(card.w/2), -card.y - (card.h/2));
            }            
            
            card.DrawOnLoad(ctx);
            
            ctx.restore();
        }

        //Draw Selected Card Outline
        if(this.selection != null){
            ctx.strokeStyle = this.selectionColor;
            ctx.lineWidth = this.selectionWidth;
            let myCard = this.selection;
            ctx.strokeRect(myCard.x, myCard.y, myCard.w, myCard.h);
        }

        this.valid = true;
    }
}

CanvasState.prototype.animate = function(card, startTime){
    let canvas = this.canvas;
    let ctx = this.ctx;

    let time = (new Date()).getTime() - startTime;

    let linearSpeed = 10;
    let newX = linearSpeed * time / 1000;

    if(newX < canvas.width - card.w) {
        card.x += newX;
        this.valid = false;
    }

    this.Clear();
    this.Draw();

    requestAnimationFrame(() => {
        this.animate(card, startTime);
    });
}

CanvasState.prototype.animateTo = function(card, startTime, duration, destX, destY, startX, startY) {
    let canvas = this.canvas;
    let ctx = this.ctx;
    let isMoving = false;

    let time = ((new Date()).getTime() - startTime)/ 1000 ;
    let t = Math.min(1, time / duration);

    if( t < 1) {
        card.x = startX * (1 - t) + (destX) * t;
        card.y = startY * (1 - t) + (destY) * t;
        isMoving = true;
        this.valid = false;
    }
    else {
        card.x = destX;
        card.y = destY;
        this.valid = false;
        return;
    }

    this.Clear();
    this.Draw();

    requestAnimationFrame(() => {
        this.animateTo(card, startTime, duration, destX, destY, startX, startY);
    });
}

export default CanvasState;