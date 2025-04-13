import React from "react";
import useFetchTeachers from "../hooks/useFetchTeachers";


const TestPage: React.FC = () => {

    const {data} = useFetchTeachers();

    return(<>
        {data.map(el => (<div>
            <h2>{el.name}</h2>
            <h3>{el.position}</h3>
            <p>{el.email}</p>
            <img src={el.img} alt="" />
        </div>))}
    </>)
}

export default TestPage;