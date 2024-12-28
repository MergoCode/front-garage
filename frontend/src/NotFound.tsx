import { useNavigate } from "react-router";
import React, {useRef} from "react";
import config from "./config";
import { useCounterStore } from "./reduxStore/store";

/* testing reducers (to be changed), typescript update */

const NotFoundPage: React.FC = () => {4
    const count = useCounterStore((state) => state.count);
    const increment = useCounterStore((state) => state.increment);
    const decrement = useCounterStore((state) => state.decrement);
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    const incrementByAmount = useCounterStore((state) => state.incrementByAmount);
    const baseURL = config.apiBaseUrl;


    const handleRedirect = () => {
        navigate('/home');
    }

    const handleIncrementByAmount = () => {
        const value = parseInt(inputRef.current?.value || "0", 10);
        incrementByAmount(value);
    }

    return(
    <div>
        <h1>404 page not found</h1>
        <button onClick={handleRedirect}>
            GO home 
        </button>
        <h1>{count}</h1>
        <input type="text" ref={inputRef}/>
        <button onClick={increment}>increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={handleIncrementByAmount}>Increment by Input</button>
        <h1>{baseURL}</h1>

    </div>);
};

export default NotFoundPage;