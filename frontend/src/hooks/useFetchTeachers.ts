import { useState, useEffect } from "react";
import api from "../AxiosSetting";

type Teacher = {
  id: string;
  fullName: string;
  department: string;
  position: string;
  photoUrl: string;
};

export function useFetchTeachers() {
  const [teachersData, setTeachersData] = useState<Teacher[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const token = localStorage.getItem("accessToken");

  const defaultTeachers: Teacher[] = [
    // Кафедра радіофізики та комп'ютерних технологій
    {
      id: "1",
      fullName: "Петренко Іван Васильович",
      department: "Кафедра радіофізики та комп'ютерних технологій",
      position: "Доцент",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "2",
      fullName: "Коваленко Олена Ігорівна",
      department: "Кафедра радіофізики та комп'ютерних технологій",
      position: "Професор",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "3",
      fullName: "Шевченко Ольга Петрівна",
      department: "Кафедра радіофізики та комп'ютерних технологій",
      position: "Старший викладач",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "4",
      fullName: "Мельник Андрій Сергійович",
      department: "Кафедра радіофізики та комп'ютерних технологій",
      position: "Доцент",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "5",
      fullName: "Іваненко Марія Олександрівна",
      department: "Кафедра радіофізики та комп'ютерних технологій",
      position: "Викладач",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "6",
      fullName: "Ткаченко Олексій Дмитрович",
      department: "Кафедра радіофізики та комп'ютерних технологій",
      position: "Професор",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "7",
      fullName: "Данилюк Наталія Володимирівна",
      department: "Кафедра радіофізики та комп'ютерних технологій",
      position: "Асистент",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "8",
      fullName: "Литвиненко Роман Ігорович",
      department: "Кафедра радіофізики та комп'ютерних технологій",
      position: "Доцент",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "9",
      fullName: "Борисенко Віктор Петрович",
      department: "Кафедра радіофізики та комп'ютерних технологій",
      position: "Завідувач кафедри",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "10",
      fullName: "Савченко Михайло Андрійович",
      department: "Кафедра радіофізики та комп'ютерних технологій",
      position: "Старший викладач",
      photoUrl: "../image/people.jpg"
    },
  
    // Кафедра системного проектування
    {
      id: "11",
      fullName: "Гнатюк Сергій Олександрович",
      department: "Кафедра системного проектування",
      position: "Доцент",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "12",
      fullName: "Лисенко Тетяна Миколаївна",
      department: "Кафедра системного проектування",
      position: "Професор",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "13",
      fullName: "Бондаренко Юрій Валентинович",
      department: "Кафедра системного проектування",
      position: "Старший викладач",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "14",
      fullName: "Кузьменко Оксана Павлівна",
      department: "Кафедра системного проектування",
      position: "Доцент",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "15",
      fullName: "Федоренко Ігор Михайлович",
      department: "Кафедра системного проектування",
      position: "Викладач",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "16",
      fullName: "Панченко Вадим Сергійович",
      department: "Кафедра системного проектування",
      position: "Професор",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "17",
      fullName: "Степаненко Ірина Василівна",
      department: "Кафедра системного проектування",
      position: "Асистент",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "18",
      fullName: "Хоменко Дмитро Олегович",
      department: "Кафедра системного проектування",
      position: "Доцент",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "19",
      fullName: "Захарченко Галина Андріївна",
      department: "Кафедра системного проектування",
      position: "Завідувач кафедри",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "20",
      fullName: "Лисенко Олександр Віталійович",
      department: "Кафедра системного проектування",
      position: "Старший викладач",
      photoUrl: "../image/people.jpg"
    },
  
    // Кафедра радіоелектронних і комп'ютерних систем
    {
      id: "21",
      fullName: "Романюк Микола Петрович",
      department: "Кафедра радіоелектронних і комп'ютерних систем",
      position: "Доцент",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "22",
      fullName: "Григоренко Анастасія Дмитрівна",
      department: "Кафедра радіоелектронних і комп'ютерних систем",
      position: "Професор",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "23",
      fullName: "Семенов Олег Ігорович",
      department: "Кафедра радіоелектронних і комп'ютерних систем",
      position: "Старший викладач",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "24",
      fullName: "Василенко Анна Миколаївна",
      department: "Кафедра радіоелектронних і комп'ютерних систем",
      position: "Доцент",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "25",
      fullName: "Карпенко Віталій Андрійович",
      department: "Кафедра радіоелектронних і комп'ютерних систем",
      position: "Викладач",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "26",
      fullName: "Тимченко Денис Сергійович",
      department: "Кафедра радіоелектронних і комп'ютерних систем",
      position: "Професор",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "27",
      fullName: "Марченко Світлана Олександрівна",
      department: "Кафедра радіоелектронних і комп'ютерних систем",
      position: "Асистент",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "28",
      fullName: "Осипенко Геннадій Миколайович",
      department: "Кафедра радіоелектронних і комп'ютерних систем",
      position: "Доцент",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "29",
      fullName: "Коломієць Артем Володимирович",
      department: "Кафедра радіоелектронних і комп'ютерних систем",
      position: "Завідувач кафедри",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "30",
      fullName: "Дмитренко Валентина Петрівна",
      department: "Кафедра радіоелектронних і комп'ютерних систем",
      position: "Старший викладач",
      photoUrl: "../image/people.jpg"
    },
  
    // Кафедра оптоелектроніки та інформаційних технологій
    {
      id: "31",
      fullName: "Величко Борис Михайлович",
      department: "Кафедра оптоелектроніки та інформаційних технологій",
      position: "Доцент",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "32",
      fullName: "Козаченко Людмила Сергіївна",
      department: "Кафедра оптоелектроніки та інформаційних технологій",
      position: "Професор",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "33",
      fullName: "Павлюк Тарас Іванович",
      department: "Кафедра оптоелектроніки та інформаційних технологій",
      position: "Старший викладач",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "34",
      fullName: "Сидоренко Ірина Олегівна",
      department: "Кафедра оптоелектроніки та інформаційних технологій",
      position: "Доцент",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "35",
      fullName: "Михайленко Роман Андрійович",
      department: "Кафедра оптоелектроніки та інформаційних технологій",
      position: "Викладач",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "36",
      fullName: "Соколов Олег Петрович",
      department: "Кафедра оптоелектроніки та інформаційних технологій",
      position: "Професор",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "37",
      fullName: "Корнієнко Надія Володимирівна",
      department: "Кафедра оптоелектроніки та інформаційних технологій",
      position: "Асистент",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "38",
      fullName: "Тищенко Віктор Олексійович",
      department: "Кафедра оптоелектроніки та інформаційних технологій",
      position: "Доцент",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "39",
      fullName: "Приходько Марина Юріївна",
      department: "Кафедра оптоелектроніки та інформаційних технологій",
      position: "Завідувач кафедри",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "40",
      fullName: "Білоус Ярослав Степанович",
      department: "Кафедра оптоелектроніки та інформаційних технологій",
      position: "Старший викладач",
      photoUrl: "../image/people.jpg"
    },
  
    // Кафедра сенсорної та напівпровідникової електроніки
    {
      id: "41",
      fullName: "Кравчук Степан Михайлович",
      department: "Кафедра сенсорної та напівпровідникової електроніки",
      position: "Доцент",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "42",
      fullName: "Яковенко Ольга Володимирівна",
      department: "Кафедра сенсорної та напівпровідникової електроніки",
      position: "Професор",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "43",
      fullName: "Черненко Андрій Вікторович",
      department: "Кафедра сенсорної та напівпровідникової електроніки",
      position: "Старший викладач",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "44",
      fullName: "Кулик Світлана Степанівна",
      department: "Кафедра сенсорної та напівпровідникової електроніки",
      position: "Доцент",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "45",
      fullName: "Шевчук Богдан Ігорович",
      department: "Кафедра сенсорної та напівпровідникової електроніки",
      position: "Викладач",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "46",
      fullName: "Грищенко Олександра Дмитрівна",
      department: "Кафедра сенсорної та напівпровідникової електроніки",
      position: "Професор",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "47",
      fullName: "Коваль Володимир Петрович",
      department: "Кафедра сенсорної та напівпровідникової електроніки",
      position: "Асистент",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "48",
      fullName: "Лебідь Ірина Михайлівна",
      department: "Кафедра сенсорної та напівпровідникової електроніки",
      position: "Доцент",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "49",
      fullName: "Пономаренко Василь Андрійович",
      department: "Кафедра сенсорної та напівпровідникової електроніки",
      position: "Завідувач кафедри",
      photoUrl: "../image/people.jpg"
    },
    {
      id: "50",
      fullName: "Симоненко Катерина Олексіївна",
      department: "Кафедра сенсорної та напівпровідникової електроніки",
      position: "Старший викладач",
      photoUrl: "../image/people.jpg"
    }
  ];

  useEffect(() => {
    const fetchTeachers = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/teachers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTeachersData(response.data);
        setError(null);
      } catch (err) {
        console.log("Using default teachers data");
        setTeachersData(defaultTeachers);
        setError(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeachers();
  }, [token]);

  return { teachersData, isLoading, error };
}