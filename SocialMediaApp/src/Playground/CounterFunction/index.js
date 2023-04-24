import { useState, useRef } from "react";

export default function CounterFunction () {

    const [counter, setCounter] = useState(3);
    const [lastAction, setLastAction] = useState('none');

    const inputIncrease = useRef();

    const handleIncrementClick = () => {
        setCounter(counter + 1);
        setLastAction('Increased');
        inputIncrease.current.focus();
    }
    const handleDecrementClick = () => {
        setCounter(counter - 1);
        setLastAction('Decreased');
    }
    return (
        <div>
            Counter: {counter}
            <div>Last Action: {lastAction}</div>
            <input type="text" ref={inputIncrease} />
            <button onClick={handleIncrementClick}>Increase</button>
            <button onClick={handleDecrementClick}>Decrease</button>
        </div>
    );
};

