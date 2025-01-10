import { useNavigate } from "react-router";
import React, {useRef} from "react";
import config from "../config";
import { useCounterStore } from "../reduxStore/store";
import "../css/NotFound.css";
const NotFoundPage: React.FC = () => {4
   
    const navigate = useNavigate();
   

    const handleRedirect = () => {
        navigate('/home');
    }

   

    return(
    <div className="container d-flex justify-content-center not-found-container">
        <div className="col-3 me-5 not-found-block"><p className="not-found-four">4</p></div>
        <div className="not-found-circle col-4">
        <h1 className="not-found-header">Ой! Здається тут нічого немає :(</h1>
        <button onClick={handleRedirect} className="not-found-button col-6">
            Перейти на головну
        </button>
        </div>
        <div className="col-3 ms-3 not-found-block"><p className="not-found-four">4</p></div>

    </div>);
};

export default NotFoundPage;