import React from "react";

type BookedTimeInfo = {
  time: string;
  bookedBy: string;
  name: string;
};

type AuditoryProps = {
  campus: string;
  number: string;
  freeTime: string[];
  bookedTime?: BookedTimeInfo[];
  onclick: () => void;
  isFullyBooked: boolean;
};

const Auditory: React.FC<AuditoryProps> = ({ 
  campus, 
  number, 
  freeTime, 
  bookedTime = [], 
  onclick, 
  isFullyBooked 
}) => {
  return (
    <div className={`auditory-card ${isFullyBooked ? 'fully-booked' : ''}`}>
      <h3>Аудиторія {number}</h3>
      <p>Корпус: {campus}</p>
      
      {freeTime.length > 0 && (
        <>
          <p className="time-section-title available">Вільна в:</p>
          <ul className="time-list available">
            {freeTime.map((time, index) => (
              <li key={`free-${index}`}>{time}</li>
            ))}
          </ul>
        </>
      )}
      
      {bookedTime.length > 0 && (
        <>
          <p className="time-section-title booked">Заброньована в:</p>
          <ul className="time-list booked">
            {bookedTime.map((booking, index) => (
              <li key={`booked-${index}`}>
                {booking.time} - {booking.bookedBy} ({booking.name})
              </li>
            ))}
          </ul>
        </>
      )}
      
      {/* <button onClick={onclick} disabled={isFullyBooked}>
        {isFullyBooked ? 'Повністю заброньована' : 'Забронювати'}
      </button> */}
    </div>
  );
};

export default Auditory;