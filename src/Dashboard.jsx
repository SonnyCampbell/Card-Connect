import React, {Component} from 'react';
import JoinGame from './JoinGame.jsx';
import GameSelect from './GameSelect.jsx';
import RoomSelect from './RoomSelect.jsx';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            gameType: '',
            joinGameError: ''
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.error !== this.props.error){
            this.setState({
                joinGameError: nextProps.error
            })
        }
    }

    handleJoinGame(username, roomName){
        if(this.state.gameType !== ''){
            this.props.onJoinGame(username, roomName, this.state.gameType);
        }
        else {
            this.setState({
                joinGameError: 'No game type selected'
            });
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
                <JoinGame onJoinGame={this.handleJoinGame.bind(this)} error={this.state.joinGameError} /> 
                <hr />
                <GameSelect onSelectGame={this.handleSelectGame.bind(this)}/>
                <RoomSelect socket={this.props.socket}/>
            </div>
        );
    }
}

export default Dashboard;