import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "../css/AudiencePicker.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useDatePickerStore } from "../zustandStore/store";
interface DatePickerType {
  type: "Date" | "Time";
}



const AudienceDatePicker: React.FC<DatePickerType> = ({ type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("1 пара");
  const setDate = useDatePickerStore((state) => state.setDate);
  const setTime = useDatePickerStore((state) => state.setTime);
  const options = [
    "1 пара",
    "2 пара",
    "3 пара",
    "4 пара",
    "5 пара",
    "6 пара",
    "7 пара",
  ];
  const togglePicker = (e: React.MouseEvent) => {
    e.preventDefault(); 

    setIsOpen(!isOpen);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  const handleOptionSelect = (option: string) => {
    
    setSelectedOption(option);
    console.log(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (type == 'Date' && selectedDate) {
        setDate(selectedDate);
    }
    if (type == "Time" && selectedOption) {
        const time = parseInt(selectedOption.slice(0, 1), 10); // Перетворення в number
        if (time >= 1 && time <= 8) {
            setTime(time);
          } else {
            console.error("Invalid time selected");
          }
    }

    
  }, [selectedDate, selectedOption, type, setDate, setTime]); 

  return (
    <>
      <button className="date-picker-button" onClick={togglePicker}>
        {type == "Date" ? "Дата" : "Час"}
      </button>
      {type == "Date"
        ? isOpen && (
            <div className="date-picker-menu">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                inline
                minDate={new Date(2023, 11, 31)}
                dropdownMode="select"
              />
            </div>
          )
        : isOpen && (
            <div className="date-picker-menu">
              <ul>
                {options.map((pair, index) => (
                  <li key={index}>
                    <button onClick={() => handleOptionSelect(pair)}>
                      {pair}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
      
    </>
  );
};

export default AudienceDatePicker;
