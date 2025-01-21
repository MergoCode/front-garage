import React, { useEffect } from "react";
import "../css/AudiencePicker.scss";

import {useForm} from "react-hook-form";

type FormData = {
    campus: string,
}

const AudiencePage: React.FC = () => {

    const { register,
        handleSubmit,
        watch
    } = useForm<FormData>();



    const onSubmit = (data) => {
        console.log(data);
    }

    const selectedCampus = watch("campus");


    


  

    return(<div className="container audience-block"> 
        <div className="audience-header-block col-11"><p>Вільні аудиторії</p></div>
        <div className="col-11">
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor=""><input type="radio" value="Drago" {...register("campus", {required: true})} />
                Драгоманова, 50
            </label>
            <label htmlFor=""><input type="radio" value="Tarny" {...register("campus", {required: true})} />
                Тарнавського, 107
            </label>
            <button type="submit">Check</button>
            <p>{selectedCampus}</p>
        </form>
        </div>
    </div>);
};

export default AudiencePage;