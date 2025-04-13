import React, { useState } from "react";
import "../css/SearchResults.sass";

type Props = {
  name: string;
  time: string[];
  campus: string;
};

const pairToTime = [
  "8:30 - 9:50",
  "10:10 - 11:30",
  "11:50 - 13:10",
  "13:30 - 14:50",
  "15:05 - 16:25",
  "16:40 - 18:00",
  "18:10 - 19:30",
];

const getTime = (pair: string) => {
  return pairToTime[parseInt(pair) - 1];
};

const isNowInGivenPairs = (pairs: string[]): boolean => {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  return pairs.some((pair) => {
    const [startStr, endStr] = pair.split(" - ");
    const [startH, startM] = startStr.split(":").map(Number);
    const [endH, endM] = endStr.split(":").map(Number);

    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    return nowMinutes >= startMinutes && nowMinutes <= endMinutes;
  });
};

const AuditorySearchCard: React.FC<Props> = ({ name, time, campus }) => {
  const pairs = time.map((el) => getTime(el));
  const isTaken = isNowInGivenPairs(pairs);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [selectedAuditory, setSelectedAuditory] = useState<{
    number: string;
    freeTime: string;
  } | null>(null);
  const [bookedBy, setBookedBy] = useState("");
  const [nameInput, setNameInput] = useState("");

  // Handle time slot click to open modal
  const handleTimeClick = (timeSlot: string) => {
    setSelectedAuditory({
      number: name,
      freeTime: timeSlot,
    });
    setShowModal(true);
  };

  // Handle modal submit
  const handleModalSubmit = () => {
    if (bookedBy && nameInput && selectedAuditory) {
      console.log({
        auditory: selectedAuditory.number,
        time: selectedAuditory.freeTime,
        bookedBy,
        name: nameInput,
      });
      // Add your booking logic here (e.g., API call)
      setShowModal(false);
      setBookedBy("");
      setNameInput("");
      setSelectedAuditory(null);
    }
  };

  return (
    <>
      <div className="col-10 search-card px-5">
        <div className="search-card-left">
          <h2 className="search-card__title">{name}</h2>
          <span className="search-card__status">
            Статус:{" "}
            {!isTaken ? (
              <span className="search-card__taken">Зайнята</span>
            ) : (
              <span className="search-card__free">Вільна</span>
            )}
          </span>
          <span className="search-card__campus">
            {campus === "Drago" ? "Драгоманова, 50" : "Тарнавського, 107"}
          </span>
        </div>
        <div className="search-card-right">
          <h2 className="search-card__title">Вільні години:</h2>
          <div className="free-hours">
            {pairs.map((el, index) => (
              <span key={index}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTimeClick(el);
                  }}
                  style={{ color: "#777", textDecoration: "underline", cursor: "pointer" }}
                >
                  {el}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>

      {showModal && selectedAuditory && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Бронювання аудиторії {selectedAuditory.number}</h4>
            <p>
              Обраний час: <strong>{selectedAuditory.freeTime}</strong>
            </p>
            <label>
              Хто бронює:
              <select
                value={bookedBy}
                onChange={(e) => setBookedBy(e.target.value)}
              >
                <option value="">-- Оберіть --</option>
                <option value="Викладач">Викладач</option>
                <option value="Студрада">Студрада (івент)</option>
              </select>
            </label>
            <label>
              Ім'я:
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </label>
            <div className="modal-actions">
              <button
                onClick={handleModalSubmit}
                disabled={!bookedBy || !nameInput}
              >
                Підтвердити
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setBookedBy("");
                  setNameInput("");
                  setSelectedAuditory(null);
                }}
              >
                Скасувати
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuditorySearchCard;