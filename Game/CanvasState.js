import Deck from './Deck'
import DiscardPile from './DiscardPile'
import Player from './Player'
import Game from './Game'

function CanvasState(canvas, socket){
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');

    this.valid = false;

    this.dragging = false;
    
    this.dragoffx = 0;
    this.dragoffy = 0;

    this.game = new Game(this, socket);

    this.socket = socket;

    this.theDeck = new Deck();
    this.discardPile = new DiscardPile();

    this.selectedCard = null;
    this.cards = [];
    this.gameStarted = false;
    this.players = [];

    this.playerHand = [];
    this.oppPlayerHand = [];

    //-----------------------------------------------------------------------------
    // Padding and border offets
    //-----------------------------------------------------------------------------
    let thisCanvasState = this;

    this.selectionColor = '#CC0000';
    this.selectionWidth = 2;
    this.interval = 30;
    setInterval(function() { thisCanvasState.Draw(); }, thisCanvasState.interval);
    
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

    //-----------------------------------------------------------------------------
    // Event Listeners
    //-----------------------------------------------------------------------------
    canvas.addEventListener('selectstart', function(e) {
        e.preventDefault(); 
        return false;
    }, false);
  
    canvas.addEventListener('mousedown', function(e){
        thisCanvasState.HandleMouseDown(e);
    }, false);

    this.HandleMouseDown = function(e){
        let mouse = this.GetMouse(e);
        let mx = mouse.x;
        let my = mouse.y;
        let game = this.game;
        let cards = this.game.cards;
        
        for(let i = cards.length - 1; i >= 0; i--){
            if (cards[i].Contains(mx, my)){
                console.log('start deal card client side');
                socket.emit('DealCard');
                return;
            }
        }
        let cardSelected = false;

        for(let i = game.playerHand.length - 1; i >= 0; i--){
            if(game.playerHand[i].hovered){
                let selectedCard = game.playerHand[i]
                //selectedCard.displayImage = selectedCard.faceImage;
                // Keep track of where in the object we clicked so we can move it smoothly (see mousemove)
                this.dragoffx = mx - selectedCard.x;
                this.dragoffy = my - selectedCard.y;
                this.dragging = true;
                
                game.selectedCard = selectedCard;
                selectedCard.selected = true;
                cardSelected = true;

                this.valid = false;
            } else {
                game.playerHand[i].selected = false;
            }

        }

        //havent returned means we have failed to select anything. If there was an object selected, we deselect it
        if(!cardSelected){
            game.selectedCard = null;
            this.valid = false;
        }
    }
  
    canvas.addEventListener('mouseup', function(e){
        thisCanvasState.HandleMouseUp(e);
    }, false);

    this.HandleMouseUp = function(e) {
        this.dragging = false;

        let mouse = this.GetMouse(e);
        let mx = mouse.x;
        let my = mouse.y;
        let game = this.game;
        let card = game.selectedCard;
        

        if(game.discardPile.Contains(mx, my) && (game.selectedCard != null)){
            for(let i = 0; i < game.playerHand.length; i++){
                if (card.SuitValue() == game.playerHand[i].SuitValue()){
                    game.playerHand.splice(i, 1);
                    game.discardPile.DiscardCard(card);
                    game.selectedCard = null;
                    this.valid = false;
                    break;
                }
                if (i == game.playerHand.length){
                    console.log('Couldn\' find the card in the deck. Something probably went wrong');
                }
            }
        }
    }
  
    canvas.addEventListener('mousemove', function(e){
        thisCanvasState.HandleMouseMove(e);
    }, false);

    this.HandleMouseMove = function(e){
        let mouse = this.GetMouse(e);
        let mx = mouse.x;
        let my = mouse.y;
        let game = this.game;

        if(this.dragging){      
            game.selectedCard.x = mouse.x - this.dragoffx;
            game.selectedCard.y = mouse.y - this.dragoffy;
            this.valid = false;
        }

        let hovering = false;

        for(let i = game.playerHand.length - 1; i >= 0; i--){
            
            if (!hovering && game.playerHand[i].Contains(mx, my)){
                console.log(game.playerHand[i].ToString());  
                hovering = true;
                game.playerHand[i].hovered = true;
                this.valid = false;
            } else if (game.playerHand[i].hovered) {
                game.playerHand[i].hovered = false;
                this.valid = false;
            }
        }
    }

    //Add new shape on 'dblclick'
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

CanvasState.prototype.Clear = function(){
    this.ctx.clearRect(0, 0, this.width, this.height);
}

CanvasState.prototype.StartGame = function() {
    // this.gameStarted = true;  
    // this.theDeck.Shuffle()
    // for(let i = 0; i < this.theDeck.Cards().length; i++){
    //   this.AddCard(this.theDeck.Cards()[i]);
    // }
    this.game.StartGame();
    this.Draw();
}

CanvasState.prototype.Draw = function(){
    if(!this.valid){
        let ctx = this.ctx;
        let game = this.game;
        let cards = this.game.cards;
        let discardPile = this.game.discardPile;
        this.Clear();

        //-------------------
        //Do background stuff
        //-------------------
        
        //Draw Discard Pile
        if(game.gameStarted){
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
        for(let i = 0; i < game.oppPlayerHand.length; i++){
            let card = game.oppPlayerHand[i];

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
        for(let i = 0; i < game.playerHand.length; i++){
            let card = game.playerHand[i];

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
        if(game.selectedCard != null){
            ctx.strokeStyle = this.selectionColor;
            ctx.lineWidth = this.selectionWidth;
            let myCard = game.selectedCard;
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