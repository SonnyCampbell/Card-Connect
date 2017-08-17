import React, {Component} from 'react';
import {FormControl, FormGroup, InputGroup, ControlLabel, Form, Button} from 'react-bootstrap';

class JoinGame extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            roomName: ''
        }
    }

    handleJoinGame(){
        this.props.onJoinGame(this.state.username, this.state.roomName);
    }
    
    render(){
        console.log('Inside Login Component');
        

        return (
            <Form inline>
                <FormGroup controlId='formInlineUsername'>
                    <ControlLabel>Username: </ControlLabel>
                    {' '}
                    <FormControl 
                        type="text"
                        onChange={event => {this.setState({username: event.target.value})}}                   
                    />
                </FormGroup>
                {' '}
                <FormGroup controlId='formInlineRoomName'>
                    <ControlLabel>Room Name: </ControlLabel>
                    {' '}
                    <FormControl 
                        type="text"
                        onChange={event => {this.setState({roomName: event.target.value})}}                   
                    />
                </FormGroup>
                {' '}
                <Button bsSize="small" onClick={this.handleJoinGame.bind(this)}>
                    Join A Game!
                </Button>
            </Form>
        );
    }
}

export default JoinGame;