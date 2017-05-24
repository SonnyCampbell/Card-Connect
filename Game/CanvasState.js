import io from 'socket.io-client'

function CanvasState(canvas)
{
  var socket = io();

  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  this.ctx = canvas.getContext('2d');
  
  this.valid = false;
  this.cards = [];
  this.dragging = false;
  this.selection = null;
  this.dragoffx = 0;
  this.dragoffy = 0;

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
    let mouse = theState.getMouse(e);
    let mx = mouse.x;
    let my = mouse.y;
    let cards = theState.cards;

    console.log(mouse);
    
    for(let i = cards.length - 1; i >= 0; i--){
      if (cards[i].Contains(mx, my)){
        let selectedCard = cards[i];
        // Keep track of where in the object we clicked so we can move it smoothly (see mousemove)
        theState.dragoffx = mx - selectedCard.x;
        theState.dragoffy = my - selectedCard.y;
        theState.dragging = true;
        theState.selection = selectedCard;
        theState.valid = false;

        socket.emit('chat message','test update');

        //theState.animateTo(selectedCard, (new Date()).getTime(), 200, 200);
        return;
      }
    }

    // havent returned means we have failed to select anything. If there was an object selected, we deselect it
    if(theState.selection){
    theState.selection = null;
    theState.valid = false;
    }
  }, false);
  
  canvas.addEventListener('mouseup', function(e){
    theState.dragging = false;
  }, false);
  
  canvas.addEventListener('mousemove', function(e){
    if(theState.dragging){
      let mouse = theState.getMouse(e);
      
      theState.selection.x = mouse.x - theState.dragoffx;
      theState.selection.y = mouse.y - theState.dragoffy;
      theState.valid = false;
    }
  }, false);
  
  this.selectionColor = '#CC0000';
  this.selectionWidth = 2;
  this.interval = 30;
  setInterval(function() { theState.draw(); }, theState.interval);
  
  //Add new shape on 'dblclick'
}

CanvasState.prototype.getMouse = function(e){
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

CanvasState.prototype.addCard = function(card){
    this.cards.push(card);
    this.valid = false;
}

CanvasState.prototype.clear = function(){
    this.ctx.clearRect(0, 0, this.width, this.height);
}

CanvasState.prototype.draw = function(){
    if(!this.valid){
        let ctx = this.ctx;
        let cards = this.cards;
        this.clear();

        //-------------------
        //Do background stuff
        //-------------------


        //Draw each card
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
            
            card.Draw(ctx);
            
            ctx.restore();
            console.log('Card is here: ' + card.x + ' ' + card.y + ' ' + card.rotation);
        }

        if(this.selection != null){
            ctx.strokeStyle = this.selectionColor;
            ctx.lineWidth = this.selectionWidth;
            let myCard = this.selection;
            ctx.strokeRect(myCard.x, myCard.y, myCard.w, myCard.h);
        }

        this.valid = true;
    }
}

CanvasState.prototype.test = function() {
    console.log('test');
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

    this.clear();
    this.draw();

    requestAnimationFrame(() => {
        this.animate(card, startTime);
    });
}

CanvasState.prototype.animateTo = function(card, startTime, duration, destX, destY) {
    let canvas = this.canvas;
    let ctx = this.ctx;
    let isMoving = false;

    let time = ((new Date()).getTime() - startTime)/ 1000 ;

    let t = Math.min(1, time / duration);

    let linearSpeed = 20;
    let normalDirection = Vector.normalVector(card.x, card.y, destX, destY);
    let movement = { x: normalDirection.x * linearSpeed * time / 1000,
                     y: normalDirection.y * linearSpeed * time / 1000 };

    if( t < 1) {
        card.x = card.sx * (1 - t) + destX * t;
        card.y = card.sy * (1 - t) + destY * t;
        isMoving = true;
        this.valid = false;
    }
    // if (Math.abs(card.y - destY) > 5){
    //     card.y += movement.y;
    //     isMoving = true;
    //     this.valid = false;
    // }
        
     if(!isMoving){
        return;
     }   

    card.rotation += 20*Math.PI/180;
    this.clear();
    this.draw();

    requestAnimationFrame(() => {
        this.animateTo(card, startTime, duration, destX, destY);
    });
}




export default CanvasState;