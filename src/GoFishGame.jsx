import React, {Component} from 'react';

class GoFishGame extends Component {
    constructor(props){
        super(props);
        
    }

    handleSelectGame(){
        this.props.onSelectGame('GoFish');    

    }
    
    render(){
        return (
            <div 
                className={this.props.active ? 'SelectedGameComponent' : 'UnselectedGameComponent'} 
                onClick={this.handleSelectGame.bind(this)}
            >
                <div className='GameText' >GoFishGame</div>
                
            </div>
        );
    }
}

export default GoFishGame;