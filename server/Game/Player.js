import Card from './ServerCard'

function Player(socket, username) {
    let _username = username;
    let _socket = socket;
    let _roomName = '';
    let _hand = [];

    // Getters and Setters
    this.getSocket = () => {
        return  _socket;
    }
    this.setSocket = (socket) => {
        _socket = socket;
    }

    this.getUsername = () => {
        return  _username;
    }
    this.setUsername = (username) => {
        _username = username;
    }
    
    this.getRoomName = () => {
        return  _roomName;
    }
    this.setRoomName = (roomName) => {
        _roomName = roomName;
    }

    this.getHand = () => {
        return _hand;
    }
    this.setHand = (hand) => {
        _hand = hand;
    }
}

export default Player;