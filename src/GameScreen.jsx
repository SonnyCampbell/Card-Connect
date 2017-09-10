import React, {Component} from 'react';
import CanvasState from '../Game/CanvasState'
import Card from '../Game/Card'
import Deck from '../Game/Deck'

class GameScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            socket: this.props.socket,
            gameCanvas: null,
            isGameStarted: false
        }   
    }

    componentDidMount(){
        let gameCanvas = new CanvasState(document.getElementById('canvas'), this.state.socket);
        gameCanvas.Draw();

        this.setState({
            gameCanvas
        });

        this.initialiseSockets(gameCanvas, this.state.socket);
    }

    onGameStart(){
        this.state.socket.emit('StartGame');
        this.state.gameCanvas.game.playerTurn = true;

        this.state.socket.emit('DealHands', 10);
        this.setState({
            isGameStarted: true
        });
    }

    onShuffleDeck(){
        this.state.socket.emit('ShuffleDeck');
    }

    initialiseSockets(gameCanvas, socket){
        socket.on('StartGame', function(msg){
            console.log(msg);   

            gameCanvas.StartGame();

        });

        socket.on('DealCard', function(cardSuitValue, openingHand) {
            console.log('deal card client side received: ' + cardSuitValue);
            gameCanvas.game.DealCardToPlayer(cardSuitValue, openingHand);
        });

        socket.on('OppPlayerDealtCard', (cardSuitValue, openingHand) => {
            gameCanvas.game.DealCardToOppPlayer(cardSuitValue, openingHand);
        });

        socket.on('OppPlayerDiscardedCard', (cardSuitValue) => {
            gameCanvas.game.OppPlayerDiscardedCard(cardSuitValue);
        });

        socket.on('PlayerJoinedGame', function(msg){
            console.log(msg);
        });

        socket.on('ShuffleDeck', function(msg) {
            console.log(msg);
        });
    }
    
    render(){
        return (
            <div className='GameScreenComponent'>
                {
                    this.state.isGameStarted
                    ? <button id="btnShuffleDeck" onClick={this.onShuffleDeck.bind(this)}>Shuffle Deck</button>
                    : <button id="btnGameStart" onClick={this.onGameStart.bind(this)}>Start Game</button>
                }           
                
                <br/>
                <div id="canvas-wrapper">
                    <canvas id="canvas"  width="1200" height="1200"> </canvas>
                </div>                   
            </div>
        );
    }
}

export default GameScreen;