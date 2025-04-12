import React, { useState, useEffect } from "react";
import "../css/TeachersPage.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TeacherCard from '../components/TeacherCard';
import Loading from "../components/Loading";
import { useFetchTeachers } from "../hooks/useFetchTeachers";
import DepartmentFilter from "../components/DepartmentFilter";

type Teacher = {
  id: string;
  fullName: string;
  department: string;
  position: string;
  photoUrl: string;
};

const TeachersPage: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const { teachersData, isLoading, error } = useFetchTeachers();
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    if (teachersData) {
      setFilteredTeachers(
        selectedDepartment
          ? teachersData.filter(teacher => teacher.department === selectedDepartment)
          : teachersData
      );
    }
  }, [teachersData, selectedDepartment]);

  const handleDepartmentChange = (department: string | null) => {
    setSelectedDepartment(department);
  };

  const getDepartmentsList = () => {
    if (!teachersData) return [];
    return Array.from(new Set(teachersData.map(teacher => teacher.department)));
  };

  return (
    <div className="container teachers-block">
      <div className="teachers-header-block col-11">
        <p>Викладачі</p>
      </div>
      <div className="col-12">
        <DepartmentFilter 
          departments={getDepartmentsList()} 
          selectedDepartment={selectedDepartment}
          onDepartmentChange={handleDepartmentChange}
        />

        {isLoading ? (
          <Loading />
        ) : error ? (
          <p className="error">Помилка завантаження: {error}</p>
        ) : (
          <div className="teachers-grid pt-3">
            {filteredTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default TeachersPage;