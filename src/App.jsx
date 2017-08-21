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
            gameType: '',
            error: ''
        };       
    }

    componentDidMount(){
        this.initialiseSocket(this.state.socket);
    }

    initialiseSocket(socket){
        socket.on('joinRoomError', (error) => {
            this.setState({
                error
            });
            console.log(this.state.error);
        });

        socket.on('joinRoomSuccess', () => {
            this.setState({
                isInGame: true
            });
            //console.log(username + " joined game");
        })
    }

    handleJoinGame(username, roomName, gameType) {
        if(gameType !== ''){
            
            this.state.socket.emit('JoinRoom', username, roomName);
            this.setState({
                username,
                roomName,
                gameType
            });


        }
        
    }

    render(){

        return (
            <div className='MainPage'>
                <div className='GameTitle'>Card Connect</div>
                <hr/>
                {
                    !this.state.isInGame 
                    ? <Dashboard 
                        onJoinGame={this.handleJoinGame.bind(this)} 
                        error={this.state.error}
                        socket={this.state.socket}
                        /> 
                    : <GameScreen socket={this.state.socket}/>            
                }


            </div>
        );
    }
}

export default App;