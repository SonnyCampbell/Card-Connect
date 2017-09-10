import Card from './Card'
import Hand from './Hand'

class Player {
    constructor(socket, username){
        this._username = username;
        this._socket = socket;
        this._roomName = '';
        this._hand = [];

        this.isTurn = false;
    }
    

    

    // Getters and Setters
    getSocket() {
        return  this._socket;
    }
    setSocket(socket) {
        this._socket = socket;
    }

    getUsername(){
        return  this._username;
    }
    setUsername(username) {
        this._username = username;
    }

    getRoomName() {
        return  this._roomName;
    }
    setRoomName(roomName){
        this._roomName = roomName;
    }

    getHand() {
        return this._hand;
    }
    setHand(hand) {
        this._hand = hand;
    }
}

export default Player;