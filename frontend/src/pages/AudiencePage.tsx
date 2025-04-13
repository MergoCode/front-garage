import React, { useState, useEffect } from "react";
import "../css/AudiencePicker.scss";
import { useForm } from "react-hook-form";
import Auditory from "../components/Auditory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AudienceDatePicker from '../components/DatePicker';
import useFetchFreeAudiences from "../hooks/useFetchFreeAudiences";
import { useDatePickerStore } from "../zustandStore/store";
import Loading from "../components/Loading";


type FormData = {
  campus: "Drago" | "Tarny",
}

type AuditoryData = {
  campus: string;
  number: string;
  freeTime: string[];
  bookedTime?: BookedTimeInfo[];
  freePairs?: number[];
};

type BookedTimeInfo = {
  time: string;
  bookedBy: string;
  name: string;
};

type BookingData = {
  campus: string;
  number: string;
  time: string;
  bookedBy: string;
  name: string;
  date: string;
};

// Map pair numbers to time slots
const pairToTimeMap: Record<number, string> = {
  1: "08:30–09:50",
  2: "10:10–11:30",
  3: "11:50–13:10",
  4: "13:30–14:50",
  5: "15:05–16:25",
  6: "16:40–18:00",
  7: "18:10–19:30",
};

const timeToPairMap: Record<string, number> = {
  "08:30–09:50": 1,
  "10:10–11:30": 2,
  "11:50–13:10": 3,
  "13:30–14:50": 4,
  "15:05–16:25": 5,
  "16:40–18:00": 6,
  "18:10–19:30": 7
};

const AudiencePage: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const [auditories, setAuditories] = useState<AuditoryData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [bookedBy, setBookedBy] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [selectedAuditory, setSelectedAuditory] = useState<AuditoryData | null>(null);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [availableAudiences, setAvailableAudiences] = useState<Array<{
    audienceName: string;
    audienceFreePairs: number[];
    campus: "Drago" | "Tarny";
  }> | null>(null);
  const [showDetailedView, setShowDetailedView] = useState(false);

  const setCampus = useDatePickerStore((state) => state.setCampus);
  const selectedCampus = watch("campus");
  const selectedDate = useDatePickerStore((state) => state.date);
  
  useEffect(() => {
    if (selectedCampus) {
      setCampus(selectedCampus);
    }
  }, [selectedCampus, setCampus]);
  
  const { audienceData, fetchAudienceError } = useFetchFreeAudiences();

  useEffect(() => {
    console.log("Data loaded:", { audienceData, selectedCampus });
    const savedBookings = localStorage.getItem("audienceBookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  useEffect(() => {
    if (audienceData) {
      console.log("Processing audience data:", audienceData);
      
      // Filter audiences for selected campus or show all if none selected
      const campusToUse = selectedCampus || "Drago"; // Default to Drago if none selected
      
      const originalAudiences = audienceData.audiences.filter(
        audience => !selectedCampus || audience.campus === campusToUse
      );
      
      console.log("Filtered audiences:", originalAudiences);
      
      if (originalAudiences.length === 0) {
        console.log("No audiences found for campus:", campusToUse);
        setAvailableAudiences([]);
        return;
      }
      
      const updatedAudiences = JSON.parse(JSON.stringify(originalAudiences));
      
      const filteredAudiences = updatedAudiences.map(audience => {
        const number = audience.audienceName.split(" ")[0];
        const campus = audience.campus === "Drago" ? "Драгоманова, 50" : "Тарнавського, 107";
        
        const relevantBookings = bookings.filter(booking => 
          booking.number === number && 
          booking.campus === campus &&
          new Date(booking.date).toDateString() === selectedDate.toDateString()
        );
        
        const bookedPairs = relevantBookings.map(booking => timeToPairMap[booking.time]);
        
        const freePairs = audience.audienceFreePairs.filter(pair => !bookedPairs.includes(pair));
        
        return {
          ...audience,
          audienceFreePairs: freePairs
        };
      });
      
      console.log("Available audiences set to:", filteredAudiences);
      setAvailableAudiences(filteredAudiences);
      
      // Auto-submit when data is available and campus is selected
      if (selectedCampus && !searchPerformed) {
        onSubmit({ campus: selectedCampus });
      }
    }
  }, [audienceData, bookings, selectedCampus, selectedDate]);

  // Get booking info for an auditory
  const getBookingsForAuditory = (campus: string, number: string) => {
    return bookings
      .filter((booking) => booking.campus === campus && booking.number === number && 
               new Date(booking.date).toDateString() === selectedDate.toDateString())
      .map((booking) => ({
        time: booking.time,
        bookedBy: booking.bookedBy,
        name: booking.name,
      }));
  };

  const isTimeBooked = (campus: string, number: string, time: string) => {
    return bookings.some(
      (booking) => 
        booking.campus === campus && 
        booking.number === number && 
        booking.time === time &&
        new Date(booking.date).toDateString() === selectedDate.toDateString()
    );
  };

  const prepareAuditoryData = (auditory: AuditoryData) => {
    const bookedTimeInfo = getBookingsForAuditory(auditory.campus, auditory.number);
    
    const freeTimesFromPairs = auditory.freePairs?.map(pair => pairToTimeMap[pair]) || [];
    
    const freeTime = freeTimesFromPairs.filter(time => 
      !isTimeBooked(auditory.campus, auditory.number, time)
    );
    
    return {
      ...auditory,
      freeTime: freeTime,
      bookedTime: bookedTimeInfo,
    };
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted with data:", data);
    console.log("Available audiences:", availableAudiences);
    
    if (!availableAudiences) {
      console.log("No available audiences data");
      setSearchPerformed(true);
      return;
    }
    
    const initialAuditories: AuditoryData[] = availableAudiences.map(audience => {
      const number = audience.audienceName.split(" ")[0];
      
      return {
        campus: audience.campus === "Drago" ? "Драгоманова, 50" : "Тарнавського, 107",
        number,
        freePairs: audience.audienceFreePairs,
        freeTime: audience.audienceFreePairs.map(pair => pairToTimeMap[pair]),
      };
    }) || [];

    const preparedAuditories = initialAuditories.map(prepareAuditoryData);
    
    const sortedAuditories = preparedAuditories.sort((a, b) => {
      if (a.freeTime.length === 0 && b.freeTime.length > 0) return 1;
      if (a.freeTime.length > 0 && b.freeTime.length === 0) return -1;
      return 0;
    });

    console.log("Prepared auditories:", sortedAuditories);
    setAuditories(sortedAuditories);
    setSearchPerformed(true);
  };

  const handleBook = (auditory: AuditoryData) => {
    setSelectedAuditory(auditory);
    setShowModal(true);
  };

  const handleDirectBooking = (audienceName: string, pairNumber: number, campus: "Drago" | "Tarny") => {
    const number = audienceName.split(" ")[0];
    const campusString = campus === "Drago" ? "Драгоманова, 50" : "Тарнавського, 107";
    const time = pairToTimeMap[pairNumber];
    
    const auditoryData: AuditoryData = {
      campus: campusString,
      number,
      freePairs: [pairNumber],
      freeTime: [time]
    };
    
    setSelectedTime(time);
    setSelectedAuditory(auditoryData);
    setShowModal(true);
  };

  const handleModalSubmit = () => {
    if (selectedAuditory && selectedTime) {
      const newBooking: BookingData = {
        campus: selectedAuditory.campus,
        number: selectedAuditory.number,
        time: selectedTime,
        bookedBy,
        name,
        date: selectedDate.toISOString(),
      };

      const updatedBookings = [...bookings, newBooking];
      setBookings(updatedBookings);

      localStorage.setItem("audienceBookings", JSON.stringify(updatedBookings));

      if (showDetailedView) {
        setAuditories((prevAuditories) => {
          return prevAuditories.map((auditory) => {
            if (auditory.campus === selectedAuditory.campus && auditory.number === selectedAuditory.number) {
              const updatedFreeTime = auditory.freeTime.filter((time) => time !== selectedTime);
              const updatedBookedTime = [
                ...(auditory.bookedTime || []),
                { time: selectedTime, bookedBy, name },
              ];
              return {
                ...auditory,
                freeTime: updatedFreeTime,
                bookedTime: updatedBookedTime,
              };
            }
            return auditory;
          }).sort((a, b) => {
            if (a.freeTime.length === 0 && b.freeTime.length > 0) return 1;
            if (a.freeTime.length > 0 && b.freeTime.length === 0) return -1;
            return 0;
          });
        });
      }

      toast.success("Бронювання успішне!", {
        className: "toast-success",
      });

      setShowModal(false);
      setSelectedTime("");
      setBookedBy("");
      setName("");
      setSelectedAuditory(null);
      
      if (audienceData && selectedCampus) {
        onSubmit({ campus: selectedCampus });
      }
    }
  };

  return (
    <div className="container audience-block">
      <div className="audience-header-block col-11">
        <p>Вільні аудиторії</p>
      </div>
      <div className="col-11">
        <form className="d-flex justify-content-between" onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex align-items-center">
            <label>
              <input type="radio" value="Drago" {...register("campus", { required: true })} />
              Драгоманова, 50
            </label>
            <label>
              <input type="radio" value="Tarny" {...register("campus", { required: true })} />
              Тарнавського, 107
            </label>
          </div>
          <a className="button" href="/search">Пошук за назвою аудиторії</a>
          <div>
          
          <AudienceDatePicker type="Date"/>
          <button type="submit">Перевірити доступність</button>
          </div>
        </form>

        {audienceData && availableAudiences && availableAudiences.length > 0 && (
          <div className="timetable-view">
            {/*<h4>Доступні аудиторії по парах</h4>*/}
            <div className="timetable-container">
              {/* Column headers with pair numbers and times */}
              <div className="pair-column">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div key={index} className="pair-item">
                    <div className="pair-number">{index + 1} пара</div>
                    <div className="pair-time">{pairToTimeMap[index + 1]}</div>
                  </div>
                ))}
              </div>

              {/* Audiences for each pair */}
              <div className="audiences-column">
                {Array.from({ length: 7 }).map((_, pairIndex) => (
                  <div key={pairIndex} className="audiences-row">
                    {availableAudiences
                      .filter((aud) => aud.audienceFreePairs.includes(pairIndex + 1))
                      .map((aud, i) => (
                        <button 
                          key={i} 
                          className="audience-button"
                          onClick={() => handleDirectBooking(aud.audienceName, pairIndex + 1, aud.campus)}
                        >
                          {aud.audienceName}
                        </button>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <button 
            className="furtherInfoBtn mx-auto" 
            onClick={() => setShowDetailedView(!showDetailedView)}
            >
            <p>
            {showDetailedView 
                ? "Приховати детальну інформацію про аудиторії на цю дату" 
                : "Показати детальну інформацію про аудиторії на цю дату"}
            </p>
        </button>


        {(showDetailedView) && (
          <div className="auditory-list">
            <h4>Детальна інформація про аудиторії</h4>
            {searchPerformed ? (
              auditories.length > 0 ? (
                auditories.map((a, i) => (
                  <Auditory 
                    key={i} 
                    campus={a.campus} 
                    number={a.number} 
                    freeTime={a.freeTime} 
                    bookedTime={a.bookedTime} 
                    onclick={() => handleBook(a)} 
                    isFullyBooked={a.freeTime.length === 0}
                  />
                ))
              ) : (
                <p className="no-auditories">Немає доступних аудиторій</p>
              )
            ) : (
              <p className="no-auditories">Виберіть корпус та натисніть "Перевірити доступність"</p>
            )}
          </div>
        )}
        
        {audienceData === null && (
          <Loading />
        )}
        
        {fetchAudienceError && (
          <p className="error">Помилка завантаження: {fetchAudienceError}</p>
        )}
      </div>

      {showModal && selectedAuditory && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Бронювання аудиторії {selectedAuditory.number}</h4>
                <p>Обраний час: <strong> {selectedAuditory.freeTime}</strong></p>
            <label>
              Хто бронює:
              <select value={bookedBy} onChange={(e) => setBookedBy(e.target.value)}>
                <option value="">-- Оберіть --</option>
                <option value="Викладач">Викладач</option>
                <option value="Студрада">Студрада (івент)</option>
              </select>
            </label>
            <label>
              Ім'я:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <div className="modal-actions">
              <button onClick={handleModalSubmit} disabled={!selectedTime || !bookedBy || !name}>
                Підтвердити
              </button>
              <button onClick={() => setShowModal(false)}>Скасувати</button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AudiencePage;
