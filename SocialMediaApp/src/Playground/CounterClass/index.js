// Self Contained Components

import React, {createRef} from "react";

export default class CounterClass extends React.Component {
    constructor(){
        super();
        this.state = {
            counter: 0,
            lastAction: 'None'
        }
        this.inputIncrease = createRef();
    }
    render() {

        const handleIncrementClick = () => {
            this.setState({counter: this.state.counter + 1, lastAction: 'Increased'});
            this.inputIncrease.current.focus();
            console.log('Clicked:' , this.state);
        }

        const handleDecrementClick = () => {
            this.setState({counter: this.state.counter - 1, lastAction: 'Decreased'});
            console.log('Clicked:' , this.state);
        }

        return (
            <div>
                Counter: {this.state.counter}
                <div>Last Action: {this.state.lastAction}</div>
                <input 
                    type="text"
                    placeholder="Focus on increase"
                    ref={this.inputIncrease}
                />
                <button onClick={handleIncrementClick}>Increase</button>
                <button onClick={handleDecrementClick}>Decrease</button>
            </div>
        );
    }
}
