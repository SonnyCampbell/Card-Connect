import React, {Component} from 'react';
import CanvasState from '../Game/CanvasState'
import Card from '../Game/Card'
import Deck from '../Game/Deck'
import io from 'socket.io-client'

import Dashboard from './Dashboard.jsx'
import GameScreen from './GameScreen.jsx'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            socket: this.props.socket,
            isInGame: false,
            username: '',
            roomName: '',
            gameType: ''
        };
    }

    handleJoinGame(username, roomName, gameType) {
        if(gameType !== ''){
            console.log(gameType);
            this.state.socket.emit('JoinRoom', username, roomName);

            this.setState({
                isInGame: true,
                username,
                roomName,
                gameType
            });
            console.log(username + " joined game");
        }
        
    }

    render(){
        console.log('Inside App Component');

        return (
            <div className='MainPage'>
                <div className='GameTitle'>Card Connect</div>
                <hr/>
                {
                    !this.state.isInGame 
                    ? <Dashboard onJoinGame={this.handleJoinGame.bind(this)} /> 
                    : <GameScreen socket={this.state.socket}/>            
                }


            </div>
        );
    }
}

export default App;