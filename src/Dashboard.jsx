import React, {Component} from 'react';
import JoinGame from './JoinGame.jsx';
import GameSelect from './GameSelect.jsx';
import RoomSelect from './RoomSelect.jsx';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            gameType: ''
        }
    }

    handleJoinGame(username, roomName){
        if(this.state.gameType !== ''){
            this.props.onJoinGame(username, roomName, this.state.gameType);
        }
        else {
            console.log('no game type selected')
        }
        
    }

    handleSelectGame(gameType){
        console.log(gameType);
        this.setState({
            gameType
        });
    }
    
    render(){
        return (
            <div className='DashboardComponent'>
                <JoinGame onJoinGame={this.handleJoinGame.bind(this)} /> 
                <hr />
                <GameSelect onSelectGame={this.handleSelectGame.bind(this)}/>
                <RoomSelect />
            </div>
        );
    }
}

export default Dashboard;