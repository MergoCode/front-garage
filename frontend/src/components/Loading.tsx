import {  HashLoader} from "react-spinners";
import React from "react";
import "../css/Layout.css"

const Loading: React.FC = () => {

    return(<div className="container loading-container" >
        <HashLoader className="loading-spinner" color="#b878c5" size={50}/>
    </div>);


};

export default Loading;