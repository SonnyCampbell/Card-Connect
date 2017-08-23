import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import JoinGame from './JoinGame.jsx';
import GameSelect from './GameSelect.jsx';
import RoomSelect from './RoomSelect.jsx';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            gameType: '',
            joinGameError: '',
            selectedRoomIndex: -1
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
            console.log(username + ' ' + roomName);
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

    handleSelectRoom(index){
        console.log(index + ' room selected');
        this.setState({
            selectedRoomIndex: index
        });
    }

    handleJoinRoom(username, roomName, gameType){
        this.props.onJoinGame(username, roomName, gameType);
    }
    
    render(){
        return (
            <div className='DashboardComponent'>
                <JoinGame onJoinGame={this.handleJoinGame.bind(this)} error={this.state.joinGameError} /> 
                <hr />
                <Grid >
                    <Row className="show-grid">
                        <Col xs={6} md={6}>
                            <GameSelect onSelectGame={this.handleSelectGame.bind(this)}/>
                        </Col>
                        <Col xs={6} md={6}>
                            <RoomSelect 
                                socket={this.props.socket} 
                                onSelectRoom={this.handleSelectRoom.bind(this)} 
                                selectedRoomIndex={this.state.selectedRoomIndex}
                                onJoinRoom={this.handleJoinRoom.bind(this)}
                            />
                        </Col>
                    </Row>
                </Grid>
                
                
            </div>
        );
    }
}

export default Dashboard;