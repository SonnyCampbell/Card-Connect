import React, {Component} from 'react';

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
        this.setState({
            roomDetails
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.roomListInterval);
    }

    componentWillMount() {
        let roomListInterval = setInterval(() => {this.GetRoomListUpdate(this.state.socket)}
        , 1000);

        this.setState({
            roomListInterval
        });
    }
    
    render(){
        return (
            <div className='RoomSelectComponent'>
                {this.state.roomDetails.map((room, k) => (
                    <div className='RoomDetails' key={k}>Game: {room}   Players: 1/2</div>
                )) }
                <br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content<br />Content
            </div>
        );
    }
}

export default RoomSelect;