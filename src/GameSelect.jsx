import React, {Component} from 'react';
import GoFishGame from './GoFishGame.jsx';

class GameSelect extends Component {
    constructor(props){
        super(props);

        this.state = {
            activeIndex: 0
        }
    }

    handleSelectGame(index, gameType){
        this.props.onSelectGame(gameType);
        this.setState({
            activeIndex: index
        });
    }
    
    render(){
        return (
            <div className='GameSelectComponent'>               
                <GoFishGame key={1} active={this.state.activeIndex === 1} onSelectGame={this.handleSelectGame.bind(this, 1)} />
                <GoFishGame key={2} active={this.state.activeIndex === 2} onSelectGame={this.handleSelectGame.bind(this, 2)} />
                <GoFishGame key={3} active={this.state.activeIndex === 3} onSelectGame={this.handleSelectGame.bind(this, 3)} />
                <GoFishGame key={4} active={this.state.activeIndex === 4} onSelectGame={this.handleSelectGame.bind(this, 4)} />
            </div>
        );
    }
}

export default GameSelect;