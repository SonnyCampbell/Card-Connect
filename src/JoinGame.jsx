import React, {Component} from 'react';
import {FormControl, FormGroup, InputGroup, ControlLabel, Form, Button, Glyphicon} from 'react-bootstrap';

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
                <FormGroup controlId='formInlineUsername' bsSize="small">
                    <ControlLabel>Username: </ControlLabel>
                    {' '}
                    <FormControl 
                        type="text"
                        onChange={event => {this.setState({username: event.target.value})}} 
                        placeholder='Enter a username.'                   
                    />
                </FormGroup>
                {' '}
                <FormGroup controlId='formInlineRoomName' bsSize="small">
                    <ControlLabel>Room Name: </ControlLabel>
                    {' '}
                    <InputGroup>                       
                        <FormControl 
                            type="text"
                            onChange={event => {this.setState({roomName: event.target.value})}} 
                            placeholder='Enter a room name.'                  
                        />
                        <InputGroup.Addon onClick={() => console.log('search')} >
                            <Glyphicon glyph='search'></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                    
                </FormGroup>
                {' '}
                <Button bsSize="small" onClick={this.handleJoinGame.bind(this)}>
                    Join A Game!
                </Button>
                {' '}
                <FormGroup validationState="error" bsSize="small">
                    <ControlLabel>
                        {this.props.error}
                    </ControlLabel>                   
                </FormGroup>
                
            </Form>
        );
    }
}

export default JoinGame;