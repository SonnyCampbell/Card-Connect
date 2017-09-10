import React, {Component} from 'react';
import Ps from 'perfect-scrollbar';


class RoomSelect extends Component {
    constructor(props){
        super(props);

        this.state = {
            socket: this.props.socket,
            roomListInterval: '',
            roomDetails: []
        }

        this.state.socket.on('RoomListUpdate', (roomDetails) => {
            this.UpdateRoomList(roomDetails);
        });

        
    }

    GetRoomListUpdate(socket) {
        socket.emit('GetRoomListUpdate');
    }

    UpdateRoomList(roomDetails){
        console.log(roomDetails);
        this.setState({
            roomDetails
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.roomListInterval);
    }

    componentDidMount() {
        
        var container = document.getElementsByClassName('RoomSelectComponent');
        Ps.initialize(container[0]);
    }

    componentWillMount() {
        let roomListInterval = setInterval(() => {this.GetRoomListUpdate(this.state.socket)}
        , 1000);

        this.setState({
            roomListInterval
        });
    }

    handleSelectRoom(index){
        console.log(this.props.selectedRoomIndex);
        
        this.props.onSelectRoom(index);
    }

    handleJoinRoom(username, roomName, gameType){
        this.props.onJoinRoom(username, roomName, gameType);
    }

    
    render(){
        return (
            <div className='RoomSelectComponent'>
                {this.state.roomDetails.map((room, k) => (
                    <div 
                        className={this.props.selectedRoomIndex === k ? 'RoomDetailsSelected' : 'RoomDetails'} 
                        onClick={this.handleSelectRoom.bind(this, k)}
                        onDoubleClick={this.handleJoinRoom.bind(this, 'Player' + k , room.roomName, room.gameType)}
                        key={k}
                        >Room: {room.roomName} | Game: {room.gameType} | Players: {room.playerCount}/2
                    </div>
                    
                )) }
                
            </div>
        );
    }
}

export default RoomSelect;