import React from "react";
import "../css/DepartmentFilter.scss";

type DepartmentFilterProps = {
  departments: string[];
  selectedDepartment: string | null;
  onDepartmentChange: (department: string | null) => void;
};

const DepartmentFilter: React.FC<DepartmentFilterProps> = ({
  departments,
  selectedDepartment,
  onDepartmentChange,
}) => {
  return (
    <div className="department-filter">
      <h4>Фільтр за кафедрою:</h4>
      <div className="filter-buttons">
        <button
          className={selectedDepartment === null ? "active" : ""}
          onClick={() => onDepartmentChange(null)}
        >
          Всі кафедри
        </button>
        {departments.map((department) => (
          <button
            key={department}
            className={selectedDepartment === department ? "active" : ""}
            onClick={() => onDepartmentChange(department)}
          >
            {department}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DepartmentFilter;