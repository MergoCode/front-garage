import { useNavigate } from "react-router";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "./reduxStore/store";
import { increment, decrement } from "./reduxStore/testreducer";
import React from "react";

/* testing reducers (to be changed), typescript update */

const NotFoundPage: React.FC = () => {4
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    const navigate = useNavigate();


    const handleRedirect = () => {
        navigate('/home');
    }

    return(
    <div>
        <h1>404 page not found</h1>
        <button onClick={handleRedirect}>
            GO home 
        </button>
        <h1>{count}</h1>
        <button onClick={() => dispatch(increment())}>increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>);
};

export default NotFoundPage;