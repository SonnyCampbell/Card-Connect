import Card from './ServerCard'

class Player {
    constructor(socket, username, gameType){

        //privates
        this._username = username;
        this._socket = socket;
        this._roomName = '';
        this._hand = [];

        //public
        this.isTurn = false;
        this.gameType = gameType;
    }
    

    // Getters and Setters
    GetSocket() {
        return  this._socket;
    }
    SetSocket(socket){
        this._socket = socket;
    }

    GetUsername() {
        return  this._username;
    }
    SetUsername(username) {
        this._username = username;
    }

    GetRoomName() {
        return  this._roomName;
    }
    SetRoomName(roomName) {
        this._roomName = roomName;
    }

    GetHand() {
        return this._hand;
    }
    SetHand(hand) {
        this._hand = hand;
    }
}

export default Player;