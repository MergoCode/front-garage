import React, { useState, useEffect } from "react";
import "../css/AudiencePicker.scss";
import { useForm } from "react-hook-form";
import Auditory from "../components/Auditory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AudienceDatePicker from '../components/DatePicker';
import useFetchFreeAudiences from "../hooks/useFetchFreeAudiences";
import { useDatePickerStore } from "../zustandStore/store";

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
  1: "08:30–10:00",
  2: "10:15–11:45",
  3: "12:00–13:30",
  4: "13:45–15:15",
  5: "15:30–17:00",
  6: "17:15–18:45",
  7: "19:00–20:30",
  8: "20:45–22:15"
};

const timeToPairMap: Record<string, number> = {
  "08:30–10:00": 1,
  "10:15–11:45": 2,
  "12:00–13:30": 3,
  "13:45–15:15": 4,
  "15:30–17:00": 5,
  "17:15–18:45": 6,
  "19:00–20:30": 7,
  "20:45–22:15": 8
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
    const savedBookings = localStorage.getItem("audienceBookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  useEffect(() => {
    if (audienceData && selectedCampus) {
      const originalAudiences = audienceData.audiences.filter(
        audience => audience.campus === selectedCampus
      );
      
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
      
      setAvailableAudiences(filteredAudiences);
    }
  }, [audienceData, bookings, selectedCampus, selectedDate]);

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
    const initialAuditories: AuditoryData[] = availableAudiences?.map(audience => {
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

    setAuditories(sortedAuditories);
    setSearchPerformed(true);
  };

  const handleBook = (auditory: AuditoryData) => {
    setSelectedAuditory(auditory);
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

      toast.success("Бронювання успішне!", {
        className: "toast-success",
      });

      setShowModal(false);
      setSelectedTime("");
      setBookedBy("");
      setName("");
      setSelectedAuditory(null);
    }
  };

  return (
    <div className="container audience-block">
      <div className="audience-header-block col-11">
        <p>Аудиторії</p>
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
          
          <AudienceDatePicker type="Date"/>
          <button type="submit">Перевірити доступність</button>
        </form>

        {selectedCampus && availableAudiences && (
          <div className="timetable-view">
            <h4>Доступні аудиторії по парах</h4>
            <div className="timetable-container">
              {/* Column headers with pair numbers and times */}
              <div className="pair-column">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="pair-item">
                    <div className="pair-number">{index + 1} пара</div>
                    <div className="pair-time">{pairToTimeMap[index + 1]}</div>
                  </div>
                ))}
              </div>

              {/* Audiences for each pair */}
              <div className="audiences-column">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="audiences-row">
                    {availableAudiences
                      .filter((aud) => aud.audienceFreePairs.includes(index + 1))
                      .map((aud, i) => (
                        <span key={i} className="audience">
                          {aud.audienceName}
                        </span>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

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
            selectedCampus && <p className="no-auditories">Виберіть корпус та натисніть "Перевірити доступність"</p>
          )}
        </div>
      </div>

      {showModal && selectedAuditory && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Бронювання аудиторії {selectedAuditory.number}</h4>
            <label>
              Час:
              <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                <option value="">-- Оберіть час --</option>
                {selectedAuditory.freeTime.map((time, i) => (
                  <option key={i} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </label>
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