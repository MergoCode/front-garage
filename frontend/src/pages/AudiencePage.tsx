import React, { useEffect } from "react";
import "../css/AudiencePicker.scss";
import AudienceDatePicker from "../components/DatePicker";
import {useForm} from "react-hook-form";
import useFetchFreeAudiences from "../hooks/useFetchFreeAudiences";
import { useDatePickerStore } from "../zustandStore/store";
type FormData = {
    campus: "Drago" | "Tarny",
}

const AudiencePage: React.FC = () => {
    const { register,
        watch
    } = useForm<FormData>();
    const setCampus = useDatePickerStore((state) => state.setCampus);
    const selectedCampus = watch("campus");
    useEffect(() => {
        setCampus(selectedCampus);
    }, [selectedCampus])
    const {audienceData, fetchAudienceError} = useFetchFreeAudiences();

    const filteredAudiences = audienceData?.audiences.filter(
        (audience) => audience.campus === selectedCampus
    );
    
    const handleLogClick = (e: React.MouseEvent) => {
        e.preventDefault(); 
        console.log(audienceData); 
    };

    const pairs = Array.from({ length: 8 }, (_, i) => i + 1); // Створюємо масив [1, 2, ..., 8]
  const audienceByPair = pairs.map((pair) => {
    return {
      pair,
      audiences: filteredAudiences
        ?.filter((aud) => aud.audienceFreePairs.includes(pair))
        .map((aud) => aud.audienceName) || [],
    };
  });

  

    return(<div className="container audience-block"> 
        <div className="audience-header-block col-11"><p>Вільні аудиторії</p></div>
        <div className="col-11">
        <form>
            <label htmlFor=""><input type="radio" value="Drago" {...register("campus", {required: true})} />
                Драгоманова, 50
            </label>
            <label htmlFor=""><input type="radio" value="Tarny" {...register("campus", {required: true})} />
                Тарнавського, 107
            </label>
            
            <AudienceDatePicker type="Date"/>
            
            
            <div className="audience-table">
  {/* Стовпець із парами */}
  <div className="pair-column">
    {Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="pair-number">
        {index + 1} пара
      </div>
    ))}
  </div>

  {/* Список аудиторій для кожної пари */}
  <div>
    {Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="audiences">
        {filteredAudiences
          ?.filter((aud) => aud.audienceFreePairs.includes(index + 1))
          .map((aud, i) => (
            <span key={i} className="audience">
              {aud.audienceName}
            </span>
          ))}
      </div>
    ))}
  </div>
</div>

            <button onClick={handleLogClick}>Log</button>
        </form>
        </div>
    </div>);
};

export default AudiencePage;